<template>
    <!-- 个人中心的歌单列表 -->
    <div class="user_song_list">
        <div class="content_box">
            <ul>
                <li v-for="(list, index) in loveList" :key="list.id" @click="goPage(list.id)">
                    <div class="lf">
                        <img :src="list.coverImgUrl" alt="" width="100%">
                    </div>
                    <div class="rg">
                        <h3>{{ list.name }}</h3>
                        <span>{{ list.trackCount }}首歌</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserSongList',
    props: ['userId'],
    data() {
        return {
            isLove: 0,
        }
    },
    watch: {
        userId: {
            handler(newVal, oldVal) {
                // 派发action  获取用户歌单
                this.$store.dispatch('getPlaylist', { uid: newVal });
            }
        },
    },
    computed: {
        // 喜欢的歌单  或  收藏歌单列表
        loveList() {
            return this.$store.getters.loveList(this.isLove);
        }
    },
    methods: {
        // 点击后跳转到 歌单播放页
        goPage(id) {
            // 跳转至 歌单播放页   query：id:歌单列表的id
            this.$router.push({ name: 'SongListPage',query:{id} });
        },
    },
    mounted() {
        // 绑定全局事件总线 接收当前是喜欢还是收藏
        this.$bus.$on('isLove', (value) => {
            this.isLove = value;
        })
    }
}
</script>

<style scoped lang="less">
.user_song_list {
    margin: 0 auto;
    width: 42vh;
    height: 55vh;
    overflow: auto;
    border-radius: 2vh;
    background-color: #ffffff;

    .content_box {
        width: 42vh;
        height: auto;


        ul {


            li {
                margin: 0 auto;
                width: 92%;
                height: 10vh;
                // background-color: aqua;
                border-bottom: 2px solid #e5e5e5;
                display: flex;
                align-items: center;


                .lf {
                    width: 7vh;
                    height: 7vh;
                    border-radius: 1vh;
                    overflow: hidden;
                }


                .rg {
                    height: 7vh;
                    margin-left: 1vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    h3 {
                        font-size: 2vh;
                        width: 250px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    span {
                        font-size: 1vh;
                        color: #888888;
                    }
                }
            }
        }
    }
}


// 隐藏滚动条
.user_song_list::-webkit-scrollbar {
    display: none;
}
</style>