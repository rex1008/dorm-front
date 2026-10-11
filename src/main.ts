import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/common.css'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from './store/index.ts'

const app = createApp(App)
app.use(router)
// 全局注册所有 Element Plus 组件，任何组件的模板里都可以直接使用所有组件，而不需要import
app.use(ElementPlus, {
  size: "small",
  locale: zhCn
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.mount('#app')

// <!-- 自己的组件（驼峰格式，即PascalCase） -->
// <NavHeader />

// <!-- Element Plus 主组件（kebab-case格式，把它当作原生html标签来看待） -->
// <el-upload />
// <el-form />

// <!-- Element Plus 图标（PascalCase格式，图标是独立的库，且没有统一el前缀） -->
// <el-icon>
//   <Plus />
// </el-icon>
