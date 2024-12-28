import Item from '../core/item.js';

class Video extends Item {
  hide() {
    console.log('hide');
    this.element.pause();
  }
}

export default Video;
