import $ from 'jquery';
import 'select2';

$.widget('sevensuns.page', {
  // eslint-disable-next-line no-underscore-dangle
  _create() {
    this.initCache();
    this.initEvents();
    this.initPlugin();
  },

  initCache() {},

  initEvents() {},

  initPlugin() {
    this.initCustomSelect();
    this.element.removeClass('load');
  },

  /**
   * Init custom select
   */
  initCustomSelect() {
    const $customSelect = this.element.find('.js-custom-select');

    $customSelect.each((i, el) => {
      const $select = $(el);
      const dataMinimumResultsForSearch = $select.data('minimum-results-for-search');
      const placeholder = $select.data('placeholder');
      const theme = $select.data('theme');

      if (!$select.hasClass('select2-hidden-accessible')) {
        $select.select2({
          placeholder: placeholder || '',
          theme: theme || 'default',
          minimumResultsForSearch: dataMinimumResultsForSearch || 'Infinity',
          width: '100%',
          selectionTitleAttribute: false,
          dropdownParent: $select.parent(),
        });

        const $rendered = $select.parent().find('.select2-selection__rendered');

        $rendered.removeAttr('title');

        $select.on('select2:select', () => {
          const $groupDescription = $select.parents('.field').find('.js-group-description');
          const $optionSelected = $select.find('option:selected');
          const dataGroupDescription = $optionSelected.data('group-description');

          if (dataGroupDescription !== null) {
            $groupDescription.text(dataGroupDescription);
          }

          $rendered.removeAttr('title');
        });
      }
    });
  },
});
