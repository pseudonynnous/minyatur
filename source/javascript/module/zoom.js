import _config from '../config';

class Zoom {
  constructor(sliderInstance, configUser) {
    this.sliderInstance = sliderInstance;
    this.configObject = { ..._config.module.zoom };

    Object.keys(this.configObject).forEach(key => {
      if (Object.hasOwn(configUser, key)) {
        this.configObject[key] = configUser[key];
      }
    });

    this.container = document.createElement('div');
    this.container.classList.add('minyatur-zoom-container');

    this.resultContainer = document.createElement('div');
    this.resultContainer.classList.add('minyatur-zoom-result');

    this.lens = document.createElement('div');
    this.lens.classList.add('minyatur-zoom-lens');
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

    // Calculate the ratio between result DIV and lens:
    this.cx = this.resultContainer.offsetWidth / this.lens.offsetWidth;
    this.cy = this.resultContainer.offsetHeight / this.lens.offsetHeight;

    // Set background properties for the result DIV
    this.resultContainer.style.backgroundSize = `${this.getRenderedSize().width * this.cx}px ${this.getRenderedSize().height * this.cy}px`;

    // Execute a function when someone moves the cursor over the image, or the lens:
    this._moveLens = this.moveLens.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('mousemove', this._moveLens);
  }

  zoomOut() {
    this.eventAdded = null;

    this.sliderInstance.boardWrapper.removeEventListener('mousemove', this._moveLens);

    this.lens.style = null;
    this.resultContainer.style = null;
  }

  moveLens(e) {
    let x;
    let y;
    const correctionX = (this.sliderInstance.boardWrapper.offsetWidth - this.getRenderedSize().width) / 2;
    const correctionY = (this.sliderInstance.boardWrapper.offsetHeight - this.getRenderedSize().height) / 2;

    this.configObject.expandedZoom = true;
    if (this.configObject.expandedZoom === true) {
      // correctionX = 0;
      // correctionY = 0;
    }

    // Prevent any other actions that may occur when moving over the image
    e.preventDefault();

    // Get the cursor's x and y positions:
    const pos = this.getCursorPos(e);

    // Calculate the position of the lens:
    x = pos.x - (this.lens.offsetWidth / 2);
    y = pos.y - (this.lens.offsetHeight / 2);

    // Prevent the lens from being positioned outside the image:
    if (x > this.sliderInstance.boardWrapper.offsetWidth - this.lens.offsetWidth - correctionX) {
      x = this.sliderInstance.boardWrapper.offsetWidth - this.lens.offsetWidth - correctionX;
    }
    if (x < correctionX) {
      x = correctionX;
    }

    if (y > this.sliderInstance.boardWrapper.offsetHeight - this.lens.offsetHeight - correctionY) {
      y = this.sliderInstance.boardWrapper.offsetHeight - this.lens.offsetHeight - correctionY;
    }
    if (y < correctionY) {
      y = correctionY;
    }

    // Set the position of the lens:
    this.lens.style.left = `${x}px`;
    this.lens.style.top = `${y}px`;

    // If image small than container, center the image also in result, because image centered at slider
    const xCentDif = (this.sliderInstance.boardWrapper.clientWidth - this.getRenderedSize().width) / 2 * this.cx;
    const yCentDif = (this.sliderInstance.boardWrapper.clientHeight - this.getRenderedSize().height) / 2 * this.cy;

    // Display what the lens "sees":
    this.resultContainer.style.backgroundPosition = `${xCentDif - (x * this.cx)}px ${yCentDif - (y * this.cy)}px`;

    this.resultContainer.style.visibility = 'visible';
    this.lens.style.visibility = 'visible';
  }

  getCursorPos(e) {
    let x = 0;
    let y = 0;

    e = e || window.event;

    // Get the x and y positions of the image:
    const a = this.sliderInstance.boardWrapper.getBoundingClientRect();

    // Calculate the cursor's x and y coordinates, relative to the image:
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    // Consider any page scrolling:
    x = x - window.scrollX;
    y = y - window.scrollY;

    return { x, y };
  }

  getRenderedSize() {
    const imageObjectFit = this.activeImage.style.objectFit;

    const naturalRatio = this.activeImage.naturalWidth / this.activeImage.naturalHeight;
    const visibleRatio = this.activeImage.width / this.activeImage.height;

    const size = {};

    if (imageObjectFit === 'none') {
      size.width = window.Math.min(this.activeImage.naturalWidth, this.activeImage.width);
      size.height = window.Math.min(this.activeImage.naturalHeight, this.activeImage.height);
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
    document.body.appendChild(this.resultContainer);
    this.resultContainer.style.backgroundImage = `url(${this.activeImage.src})`;

    const sliderRect = this.sliderInstance.boardWrapper.getBoundingClientRect();
    const spaceWidthAtRightOfSliderContainer = document.body.clientWidth - sliderRect.left - sliderRect.width;
    // const spaceWidthAtLeftOfSliderContainer = document.body.clientWidth - sliderRect.left;

    this.resultContainer.style.top = `${sliderRect.top + window.scrollY}px`;
    this.resultContainer.style.left = `${sliderRect.left + window.scrollX + sliderRect.width + 10}px`;
    this.resultContainer.style.width = `${spaceWidthAtRightOfSliderContainer - 10}px`;
    this.resultContainer.style.height = `${sliderRect.height}px`;
  }

  sizingLens() {
    const lensWidth = this.getRenderedSize().width / this.activeImage.naturalWidth * this.resultContainer.offsetWidth;
    const lensHeight = this.getRenderedSize().height / this.activeImage.naturalHeight * this.resultContainer.offsetHeight;

    this.lens.style.width = `${lensWidth}px`;
    this.lens.style.height = `${lensHeight}px`;
  }
}

export default Zoom;
