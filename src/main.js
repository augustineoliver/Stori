import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
import jwt_decode from "jwt-decode";

Vue.config.productionTip = false
axios.interceptors.request.use(function (config) {
  config.headers.Authorization =  `Bearer ${localStorage.getItem('authToken')}`;
  if (localStorage.getItem('authToken')) {
    const token = localStorage.getItem('authToken');
    const decodedToken = jwt_decode(token);
    const expiryDate = new Date(decodedToken.exp * 1000)
    if (new Date() > expiryDate) {
      console.log('Session Expired: ', expiryDate);
      localStorage.clear();
      router.push({name: 'Login'}).then()
    }
  }

  return config;
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
