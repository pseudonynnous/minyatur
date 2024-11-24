class Img {
  transitionDuration = 500;

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
    this.imageElem.addEventListener('touchstart', this._imageDoubleTapHandler, { passive: true });

    this._imageTouchStartHandle = this.imageTouchStartHandle.bind(this);
    this.imageElem.addEventListener('touchstart', this._imageTouchStartHandle, { passive: true });

    this._imageTouchMoveHandle = this.imageTouchMoveHandle.bind(this);
    this.imageElem.addEventListener('touchmove', this._imageTouchMoveHandle, { passive: true });

    this._imageTouchEndHandle = this.imageTouchEndHandle.bind(this);
    this.imageElem.addEventListener('touchend', this._imageTouchEndHandle, { passive: true });
    this.imageElem.addEventListener('touchcancel', this._imageTouchEndHandle, { passive: true });

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

    this.imageElem.style.transitionDuration = `${this.transitionDuration}ms`;
    this.imageElem.style.transitionTimingFunction = 'ease';
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

    this.imageElem.style.transform = `translate(${this.positionX}px, ${this.positionY}px) scale(${this.scale})`;

    window.setTimeout(f => {
      this._imageMouseMoveHandler = this.imageMouseMoveHandler.bind(this);
      this.imageElem.addEventListener('mousemove', this._imageMouseMoveHandler);

      this.imageElem.style.transitionDuration = null;
      this.imageElem.style.transitionTimingFunction = null;
    }, this.transitionDuration + 10);
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
    this.imageElem.style.transitionDuration = null;
    this.imageElem.style.transitionTimingFunction = null;

    // https://codepen.io/pseudonynnous/pen/poMKRag
    const containerRect = this.imageContainer.getBoundingClientRect();
    const imageRect = this.imageElem.getBoundingClientRect();

    // X Axis
    const imageContainerRatioX = (imageRect.width - containerRect.width) / imageRect.width;
    const clientXPositionRatioX = (event.clientX - containerRect.x) / containerRect.width;

    let ratioX = 0;
    if (imageContainerRatioX > 0) {
      ratioX = ((clientXPositionRatioX * imageContainerRatioX) - (imageContainerRatioX / 2));

      // We want the picture to come to an end before it gets close to the borders.
      ratioX *= 1.1;

      if (Math.abs(ratioX) > (imageContainerRatioX / 2)) {
        ratioX = (ratioX < 0 ? -imageContainerRatioX : imageContainerRatioX) / 2;
      }
    }

    // Y Axis
    const imageContainerRatioY = (imageRect.height - containerRect.height) / imageRect.height;
    const clientXPositionRatioY = (event.clientY - containerRect.y) / containerRect.height;

    let ratioY = 0;
    if (imageContainerRatioY > 0) {
      ratioY = ((clientXPositionRatioY * imageContainerRatioY) - (imageContainerRatioY / 2));

      // We want the picture to come to an end before it gets close to the borders.
      ratioY *= 1.1;

      if (Math.abs(ratioY) > (imageContainerRatioY / 2)) {
        ratioY = (ratioY < 0 ? -imageContainerRatioY : imageContainerRatioY) / 2;
      }
    }

    this.positionX = ratioX * (imageRect.width);
    this.positionY = ratioY * (imageRect.height);

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

    const containerRect = this.imageContainer.getBoundingClientRect();
    const imageRect = this.imageElem.getBoundingClientRect();

    if (containerRect.width > imageRect.width) {
      this.positionX = 0;
    } else {
      if (containerRect.left < imageRect.left) this.positionX += imageRect.left - containerRect.left;
      if (containerRect.right > imageRect.right) this.positionX += imageRect.right - containerRect.right;
    }

    if (containerRect.height > imageRect.height) {
      this.positionY = 0;
    } else {
      if (containerRect.top < imageRect.top) this.positionY += imageRect.top - containerRect.top;
      if (containerRect.bottom > imageRect.bottom) this.positionY += imageRect.bottom - containerRect.bottom;
    }

    this.imageElem.style.transitionDuration = `${this.transitionDuration}ms`;
    this.imageElem.style.transitionTimingFunction = 'ease';

    this.imageElem.style.transform = `translate(${-this.positionX}px, ${-this.positionY}px) scale(${this.scale})`;
  }
}

export default Img;
