import Vue from 'vue'

Vue.filter('formatNum', function(value, num = 2) {
  return Number(value / 10000).toFixed(num) + '万'
})
