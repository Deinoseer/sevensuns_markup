import $ from 'jquery';

export default function (src) {
  $.magnificPopup.open({
    items: {
      src,
      type: 'inline',
    },
    closeBtnInside: false,
    removalDelay: 500,
    mainClass: 'my-mfp-zoom-in',
  });
}
