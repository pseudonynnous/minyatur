import Thumbnail from '../thumbnail.js';

class Slider extends Thumbnail {
  constructor(sliderInstance, configUser) {
    super(sliderInstance, configUser, 'thumbnail/slider');

    this.thumbnailWrapper.classList.add('minyatur-thumbnail-snap');

    this.thumbnailContainer = document.createElement('div');
    // this.thumbnailContainer.style.overflow = 'hidden';
    this.thumbnailWrapper.appendChild(this.thumbnailContainer);

    this.thumbnailList = document.createElement('ul');
    this.thumbnailContainer.appendChild(this.thumbnailList);

    this.thumbnailItems = this.thumbnailList.children;

    this.previewGenerator('image');

    this.thumbnailBackwardButton = document.createElement('div');
    this.thumbnailBackwardButton.classList.add('minyatur-thumbnail-slider-backward-button');
    this.thumbnailContainer.appendChild(this.thumbnailBackwardButton);
    this._slidePrev = this.slidePrev.bind(this);
    this.thumbnailBackwardButton.addEventListener('click', this._slidePrev);

    this.thumbnailForwardButton = document.createElement('div');
    this.thumbnailForwardButton.classList.add('minyatur-thumbnail-slider-forward-button');
    this.thumbnailContainer.appendChild(this.thumbnailForwardButton);
    this._slideNext = this.slideNext.bind(this);
    this.thumbnailForwardButton.addEventListener('click', this._slideNext);

    return this;
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

    // Right Scroll
    const containerScrollLeftToRightEdge = this.thumbnailList.clientWidth + this.thumbnailList.scrollLeft;
    // *1.5 for: if he has a sibling next to him, let him appear.
    const itemRightFromParentLeftWithHalfSibling = this.thumbnailItems[index].offsetLeft + this.thumbnailItems[index].offsetWidth * 1.7;

    if (itemRightFromParentLeftWithHalfSibling > containerScrollLeftToRightEdge) {
      // the right edge of the item aligns with the right edge of the container
      const scrollDelta = itemRightFromParentLeftWithHalfSibling - containerScrollLeftToRightEdge;

      this.thumbnailList.scrollBy(scrollDelta, 0);
    }

    // Left Scroll
    // *0.5 for: if he has a sibling next to him, let him appear.
    const containerScrollLeftWithHalfSibling = this.thumbnailList.scrollLeft + this.thumbnailItems[index].offsetWidth * 0.7;

    if (containerScrollLeftWithHalfSibling > this.thumbnailItems[index].offsetLeft) {
      // the left edge of the item aligns with the left edge of the container
      const scrollDelta = this.thumbnailItems[index].offsetLeft - containerScrollLeftWithHalfSibling;

      this.thumbnailList.scrollBy(scrollDelta, 0);
    }
  }

  slidePrev() {
    if (this.thumbnailList.scrollLeft < 1) {
      this.prevEndMotion();

      return;
    }

    const scrollDelta = -(this.thumbnailList.offsetWidth - this.thumbnailItems[0].offsetWidth);
    this.thumbnailList.scrollBy(scrollDelta, 0);
  }

  x;

  slideNext() {
    if ((this.thumbnailList.offsetWidth + this.thumbnailList.scrollLeft) >= this.thumbnailList.scrollWidth) {
      this.nextEndMotion();

      return;
    }

    const scrollDelta = (this.thumbnailList.offsetWidth - this.thumbnailItems[0].offsetWidth);
    this.thumbnailList.scrollBy(scrollDelta, 0);
  }

  prevEndMotion() {
    this.endMotion('5vw');
  }

  nextEndMotion() {
    this.endMotion('-5vw');
  }

  endMotion(positionWithPx) {
    if (this.animating != null) {
      return;
    }

    this.thumbnailList.style.transition = 'all 150ms ease 50ms';
    this.animating = true;

    window.setTimeout(() => {
      this.thumbnailList.style.transform = `translateX(${positionWithPx})`;
    }, 0);

    this.thumbnailList.addEventListener('transitionend', () => {
      this.thumbnailList.style.transform = 'translateX(0px)';

      this.thumbnailList.addEventListener('transitionend', () => {
        this.thumbnailList.style.transition = null;
        this.thumbnailList.style.transform = null;

        this.animating = null;
      }, { once: true });
    }, { once: true });
  }
}

export default Slider;
