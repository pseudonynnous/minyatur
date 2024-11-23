import Thumbnail from '../thumbnail.js';

class Snap extends Thumbnail {
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
    this._slideBackward = this.slideBackward.bind(this);
    this.thumbnailBackwardButton.addEventListener('click', this._slideBackward);

    this.thumbnailForwardButton = document.createElement('div');
    this.thumbnailForwardButton.classList.add('minyatur-thumbnail-slider-forward-button');
    this.thumbnailContainer.appendChild(this.thumbnailForwardButton);
    this._slideForward = this.slideForward.bind(this);
    this.thumbnailForwardButton.addEventListener('click', this._slideForward);

    this._resized = this.resized.bind(this);
    window.addEventListener('resize', this._resized);
    this.resized(0);

    return this;
  }

  resized(timing = 300) {
    if (this._resizeTimer != null) {
      window.clearTimeout(this._resizeTimer);
    }

    this._resizeTimer = window.setTimeout(() => {
      const minScrollBarWidth = this.thumbnailList.scrollWidth - this.thumbnailItems[0].offsetWidth * 0.5;

      console.log(this.sliderInstance.isTouch());

      if (minScrollBarWidth > this.thumbnailWrapper.offsetWidth && !this.sliderInstance.isTouch()) {
        this.thumbnailWrapper.classList.add('scrollOn');
      } else {
        this.thumbnailWrapper.classList.remove('scrollOn');
      }
    }, timing);
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

  slideBackward() {
    if (this.thumbnailList.scrollLeft < 1) {
      this.endMotion(`${this.thumbnailItems[0].offsetWidth / 2}px`);

      return;
    }

    const scrollDelta = -(this.thumbnailList.offsetWidth - this.thumbnailItems[0].offsetWidth);
    this.thumbnailList.scrollBy(scrollDelta, 0);
  }

  x;

  slideForward() {
    if ((this.thumbnailList.offsetWidth + this.thumbnailList.scrollLeft) >= this.thumbnailList.scrollWidth) {
      this.endMotion(`-${this.thumbnailItems[0].offsetWidth / 2}px`);

      return;
    }

    const scrollDelta = (this.thumbnailList.offsetWidth - this.thumbnailItems[0].offsetWidth);
    this.thumbnailList.scrollBy(scrollDelta, 0);
  }

  endMotion(positionWithPx) {
    if (this.thumbnailList.classList.contains('minyaturOnTransition')) {
      return;
    }

    this.thumbnailList.style.transition = 'all 150ms ease 50ms';
    this.thumbnailList.classList.add('minyaturOnTransition');

    window.setTimeout(() => {
      this.thumbnailList.style.transform = `translateX(${positionWithPx})`;
    }, 0);

    this.thumbnailList.addEventListener('transitionend', () => {
      this.thumbnailList.style.transform = 'translateX(0px)';

      this.thumbnailList.addEventListener('transitionend', () => {
        this.thumbnailList.style.transition = null;
        this.thumbnailList.style.transform = null;

        this.thumbnailList.classList.remove('minyaturOnTransition');
      }, { once: true });
    }, { once: true });
  }
}

export default Snap;
