import $ from 'jquery';
import progress from 'progressbar.js/dist/progressbar.min';

$.widget('sevensun.progress', {
  // eslint-disable-next-line no-underscore-dangle
  _create() {
    this.initCache();
    this.initEvents();
    this.initPlugin();
  },

  initCache() {
    this.progressContainer = this.element.find('.js-progress');
    this.progressValue = this.progressContainer.attr('data-value');
    this.progressValueMax = this.progressContainer.attr('data-max');
    this.progressColor = this.progressContainer.attr('data-color');
    this.progressGradient = this.progressContainer.attr('data-gradient');
    this.progressText = this.progressContainer.attr('data-text');
    this.progressValueContainer = this.element.find('.js-progress__value');
  },

  initEvents() {},

  initPlugin() {
    this.initCircleProgress(
      this.progressContainer,
      this.progressValueMax,
      this.progressValue,
      this.progressColor,
      this.progressGradient,
      this.progressText,
      this.progressValueContainer,
    );
  },

  /**
   * Init progress
   */
  initCircleProgress(container, maxValue, curValue, chartColor, gradient, text, textContainer) {
    /* eslint-disable */

    function isIE(userAgent) {
      userAgent = userAgent || navigator.userAgent;
      return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
    }

    let linearGradient = '<defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse"><stop offset="30%" stop-color="#a318c9"/><stop offset="150%" stop-color="#2aa7df"/></linearGradient></defs>';
    const progressCircle = new progress.Circle(container[0], {
      color: gradient && !isIE() ? 'url(#gradient)': chartColor,
      trailWidth: 1,
      strokeWidth: 2,
      duration: 3000,
      easing: 'easeInOut',
      step: function (state, circle) {
        const value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + '% <span>' + text + '</span>');
          textContainer.text(text);
        }
        if (value === Math.round((curValue * 100) / maxValue)) {
          circle.stop();
        }
      },
    });
    if (gradient && !isIE()) {
      progressCircle.svg.insertAdjacentHTML('afterBegin', linearGradient);
    }
    progressCircle.text.style.fontFamily = '"TTNorms';
    progressCircle.text.style.fontSize = '37px';
    progressCircle.text.style.color = '#2c3539';
    progressCircle.animate(1);
  },
  /* eslint-enable */
});
