import _config from '../../config';

class Thumbnail {
  constructor(sliderInstance, configUser, path) {
    this.sliderInstance = sliderInstance;
    this.activeIndex = null;

    this.loadConfig(configUser, path);

    if (this.configObject.id && document.getElementById(this.configObject.id)) {
      this.thumbnailWrapper = document.getElementById(this.configObject.id);

      while (this.thumbnailWrapper.firstChild) {
        this.thumbnailWrapper.removeChild(this.thumbnailWrapper.lastChild);
      }
    } else {
      this.thumbnailWrapper = document.createElement('div');
      this.sliderInstance.mainContainer.appendChild(this.thumbnailWrapper);
    }
  }

  loadConfig(configUser, path) {
    this.configObject = { ..._config.module[path] };

    Object.keys(this.configObject).forEach(key => {
      if (Object.hasOwn(configUser, key)) {
        this.configObject[key] = configUser[key];
      }
    });
  }

  append() {
    return true;
  }

  insertItem(index) {
    if (index < 0) {
      index = 0;
    }

    if (index >= this.thumbnailItems.length) {
      index = this.thumbnailItems.length - 1;
    }

    if (this.activeIndex === index) {
      return;
    }

    [].forEach.call(this.thumbnailItems, item => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    if (this.thumbnailItems[index]) {
      this.activeIndex = index;
      this.thumbnailItems[index].classList.add('active');
    }
  }

  clickHandler(attachedElem, event) {
    const index = [].indexOf.call(this.thumbnailItems, attachedElem);

    if (index < 0) {
      return;
    }

    this.insertItem(index);
    this.sliderInstance.insertItem(index, { behavior: 'instant' });

    event.preventDefault();
    return false;
  }

  async previewGenerator(source) {
    // add slider items to thumbnail
    const sliderItems = [...this.sliderInstance.sliderItems.values()];

    for (const sliderItem of sliderItems) {
      try {
        const importModule = await import(`./preview/${sliderItem.element.tagName.toLowerCase()}.js`);
        const ImportModuleClass = importModule.default;

        const thumbnailListItem = ImportModuleClass[source](sliderItem);

        this._clickHandler = this.clickHandler.bind(this, thumbnailListItem);
        thumbnailListItem.addEventListener('click', this._clickHandler);

        this.thumbnailList.appendChild(thumbnailListItem);
      } catch (error) {
        console.warn('Some slider items preview not showing in thumbnail. Item without preview:', sliderItem.element);

        const thumbnailListItem = document.createElement('li');

        const thumbnailListItemContent = document.createElement('div');
        thumbnailListItemContent.classList.add('blank-item');
        thumbnailListItemContent.style.width = '100%';
        thumbnailListItemContent.style.height = '100%';

        thumbnailListItem.appendChild(thumbnailListItemContent);

        this.thumbnailList.appendChild(thumbnailListItem);
      }
    }
  }
}

export default Thumbnail;
