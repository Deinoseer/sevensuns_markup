import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.min';

$.widget('sevensuns.swiperSlider', {
  // eslint-disable-next-line no-underscore-dangle
  _create() {
    this.initCache();
    this.initEvents();
    this.initPlugin();
  },

  initCache() {
    this.sliderContainer = this.element.find('.js-slider');
    this.sliderNext = this.element.find('.js-slider-next');
    this.sliderPrev = this.element.find('.js-slider-prev');
    this.sliderSlides = this.sliderContainer.attr('data-slides') ? this.sliderContainer.attr('data-slides') : 3;
    this.sliderSpace = this.sliderContainer.attr('data-space') ? this.sliderContainer.attr('data-space') : 30;
    this.sliderCentered = this.sliderContainer.attr('data-center');
    this.slideInit = this.sliderContainer.attr('data-first-slide') ? this.sliderContainer.attr('data-first-slide') : 0;
    this.teamSlider = this.sliderContainer.attr('data-team');
  },

  initEvents() {},

  initPlugin() {
    const swiperOptions = {
      slidesPerView: Number(this.sliderSlides),
      spaceBetween: Number(this.sliderSpace),
      initialSlide: Number(this.slideInit),
      centeredSlides: this.sliderCentered,
      navigation: {
        nextEl: this.sliderNext,
        prevEl: this.sliderPrev,
      },
    };
    if (this.teamSlider) {
      swiperOptions.width = 1800;
      swiperOptions.slidesOffsetBefore = 55;
    }
    // eslint-disable-next-line no-unused-vars
    const swiperSliderEvent = new Swiper(this.sliderContainer, swiperOptions);
  },
});
