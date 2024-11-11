import _config from '../config';

class Thumbnail {
  constructor(sliderInstance, configUser, path) {
    this.sliderInstance = sliderInstance;
    this.activeIndex = null;

    this.loadConfig(configUser, path);

    if (this.configObject.id && document.getElementById(this.configObject.id)) {
      this.thumbnailWrapper = document.getElementById(this.configObject.id);

      while (this.thumbnailWrapper.firstChild) {
        this.thumbnailWrapper.removeChild(this.thumbnailWrapper.lastChild);
      }
    } else {
      this.thumbnailWrapper = document.createElement('div');
      this.sliderInstance.mainContainer.appendChild(this.thumbnailWrapper);
    }
  }

  loadConfig(configUser, path) {
    this.configObject = { ..._config.module[path] };

    Object.keys(this.configObject).forEach(key => {
      if (Object.hasOwn(configUser, key)) {
        this.configObject[key] = configUser[key];
      }
    });
  }

  append() {
    return true;
  }

  insertItem(index) {
    if (index < 0) {
      index = 0;
    }

    if (index >= this.thumbnailItems.length) {
      index = this.thumbnailItems.length - 1;
    }

    if (this.activeIndex === index) {
      return;
    }

    [].forEach.call(this.thumbnailItems, item => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    if (this.thumbnailItems[index]) {
      this.activeIndex = index;
      this.thumbnailItems[index].classList.add('active');
    }
  }

  clickHandler(attachedElem, event) {
    const index = [].indexOf.call(this.thumbnailItems, attachedElem);

    if (index < 0) {
      return;
    }

    this.insertItem(index);
    this.sliderInstance.insertItem(index, { transitionSpeed: 100 });

    event.preventDefault();
    return false;
  }

  itemInnerGenerator(sliderItem) {
    const thumbnailListItem = document.createElement('li');

    let thumbnailListItemContent;

    if (sliderItem.element.tagName.toLowerCase() === 'img') {
      thumbnailListItemContent = document.createElement('img');
      thumbnailListItemContent.src = sliderItem.element.src;
    }

    if (sliderItem.element.tagName.toLowerCase() === 'div') {
      thumbnailListItemContent = document.createElement('iframe');
      thumbnailListItemContent.style.width = '100%';
      thumbnailListItemContent.style.height = '100%';
      thumbnailListItemContent.style.border = 'none';
      thumbnailListItemContent.zIndex = '0';
      thumbnailListItemContent.srcdoc = `<html style="width: 100%; height: 100%; margin: 0; padding: 0; border: 0"><body style="width: 100%; height: 100%; margin: 0; padding: 0; border: 0">${sliderItem.element.outerHTML}</body></html>`;

      // iframes not fired javascript events so we will add fake event listener.
      const fakeEventListener = document.createElement('div');
      fakeEventListener.style.position = 'absolute';
      fakeEventListener.style.width = '100%';
      fakeEventListener.style.height = '100%';
      fakeEventListener.style.top = '0';
      fakeEventListener.style.left = '0';
      fakeEventListener.zIndex = '1';

      thumbnailListItem.appendChild(fakeEventListener);
    }

    if (sliderItem.element.tagName.toLowerCase() === 'video') {
      thumbnailListItemContent = document.createElement('img');

      sliderItem.element.addEventListener('loadeddata', function() {
        const canvas = document.createElement('canvas');

        const thumbnailVideoRatioDiver = Math.max(sliderItem.element.videoWidth / thumbnailListItem.offsetWidth, sliderItem.element.videoHeight / thumbnailListItem.offsetHeight);

        canvas.width = sliderItem.element.videoWidth / thumbnailVideoRatioDiver;
        canvas.height = sliderItem.element.videoHeight / thumbnailVideoRatioDiver;

        const ctx = canvas.getContext('2d');
        // ctx.filter = 'sepia(100%)';

        this.__canplayFunc = () => {
          if (!this.__canplayCounter) {
            this.__canplayCounter = 0;
          }

          this.__canplayCounter++;

          this.currentTime = 0.1;

          ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
          thumbnailListItemContent.src = canvas.toDataURL('image/webp');

          if (this.__canplayCounter > 2) {
            this.currentTime = 0;
            this.removeEventListener('canplay', this.__canplayFunc);

            delete this.__canplayCounter;
            delete this.__canplayFunc;
          }
        };

        sliderItem.element.addEventListener('canplay', sliderItem.element.__canplayFunc);
      }, { once: true });
    }

    if (!thumbnailListItemContent) {
      console.warn('Some slider items preview not showing in thumbnail. Item without preview:', sliderItem.element);

      thumbnailListItemContent = document.createElement('div');
      thumbnailListItemContent.classList.add('blank-item');
      thumbnailListItemContent.style.width = '100%';
      thumbnailListItemContent.style.height = '100%';
    }

    thumbnailListItem.appendChild(thumbnailListItemContent);

    this._clickHandler = this.clickHandler.bind(this, thumbnailListItem);
    thumbnailListItem.addEventListener('click', this._clickHandler);

    return thumbnailListItem;
  }
}

class Basic extends Thumbnail {
  constructor(sliderInstance, configUser) {
    super(sliderInstance, configUser, 'thumbnail/basic');

    this.thumbnailWrapper.classList.add('minyatur-thumbnail-basic');

    this.thumbnailList = document.createElement('ul');
    this.thumbnailList.positionX = 0;
    this.thumbnailWrapper.appendChild(this.thumbnailList);

    this.thumbnailItems = this.thumbnailList.children;

    // add slider items to thumbnail
    this.sliderInstance.sliderItemsDataArray.forEach(sliderItem => {
      const thumbnailListItem = this.itemInnerGenerator(sliderItem);

      this.thumbnailList.appendChild(thumbnailListItem);
    });

    return this;
  }
}

class Dot extends Thumbnail {
  constructor(sliderInstance, configUser) {
    super(sliderInstance, configUser, 'thumbnail/dot');

    this.thumbnailWrapper.classList.add('minyatur-thumbnail-dot');

    this.thumbnailList = document.createElement('ul');
    this.thumbnailWrapper.appendChild(this.thumbnailList);

    this.thumbnailItems = this.thumbnailList.children;

    // add slider items to thumbnail
    this.sliderInstance.sliderItemsDataArray.forEach(sliderItem => {
      const thumbnailItem = document.createElement('li');

      this._clickHandler = this.clickHandler.bind(this, thumbnailItem);
      thumbnailItem.addEventListener('click', this._clickHandler);

      this.thumbnailList.appendChild(thumbnailItem);
    });
  }
}

class Slider extends Thumbnail {
  constructor(sliderInstance, configUser) {
    super(sliderInstance, configUser, 'thumbnail/slider');

    this.thumbnailWrapper.classList.add('minyatur-thumbnail-slider');

    this.thumbnailContainer = document.createElement('div');
    this.thumbnailContainer.style.overflow = 'hidden';
    this.thumbnailWrapper.appendChild(this.thumbnailContainer);

    this.thumbnailList = document.createElement('ul');
    this.thumbnailList.positionX = 0;
    this.thumbnailContainer.appendChild(this.thumbnailList);

    this.thumbnailItems = this.thumbnailList.children;

    // add slider items to thumbnail
    this.sliderInstance.sliderItemsDataArray.forEach(sliderItem => {
      const thumbnailListItem = this.itemInnerGenerator(sliderItem);

      this.thumbnailList.appendChild(thumbnailListItem);
    });

    this._touchStart = this.touchStart.bind(this);
    this.thumbnailList.addEventListener('touchstart', this._touchStart);

    this._touchMove = this.touchMove.bind(this);
    this.thumbnailList.addEventListener('touchmove', this._touchMove);

    this._touchEnd = this.touchEnd.bind(this);
    this.thumbnailList.addEventListener('touchend', this._touchEnd);

    this.thumbnailBackwardButton = document.createElement('div');
    this.thumbnailBackwardButton.classList.add('minyatur-thumbnail-slider-backward-button');
    this.thumbnailContainer.appendChild(this.thumbnailBackwardButton);

    this.thumbnailForwardButton = document.createElement('div');
    this.thumbnailForwardButton.classList.add('minyatur-thumbnail-slider-forward-button');
    this.thumbnailContainer.appendChild(this.thumbnailForwardButton);

    this._slideBackward = this.slideBackward.bind(this);
    this.thumbnailBackwardButton.addEventListener('click', this._slideBackward);

    this._slideForward = this.slideForward.bind(this);
    this.thumbnailForwardButton.addEventListener('click', this._slideForward);

    this._resized = this.resized.bind(this);
    window.addEventListener('resize', this._resized);

    this.resized();

    return this;
  }

  get thumbnailListPositionX() {
    return this.thumbnailList.positionX;
  }

  set thumbnailListPositionX(position) {
    this.thumbnailList.style.transform = `translateX(${position}px)`;
    this.thumbnailList.positionX = position;
  }

  resized() {
    if (this.thumbnailList.clientWidth < this.thumbnailList.scrollWidth) {
      this.thumbnailWrapper.classList.add('scrollOn');
    } else {
      this.thumbnailWrapper.classList.remove('scrollOn');
    }
  }

  transitionOn(transitionSpeed = this.configObject.transitionSpeed) {
    this.thumbnailList.style.transition = `all ${transitionSpeed}ms ease 0ms`;
  }

  transitionOff() {
    this.thumbnailList.style.transition = null;
  }

  insertItem(index, { transition = true, transitionSpeed = this.configObject.transitionSpeed } = {}) {
    if (index < 0) {
      index = 0;
    }

    if (index >= this.thumbnailItems.length) {
      index = this.thumbnailItems.length - 1;
    }

    if (this.activeIndex === index) {
      return;
    }

    [].forEach.call(this.thumbnailItems, item => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    if (this.thumbnailItems[index]) {
      this.activeIndex = index;
      this.thumbnailItems[index].classList.add('active');
    }

    if (transition === false) {
      this.transitionOff();
    } else {
      this.transitionOn(transitionSpeed);
    }

    // Item position check, If not visible change position to visible active item.
    if (Math.abs(this.thumbnailListPositionX) > this.thumbnailItems[index].offsetLeft) {
      this.thumbnailListPositionX = -this.thumbnailItems[index].offsetLeft;
    }

    if (((this.thumbnailList.offsetWidth - this.thumbnailListPositionX) < (this.thumbnailItems[index].offsetLeft + this.thumbnailItems[index].offsetWidth))) {
      this.thumbnailListPositionX = this.thumbnailList.offsetWidth - this.thumbnailItems[index].offsetLeft - this.thumbnailItems[index].offsetWidth;
    }
  }

  slideBackward() {
    if (this.thumbnailListPositionX === 0) {
      this.slideBackwardEndMotion();

      return;
    }

    if ((this.thumbnailListPositionX + this.thumbnailList.clientWidth) < 0) {
      this.thumbnailListPositionX = this.thumbnailListPositionX + this.thumbnailList.clientWidth;

      return;
    }

    if ((this.thumbnailListPositionX + this.thumbnailList.clientWidth) >= 0) {
      this.thumbnailListPositionX = 0;
    }
  }

  slideBackwardEndMotion() {
    if (this.slideBackwardEndMotionTimeoutId != null) {
      window.clearTimeout(this.slideBackwardEndMotionTimeoutId);
    } else {
      this.transitionOn(this.configObject.transitionSpeed / 2);

      this.thumbnailListPositionX += this.thumbnailList.offsetWidth / 10;
    }

    this.slideBackwardEndMotionTimeoutId = window.setTimeout(() => {
      this.thumbnailListPositionX = 0;

      this.slideBackwardEndMotionTimeoutId = null;
    }, this.configObject.transitionSpeed / 2);
  }

  slideForward() {
    this.transitionOn();

    if (this.thumbnailList.scrollWidth === (Math.abs(this.thumbnailListPositionX) + this.thumbnailList.clientWidth)) {
      this.slideForwardEndMotion();

      return;
    }

    if (this.thumbnailList.scrollWidth > (Math.abs(this.thumbnailListPositionX) + this.thumbnailList.clientWidth * 2)) {
      this.thumbnailListPositionX = -(Math.abs(this.thumbnailListPositionX) + this.thumbnailList.clientWidth);

      return;
    }

    if (this.thumbnailList.scrollWidth <= (Math.abs(this.thumbnailListPositionX) + this.thumbnailList.clientWidth * 2)) {
      this.thumbnailListPositionX = -Math.abs(this.thumbnailList.scrollWidth - this.thumbnailList.clientWidth);
    }
  }

  slideForwardEndMotion() {
    if (this.slideForwardEndMotionTimeoutId != null) {
      window.clearTimeout(this.slideForwardEndMotionTimeoutId);
    } else {
      this.transitionOn(this.configObject.transitionSpeed / 2);

      this.thumbnailListPositionX += -1 * this.thumbnailList.offsetWidth / 10;
    }

    this.slideForwardEndMotionTimeoutId = window.setTimeout(() => {
      this.thumbnailListPositionX = -Math.abs(this.thumbnailList.scrollWidth - this.thumbnailList.clientWidth);

      this.slideForwardEndMotionTimeoutId = null;
    }, this.configObject.transitionSpeed / 2);
  }

  clickHandler(attachedElem, event) {
    const index = [].indexOf.call(this.thumbnailItems, attachedElem);

    if (index < 0) {
      return;
    }

    this.insertItem(index);
    this.sliderInstance.insertItem(index);

    event.preventDefault();
    return false;
  }

  touchStart(event) {
    const touchObj = event.changedTouches[0];

    this.touchPositionData = {};

    this.touchPositionData.type = null;

    this.touchPositionData.touchStartX = parseInt(touchObj.clientX);
    this.touchPositionData.touchStartThumbnailListPositionX = this.thumbnailListPositionX;
    this.touchPositionData.touchXDiff = 0;

    this.touchPositionData.touchStartY = parseInt(touchObj.clientY);
    this.touchPositionData.touchYDiff = 0;

    this.transitionOff();
  }

  touchMove(event) {
    // console.log('burada 3');
    // return false; başta sadece aşağıya hareket tespit ederse bunu kullan;
    if (this.touchPositionData == null) {
      this.touchStart(event);

      return;
    }

    if (this.touchPositionData.type === 'horizontal') {
      return;
    }

    const touchObj = event.changedTouches[0];

    this.touchPositionData.touchXDiff = parseInt(touchObj.clientX) - this.touchPositionData.touchStartX;
    this.touchPositionData.touchYDiff = parseInt(touchObj.clientY) - this.touchPositionData.touchStartY;

    if (this.touchPositionData.type == null) {
      if (Math.abs(this.touchPositionData.touchYDiff) <= Math.abs(this.touchPositionData.touchXDiff)) {
        this.touchPositionData.type = 'vertical';
      } else {
        this.touchPositionData.type = 'horizontal';
      }
    }

    if (this.touchPositionData.type === 'vertical') {
      this.thumbnailListPositionX = this.touchPositionData.touchStartThumbnailListPositionX + this.touchPositionData.touchXDiff;

      event.preventDefault();

      return false;
    }
  }

  touchEnd() {
    if (this.touchPositionData == null) {
      return;
    }

    if (this.touchPositionData.type === 'horizontal') {
      return;
    }

    this.touchPositionData = null;

    this.transitionOn();

    if (this.thumbnailListPositionX > 0) {
      this.thumbnailListPositionX = 0;

      return;
    }

    if (this.thumbnailList.scrollWidth <= this.thumbnailList.clientWidth && this.thumbnailListPositionX < 0) {
      this.thumbnailListPositionX = 0;

      return;
    }

    if (this.thumbnailList.scrollWidth > this.thumbnailList.clientWidth && Math.abs(this.thumbnailList.clientWidth - this.thumbnailListPositionX) > this.thumbnailList.scrollWidth) {
      this.thumbnailListPositionX = -Math.abs(this.thumbnailList.clientWidth - this.thumbnailList.scrollWidth);
    }
  }
}

export { Dot, Basic, Slider };
