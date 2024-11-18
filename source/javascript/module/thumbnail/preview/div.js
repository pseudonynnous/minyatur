class Div {
  static image(sliderItem) {
    const thumbnailListItem = document.createElement('li');

    const thumbnailListItemContent = document.createElement('div');
    thumbnailListItemContent.style.width = '100%';
    thumbnailListItemContent.style.height = '100%';

    const itemContent = document.createElement('iframe');
    itemContent.style.width = '100%';
    itemContent.style.height = '100%';
    itemContent.style.border = 'none';
    itemContent.zIndex = '0';
    itemContent.srcdoc = `<html style="width: 100%; height: 100%; margin: 0; padding: 0; border: 0"><body style="width: 100%; height: 100%; margin: 0; padding: 0; border: 0">${sliderItem.element.outerHTML}</body></html>`;

    // iframes not fired javascript events so we will add fake event listener.
    const fakeEventListener = document.createElement('div');
    fakeEventListener.style.position = 'absolute';
    fakeEventListener.style.width = '100%';
    fakeEventListener.style.height = '100%';
    fakeEventListener.style.top = '0';
    fakeEventListener.style.left = '0';
    fakeEventListener.zIndex = '1';

    thumbnailListItemContent.appendChild(itemContent);
    thumbnailListItemContent.appendChild(fakeEventListener);

    thumbnailListItem.appendChild(thumbnailListItemContent);

    return thumbnailListItem;
  }

  static dot() {
    const thumbnailListItem = document.createElement('li');

    return thumbnailListItem;
  }
}

export default Div;
