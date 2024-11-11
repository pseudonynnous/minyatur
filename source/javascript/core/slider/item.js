class Item {
  constructor(sliderInstance) {
    this.sliderInstance = sliderInstance;
  }

  setElement(element) {
    this.element = element;
  }

  getElement() {
    return this.element;
  }

  shown() {
  }

  hidden() {
  }

  getInstance() {
    return this;
  }
}

export default Item;
