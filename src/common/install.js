import Monaco from '../components/MonacoEditor'

export default {
  install: function (Vue, options) {
    Vue.component('monaco', Monaco)
  }
}

