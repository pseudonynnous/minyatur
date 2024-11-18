import Thumbnail from '../thumbnail.js';

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

    this.previewGenerator();

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

  async previewGenerator() {
    // add slider items to thumbnail
    const sliderItems = [...this.sliderInstance.sliderItems.values()];

    for (const sliderItem of sliderItems) {
      try {
        const importModule = await import(`../preview/${sliderItem.element.tagName.toLowerCase()}.js`);
        const ImportModuleClass = importModule.default;

        const thumbnailListItem = ImportModuleClass.image(sliderItem);

        this._clickHandler = this.clickHandler.bind(this, thumbnailListItem);
        thumbnailListItem.addEventListener('click', this._clickHandler);

        this.thumbnailList.appendChild(thumbnailListItem);
      } catch (error) {
        console.warn('Some slider items preview not showing in thumbnail. Item without preview:', sliderItem.element);

        const thumbnailListItem = document.createElement('li');

        const thumbnailListItemContent = document.createElement('div');
        thumbnailListItemContent.classList.add('blank-item');
        thumbnailListItemContent.style.width = '100%';
        thumbnailListItemContent.style.height = '100%';

        thumbnailListItem.appendChild(thumbnailListItemContent);

        this.thumbnailList.appendChild(thumbnailListItem);
      }
    }
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

export default Slider;
