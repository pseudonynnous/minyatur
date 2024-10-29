/* <i data-src="<?php echo $src_slider_placeholder ?>" data-message="Buraya Mesaj Gelicek"></i> */
const config = {
  id: null, // Slider container id.
  aspectRatio: '2:1', // width:height,
  maxWidth: null, // If this value is null, slider tries expanded as much as parent width.
  maxHeight: null, // Eğer bu değer boşsa slider yüksekliği aspectRatio'da belirtilen değer doğrultusunda genişlikle orantılı olarak büyümeye devam eder.
  contentWidthLimit: '1250px', // If this value provided, buttons and messages container width is limited according to this property.
  objectFit: 'scale-down', // Its same as css `object-fit` property. Specify how an <img> should be positioned within its container.
  fullScreen: true,
  transitionSpeed: 1000,
  infinityAction: false,
  startSlideIndex: 0,
  touchChangeCoefficient: 15,
  module: {
    'thumbnail/slider': {
      id: 'thumbnail-example',
      type: 'slider',
      transitionSpeed: 100
    },
    fullscreen: true,
    control: {}
    /* zoom: {
      zoomResultId: 'zoom-container',
      expandedZoom: true
    } */
  }
};

export default config;
