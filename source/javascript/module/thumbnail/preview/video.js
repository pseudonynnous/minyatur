class Video {
  static image(sliderItem) {
    const thumbnailListItem = document.createElement('li');

    const thumbnailListItemContent = document.createElement('img');

    sliderItem.element.addEventListener('loadeddata', function() {
      const canvas = document.createElement('canvas');

      const thumbnailVideoRatioDiver = Math.max(sliderItem.element.videoWidth / thumbnailListItem.offsetWidth, sliderItem.element.videoHeight / thumbnailListItem.offsetHeight);

      canvas.width = sliderItem.element.videoWidth / thumbnailVideoRatioDiver;
      canvas.height = sliderItem.element.videoHeight / thumbnailVideoRatioDiver;

      const ctx = canvas.getContext('2d');
      // ctx.filter = 'sepia(100%)';

      this.__canplayFunc = () => {
        if (!this.__canplayCounter) {
          this.__canplayCounter = 0;
        }

        this.__canplayCounter++;

        this.currentTime = 0.1;

        ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        thumbnailListItemContent.src = canvas.toDataURL('image/webp');

        if (this.__canplayCounter > 2) {
          this.currentTime = 0;
          this.removeEventListener('canplay', this.__canplayFunc);

          delete this.__canplayCounter;
          delete this.__canplayFunc;
        }
      };

      sliderItem.element.addEventListener('canplay', sliderItem.element.__canplayFunc);
    }, { once: true });

    thumbnailListItem.appendChild(thumbnailListItemContent);

    return thumbnailListItem;
  }

  static dot() {
    const thumbnailListItem = document.createElement('li');

    return thumbnailListItem;
  }
}

export default Video;
