// import _config from '../config';

class Fullscreen {
  instances = new WeakMap();

  constructor(sliderInstance) {
    this.sliderInstance = sliderInstance;

    this._eventRouter = this.eventRouter.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('click', this._eventRouter);
  }

  async eventRouter() {
    this.activeSliderItem = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex].firstElementChild;

    try {
      const importModule = await import(`./fullscreen/${this.activeSliderItem.tagName.toLowerCase()}.js`);
      const ImportDefaultClass = importModule.default;

      if (!this.mainWrapper) {
        this.init();
      }

      if (!this.instances.has(ImportDefaultClass)) {
        this.instances.set(ImportDefaultClass, new ImportDefaultClass(this.sliderInstance, this.mainWrapper));
      }

      this.activeClassInstance = this.instances.get(ImportDefaultClass);

      this.show();
    } catch (error) {
      // console.log(error);
    }
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
    this.closeButton.innerHTML = '<i class="fa-solid fa-xmark fa-2x"></i>';
    this.closeButton.addEventListener('touchstart', this._hide, false);
    this.closeButton.addEventListener('click', this._hide, false);
    // this.closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i> ${this.language.get('close')}`;
    this.closeButtonContainer.appendChild(this.closeButton);

    document.body.appendChild(this.mainWrapper);
  }

  show() {
    this.mainWrapper.classList.remove('hidden');
    this.activeClassInstance.show();
  }

  hide() {
    this.mainWrapper.classList.add('hidden');
    this.activeClassInstance.hide();
  }
}

export default Fullscreen;
