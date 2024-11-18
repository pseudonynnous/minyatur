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

  show() {
  }

  hide() {
  }

  getInstance() {
    return this;
  }
}

export default Item;
