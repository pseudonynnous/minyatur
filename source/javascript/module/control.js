class Control {
  constructor(sliderInstance) {
    this.sliderInstance = sliderInstance;

    this.buttonContainer = document.createElement('div');
    this.buttonContainer.classList.add('minyatur-board-button-container');
    this.sliderInstance.boardWrapper.appendChild(this.buttonContainer);

    if (this.sliderInstance.configObject.contentWidthLimit) {
      this.buttonContainer.style.maxWidth = this.sliderInstance.configObject.contentWidthLimit;
    }

    this.prevButton = document.createElement('div');
    this.prevButton.classList.add('minyatur-board-prev-button');
    this.buttonContainer.appendChild(this.prevButton);

    this.nextButton = document.createElement('div');
    this.nextButton.classList.add('minyatur-board-next-button');
    this.buttonContainer.appendChild(this.nextButton);

    this._prevItem = this.prevItem.bind(this);
    this.prevButton.addEventListener('click', this._prevItem);

    this._nextItem = this.nextItem.bind(this);
    this.nextButton.addEventListener('click', this._nextItem);
  }

  prevItem(event) {
    this.sliderInstance.prevItem();

    event.stopPropagation();
  }

  nextItem(event) {
    this.sliderInstance.nextItem();

    event.stopPropagation();
  }
}

export default Control;
