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

    // this.container = document.createElement('div');
    // this.container.classList.add('minyatur-zoom-container');

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
    if (this.eventAdded) {
      return;
    }

    // Find the free range of screen for insert result window.
    this.activeImageContainer = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex];
    this.activeImage = this.activeImageContainer.querySelector('img');

    if (!this.activeImage) {
      return;
    }

    if (this.activeImage.naturalWidth <= this.getRenderedSize().width && this.activeImage.naturalHeight <= this.getRenderedSize().height) {
      return;
    }

    this.eventAdded = true;

    this.sizingElements();

    // Execute a function when someone moves the cursor over the image, or the lens:
    this._moveLens = this.moveLens.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('mousemove', this._moveLens);
  }

  zoomOut(event = null) {
    this.eventAdded = null;

    this.sliderInstance.boardWrapper.removeEventListener('mousemove', this._moveLens);

    this.lens.style = null;
    this.resultContainer.style = null;
  }

  insertItem() {
    this.zoomOut();
  }

  moveLens(e) {
    // Prevent any other actions that may occur when moving over the image
    e.preventDefault();

    if (e.target !== this.lens && e.target !== this.activeImage && e.target !== this.activeImageContainer) {
      this.zoomOut();
    }

    const imageRelativeToBoardWrapperX = (this.sliderInstance.boardWrapper.offsetWidth - this.getRenderedSize().width) / 2;
    const imageRelativeToBoardWrapperY = (this.sliderInstance.boardWrapper.offsetHeight - this.getRenderedSize().height) / 2;

    this.configObject.expandedZoom = true;
    if (this.configObject.expandedZoom === true) {
      // imageRelativeToBoardWrapperX = 0;
      // imageRelativeToBoardWrapperY = 0;
    }

    // Get the cursor x and y positions:
    const pos = this.getCursorPositionRelativeToBoardWrapper(e);

    // Find center position of the lens:
    let x = pos.x - (this.lens.offsetWidth / 2);
    let y = pos.y - (this.lens.offsetHeight / 2);

    // Prevent the lens from being positioned outside the image:
    if (x > this.sliderInstance.boardWrapper.offsetWidth - this.lens.offsetWidth - imageRelativeToBoardWrapperX) {
      x = this.sliderInstance.boardWrapper.offsetWidth - this.lens.offsetWidth - imageRelativeToBoardWrapperX;
    }
    if (x < imageRelativeToBoardWrapperX) {
      x = imageRelativeToBoardWrapperX;
    }

    if (y > this.sliderInstance.boardWrapper.offsetHeight - this.lens.offsetHeight - imageRelativeToBoardWrapperY) {
      y = this.sliderInstance.boardWrapper.offsetHeight - this.lens.offsetHeight - imageRelativeToBoardWrapperY;
    }
    if (y < imageRelativeToBoardWrapperY) {
      y = imageRelativeToBoardWrapperY;
    }

    // Set the position of the lens:
    this.lens.style.left = `${x}px`;
    this.lens.style.top = `${y}px`;

    // If image small than container, center the image also in result, because image centered at slider
    const backgroundCenterAlignmentDistanceX = (this.sliderInstance.boardWrapper.offsetWidth - this.getRenderedSize().width) / 2 * this.containerLensRatioX;
    const backgroundCenterAlignmentDistanceY = (this.sliderInstance.boardWrapper.offsetHeight - this.getRenderedSize().height) / 2 * this.containerLensRatioY;

    // Display what the lens "sees":
    this.resultContainer.style.backgroundPosition = `${backgroundCenterAlignmentDistanceX - (x * this.containerLensRatioX)}px ${backgroundCenterAlignmentDistanceY - (y * this.containerLensRatioY)}px`;

    this.resultContainer.style.visibility = 'visible';
    this.lens.style.visibility = 'visible';
  }

  sizingElements() {
    document.body.appendChild(this.resultContainer);
    this.resultContainer.style.backgroundImage = `url(${this.activeImage.src})`;

    const sliderRect = this.sliderInstance.mainContainer.getBoundingClientRect();
    const padding = 10;

    let top, left, width, height;

    const spaceWidthAtLeftOfSliderContainer = sliderRect.left;
    height = document.documentElement.clientHeight - padding - sliderRect.top;
    width = spaceWidthAtLeftOfSliderContainer - (padding * 2);
    top = sliderRect.top + window.scrollY;
    left = sliderRect.left + sliderRect.width + window.scrollX + padding;

    const spaceWidthAtRightOfSliderContainer = document.documentElement.clientWidth - (sliderRect.left + sliderRect.width);
    if (spaceWidthAtRightOfSliderContainer > spaceWidthAtLeftOfSliderContainer) {
      height = document.documentElement.clientHeight - padding - sliderRect.top;
      width = spaceWidthAtRightOfSliderContainer - (padding * 2);
      top = sliderRect.top + window.scrollY;
      left = window.scrollX + padding;
    }

    const spaceHeightAtTopOfSliderContainer = sliderRect.top;
    if (spaceHeightAtTopOfSliderContainer > spaceWidthAtRightOfSliderContainer) {
      height = spaceHeightAtTopOfSliderContainer - (padding * 2);
      width = document.documentElement.clientWidth - padding - sliderRect.left;
      top = sliderRect.top + window.scrollY - height - padding;
      left = sliderRect.left + window.scrollX;
    }

    const spaceHeightAtBottomOfSliderContainer = document.documentElement.clientHeight - sliderRect.bottom;
    if (spaceHeightAtBottomOfSliderContainer > spaceHeightAtTopOfSliderContainer) {
      height = spaceHeightAtBottomOfSliderContainer - (padding * 2);
      width = document.documentElement.clientWidth - padding - sliderRect.left;
      top = sliderRect.bottom + window.scrollY + padding;
      left = sliderRect.left + window.scrollX;
    }

    const maxZoomFactor = 3;

    // set result container background dimensions
    this.backgroundWidth = this.activeImage.naturalWidth;
    this.backgroundHeight = this.activeImage.naturalHeight;

    if (this.backgroundWidth > width * maxZoomFactor) {
      this.backgroundWidth = width * maxZoomFactor;

      this.backgroundHeight = (width / this.activeImage.naturalWidth) * this.activeImage.naturalHeight * maxZoomFactor;
    }

    if (this.backgroundHeight > height * maxZoomFactor) {
      this.backgroundHeight = height * maxZoomFactor;

      this.backgroundWidth = (height / this.activeImage.naturalHeight) * this.activeImage.naturalWidth * maxZoomFactor;
    }

    // Set result container background properties
    this.resultContainer.style.backgroundSize = `${this.backgroundWidth}px ${this.backgroundHeight}px`;

    // Set Width
    if (width > this.backgroundWidth) {
      width = this.backgroundWidth;
    }

    if (height > this.backgroundHeight) {
      height = this.backgroundHeight;
    }

    this.resultContainer.style.top = `${top}px`;
    this.resultContainer.style.left = `${left}px`;
    this.resultContainer.style.width = `${width}px`;
    this.resultContainer.style.height = `${height}px`;

    // size lens element
    const lensWidth = this.getRenderedSize().width / this.backgroundWidth * this.resultContainer.offsetWidth;
    const lensHeight = this.getRenderedSize().height / this.backgroundHeight * this.resultContainer.offsetHeight;

    this.lens.style.width = `${lensWidth}px`;
    this.lens.style.height = `${lensHeight}px`;

    // Calculate the ratio between result DIV and lens:
    this.containerLensRatioX = this.resultContainer.offsetWidth / this.lens.offsetWidth;
    this.containerLensRatioY = this.resultContainer.offsetHeight / this.lens.offsetHeight;
  }

  getRenderedSize() {
    const naturalRatio = this.activeImage.naturalWidth / this.activeImage.naturalHeight;
    const visibleRatio = this.activeImage.width / this.activeImage.height;

    const size = {};

    // imageObjectFit === 'scale-down'
    if (naturalRatio > visibleRatio) {
      size.width = window.Math.min(this.activeImage.width, this.activeImage.naturalWidth);
      size.height = window.Math.min(this.activeImage.width, this.activeImage.naturalWidth) / naturalRatio;
    } else {
      size.width = window.Math.min(this.activeImage.height, this.activeImage.naturalHeight) * naturalRatio;
      size.height = window.Math.min(this.activeImage.height, this.activeImage.naturalHeight);
    }

    return size;
  }

  getCursorPositionRelativeToBoardWrapper(e) {
    let x = 0;
    let y = 0;

    e = e || window.event;

    // Get the x and y positions of the image:
    const a = this.sliderInstance.boardWrapper.getBoundingClientRect();

    // Calculate the cursor's x and y coordinates, relative to the boardWrapper:
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    // Consider any page scrolling:
    x = x - window.scrollX;
    y = y - window.scrollY;

    return { x, y };
  }
}

export default Zoom;
