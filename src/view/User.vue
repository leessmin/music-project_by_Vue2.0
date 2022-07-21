<template>
    <!-- 个人中心页面 -->
    <div class="user">
        <div class="top" v-if="nickname == '请登录'">
            <div class="lf">
                <div class="header_img">
                    <img src="./images/logo1.png" alt="" width="100%">
                </div>
                <router-link :to="{ name: 'login' }">
                    <div class="user_name">
                        <h2>请登录</h2>
                    </div>
                </router-link>
            </div>
            <div class="lr">
                <div class="btn_move">
                    <i class="iconfont icon-gengduo"></i>
                </div>
            </div>
        </div>
        <div class="top" v-if="nickname != '请登录'">
            <div class="lf">
                <div class="header_img">
                    <img :src="avatarUrl" alt="" width="100%">
                </div>
                <div class="user_name">
                    <h2>{{ nickname }}</h2>
                </div>
            </div>
            <div class="lr">
                <div class="btn_move">
                    <i class="iconfont icon-gengduo"></i>
                </div>
            </div>
        </div>
        <UserNav></UserNav>
        <UserSongList :userId="userId"></UserSongList>

    </div>
</template>

<script>
import UserNav from '@/components/UserNav.vue';
import UserSongList from '@/components/UserSongList.vue';

export default {
    name: "User",
    components: { UserNav, UserSongList },
    computed: {
        // 用户头像
        avatarUrl() {
            return this.$store.getters.avatarUrl;
        },

        // 用户昵称
        nickname() {
            return this.$store.getters.nickname;
        },

        // 用户id
        userId() {
            return this.$store.getters.userId;
        }
    },
}
</script>

<style scoped lang="less">
a {
    color: black;
}

.user {
    overflow: hidden;

    .top {
        width: 100%;
        height: 12vh;
        // background-color: aqua;
        margin-top: 4vh;
        padding: 0px 2vh;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .lf {
            float: left;
            display: flex;

            .header_img {
                width: 12vh;
                height: 12vh;
                border-radius: 50%;
                overflow: hidden;
            }

            .user_name {
                display: inline-block;
                margin-left: 10px;
            }
        }


        .lr {
            float: right;

            .btn_move {
                width: 6vh;
                height: 2vh;
                background-color: #e0e0e0;
                border-radius: 1vh;
                text-align: center;
                line-height: 2vh;

                i {
                    font-size: 3rem;
                }
            }
        }

    }
}
</style>