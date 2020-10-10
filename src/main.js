import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from "axios";
import jwt_decode from "jwt-decode";

Vue.config.productionTip = false
axios.interceptors.request.use(function (config) {
  config.headers.Authorization =  localStorage.getItem('authToken');
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
// axios.defaults.headers.common.Authorization = localStorage.getItem('authToken');
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(axios.interceptors.request)
// Vue.http.interceptors.push((request, next) => {
//     console.log(request);
//     console.log(next);
//     // /**
//     //  * Here we will fecth the token from local storage and
//     //  * attach it (if exists) to the Authorization header on EVERY request.
//     //  */
//     // let token = window.localStorage.getItem('auth')
//     //
//     // if (token) {
//     //     request.headers = request.headers || {}
//     //     request.headers.Authorization = `Bearer ${token}`
//     // }
//     //
//     // /**
//     //  * Here is where we can refresh the token.
//     //  */
//     // next((response) => {
//     //     /**
//     //      * If we get a 401 response from the API means that we are Unauthorized to
//     //      * access the requested end point.
//     //      * This means that probably our token has expired and we need to get a new one.
//     //      */
//     //     if (response.status === 401) {
//     //         return Vue.http.get('http://api.dev/refresh-token').then((result) => {
//     //             // Save the new token on local storage
//     //             window.localStorage.setItem('token', result.data.token)
//     //
//     //             // Resend the failed request whatever it was (GET, POST, PATCH) and return its resposne
//     //             return Vue.http(request).then((response) => {
//     //                 return response
//     //             })
//     //         })
//     //         .catch(() => {
//     //             /**
//     //              * We weren't able to refresh the token so the best thing to do is
//     //              * logout the user (removing any user information from storage)
//     //              * and redirecting to login page
//     //              */
//     //             return router.go({name: 'login'})
//     //         })
//     //     }
//     // })
// })
