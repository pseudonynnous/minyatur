// import _config from '../config';

class Fullscreen {
  constructor(sliderInstance) {
    this.sliderInstance = sliderInstance;

    this._show = this.show.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('click', this._show);
  }

  insert() {
    this.containerId = 'id-' + Math.floor((1 + Math.random()) * 0x10 ** 10).toString(16).substring(1);

    this.wrapper = document.createElement('div');
    this.wrapper.id = this.containerId;
    this.wrapper.classList.add('minyatur-fullscreen-wrapper');
    this.wrapper.style = 'position: fixed; width: 100%; height: 100%; background-color: white; top: 0; left: 0; z-index: 9999';

    this.wrapper.addEventListener('dblclick', event => event.preventDefault());
    this.wrapper.addEventListener('click', event => event.preventDefault());
    this.wrapper.addEventListener('touchstart', event => event.preventDefault());
    this.wrapper.addEventListener('touchmove', event => event.preventDefault());
    this.wrapper.addEventListener('touchend', event => event.preventDefault());

    this.closeButtonContainer = document.createElement('div');
    this.closeButtonContainer.style = 'position: fixed; width: 96%; margin: 15px 4%;';
    this.wrapper.appendChild(this.closeButtonContainer);

    this._hide = this.hide.bind(this);
    this.closeButtonContainer.addEventListener('touchstart', this._hide, false);
    this.closeButtonContainer.addEventListener('click', this._hide, false);

    this.closeButton = document.createElement('button');
    this.closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i> Çıkış';
    // this.closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i> ${this.language.get('close')}`;
    this.closeButton.style = 'background-color: white; border: 1px solid #ccc; border-radius: 2px; padding: 7px 14px; font-size: 15px; font-weight: 600';
    this.closeButtonContainer.appendChild(this.closeButton);

    this.imageWrapper = document.createElement('div');
    this.imageWrapper.style = 'position: absolte; width: 100%; height: 100%; top: 0; left: 0; padding: 60px 4% 4% 4%; box-sizing: border-box';
    this.wrapper.appendChild(this.imageWrapper);

    this.imageContainer = document.createElement('div');
    this.imageContainer.style = 'position: relative; width: 100%; height: 100%; overflow: hidden; display: flex; align-items: center;';
    // this.wrapper.appendChild(this.imageContainer);
    this.imageWrapper.appendChild(this.imageContainer);

    this.imageDiv = document.createElement('div');
    this.imageDiv.style = 'margin: 0 auto; position: relative;';
    // this.wrapper.appendChild(this.imageContainer);
    this.imageContainer.appendChild(this.imageDiv);

    this.imageElem = document.createElement('img');
    this.imageElem.style = 'display: block; margin: 0 auto; max-width: 100%;';
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

    document.body.appendChild(this.wrapper);
  }

  show() {
    if (this.containerId == null) {
      this.insert();
    }

    const activeImage = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex].querySelector('img');

    this.imageElem.src = activeImage.src;
    this.imageElem.style.transform = null;

    this.scale = 1;
    this.positionX = 0;
    this.positionY = 0;

    window.document.getElementById(this.containerId).style.display = null;
  }

  hide(event) {
    window.document.getElementById(this.containerId).style.display = 'none';
  }

  zoomToggle(event) {
    this.imageElem.removeEventListener('mousemove', this._imageMouseMoveHandler);
    // document.getElementById('log-div').appendChild(document.createTextNode('first-dist: doubleclick\n\n'));

    if (this.scale == null || this.scale > 1) {
      this.scale = 1;
    } else {
      this.scale = 2;
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
