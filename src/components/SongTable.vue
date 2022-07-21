<template>
    <!-- 歌单列表 -->
    <div id="song_Table">
        <div class="top">
            <h1 v-if="singerName">{{ singerName }}</h1>
            <div class="move-btn">
                <span>更多</span>
            </div>
        </div>
        <div class="bottom">
            <ul>
                <li v-for="(s, index) in song" :key="index">
                    <img :src="s.al.picUrl" alt="" width="100%">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SongTable',
    props: {
        songId: {
            typeof: Number,
        },
        nameId: {
            typeof: Number,
        }
    },
    computed: {
        song() {
            // 歌单
            return this.$store.getters.song(this.nameId) || "";
        },
        singerName() {
            // 歌手名 判读有没有拿到song的值，如果有则返回歌手名字，没有则空对象
            return this.$store.getters.song ? this.$store.getters.singerName(this.nameId) : "";
        },
    },
    mounted() {
        // 派发actions 获取歌单数据
        this.$store.dispatch('getSingerSong', this.songId);
    },
}
</script>

<style scoped lang="less">
#song_Table {
    width: 91vw;
    height: 30vw;
    background-color: #ffffff;
    border-radius: 2vw;
    margin: 5vw;
    padding: 2vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;


    .top {


        h1 {
            font-size: 4vw;
            float: left;
        }

        .move-btn {
            width: 14vw;
            height: 6vw;
            background-color: #e6e6e6;
            border-radius: 6vw;
            float: right;
            display: flex;
            justify-self: center;
            align-items: center;
            padding-left: 4px;


            span {
                font-size: 0.825rem;
            }
        }
    }


    .bottom {


        ul {
            margin-top: 10px;
            display: flex;
            justify-content: space-around;

            li {
                width: 18vw;
                height: 18vw;
                border-radius: 1vw;
                overflow: hidden;
            }
        }

    }

}
</style>