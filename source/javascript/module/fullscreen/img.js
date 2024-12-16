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
    this.imageContainer.appendChild(this.imageDiv);

    this.imageElem = document.createElement('img');
    this.imageElem.classList.add('nfw-image');
    this.imageElem.style.transform = null;
    this.imageDiv.appendChild(this.imageElem);

    this.imageInit();

    // Mouse event handler
    this._pointerDownHandler = this.pointerClickHandler.bind(this);
    this.imageElem.addEventListener('pointerdown', this._pointerDownHandler);
    this._pointerMoveHandler = this.pointerMoveHandler.bind(this);
    this.imageElem.addEventListener('pointermove', this._pointerMoveHandler);

    // Touch event handler
    this._wheelZoom = this.wheelZoom.bind(this);
    this.imageDiv.addEventListener('wheel', this._wheelZoom, { passive: false });

    this._imagePinchStart = this.imagePinchStart.bind(this);
    this.imageDiv.addEventListener('touchstart', this._imagePinchStart, { passive: true });
    this._imagePinchMove = this.imagePinchMove.bind(this);
    this.imageDiv.addEventListener('touchmove', this._imagePinchMove, { passive: true });
    this._imagePinchEnd = this.imagePinchEnd.bind(this);
    this.imageDiv.addEventListener('touchend', this._imagePinchEnd, { passive: true });

    this._doubleTapHandler = this.doubleTapHandler.bind(this);
    this.imageElem.addEventListener('touchstart', this._doubleTapHandler, { passive: true });

    // add to parent
    this.mainWrapper.appendChild(this.imageWrapper);
  }

  show() {
    if (!this.imageWrapper) {
      this.init();
    } else {
      this.imageInit();
    }

    this.zoomOut();

    this.imageWrapper.classList.remove('hidden');
  }

  hide() {
    this.imageWrapper.classList.add('hidden');

    this.zoomOut();
  }

  imageInit() {
    const activeSliderItem = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex].firstElementChild;

    this.imageElem.src = activeSliderItem.src;

    this.imageElem.style.scale = null;
    this.imageElem.style.width = null;

    this.imageElem.setAttribute('data-max-scale', '2');
    this.imageElem.setAttribute('data-max-width', `${2 * activeSliderItem.naturalWidth}`);
  }

  zoomIn(event) {
    if ((event.pointerType && event.pointerType === 'mouse') || (event.type && event.type === 'wheel')) {
      this.imageDiv.classList.remove('pointer-touch');
      this.imageDiv.classList.add('pointer-mouse');
    } else {
      this.imageDiv.classList.remove('pointer-mouse');
      this.imageDiv.classList.add('pointer-touch');
    }

    this.imageElem.classList.remove('nfw-zoom-out');
    this.imageElem.classList.add('nfw-zoom-in');
  }

  zoomOut() {
    this.imageElem.classList.remove('nfw-zoom-in');
    this.imageElem.classList.add('nfw-zoom-out');
  }

  pointerClickHandler(event) {
    if (event.pointerType !== 'mouse') {
      return;
    }

    if (this.imageElem.classList.contains('nfw-zoom-in')) {
      this.imageElem.style.scale = null;
      this.zoomOut();

      return;
    }

    this.imageElem.style.scale = this.imageElem.getAttribute('data-max-scale');
    this.zoomIn(event);

    const pos = this.estimatedScrollPosition(event);
    const scrollOptions = {
      top: pos.y,
      left: pos.x,
      behavior: 'instant'

    };
    this.imageDiv.scrollTo(scrollOptions);
  }

  pointerMoveHandler(event) {
    if (event.pointerType !== 'mouse') {
      return;
    }

    this.imageElem.style.transitionDuration = null;
    this.imageElem.style.transitionTimingFunction = null;

    const pos = this.estimatedScrollPosition(event);

    const scrollOptions = {
      top: pos.y,
      left: pos.x,
      behavior: 'instant'
    };

    this.imageDiv.scrollTo(scrollOptions);
  }

  estimatedScrollPosition(event) {
    // console.log('estimatedScrollPosition');

    const clientX = event.clientX || event.touches[0].clientX || 0;
    const clientY = event.clientY || event.touches[0].clientY || 0;

    // https://codepen.io/pseudonynnous/pen/poMKRag
    const containerRect = this.imageDiv.getBoundingClientRect();
    const imageRect = this.imageElem.getBoundingClientRect();

    // X Axis
    const imageDivRatioX = (imageRect.width - containerRect.width) / imageRect.width;

    let posX = 0;
    if (imageDivRatioX > 0) {
      const clientXPositionRatioX = (clientX - containerRect.x) / this.imageDiv.clientWidth;
      const scrollableDistX = this.imageDiv.scrollWidth - this.imageDiv.clientWidth;

      const padding = Math.sin(clientXPositionRatioX - 0.5) * 2 * (this.imageDiv.clientWidth * 0.3);
      // padding = 0;

      posX = clientXPositionRatioX * scrollableDistX + padding;

      // We want the picture to come to an end before it gets close to the borders.
    }

    // Y Axis
    const imageDivRatioY = (imageRect.height - containerRect.height) / imageRect.height;

    let posY = 0;
    if (imageDivRatioY > 0) {
      const clientYPositionRatioY = (clientY - containerRect.y) / this.imageDiv.clientHeight;
      const scrollableDistY = this.imageDiv.scrollHeight - this.imageDiv.clientHeight;

      const padding = (Math.sin(clientYPositionRatioY - 0.5) * 2) * (this.imageDiv.clientHeight * 0.3);
      // padding = 0;

      posY = clientYPositionRatioY * scrollableDistY + padding;

      // We want the picture to come to an end before it gets close to the borders.
    }

    return { x: posX, y: posY };
  }

  wheelZoom(event) {
    // console.log('wheelZoom');
    event.preventDefault();

    const newScale = parseFloat(this.imageElem.style.scale || 1) + parseFloat(0.1 * Math.sign(event.deltaY));

    if (newScale <= 1) {
      this.imageElem.style.scale = null;
      this.zoomOut();

      return;
    }

    if (newScale >= this.imageElem.getAttribute('data-max-scale')) {
      return;
    }

    const scrollOldHeight = this.imageDiv.scrollHeight;
    const scrollOldWidth = this.imageDiv.scrollWidth;

    this.imageElem.style.scale = newScale;
    this.zoomIn(event);

    // scroll
    const scrollDeltaY = this.imageDiv.scrollHeight - scrollOldHeight;
    const scrollDeltaX = this.imageDiv.scrollWidth - scrollOldWidth;

    const imageRect = this.imageElem.getBoundingClientRect();

    const touchPositionRatioX = (event.clientX - imageRect.x) / imageRect.width;
    const touchPositionRatioY = (event.clientY - imageRect.y) / imageRect.height;

    const scrollOptions = {
      top: scrollDeltaY * touchPositionRatioY,
      left: scrollDeltaX * touchPositionRatioX,
      behavior: 'instant'
    };

    this.imageDiv.scrollBy(scrollOptions);
  }

  imagePinchStart(event) {
    // console.log('imagePinchStart');
    if (!event.touches || event.touches.length < 2) {
      return;
    }

    if (!this._touch) {
      this._touch = {};
    }

    if (!this._imageBaseWidth) {
      this._imageBaseWidth = this.imageElem.width;
    }

    // get rough estimate of distance between two fingers
    this._touch.startHypotMultiDim = Math.hypot(
      event.touches[0].pageX - event.touches[1].pageX,
      event.touches[0].pageY - event.touches[1].pageY
    );

    this._touch.midPointX = 0;
    for (let i = 0; i < event.touches.length; i++) {
      this._touch.midPointX += event.touches[i].pageX / event.touches.length;
    }

    this._touch.coordsMidY = 0;
    for (let i = 0; i < event.touches.length; i++) {
      this._touch.coordsMidY += event.touches[i].pageY / event.touches.length;
    }
  }

  imagePinchMove(event) {
    // console.log('imagePinchMove');
    if (!event.touches || event.touches.length < 2) {
      return;
    }

    if (!this._touch) {
      this.imagePinchStart(event);

      return;
    }

    // get rough estimate of distance between two fingers
    const touchDeltaHypotMultiDim = Math.hypot(
      event.touches[0].pageX - event.touches[1].pageX,
      event.touches[0].pageY - event.touches[1].pageY
    );
    const widthStep = (touchDeltaHypotMultiDim - this._touch.startHypotMultiDim) * 2;
    // Update value for next event
    this._touch.startHypotMultiDim = touchDeltaHypotMultiDim;

    const newImageWidth = this.imageElem.width + widthStep;

    // basewidth check
    if (newImageWidth <= this._imageBaseWidth) {
      this._imageBaseWidth = null;
      this._touch = null;

      this.zoomOut();
      this.imagePinchStart(event);

      return;
    }

    // maxwidth check
    const maxWidth = this.imageElem.getAttribute('data-max-width');
    if (newImageWidth >= maxWidth) {
      return;
    }

    const scrollOldHeight = this.imageElem.height;
    const scrollOldWidth = this.imageElem.width;

    this.imageElem.style.width = `${newImageWidth}px`;
    this.zoomIn(event);

    const scrollDeltaY = this.imageElem.height - scrollOldHeight;
    const scrollDeltaX = this.imageElem.width - scrollOldWidth;

    // scroll
    const imageRect = this.imageElem.getBoundingClientRect();

    // change the scroll according to the position of the midpoint when zooming. the effect of sliding fingers is minimal.
    let touchMidPointX = 0;
    for (let i = 0; i < event.touches.length; i++) {
      touchMidPointX += event.touches[i].pageX / event.touches.length;
    }

    let touchMidPointY = 0;
    for (let i = 0; i < event.touches.length; i++) {
      touchMidPointY += event.touches[i].pageY / event.touches.length;
    }

    const touchPositionRatioX = (touchMidPointX - imageRect.x) / imageRect.width;
    const touchPositionRatioY = (touchMidPointY - imageRect.y) / imageRect.height;

    // change the scroll along with changing the midpoint. It also adds the finger scrolling effect.
    const touchMidPointDeltaX = (touchMidPointX - this._touch.midPointX);
    const touchMidPointDeltaY = (touchMidPointY - this._touch.midPointY);

    // update midpoint value for next event
    this._touch.midPointX = touchMidPointX;
    this._touch.midPointY = touchMidPointY;

    // set scroll
    const scrollOptions = {
      top: scrollDeltaY * touchPositionRatioY - touchMidPointDeltaY,
      left: scrollDeltaX * touchPositionRatioX - touchMidPointDeltaX,
      behavior: 'instant'
    };

    this.imageDiv.scrollBy(scrollOptions);
  }

  imagePinchEnd() {
    this._touch = null;
  }

  doubleTapHandler(event) {
    if (!event.touches || event.touches.length > 1) {
      return;
    }
    // console.log('doubleTab');

    if (!this.tapped) {
      this.tapped = {
        x: event.pageX,
        y: event.pageY
      };

      this.tapTimeoutId = window.setTimeout(() => {
        this.tapped = null;
      }, 300);

      return;
    }

    const deltaX = event.pageX - this.tapped.x;
    const deltaY = event.pageY - this.tapped.y;

    if (deltaX > 20 || deltaY > 20) {
      return;
    }

    if (this.imageElem.classList.contains('nfw-zoom-in')) {
      this.imageElem.style.width = null;
      this.zoomOut();

      return;
    }

    this.imageElem.style.width = `${this.imageElem.getAttribute('data-max-width')}px`;
    this.zoomIn(event);

    const pos = this.estimatedScrollPosition(event);
    const scrollOptions = {
      top: pos.y,
      left: pos.x,
      behavior: 'instant'

    };
    this.imageDiv.scrollTo(scrollOptions);
  }
}

export default Img;
