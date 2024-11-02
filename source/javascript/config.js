const config = {
  id: '', // Target ID, this element must contain items for sliding.
  aspectRatio: '2:1', // width:height,
  maxWidth: null, // If this value is null, slider tries expanded as much as parent width.
  maxHeight: null, // If this value is empty, the slider height continues to grow proportionally to the width according to the value specified in "aspectRatio".
  contentWidthLimit: '1250px', // If this value provided, the width of the button container element is limited according to this property.
  objectFit: 'scale-down', // Its same as css `object-fit` property. Specify how an <img> should be positioned within its container.
  fullScreen: true, // Can it be made full screen?
  transitionSpeed: 1000, // Animation speed.
  infinityAction: false, // Infinity loop.
  startSlideIndex: 0, // The number of the image selected by default. The first image is number 1.
  touchChangeCoefficient: 15, // A feature that indicates that on touch screens, the image will switch to the next image the more it is scrolled.
  styleAutoload: true, // Default styles are added to <head> automatically. If you want to add your own css, this field must be false.
  languageCode: 'tr', // Language code
  module: {
    'thumbnail/slider': { // dot, basic, slider
      id: 'thumbnail-example', // Target ID, this element must contain items for sliding.
      // type: 'slider',
      transitionSpeed: 100
    },
    fullscreen: true,
    control: {}
  }
};

export default config;
