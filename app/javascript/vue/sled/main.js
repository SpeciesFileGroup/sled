import Vue from 'vue'
import vueResource from 'vue-resource'
import vueShortkey from 'vue-shortkey'

var SLED = SLED || {};
SLED.views = SLED.views || {};
SLED.views.sled_test = SLED.views.sled_test || {};
// SLED.views.tasks.collecting_events = SLED.views.tasks.collecting_events || {};
// SLED.views.tasks.collecting_events.search_locality = SLED.views.tasks.collecting_events.search_locality || {};

Object.assign(SLED.views.sled_test, {

  init: function () {
    Vue.use(vueResource)
    Vue.use(vueShortkey)

    //var store = require('./store/store.js').newStore()
    var App = require('./app.vue').default;
    var token = $('[name="csrf-token"]').attr('content');
    Vue.http.headers.common['X-CSRF-Token'] = token;

    new Vue({
      //store,
      el: '#sled_test',
      render: function (createElement) {
        return createElement(App);
      }
    })
  }
});

$(document).on('turbolinks:load', function () {
  if ($('#sled_test').length) {
    SLED.views.sled_test.init();
  }
});
