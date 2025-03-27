import * as pdfjsLib from 'pdfjs-dist';
// import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.0.375/build/pdf.worker.mjs';

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

import App from './App.vue'
import './uni.promisify.adaptor'

// #ifndef VUE3
import Vue from 'vue'

import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif
 // #ifdef H5
    console.log('H5~~~~~');
    // #endif
// #ifdef VUE3
import { createSSRApp } from 'vue'
import uviewPlus from '@/uni_modules/uview-plus'

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  return {
    app
  }
}
// #endif