/* eslint-disable */
export default function () {
  return {
    classHandler: (field) => {
      if (field.$element.attr('required')) {
        return field.$element.closest('.field');
      }
    },
    errorsContainer: (field) => {
      return field.$element.closest('.field');
    },
    errorsWrapper: '<div class="message message_error field__message text text_xs-small">',
    errorTemplate: '<div></div>',
  };
}
/* eslint-enable */
