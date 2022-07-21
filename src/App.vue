<template>
    <!-- 最全的api接口文档 https://neteasecloudmusicapi.vercel.app/#/ -->
    <div id="app">
        <keep-alive include="User">
            <router-view></router-view>
        </keep-alive>
        <Footer :isNavShow="isNavShow" v-show="isFooter"></Footer>
        <!-- <Footer :isNavShow="false"></Footer> -->
    </div>
</template>

<script>
import Footer from './components/Footer.vue';



export default {
    name: "App",
    components: { Footer },
    data() {
        return {
            // 是否显示底部导航栏
            isNavShow: true,
            // 是否隐藏footer
            isFooter: true
        }
    },
    watch: {
        // 检测路由的变化
        '$route': {
            handler(newValue, oldValue) {
                // 如果当前路由地址是songlistpage则隐藏
                if (newValue.path == '/songlistpage') {
                    this.isNavShow = false;
                } else {
                    this.isNavShow = true;
                }

                // 如果地址是login则隐藏
                if (newValue.path == '/login') {
                    this.isFooter = false;
                } else {
                    this.isFooter = true;
                }
            }
        }
    },
    mounted() {
        // 用户打开网页时的首页
        this.$router.push({ name: "home", });
        // 派发action 获取用户账号登录状态
        this.$store.dispatch("getUserStatus");
    },

}
</script>

<style>
#app {
    width: 100%;
    height: 100%;
    position: relative;
}

* {
    margin: 0;
    padding: 0;
}

ul {
    list-style-type: none;
}

body {
    background-color: rgb(235, 235, 235);
    width: 100%;
    height: 100vh;
    /* overflow: hidden; */
}

html {
    width: 100%;
    height: 100vh;
    /* overflow: hidden; */
}
</style>