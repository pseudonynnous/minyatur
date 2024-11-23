import Thumbnail from '../thumbnail.js';

class Basic extends Thumbnail {
  constructor(sliderInstance, configUser) {
    super(sliderInstance, configUser, 'thumbnail/basic');

    this.thumbnailWrapper.classList.add('minyatur-thumbnail-basic');

    this.thumbnailList = document.createElement('ul');
    this.thumbnailList.positionX = 0;
    this.thumbnailWrapper.appendChild(this.thumbnailList);

    this.thumbnailItems = this.thumbnailList.children;

    this.previewGenerator('image');

    return this;
  }
}

export default Basic;
