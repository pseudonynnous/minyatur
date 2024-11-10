// import _config from '../config';

class Fullscreen {
  tagClassMapper = new Map([
    ['img', FullscreenImage],
    ['div', FullscreenDiv]
  ]);

  constructor(sliderInstance) {
    this.sliderInstance = sliderInstance;

    this._eventRouter = this.eventRouter.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('click', this._eventRouter);
  }

  eventRouter() {
    this.activeContentElement = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex].firstElementChild;

    if (!this.tagClassMapper.has(this.activeContentElement.tagName.toLowerCase())) {
      return;
    }

    if (!this.mainWrapper) {
      this.init();
    }

    this.show();
  }

  init() {
    this.containerId = 'id-' + Math.floor((1 + Math.random()) * 0x10 ** 10).toString(16).substring(1);

    this.mainWrapper = document.createElement('div');
    this.mainWrapper.id = this.containerId;
    this.mainWrapper.classList.add('minyatur-fullscreen-wrapper');

    this.mainWrapper.addEventListener('dblclick', event => event.preventDefault());
    this.mainWrapper.addEventListener('click', event => event.preventDefault());
    this.mainWrapper.addEventListener('touchstart', event => event.preventDefault());
    this.mainWrapper.addEventListener('touchmove', event => event.preventDefault());
    this.mainWrapper.addEventListener('touchend', event => event.preventDefault());

    this.closeButtonContainer = document.createElement('div');
    this.closeButtonContainer.classList.add('mfw-close-button-container');

    this.mainWrapper.appendChild(this.closeButtonContainer);

    this._hide = this.hide.bind(this);

    this.closeButton = document.createElement('button');
    this.closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i> ${this.sliderInstance.language.get('close')}`;
    this.closeButton.addEventListener('touchstart', this._hide, false);
    this.closeButton.addEventListener('click', this._hide, false);
    // this.closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i> ${this.language.get('close')}`;
    this.closeButtonContainer.appendChild(this.closeButton);

    document.body.appendChild(this.mainWrapper);
  }

  show() {
    this.mainWrapper.classList.remove('hidden');
    this.tagClassMapper.get(this.activeContentElement.tagName.toLowerCase()).getInstance(this.sliderInstance, this.mainWrapper).show();
  }

  hide() {
    this.mainWrapper.classList.add('hidden');
    this.tagClassMapper.get(this.activeContentElement.tagName.toLowerCase()).getInstance(this.sliderInstance, this.mainWrapper).hide();
  }
}

class FullscreenDiv {
  _instance = null;

  constructor(sliderInstance, mainWrapper) {
    this.sliderInstance = sliderInstance;
    this.mainWrapper = mainWrapper;
  }

  static getInstance(sliderInstance, mainWrapper) {
    if (!FullscreenDiv._instance) {
      FullscreenDiv._instance = new FullscreenDiv(sliderInstance, mainWrapper);
    }

    return FullscreenDiv._instance;
  }

  init() {
    // div wrapper
    this.divWrapper = document.createElement('div');
    this.divWrapper.classList.add('mfw-div-wrapper');

    // div container
    this.divContainer = document.createElement('div');
    this.divContainer.classList.add('mfw-div-container');

    this.divWrapper.appendChild(this.divContainer);

    // append to root
    this.mainWrapper.appendChild(this.divWrapper);
  }

  show() {
    if (this.divWrapper == null) {
      this.init();
    }

    while (this.divContainer.firstChild) {
      this.divContainer.removeChild(this.divContainer.lastChild);
    }

    const activeContentElement = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex].firstElementChild;
    const elementClone = activeContentElement.cloneNode(true);

    // aspect ratio from settings
    const ratioPercent = this.sliderInstance.configObject.aspectRatio.split(':');
    const calculatedHeight = Math.abs(100 / ratioPercent[0] * ratioPercent[1]);

    this.divContainer.style.paddingTop = `${calculatedHeight}%`;
    this.divContainer.appendChild(elementClone);

    this.divWrapper.classList.remove('hidden');
  }

  hide() {
    this.divWrapper.classList.add('hidden');
  }
}

class FullscreenImage {
  _instance = null;

  constructor(sliderInstance, mainWrapper) {
    this.sliderInstance = sliderInstance;
    this.mainWrapper = mainWrapper;
  }

  static getInstance(sliderInstance, mainWrapper) {
    if (!FullscreenImage._instance) {
      FullscreenImage._instance = new FullscreenImage(sliderInstance, mainWrapper);
    }

    return FullscreenImage._instance;
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

    const activeContentElement = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex].firstElementChild;

    this.imageElem.src = activeContentElement.src;
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

export default Fullscreen;
