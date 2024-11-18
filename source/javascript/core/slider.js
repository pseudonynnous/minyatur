import _config from '../config.js';
import Language from './language.js';

// eslint-disable-next-line
import defaultStyle from '!!css-loader?{"sourceMap":false,"exportType":"string"}!sass-loader?{"api":"modern"}!../../stylesheet/minyatur.scss';

class Slider {
  sliderItems = new Map();

  constructor(configUser = {}, sliderItemsAsParameter = []) {
    this.activeIndex = 0;
    this.boardListOnTransition = null;

    this.configObject = { ..._config };

    // Overwrite user settings over default settings
    Object.keys(this.configObject).forEach(key => {
      if (Object.hasOwn(configUser, key)) {
        this.configObject[key] = configUser[key];
      }
    });

    // Variables
    Language.load(this.configObject.languageCode);
    this.language = Language;

    // Let's add the default css file if it is not added before
    if (this.configObject.styleAutoload) {
      if (!document.querySelector('.minyatur-default-style') && !document.querySelector('link[href*="minyatur.css"]')) {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        styleElement.classList.add('minyatur-default-style');
        styleElement.innerHTML = defaultStyle;

        window.document.head.appendChild(styleElement);
      }
    }

    // Generate main container
    this.mainContainer = document.getElementById(this.configObject.id);
    this.mainContainer.classList.add('minyatur');
    this.mainContainer.__minyatur = this;

    if (!this.mainContainer) {
      console.warn(`Minyatur Error: There is no container with selector: ${this.configObject.id}`);

      return;
    }

    // we will use these later
    this.userDefinedItems = [...this.mainContainer.firstElementChild.children, ...sliderItemsAsParameter];

    // if (!userItems.length || !userItems[0].hasAttribute('data-src')) {
    if (!this.userDefinedItems.length) {
      console.warn('Minyatur Error: There is no image to show. Please insert `div` inside of `slider container element` and than insert images to the `div` with `img` tag.');

      return;
    }

    // Empty the main container
    while (this.mainContainer.firstChild) {
      this.mainContainer.removeChild(this.mainContainer.lastChild);
    }

    // BroadWrapper, holder for slider items
    this.boardWrapper = document.createElement('div');
    this.boardWrapper.classList.add('minyatur-board');
    this.boardWrapper.style.visibility = 'hidden';
    this.mainContainer.appendChild(this.boardWrapper);

    // AspectRatio and width and height related settings.
    this.boardListContainer = document.createElement('div');
    this.boardListContainer.classList.add('minyatur-board-list-container');
    this.boardListContainer.style.overflow = 'hidden';
    this.boardListContainer.style.height = '0';
    this.boardWrapper.appendChild(this.boardListContainer);

    // Since the measurement properties return values after adding the BoardContainer as a child, values such as ratioPercent, maxWidth, maxHeight of the slider are calculated and evaluated here.
    if (this.configObject.maxWidth != null) {
      this.boardWrapper.style.maxWidth = this.configObject.maxWidth;
    }

    this.boardListContainerCalculateHeight();

    this._boardListContainerCalculateHeight = this.boardListContainerCalculateHeight.bind(this);
    window.addEventListener('resize', this._boardListContainerCalculateHeight);

    // Generate boardlist
    this.boardList = document.createElement('ul');
    this.boardList.positionX = 0;
    this.boardList.addEventListener('transitionstart', () => {
      this.boardListOnTransition = true;
    });
    this.boardList.addEventListener('transitionend', () => {
      this.boardListOnTransition = null;
    });

    this.boardListContainer.appendChild(this.boardList);

    // We assign it to different variables for practical access
    // this.boardItems = this.boardList.children;

    // Add events
    this._touchStart = this.touchStart.bind(this);
    // https://chromestatus.com/feature/5745543795965952
    this.boardListContainer.addEventListener('touchstart', this._touchStart, { passive: true });

    this._touchMove = this.touchMove.bind(this);
    // https://chromestatus.com/feature/5745543795965952
    this.boardListContainer.addEventListener('touchmove', this._touchMove, { passive: true });

    this._touchEnd = this.touchEnd.bind(this);
    this.boardListContainer.addEventListener('touchend', this._touchEnd);
    this.boardListContainer.addEventListener('touchcancel', this._touchEnd);

    this._resizeBoardListPositionX = this.resizeBoardListPositionX.bind(this);
    window.addEventListener('resize', this._resizeBoardListPositionX);

    // Set start index
    // this.insertItem(this.configObject.startSlideIndex, { transition: false });

    // Finally make the slider visible
    this.boardWrapper.style.visibility = null;

    this.init();
  }

  async init() {
    await this.initItems();
    await this.initModules();

    // Set start index
    this.insertItem(this.configObject.startSlideIndex, { transition: false });

    // Finally make the slider visible
    this.boardWrapper.style.visibility = null;
  }

  async initItems() {
    for (const item of this.userDefinedItems) {
      try {
        const ItemModule = await import(`../item/${item.tagName.toLowerCase()}.js`);
        const ItemClass = ItemModule.default;

        const itemInstance = new ItemClass(this);
        itemInstance.setElement(item);

        const boardListItem = document.createElement('li');
        this.boardList.appendChild(boardListItem);

        // https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
        const objectFitSupportedElements = ['img', 'video'];

        if (objectFitSupportedElements.includes(item.tagName.toLowerCase())) {
          item.style.objectFit = this.configObject.objectFit;
        }

        boardListItem.appendChild(item);

        // Bu mesaj ekleme kısmını kontrol et!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (item.getAttribute('data-message')) {
          const MessageModule = await import('../module/message');
          const MessageClass = MessageModule.default;

          const messageInstance = new MessageClass(this);
          messageInstance.setMessage(item.getAttribute('data-message'));

          boardListItem.appendChild(messageInstance.getElement());
        }

        this.sliderItems.set([...this.boardList.children].indexOf(boardListItem), { instance: itemInstance, element: item, message: item.getAttribute('data-message') });

        // this.sliderItems.push({ element: item, message: item.getAttribute('data-message') });
      } catch (error) {
        console.warn(error);
      }
    }
  }

  async initModules() {
    // Access to the modules then initialize
    this.modules = new Set();
    // Object.keys(this.configObject.module).forEach(key => {
    for (const key of this.configObject.module) {
      const splitedPath = key.split('/');

      let _class;
      // If path length bigger than 2 means path contains class name. So must get class name.
      if (splitedPath.length > 1) {
        // Pop last element of array, last element class name.
        _class = splitedPath.pop();
        // Uppercase first letter because of class names start with uppercase.
        _class = `${_class[0].toUpperCase()}${_class.slice(1)}`;
      }

      try {
        const exportedModule = await import(`../module/${splitedPath.join('/')}`);
        const Module = _class != null ? exportedModule[_class] : exportedModule.default;

        const ModuleInstance = new Module(this);
        this.modules.add(ModuleInstance);

        if (ModuleInstance.append) {
          ModuleInstance.append();
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }

  get boardListPositionX() {
    return this.boardList.positionX;
  }

  set boardListPositionX(position) {
    this.boardList.style.transform = `translateX(${position}px)`;
    this.boardList.positionX = position;
  }

  resizeBoardListPositionX() {
    this.transitionOff();
    this.boardListPositionX = -1 * this.boardList.offsetWidth * this.activeIndex;
  }

  transitionOn(transitionSpeed = this.configObject.transitionSpeed) {
    this.boardList.style.transition = `all ${transitionSpeed}ms ease 0ms`;
  }

  transitionOff() {
    this.boardList.style.transition = null;
  }

  boardListContainerCalculateHeight() {
    const ratioPercent = this.configObject.aspectRatio.split(':');
    const calculatedHeight = this.boardWrapper.offsetWidth / ratioPercent[0] * ratioPercent[1];

    if (this.configObject.maxHeight == null || (this.boardListContainer.offsetHeight <= parseInt(this.configObject.maxHeight) && calculatedHeight <= parseInt(this.configObject.maxHeight))) {
      this.boardListContainer.style.paddingTop = `${100 / ratioPercent[0]}%`;
    } else {
      this.boardListContainer.style.paddingTop = this.configObject.maxHeight;
    }
  }

  insertItem(newIndex, { transition = true, transitionSpeed = this.configObject.transitionSpeed, source = null } = {}) {
    if (newIndex >= this.boardList.children.length) {
      newIndex = this.boardList.children.length - 1;

      if (this.configObject.infinityAction) {
        this.nextItemInfinityMotion();

        return;
      }

      if (source !== 'touch') {
        this.nextItemEndMotion();

        return;
      }
    }

    if (newIndex < 0) {
      newIndex = 0;

      if (this.configObject.infinityAction) {
        this.prevItemInfinityMotion();

        return;
      }

      if (source !== 'touch') {
        this.prevItemEndMotion();

        return;
      }
    }

    if (transition === false) {
      this.transitionOff();
    } else {
      transitionSpeed *= Math.abs(this.activeIndex - newIndex) ? Math.abs(this.activeIndex - newIndex) : 1;

      this.transitionOn(transitionSpeed);
    }

    // Hide old index element
    this.sliderItems.get(this.activeIndex).instance.hide();

    // Set active index
    this.activeIndex = newIndex;

    // Pass new index to mudules
    this.modules.forEach(v => {
      if (v.insertItem != null) {
        v.insertItem(newIndex);
      }
    });

    // Show new index element
    this.sliderItems.get(newIndex).instance.show();

    this.boardListPositionX = -1 * this.boardList.offsetWidth * newIndex;
  }

  prevItem(source = null) {
    const targetIndex = this.activeIndex - 1;

    this.insertItem(targetIndex, { source });
  }

  prevItemEndMotion() {
    if (this.prevItemEndMotionTimeoutId != null) {
      window.clearTimeout(this.prevItemEndMotionTimeoutId);
    } else {
      this.transitionOn(this.configObject.transitionSpeed / 2);

      this.boardListPositionX = this.boardList.offsetWidth / 10;
    }

    this.prevItemEndMotionTimeoutId = window.setTimeout(() => {
      this.insertItem(0, { transitionSpeed: this.configObject.transitionSpeed / 2 });

      this.prevItemEndMotionTimeoutId = null;
    }, this.configObject.transitionSpeed / 2);
  }

  prevItemInfinityMotion() {
    if (this.boardListOnTransition != null) {
      return;
    }

    this.transitionOn();

    this.boardListPositionX = this.boardList.offsetWidth;

    window.setTimeout(() => {
      this.transitionOff();

      this.boardListPositionX = -1 * this.boardList.offsetWidth * this.boardList.children.length;

      window.setTimeout(() => {
        this.insertItem(this.boardList.children.length - 1);
      }, 100);
    }, this.configObject.transitionSpeed);
  }

  nextItem(source = null) {
    const targetIndex = this.activeIndex + 1;

    this.insertItem(targetIndex, { source });
  }

  nextItemEndMotion() {
    if (this.nextItemEndMotionTimeoutId != null) {
      window.clearTimeout(this.nextItemEndMotionTimeoutId);
    } else {
      this.transitionOn(this.configObject.transitionSpeed / 2);

      this.boardListPositionX += -1 * this.boardList.offsetWidth / 10;
    }

    this.nextItemEndMotionTimeoutId = window.setTimeout(() => {
      this.insertItem(this.boardList.children.length - 1, { transitionSpeed: this.configObject.transitionSpeed / 2 });

      this.nextItemEndMotionTimeoutId = null;
    }, this.configObject.transitionSpeed / 2);
  }

  nextItemInfinityMotion() {
    if (this.boardListOnTransition != null) {
      return;
    }

    this.transitionOn();

    this.boardListPositionX = -1 * this.boardList.offsetWidth * this.boardList.children.length;

    window.setTimeout(() => {
      this.transitionOff();

      this.boardListPositionX = this.boardList.offsetWidth;

      window.setTimeout(() => {
        this.insertItem(0);
      }, 100);
    }, this.configObject.transitionSpeed);
  }

  touchStart(event) {
    if (this.boardListOnTransition != null) {
      return;
    }

    this.touchStartEvent = event;

    this.touchPositionData = {};
    this.touchPositionData.type = null;
    this.touchPositionData.touchStartBoardListPositionX = this.boardListPositionX;
    this.touchPositionData.touchXDiff = 0;
    this.touchPositionData.touchYDiff = 0;

    this.transitionOff();
  }

  touchMove(event) {
    if (this.boardListOnTransition != null) {
      return;
    }

    if (this.touchPositionData == null) {
      this.touchStart(event);

      return;
    }

    if (this.touchPositionData.type === 'horizontal') {
      return;
    }

    this.touchPositionData.touchXDiff = parseInt(event.changedTouches[0].clientX) - this.touchStartEvent.changedTouches[0].clientX;
    this.touchPositionData.touchYDiff = parseInt(event.changedTouches[0].clientY) - this.touchStartEvent.changedTouches[0].clientY;

    if (this.touchPositionData.type == null) {
      if (Math.abs(this.touchPositionData.touchYDiff) <= Math.abs(this.touchPositionData.touchXDiff)) {
        this.touchPositionData.type = 'vertical';
      } else {
        this.touchPositionData.type = 'horizontal';
      }
    }

    if (this.touchPositionData.type === 'vertical') {
      this.boardListPositionX = this.touchPositionData.touchStartBoardListPositionX + this.touchPositionData.touchXDiff;

      // event.preventDefault();

      return false;
    }
  }

  touchEnd(event) {
    if (this.boardListOnTransition != null) {
      return;
    }

    if (this.touchPositionData == null) {
      return;
    }

    if (this.touchPositionData.type === 'horizontal') {
      return;
    }

    const target = event.target;

    if ((target.parentNode.parentNode.offsetWidth / this.configObject.touchChangeCoefficient) <= Math.abs(this.touchPositionData.touchXDiff) && (this.touchPositionData.touchXDiff < 0)) {
      this.nextItem('touch');
    } else if ((target.parentNode.parentNode.offsetWidth / this.configObject.touchChangeCoefficient) <= Math.abs(this.touchPositionData.touchXDiff) && (this.touchPositionData.touchXDiff > 0)) {
      this.prevItem('touch');
    } else {
      this.insertItem(this.activeIndex, { transition: false, source: 'touch' });
    }

    this.touchPositionData = null;
  }
}

export default Slider;
