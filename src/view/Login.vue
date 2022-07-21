<template>
    <!-- 登录页面 -->
    <div id="Login">
        <h1>登录</h1>
        <div class="user_form">
            <h3>欢迎使用Ableton music</h3>
            <div class="input_box">
                <input type="text" placeholder="账号(手机号)" v-model="phone">
                <input type="password" placeholder="密码" v-model="password">
            </div>
            <span>注册账号</span>
        </div>
        <div class="btn_box" @click="sendingUserInfo">
            <i class="iconfont icon-kaixin"></i>
        </div>
        <div class="bottom_box">
            <input type="checkbox" name="" id="">
            <span>我以阅读并同意<a>《用户协议》</a></span>
        </div>
    </div>
</template>

<script>
// // 引入 vuex 辅助函数
// import { mapState } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            phone: '',   //用户名
            password: '',   //密码
        }
    },
    computed: {
        userData() {
            return this.$store.state.Login.profile;
        }
    },
    watch: {
        userData: {
            handler(newVal, oldVal) {
                // 数据发生变化，就代表登录成功，就跳转到用户页面
                this.$router.push({ name: 'user', });
            }
        }
    },
    methods: {
        // 发送 手机号 密码  给服务器  进行登录操作
        sendingUserInfo() {
            // 派发actions
            this.$store.dispatch('loginWYYMusic', { phone: this.phone, password: this.password })
        }
    },

}
</script>

<style scoped lang="less">
#Login {
    padding: 1vh 2vh;

    h1 {
        font-size: 9vh;
        font-weight: normal;
    }

    .user_form {
        width: 37vh;
        margin: 0 auto;
        margin-top: 9vh;

        h3 {
            font-size: 3vh;
            font-weight: normal;
        }

        .input_box {
            margin-top: 2vh;

            input {
                width: 37vh;
                height: 5vh;
                background-color: #ffffff;
                border-radius: 2.5vh;
                border: 1px solid #65bbf6;
                display: block;
                margin-bottom: 4vh;
                padding-left: 2vh;
                box-sizing: border-box;
                font-size: 2.5vh;
            }
        }

        span {
            float: right;
            font-size: 2.5vh;
            color: #656565;
        }
    }

    .btn_box {
        width: 11vh;
        height: 11vh;
        background-color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        margin-top: 13vh;


        i {
            color: #65bbf6;
            font-size: 9vh;
            border-radius: 50%;
        }
    }

    .bottom_box {
        position: absolute;
        bottom: 2vh;
        left: 22%;

        span {
            margin-left: 5px;

            a {
                color: #ff0042;
            }
        }
    }
}
</style>