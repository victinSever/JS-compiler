import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入进度条样式
import 'nprogress/nprogress.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)

//store
import store from '@/store';
app.use(store)

// router
import router from '@/router'
app.use(router)

app.mount('#app')
