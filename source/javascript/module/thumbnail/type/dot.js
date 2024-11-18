import Thumbnail from '../thumbnail.js';

class Dot extends Thumbnail {
  constructor(sliderInstance, configUser) {
    super(sliderInstance, configUser, 'thumbnail/dot');

    this.thumbnailWrapper.classList.add('minyatur-thumbnail-dot');

    this.thumbnailList = document.createElement('ul');
    this.thumbnailWrapper.appendChild(this.thumbnailList);

    this.thumbnailItems = this.thumbnailList.children;

    this.previewGenerator();

    return this;
  }

  async previewGenerator() {
    // add slider items to thumbnail
    const sliderItems = [...this.sliderInstance.sliderItems.values()];

    for (const sliderItem of sliderItems) {
      try {
        const importModule = await import(`../preview/${sliderItem.element.tagName.toLowerCase()}.js`);
        const ImportModuleClass = importModule.default;

        const thumbnailListItem = ImportModuleClass.dot(sliderItem);

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

export default Dot;
