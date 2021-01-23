import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
import axios from 'axios'
app.config.globalProperties.axios=axios
console.log(axios)
createApp(App).use(store).use(router).mount('#app')
