class Div {
  constructor(sliderInstance, mainWrapper) {
    this.sliderInstance = sliderInstance;
    this.mainWrapper = mainWrapper;
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

    const activeSliderItem = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex].firstElementChild;
    const elementClone = activeSliderItem.cloneNode(true);

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

export default Div;
