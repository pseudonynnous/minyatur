import _config from '../config.js';
import Language from './language.js';

// eslint-disable-next-line
import defaultStyle from '!!css-loader?{"sourceMap":false,"exportType":"string"}!sass-loader?{"api":"modern"}!../../stylesheet/minyatur.scss';

class Slider {
  sliderItems = new Map();

  constructor(configUser = {}, sliderItemsAsParameter = []) {
    this.activeIndex = 0;
    this.boardListOnShift = null;

    this.configObject = { ..._config };

    if (typeof configUser !== 'object') {
      console.error('Config variable must be an object. Minyatur could not load.');

      return;
    }

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
      console.error(`Minyatur Error: There is no container with selector: ${this.configObject.id}`);

      return;
    }

    // we will use these later
    this.userDefinedItems = [...this.mainContainer.firstElementChild.children, ...sliderItemsAsParameter];

    // if (!userItems.length || !userItems[0].hasAttribute('data-src')) {
    if (!this.userDefinedItems.length) {
      this.printItemErrorMessage();

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

    // Transition Events
    this.boardList.addEventListener('transitionstart', () => {
      this.boardListOnShift = true;
    });
    this.boardList.addEventListener('transitionend', () => {
      this.boardListOnShift = null;

      this.transitionOff();
    });

    // touchstart
    this._touchStart = this.touchStart.bind(this);
    this.boardList.addEventListener('touchstart', this._touchStart, { passive: true });

    // touchmove
    this._touchMove = this.touchMove.bind(this);
    this.boardList.addEventListener('touchmove', this._touchMove, { passive: false });

    // touchend and touchcancel
    this._touchStop = this.touchStop.bind(this);
    this.boardList.addEventListener('touchend', this._touchStop, { passive: true });
    this.boardList.addEventListener('touchcancel', this._touchStop, { passive: true });

    // End of scroll change scrollIndex
    this.boardList.addEventListener('scroll', (event) => {
      if (this.scrollEndTimer) {
        window.clearTimeout(this.scrollEndTimer);
      }

      if (this.boardListOnShift) {
        return;
      }

      console.log('scrollEvent');

      this.scrollEndTimer = window.setTimeout(() => {
        const scrollIndex = Math.round(this.boardList.scrollLeft / this.boardList.firstElementChild.offsetWidth);

        if (this.activeIndex !== scrollIndex) {
          console.log('scrollEventInsert');

          this.insertItem(scrollIndex, { behavior: 'smooth', source: 'scrollEvent' });
        }
      }, 70);
    });

    this.boardListContainer.appendChild(this.boardList);

    this.init();

    return {
      next: ({ behavior } = {}) => { this.nextItem({ behavior, source: 'api' }); },
      prev: ({ behavior } = {}) => { this.prevItem({ behavior, source: 'api' }); },
      insert: (index, { behavior } = {}) => { this.insertItem(index, { behavior, source: 'api' }); }
    };
  }

  async init() {
    await this.initItems();
    await this.initModules();

    if (!this.sliderItems.size) {
      this.printItemErrorMessage();

      return;
    }

    // Set start index
    this.insertItem(this.configObject.startIndex, { behavior: 'instant', source: 'init' });

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
      } catch (error) {
        console.warn(error);
      }
    }
  }

  async initModules() {
    this.modules = new Set();

    if (!Array.isArray(this.configObject.module)) {
      console.error('Module property must be array, modules could not load! \n Example: \n module: [`modulePath/moduleName`, `otherModulePath/otherModuleName`]');

      return;
    }

    // Access to the modules then initialize
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
        console.warn(error.message);
      }
    }
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

  transitionOn() {
    this.boardList.style.transition = 'all 250ms ease 0ms';
  }

  transitionOff() {
    this.boardList.style.transition = null;
  }

  insertItem(newIndex, { behavior = null, source = null } = {}) {
    console.log('insertItem:' + source);

    if (this.activeIndex > newIndex && newIndex < 0 && this.configObject.loop) {
      this.prevLoopMotion();

      return;
    }

    if (this.activeIndex < newIndex && newIndex >= this.boardList.children.length && this.configObject.loop) {
      this.nextLoopMotion();

      return;
    }

    // Index
    if (newIndex < 0) {
      newIndex = 0;
    }

    if (newIndex >= this.boardList.children.length) {
      newIndex = this.boardList.children.length - 1;
    }

    this.activeIndex = newIndex;

    // Extensions
    this.initExtensions(this.activeIndex);

    // Scroll
    const scrollAbsoluteX = this.boardList.firstElementChild.offsetWidth * this.activeIndex;

    if (!['smooth', 'instant', 'auto'].includes(behavior)) {
      behavior = 'smooth';
    }

    const scrollOptions = {
      left: scrollAbsoluteX,
      top: 0,
      behavior
    };

    // If there is a difference, move it
    if (this.boardList.scrollLeft !== scrollAbsoluteX) {
      this.boardList.scrollTo(scrollOptions);
    }
  }

  initExtensions(newIndex) {
    // Hide method, oldIndex element
    this.sliderItems.get(this.activeIndex).instance.hide();

    // Pass newIndex to the modules
    this.modules.forEach(v => {
      if (v.insertItem != null) {
        v.insertItem(newIndex);
      }
    });

    // Show method, newIndex element
    this.sliderItems.get(newIndex).instance.show();
  }

  prevItem({ behavior = null, source = null } = {}) {
    if (this.boardListOnShift) {
      return;
    }

    const targetIndex = this.activeIndex - 1;

    if (targetIndex < 0) {
      if (this.configObject.loop) {
        this.prevLoopMotion();

        return;
      } else {
        this.prevEndMotion();

        return;
      }
    }

    this.insertItem(targetIndex, { behavior, source });
  }

  nextItem({ behavior = null, source = null } = {}) {
    if (this.boardListOnShift) {
      return;
    }

    const targetIndex = this.activeIndex + 1;

    if (targetIndex >= this.boardList.children.length) {
      if (this.configObject.loop) {
        this.nextLoopMotion();

        return;
      } else {
        this.nextEndMotion();

        return;
      }
    }

    this.insertItem(targetIndex, { behavior, source });
  }

  prevEndMotion() {
    const boardRelativeDelta = this.boardList.firstElementChild.offsetWidth / 6;
    const staticDelta = 100;

    const finalDelta = Math.min(boardRelativeDelta, staticDelta);

    this.endMotion(`${finalDelta}px`);
  }

  nextEndMotion() {
    const boardRelativeDelta = this.boardList.firstElementChild.offsetWidth / 6;
    const staticDelta = 100;

    const finalDelta = Math.min(boardRelativeDelta, staticDelta);

    this.endMotion(`-${finalDelta}px`);
  }

  endMotion(positionWithUnit) {
    this.transitionOn();
    this.boardList.style.transform = `translateX(${positionWithUnit})`;

    this.boardList.addEventListener('transitionend', () => {
      this.transitionOn();
      this.boardList.style.transform = null;
    }, { once: true });
  }

  prevLoopMotion() {
    this.loopMotion('prev');
  }

  nextLoopMotion() {
    this.loopMotion('next');
  }

  loopMotion(direction) {
    if (this.boardListOnShift) {
      return;
    }

    let firstMoveDeltaX, lastMoveDeltaX, targetIndex;

    if (direction === 'next') {
      const startPoint = this.boardList.scrollWidth - (this.boardList.scrollLeft + this.boardList.offsetWidth);
      this.boardList.style.transform = `translateX(${startPoint}px)`;
      this.boardList.style.overflow = 'hidden';

      firstMoveDeltaX = -this.boardList.firstElementChild.offsetWidth;
      lastMoveDeltaX = this.boardList.firstElementChild.offsetWidth;

      targetIndex = 0;
    }

    if (direction === 'prev') {
      const startPoint = -this.boardList.scrollLeft;
      this.boardList.style.transform = `translateX(${startPoint}px)`;
      this.boardList.style.overflow = 'hidden';

      firstMoveDeltaX = this.boardList.firstElementChild.offsetWidth;
      lastMoveDeltaX = -this.boardList.firstElementChild.offsetWidth;

      targetIndex = this.boardList.children.length - 1;
    }

    this.transitionOn();
    this.boardList.style.transform = `translateX(${firstMoveDeltaX}px)`;

    this.boardList.addEventListener('transitionend', () => {
      this.insertItem(targetIndex, { behavior: 'instant', source: 'loopMotion' });

      this.boardList.style.transform = `translateX(${lastMoveDeltaX}px)`;

      window.setTimeout(() => {
        this.transitionOn();
        this.boardList.style.transform = null;
        this.boardList.style.overflow = null;
      }, 10);
    }, { once: true });
  }

  touchStart(event) {
    if (this.boardListOnShift) {
      return;
    }

    this.boardListOnShift = true;

    this.touchStartX = event.touches[0].pageX;
    this.touchChangeRatio = this.boardList.firstElementChild.offsetWidth / 4.5;
    this.onTouch = true;
  }

  touchMove(event) {
    if (!this.onTouch) {
      return;
    }

    if (!this.configObject.loop) {
      return;
    }

    this.touchDeltaX = event.touches[0].pageX - this.touchStartX;
  }

  touchStop(event) {
    this.boardListOnShift = null;

    if (!this.configObject.loop) {
      return;
    }

    this.onTouch = null;

    if (this.activeIndex === 0 && this.touchDeltaX > this.touchChangeRatio) {
      this.onTouch = null;

      this.insertItem(this.activeIndex - 1, { source: 'touchStop' });

      return;
    }

    if (this.activeIndex === (this.boardList.children.length - 1) && this.touchDeltaX < -this.touchChangeRatio) {
      this.onTouch = null;

      this.insertItem(this.activeIndex + 1, { source: 'touchStop' });
    }
  }

  isTouch() {
    if ('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
      return true;
    }

    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    const mq = function(query) {
      return window.matchMedia(query).matches;
    };

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    mq(query);
  }

  printItemErrorMessage() {
    console.error('Minyatur Error: There is no image to show.',
      '\n',
      'Please insert `div` inside of `slider container element` and then insert elements to the `div`.',
      '\n',
      'Example:',
      '\n',
      '<div id="minyatur-container">',
      '\n',
      '\t<div>',
      '\n',
      '\t\t<img src="source" />',
      '\n',
      '\t\t<img src="source" />',
      '\n',
      '\t</div>',
      '\n',
      '</div>'
    );
  }
}

export default Slider;
