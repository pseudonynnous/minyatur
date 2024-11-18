class Img {
  constructor(sliderInstance, mainWrapper) {
    this.sliderInstance = sliderInstance;
    this.mainWrapper = mainWrapper;
  }

  init() {
    this.imageWrapper = document.createElement('div');
    this.imageWrapper.classList.add('mfw-image-wrapper');

    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add('mfw-image-container');

    this.imageWrapper.appendChild(this.imageContainer);

    this.imageDiv = document.createElement('div');
    this.imageDiv.classList.add('nfw-image-item');
    // this.mainWrapper.appendChild(this.imageContainer);
    this.imageContainer.appendChild(this.imageDiv);

    this.imageElem = document.createElement('img');
    this.imageElem.classList.add('nfw-image');
    this.imageElem.style.transform = null;
    this.imageDiv.appendChild(this.imageElem);

    this._imageClickHandler = this.imageClickHandler.bind(this);
    this.imageElem.addEventListener('click', this._imageClickHandler);

    this._imageMouseMoveHandler = this.imageMouseMoveHandler.bind(this);
    this.imageElem.addEventListener('mousemove', this._imageMouseMoveHandler);

    this._imageDoubleTapHandler = this.imageDoubleTapHandler.bind(this);
    this.imageElem.addEventListener('touchstart', this._imageDoubleTapHandler);

    this._imageTouchStartHandle = this.imageTouchStartHandle.bind(this);
    this.imageElem.addEventListener('touchstart', this._imageTouchStartHandle);

    this._imageTouchMoveHandle = this.imageTouchMoveHandle.bind(this);
    this.imageElem.addEventListener('touchmove', this._imageTouchMoveHandle);

    this._imageTouchEndHandle = this.imageTouchEndHandle.bind(this);
    this.imageElem.addEventListener('touchend', this._imageTouchEndHandle);
    this.imageElem.addEventListener('touchcancel', this._imageTouchEndHandle);

    // add to parent
    this.mainWrapper.appendChild(this.imageWrapper);
  }

  show() {
    if (this.imageWrapper == null) {
      this.init();
    }

    const activeSliderItem = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex].firstElementChild;

    this.imageElem.src = activeSliderItem.src;
    this.imageElem.style.transform = null;

    this.scale = 1;
    this.positionX = 0;
    this.positionY = 0;

    this.imageWrapper.classList.remove('hidden');
  }

  hide() {
    this.imageWrapper.classList.add('hidden');
  }

  zoomToggle(event) {
    this.imageElem.removeEventListener('mousemove', this._imageMouseMoveHandler);
    // document.getElementById('log-div').appendChild(document.createTextNode('first-dist: doubleclick\n\n'));

    if (this.scale == null || this.scale > 1) {
      this.scale = 1;

      this.imageElem.classList.remove('nfw-zoom-in');
      this.imageElem.classList.add('nfw-zoom-out');
    } else {
      this.scale = 2;

      this.imageElem.classList.remove('nfw-zoom-out');
      this.imageElem.classList.add('nfw-zoom-in');
    }

    this.positionX = 0;
    this.positionY = 0;

    this.imageElem.style.transitionDuration = '200ms';
    this.imageElem.style.transitionTimingFunction = 'ease';
    this.imageElem.style.transform = `translate(${-this.positionX}px, ${-this.positionY}px) scale(${this.scale})`;

    window.setTimeout(f => {
      this._imageMouseMoveHandler = this.imageMouseMoveHandler.bind(this);
      this.imageElem.addEventListener('mousemove', this._imageMouseMoveHandler);
    }, 200);
  }

  imageClickHandler(event) {
    this.zoomToggle(event);
  }

  imageDoubleTapHandler(event) {
    // Önce bir parmak koyup daha sonra ikinci parmağı koyunca da çift tıklama olarak algılamaması için.
    if (event.touches.length > 1) {
      return;
    }

    if (this.tapped) {
      this.zoomToggle(event);

      window.clearTimeout(this.tapTimeoutId);

      this.tapped = null;
    } else {
      this.tapped = true;

      this.tapTimeoutId = window.setTimeout(() => {
        this.tapped = null;
      }, 300);
    }
  }

  imageMouseMoveHandler(event) {
    // https://codepen.io/pseudonynnous/pen/poMKRag
    const imageContainerRect = this.imageContainer.getBoundingClientRect();
    const imageElemRect = this.imageElem.getBoundingClientRect();

    if (imageContainerRect.width < imageElemRect.width) {
      const katsayi = imageElemRect.width / imageContainerRect.width;

      this.positionX = (event.clientX - (imageContainerRect.x + imageContainerRect.width / 2)) * katsayi;

      if (this.positionX > 0 && this.positionX > (imageElemRect.width - imageContainerRect.width) / 2) {
        this.positionX = (imageElemRect.width - imageContainerRect.width) / 2;
      } else if (this.positionX < 0 && -this.positionX > (imageElemRect.width - imageContainerRect.width) / 2) {
        this.positionX = -(imageElemRect.width - imageContainerRect.width) / 2;
      }
    } else {
      this.positionX = 0;
    }

    if (imageContainerRect.height < imageElemRect.height) {
      const katsayi = imageElemRect.height / imageContainerRect.height;

      this.positionY = (event.clientY - (imageContainerRect.y + imageContainerRect.height / 2)) * katsayi;

      if (this.positionY > 0 && this.positionY > (imageElemRect.height - imageContainerRect.height) / 2) {
        this.positionY = (imageElemRect.height - imageContainerRect.height) / 2;
      } else if (this.positionY < 0 && -this.positionY > (imageElemRect.height - imageContainerRect.height) / 2) {
        this.positionY = -(imageElemRect.height - imageContainerRect.height) / 2;
      }
    } else {
      this.positionY = 0;
    }

    this.imageElem.style.transform = `translate(${-this.positionX}px, ${-this.positionY}px) scale(${this.scale})`;
  }

  imageTouchStartHandle(event) {
    this.lastTouchEvent = event;
  }

  imageTouchMoveHandle(event) {
    this.imageElem.style.transitionDelay = null;
    this.imageElem.style.transitionDuration = null;

    if (this.lastTouchEvent.touches.length > 1 && event.touches.length > 1) {
      const lastDist = Math.hypot(
        this.lastTouchEvent.touches[0].pageX - this.lastTouchEvent.touches[1].pageX,
        this.lastTouchEvent.touches[0].pageY - this.lastTouchEvent.touches[1].pageY);

      const currentDist = Math.hypot(
        event.touches[0].pageX - event.touches[1].pageX,
        event.touches[0].pageY - event.touches[1].pageY);

      const distDiff = lastDist - currentDist;

      if (this.scale == null) {
        this.scale = 1;
      }

      let preScale = this.scale - distDiff / 50;

      if (preScale < 1) {
        preScale = this.scale - (distDiff / 250);
      }

      if (preScale < 0.2) {
        preScale = 0.2;
      }

      if (preScale > 2.4) {
        preScale = 2.4;
      }

      this.scale = preScale;
    }

    // this.scale = 2.4;

    if (this.lastTouchEvent.touches.length < 2) {
      this.positionX += (this.lastTouchEvent.touches[0].pageX - event.touches[0].pageX) * (1 + this.scale * 0.25);
      this.positionY += (this.lastTouchEvent.touches[0].pageY - event.touches[0].pageY) * (1 + this.scale * 0.25);
    } else {
      this.positionX += (this.lastTouchEvent.touches[1].pageX - event.touches[1].pageX);
      this.positionY += (this.lastTouchEvent.touches[1].pageY - event.touches[1].pageY);
    }

    this.imageElem.style.transform = `translate(${-this.positionX}px, ${-this.positionY}px) scale(${this.scale})`;

    this.lastTouchEvent = event;
  }

  imageTouchEndHandle(event) {
    if (this.scale < 1) {
      this.scale = 1;
    }

    const imageContainerRect = this.imageContainer.getBoundingClientRect();
    const imageElemRect = this.imageElem.getBoundingClientRect();

    if (imageContainerRect.width > imageElemRect.width) {
      this.positionX = 0;
    } else {
      if (imageContainerRect.left < imageElemRect.left) this.positionX += imageElemRect.left - imageContainerRect.left;
      if (imageContainerRect.right > imageElemRect.right) this.positionX += imageElemRect.right - imageContainerRect.right;
    }

    if (imageContainerRect.height > imageElemRect.height) {
      this.positionY = 0;
    } else {
      if (imageContainerRect.top < imageElemRect.top) this.positionY += imageElemRect.top - imageContainerRect.top;
      if (imageContainerRect.bottom > imageElemRect.bottom) this.positionY += imageElemRect.bottom - imageContainerRect.bottom;
    }

    this.imageElem.style.transitionDuration = '200ms';
    this.imageElem.style.transitionTimingFunction = 'ease';

    this.imageElem.style.transform = `translate(${-this.positionX}px, ${-this.positionY}px) scale(${this.scale})`;
  }
}

export default Img;
