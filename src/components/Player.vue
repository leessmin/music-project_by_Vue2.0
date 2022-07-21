<template>
    <!-- 播放器 -->
    <div id="player">
        <div class="left-box" v-if="JSON.stringify(songInfo) === '{}'">
            <div class="img-box">
                <img src="./images/1.jpg" alt="">
            </div>
            <div class="title-box">
                <h3>歌名</h3>
                <span>-</span>
                作者
            </div>
        </div>
        <div class="left-box" v-if="JSON.stringify(songInfo) != '{}'">
            <div class="img-box">
                <img :src="`${songInfo.al.picUrl}?param=200y200`" alt="">
            </div>
            <div class="title-box">
                <h3>{{ songInfo.al.name }}</h3>
                <span>-</span>
                <i v-for="(a, index) in songInfo.ar " :key="a.id">{{ a.name }}</i>
            </div>
        </div>
        <div class="right-box">
            <!-- icon-bofang 暂停图标 -->
            <i :class="[isPlay == 0 ? 'icon-bofang' : 'icon-caozuo-bofang-zanting']" class="iconfont"
                @click="palyAndPause"></i>
            <i class="iconfont icon-bofangliebiao"></i>
            <audio ref="audioPlay" :src="musicUrl"></audio>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Player',
    data() {
        return {
            // 是否正在播放，0没有播放  1正在播放
            isPlay: 0,
            songInfo: {},   // 正在播放的歌曲的信息
        }
    },
    computed: {
        // 音乐url
        musicUrl() {
            return this.$store.getters.musicUrl != '无音乐' ? this.$store.getters.musicUrl : '';
        }
    },
    methods: {
        // 播放和暂停
        palyAndPause() {
            if (this.musicUrl == '') {
                alert('现在没有可播放的音乐');
            } else {
                // 判断是否正在播放
                if (this.isPlay == 0) {
                    // 没有播放
                    this.$refs.audioPlay.play();        //播放音乐
                    this.isPlay = 1;
                } else {
                    this.$refs.audioPlay.pause();        //播放音乐
                    this.isPlay = 0;
                }
            }
        }
    },
    mounted() {
        //绑定全局事件总线  播放音乐
        this.$bus.$on('promptPlayMusic', (id) => {
            // 传当前播放的歌曲id 得到当前播放的歌曲的信息
            this.songInfo = this.$store.getters.songInfo(id);

            this.$refs.audioPlay.play();        //播放音乐
            this.isPlay = 1;    //播放器改1
        })



        // 监听audio元素是否暂停
        this.$refs.audioPlay.addEventListener('pause', () => {
            this.isPlay = 0;    //播放器改0
        })
    }
}
</script>

<style scoped lang="less">
#player {
    width: 100%;
    height: 13vw;
    padding: 0px 3vh;
    background-color: white;
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;


    .left-box {
        float: left;
        display: flex;
        align-items: center;

        .img-box {
            width: 12vw;
            height: 12vw;
            border-radius: 50%;
            overflow: hidden;


            img {
                width: 12vw;
            }
        }


        .title-box {
            margin-left: 10px;
            margin-right: 5px;
            font-size: 1rem;
            color: rgb(131, 131, 131);
            width: 50vw;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;


            h3 {
                display: inline-block;
                margin-right: 5px;
                font-size: 1.4rem;
                font-weight: 500;
                color: #000;
                max-width: 30vw;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }


    .right-box {
        i {
            font-size: 2.5rem;
            margin-right: 3vh;
        }
    }
}
</style>