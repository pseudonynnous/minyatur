const config = {
  id: '', // Target ID, this element must contain items for sliding.
  aspectRatio: '2:1', // width:height,
  maxWidth: null, // If this value is null, slider tries expanded as much as parent width.
  maxHeight: null, // If this value is empty, the slider height continues to grow proportionally to the width according to the value specified in "aspectRatio".
  contentWidthLimit: '1250px', // If this value provided, the width of the button container element is limited according to this property.
  objectFit: 'scale-down', // Its same as css `object-fit` property. Specify how an <img> should be positioned within its container.
  loop: false, // Infinity loop.
  startIndex: 0, // The number of the image selected by default. The first image is number 1.
  styleAutoload: true, // Default styles are added to <head> automatically. If you want to add your own css, this field must be false.
  languageCode: 'tr', // Language code
  module: [
    'thumbnail/dot',
    'fullscreen',
    'control',
    'zoom'
  ]
};

export default config;
