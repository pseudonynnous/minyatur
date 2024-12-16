class Mouse {
  constructor(sliderInstance) {
    this.sliderInstance = sliderInstance;

    // Mouse Drag Handle
    this._mouseDown = this.mouseDown.bind(this);
    this.sliderInstance.boardList.addEventListener('mousedown', this._mouseDown);

    this._mouseStop = this.mouseStop.bind(this);
    this.sliderInstance.boardList.addEventListener('mouseup', this._mouseStop);
    this.sliderInstance.boardList.addEventListener('mouseleave', this._mouseStop);

    this._mouseMove = this.mouseMove.bind(this);
    this.sliderInstance.boardList.addEventListener('mousemove', this._mouseMove);
  }

  mouseDown(event) {
    event.preventDefault();

    if (this.mouseStopTimeOut) {
      window.clearTimeout(this.mouseStopTimeOut);
    }

    if (this.sliderInstance.boardListOnShift) {
      return;
    }

    this.sliderInstance.boardListOnShift = true;

    this.sliderInstance.boardList.style.scrollSnapType = 'none';
    this.sliderInstance.boardList.style.overflowX = 'hidden';

    this.mouseStartPageX = event.pageX;
    this.mouseStartScrollLeftX = this.sliderInstance.boardList.scrollLeft;
    this.mouseChangeRatio = this.sliderInstance.boardList.firstElementChild.offsetWidth / 5;
    this.isMouseDown = true;
  }

  mouseMove(event) {
    event.preventDefault();

    if (!this.isMouseDown) {
      return;
    }

    // console.log('mouseMove');

    // Move vertcally
    const deltaX = this.mouseStartScrollLeftX - (event.pageX - this.mouseStartPageX);

    if (deltaX <= 0) {
      return;
    }

    const scrollOptions = {
      left: deltaX,
      top: 0,
      behavior: 'instant'
    };

    // console.log(this.isMouseDown);
    // console.log(scrollOptions.left);

    this.sliderInstance.boardList.scrollTo(scrollOptions);
  }

  mouseStop(event) {
    event.preventDefault();

    this.sliderInstance.boardListOnShift = null;

    if (!this.isMouseDown) {
      return;
    }

    // console.log('mouseStop');

    // console.log(this.mouseStartScrollLeftX);
    // console.log(this.sliderInstance.boardList.scrollLeft);

    const totalDeltaX = this.mouseStartScrollLeftX - this.sliderInstance.boardList.scrollLeft;
    const change = this.mouseChangeRatio < Math.abs(totalDeltaX);

    this.isMouseDown = null;
    this.mouseStartPageX = null;
    this.mouseStartScrollLeftX = null;
    this.sliderInstance.boardList.style.overflowX = null;

    if (totalDeltaX > 0 && change) {
      this.sliderInstance.insertItem(this.sliderInstance.activeIndex - 1, { source: 'mouseStop' });
    }

    if (totalDeltaX < 0 && change) {
      this.sliderInstance.insertItem(this.sliderInstance.activeIndex + 1, { source: 'mouseStop' });
    }

    if (!change) {
      this.sliderInstance.insertItem(this.sliderInstance.activeIndex, { source: 'mouseStop' });
    }

    this.mouseStopTimeOut = window.setTimeout(() => {
      this.sliderInstance.boardList.style.scrollSnapType = null;
    }, 600);
  }
}

export default Mouse;
