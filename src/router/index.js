import Vue from 'vue';  //引入vue
import Router from 'vue-router';    //引入vue-router

import Home from '@/view/Home.vue';
import User from '@/view/User.vue';
import Login from '@/view/Login.vue';
import SongListPage from '@/view/SongListPage.vue';

// 解决vueRouter报错
const original = Router.prototype.push;
Router.prototype.push = function push(location) {
    return original.call(this, location).catch(err => err);
}

Vue.use(Router);    //全局挂在Router

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/user',
            name: 'user',
            component: User,
            // 需要缓存
            meta: { keepAlive: true },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            // 路由守卫  如果已经登录就不能打开login页面了
            beforeEnter(to, from, next) {
                // console.log(localStorage.getItem('COOKIES') != null);
                // 判断浏览器的COOKIES是否存储，如果不存在就是没有登录
                if (localStorage.getItem('COOKIES') != null) {
                    // 已经登录 COOKIES存在
                    alert("已经登录，不能再次登录")
                } else {
                    // 未登录
                    next();
                }
            },
        },
        {
            path: '/songlistpage',
            name: 'SongListPage',
            component: SongListPage,
            // 路由守卫，如果没有传id 就 不能跳转
            beforeEnter(to, from, next) {
                // 判断传入的query是否包含id
                if (to.query.id != undefined) {
                    // 包含有id
                    // 放行
                    next();
                } else {
                    // 不能跳转 呆在原来的页面
                    next(from);
                }
            },
        },
    ]
})