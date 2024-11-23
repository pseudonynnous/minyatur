import Thumbnail from '../thumbnail.js';

class Dot extends Thumbnail {
  constructor(sliderInstance, configUser) {
    super(sliderInstance, configUser, 'thumbnail/dot');

    this.thumbnailWrapper.classList.add('minyatur-thumbnail-dot');

    this.thumbnailList = document.createElement('ul');
    this.thumbnailWrapper.appendChild(this.thumbnailList);

    this.thumbnailItems = this.thumbnailList.children;

    this.previewGenerator('dot');

    return this;
  }
}

export default Dot;
