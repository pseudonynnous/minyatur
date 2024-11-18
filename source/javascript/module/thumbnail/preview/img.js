class Img {
  static image(sliderItem) {
    const thumbnailListItem = document.createElement('li');

    const thumbnailListItemContent = document.createElement('img');
    thumbnailListItemContent.src = sliderItem.element.src;

    thumbnailListItem.appendChild(thumbnailListItemContent);

    return thumbnailListItem;
  }

  static dot() {
    const thumbnailListItem = document.createElement('li');

    return thumbnailListItem;
  }
}

export default Img;
