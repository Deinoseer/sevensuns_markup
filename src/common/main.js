import svg4everybody from 'svg4everybody';
// import Vue from 'vue';
// import VeeValidate from 'vee-validate';
// import header from '../section/composite/header/header.vue';
import 'array-from-polyfill';

import 'jquery-ui';
import '../js/core';
import '../js/template';

import '../js/polyfill.insertAdjacentHTML';
import '../blocks/base/page/page';
import '../blocks/composite/progress/progress';
import '../blocks/composite/swiper-slider/swiper-slider';

svg4everybody();

// Vue.config.productionTip = false;
//
// window.eventBus = new Vue();
//
// setInterval(() => {
//   window.initVue();
// }, 500);
//
// window.initVue = () => {
//   const appElements = Array.from(document.querySelectorAll('.vue-app:not(.vue-app-mounted)'));
//
//   for (const appElement of appElements) {
//     appElement.classList.add('vue-app-mounted');
//
//     Vue.use(VeeValidate);
//
//     new Vue({
//       el: appElement,
//       components: {
//         'header-widget': header,
//       },
//     });
//   }
// };
