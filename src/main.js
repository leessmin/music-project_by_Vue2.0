import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入swiper的样式
import '../node_modules/swiper/css/swiper.min.css';

// 导入mockjs模拟好的接口
import mockData from './mock/mock';

// 导入Vuex
import store from './store/store';

// 导入vue-router
import router from './router';



new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this;  //注册全局事件总线
    },
    store,  //注册Vuex
    router, //注册router
    render: h => h(App),
}).$mount('#app')
