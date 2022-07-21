<template>
    <!-- 播放列表 -->
    <div id="PlayList">
        <div class="bottom">
            <div class="bottom-box">
                <div class="play-btn">
                    <i class="iconfont icon-zanting"></i>
                    <h3>播放全部</h3>
                </div>
                <ul>
                    <li v-for="(list, index) in songList" :key="list.id" @click.stop="playMusic(list.id)">
                        <h3>{{ index + 1 }}</h3>
                        <div>
                            <h5>{{ list.al.name }}</h5>
                            <h6><span v-for="(a, ind) in list.ar">{{ a.name }}<span
                                        v-if="list.ar.length != ind + 1">/</span></span></h6>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayList',
    props: ['songList'],
    methods: {
        // 点击后播放音乐顺便
        async playMusic(id) {

            try {
                // 派发action 获取音乐url
                await this.$store.dispatch('getMusicUrl', { id });



                // 全局事件总线  提示音乐播放器播放音乐
                this.$bus.$emit('promptPlayMusic', id);
            } catch (error) {
                console.error(error);
            }

        }
    }
}
</script>

<style scoped lang="less">
#PlayList {


    .bottom {
        width: 100%;
        height: auto;
        background-color: white;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;


        .bottom-box {
            width: 90%;
            height: auto;
            margin: 0 auto;
            background-color: white;
            border-top: 2px solid #e5e5e5;
            padding: 40px 0;


            .play-btn {
                display: flex;
                align-items: center;
                border-bottom: 2px solid #e5e5e5;


                i {
                    font-size: 5vh;
                }


                h3 {
                    font-size: 2.5vh;
                    font-weight: 500;
                }
            }


            ul {
                li {
                    display: flex;
                    align-items: center;
                    border-bottom: 2px solid #e5e5e5;
                    padding: 10px 0;


                    h3 {
                        width: 15%;
                        font-size: 1.5rem;
                        font-weight: 500;
                        text-align: center;
                        display: block;
                    }


                    div {
                        width: 80%;
                        margin-left: 10px;

                        h5 {
                            width: 100%;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            font-size: 1.1rem;
                            font-weight: 400;
                        }


                        h6 {
                            width: 100%;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            font-size: 0.825rem;
                            font-weight: 300;


                            span {
                                width: 100%;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                font-size: 0.825rem;
                                font-weight: 300;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>