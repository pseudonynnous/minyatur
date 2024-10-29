import _config from '../config';

class Zoom {
  constructor(sliderInstance, configUser) {
    this.sliderInstance = sliderInstance;
    this.configObject = { ..._config.module.zoom };

    Object.keys(this.configObject).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(configUser, key)) {
        this.configObject[key] = configUser[key];
      }
    });

    this.container = document.createElement('div');
    this.container.classList.add('bgsl-zoom-container');

    this.result = document.createElement('div');
    this.result.classList.add('bgsl-zoom-result');

    this.lens = document.createElement('div');
    this.lens.classList.add('bgsl-zoom-lens');
    this.sliderInstance.boardWrapper.appendChild(this.lens);

    this._zoomIn = this.zoomIn.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('mouseover', this._zoomIn);

    this._zoomOut = this.zoomOut.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('mouseleave', this._zoomOut);
  }

  zoomIn(event) {
    // Find the free range of screen for insert result window.
    this.activeImageContainer = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex];
    this.activeImage = this.activeImageContainer.querySelector('img');

    if (this.activeImage.naturalWidth <= this.getRenderedSize().width && this.activeImage.naturalHeight <= this.getRenderedSize().height) {
      return;
    }

    if (this.eventAdded) {
      return;
    }

    this.eventAdded = true;

    this.sizingResult();
    this.sizingLens();

    /* Calculate the ratio between result DIV and lens: */
    this.cx = this.result.offsetWidth / this.lens.offsetWidth;
    this.cy = this.result.offsetHeight / this.lens.offsetHeight;

    /* Set background properties for the result DIV */
    this.result.style.backgroundSize = `${this.getRenderedSize().width * this.cx}px ${this.getRenderedSize().height * this.cy}px`;

    /* Execute a function when someone moves the cursor over the image, or the lens: */
    this._moveLens = this.moveLens.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('mousemove', this._moveLens);
  }

  zoomOut() {
    this.eventAdded = null;

    this.sliderInstance.boardWrapper.removeEventListener('mousemove', this._moveLens);

    this.lens.style = null;
    this.result.style = null;
  }

  moveLens(e) {
    let x;
    let y;
    let correctionX = (this.sliderInstance.boardWrapper.offsetWidth - this.getRenderedSize().width) / 2;
    let correctionY = (this.sliderInstance.boardWrapper.offsetHeight - this.getRenderedSize().height) / 2;

    console.log(this.configObject.expandedZoom);
    if (this.configObject.expandedZoom === true) {
      correctionX = 0;
      correctionY = 0;
    }

    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();

    /* Get the cursor's x and y positions: */
    const pos = this.getCursorPos(e);

    /* Calculate the position of the lens: */
    x = pos.x - (this.lens.offsetWidth / 2);
    y = pos.y - (this.lens.offsetHeight / 2);

    /* Prevent the lens from being positioned outside the image: */
    if (x > this.sliderInstance.boardWrapper.offsetWidth - this.lens.offsetWidth - correctionX) { x = this.sliderInstance.boardWrapper.offsetWidth - this.lens.offsetWidth - correctionX; }
    if (x < correctionX) { x = correctionX; }
    if (y > this.sliderInstance.boardWrapper.offsetHeight - this.lens.offsetHeight - correctionY) { y = this.sliderInstance.boardWrapper.offsetHeight - this.lens.offsetHeight - correctionY; }
    if (y < correctionY) { y = correctionY; }

    /* Set the position of the lens: */
    this.lens.style.left = x + 'px';
    this.lens.style.top = y + 'px';

    /* If image small than container, center the image also in result, because image centered at slider */
    const xCentDif = (this.sliderInstance.boardWrapper.clientWidth - this.getRenderedSize().width) / 2 * this.cx;
    const yCentDif = (this.sliderInstance.boardWrapper.clientHeight - this.getRenderedSize().height) / 2 * this.cy;

    /* Display what the lens "sees": */
    this.result.style.backgroundPosition = `${xCentDif - (x * this.cx)}px ${yCentDif - (y * this.cy)}px`;

    this.result.style.visibility = 'visible';
    this.lens.style.visibility = 'visible';
  }

  getCursorPos(e) {
    let x = 0;
    let y = 0;

    e = e || window.event;

    /* Get the x and y positions of the image: */
    const a = this.sliderInstance.boardWrapper.getBoundingClientRect();

    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return { x, y };
  }

  getRenderedSize() {
    const imageObjectFit = this.activeImage.style.objectFit;

    const naturalRatio = this.activeImage.naturalWidth / this.activeImage.naturalHeight;
    const visibleRatio = this.activeImage.width / this.activeImage.height;

    const size = {};

    if (imageObjectFit === 'none') {
      size.width = window.Math.min(this.activeImage.naturalWidth, this.activeImage.width);
      size.height = window.Math.min(this.activeImage.sourceHeight, this.activeImage.height);
    } else if (imageObjectFit === 'contain') {
      if (naturalRatio > visibleRatio) {
        size.width = this.activeImage.width;
        size.height = this.activeImage.width / naturalRatio;
      } else {
        size.height = this.activeImage.height;
        size.width = this.activeImage.height * naturalRatio;
      }
    } else if (imageObjectFit === 'scale-down') {
      if (naturalRatio > visibleRatio) {
        size.width = window.Math.min(this.activeImage.width, this.activeImage.naturalWidth);
        size.height = window.Math.min(this.activeImage.width, this.activeImage.naturalWidth) / naturalRatio;
      } else {
        size.width = window.Math.min(this.activeImage.height, this.activeImage.naturalHeight) * naturalRatio;
        size.height = window.Math.min(this.activeImage.height, this.activeImage.naturalHeight);
      }
    } else { // cover, fill, null etc.
      size.width = this.activeImage.width;
      size.height = this.activeImage.height;
    }

    return size;
  }

  sizingResult() {
    if (this.configObject.zoomResultId) {
      const zoomResultContainer = document.getElementById(this.configObject.zoomResultId);

      zoomResultContainer.appendChild(this.result);

      const resultWidth = Math.min(this.activeImage.naturalWidth, zoomResultContainer.offsetWidth);
      const resultHeight = Math.min(this.activeImage.naturalHeight, zoomResultContainer.offsetHeight);

      this.result.style.width = resultWidth + 'px';
      this.result.style.height = resultHeight + 'px';
    } else {
      this.activeImageContainer.appendChild(this.result);
    }

    this.result.style.backgroundImage = `url(${this.activeImage.src})`;
  }

  sizingLens() {
    const lensWidth = this.getRenderedSize().width / this.activeImage.naturalWidth * this.result.offsetWidth;
    const lensHeight = this.getRenderedSize().height / this.activeImage.naturalHeight * this.result.offsetHeight;

    this.lens.style.width = lensWidth + 'px';
    this.lens.style.height = lensHeight + 'px';
  }
}

export default Zoom;
