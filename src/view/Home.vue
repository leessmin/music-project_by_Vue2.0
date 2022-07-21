<template>
    <!-- 上拉加载教程 -->
    <!-- https://www.programminghunter.com/article/49001843917/#:~:text=vue%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0%E3%80%81%E4%B8%8A%E6%8B%89%E5%8A%A0%E8%BD%BD,%E7%94%B1%E4%BA%8E%E8%87%AA%E8%BA%AB%E7%9A%84%E9%A1%B9%E7%9B%AE%E6%AF%94%E8%BE%83%E7%AE%80%E5%8D%95%EF%BC%8C%E5%8F%AA%E6%9C%89%E5%87%A0%E4%B8%AAH5%E9%A1%B5%E9%9D%A2%EF%BC%8C%E7%94%A8%E6%9D%A5%E5%B5%8C%E5%85%A5app%E4%B8%AD%EF%BC%8C%E6%89%80%E6%9C%89%E6%B2%A1%E6%9C%89%E5%BC%95%E5%85%A5%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%9A%84UI%E6%A1%86%E6%9E%B6%EF%BC%8C%E4%BD%86%E6%98%AF%E4%BB%8B%E4%BA%8E%E8%83%BD%E8%AE%A9%E7%94%A8%E6%88%B7%E5%9C%A8%E6%B5%8F%E8%A7%88H5%E9%A1%B5%E9%9D%A2%E6%97%B6%E6%9C%89%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0%E5%92%8C%E4%B8%8A%E6%8B%89%E5%8A%A0%E8%BD%BD%EF%BC%8C%E6%9C%89%E6%9B%B4%E5%A5%BD%E7%9A%84%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%EF%BC%8C%E8%87%AA%E5%B7%B1%E5%86%99%E7%BB%84%E4%BB%B6%E5%AE%9E%E7%8E%B0%E3%80%82%201%E3%80%81%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0DropDownRefresh.vue -->
    <!-- 主页 -->
    <div id="Home">
        <Search></Search>
        <div class="content-box">
            <SlideShow></SlideShow>
            <DropDownLoad :onInfiniteLoad="onInfiniteLoad">
                <SongTable v-for="(i, index) in nameId" :songId="34994 + i" :nameId="i" :key="index"></SongTable>
            </DropDownLoad>
        </div>
    </div>
</template>

<script>
import Search from '../components/SearchInput.vue';
import SlideShow from '../components/SlideShow.vue';
import SongTable from '../components/SongTable.vue';
import DropDownLoad from '../components/DropDownLoad.vue';


export default {
    name: "Home",
    components: { Search, SlideShow, SongTable, DropDownLoad },
    data() {
        return {
            // 上拉加载的设置
            infiniteLoadData: {
                initialShowNum: 3, // 初始显示多少条
                everyLoadingNum: 4, // 每次加载的个数
                pullUpState: 1, // 子组件的pullUpState状态
                pullUpList: [], // 上拉加载更多数据的数组
                showPullUpListLength: this.initialShowNum // 上拉加载后所展示的个数
            },
            // 歌手id
            nameId: [0, 1, 2, 3, 4],
            oldSong: 0,
        }
    },
    computed:{
        // 从服务器获取的歌曲长度
        songLength(){
            return this.$store.state.SongTable.songData.length;
        }
    },
    methods: {
        /**
         * 上拉一次加载更多的数据
         */
        getPullUpMoreData() {
            // 获取已经获取到的歌手的数量长度
            let arrLength = this.songLength;

            // console.log(arrLength);

            // 判断已经获取到的歌手长度是否大于即将获取的长度
            if (arrLength + this.infiniteLoadData.everyLoadingNum > arrLength) {
                // 增加歌手id
                for (let i = 0; i < this.infiniteLoadData.everyLoadingNum; i++) {
                    this.nameId.push(arrLength + i);
                }
            }


            if (arrLength + this.infiniteLoadData.everyLoadingNum === arrLength) {
                this.infiniteLoadData.pullUpState = 3
            } else {
                this.infiniteLoadData.pullUpState = 1
            }
        },

        /**
         * 上拉加载
         */
        onInfiniteLoad(done) {
            if (this.infiniteLoadData.pullUpState === 1) {
                this.getPullUpMoreData();
            }
            done()
        }
    },
}
</script>

<style>
</style>