<template>
    <!-- 歌单播放页 -->
    <div class="SongListPage">
        <TopBack></TopBack>


        <div class="middle">
            <div class="img-box">
                <img :src="songImgUrl" alt="" width="100%">
            </div>
            <div class="introduce">
                <h3>{{ songListName }}</h3>
                <p>简介</p>
            </div>
        </div>



        <PlayList :songList="songList"></PlayList>
    </div>
</template>

<script>
import TopBack from '@/components/TopBack.vue';
import PlayList from '../components/PlayList.vue';
import Footer from '@/components/Footer.vue';
export default {
    name: "SongListPage",
    components: { TopBack, PlayList, Footer },
    computed: {
        // 歌单 歌的列表
        songList() {
            return this.$store.getters.songList;
        },

        // 歌单图片
        songImgUrl() {
            return this.$store.getters.songImgUrl;
        },

        // 歌单的名字
        songListName() {
            return this.$store.getters.songListName;
        }
    },
    mounted() {
        // 派发actions获取歌单列表详情
        this.$store.dispatch('getPlayListDetail', this.$route.query);
    },
    beforeDestroy() {
        // 组件销毁时清除 playlist
        this.$store.commit('CLEARPLAYLIST');
    }
}
</script>

<style scoped lang="less">
.SongListPage {


    .middle {
        width: 100%;
        height: 20vh;
        background-color: white;
        display: flex;
        // justify-content: flex-start;
        align-items: center;


        .img-box {
            width: 12vh;
            height: 12vh;
            border-radius: 5px;
            overflow: hidden;
            margin: 0 2vh;
        }


        .introduce {
            width: 60vw;

            h3 {
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: 3vh;
                font-weight: 600;
            }


            p {
                font-size: 2vh;
                color: #4acae1;
            }
        }
    }



}
</style>