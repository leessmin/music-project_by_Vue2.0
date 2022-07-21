import Vue from "vue";
import Vuex from "vuex";

// 注入Vuex
Vue.use(Vuex);

// 轮播图
import SlideShow from "./SlideShow";
// 获取歌手歌单信息
import SongTable from "./SongTable";
// 登录注册
import Login from "./Login";
// 获取获取歌单详情
import GetPlaylist from "./GetPlaylist";
// 获取音乐url
import GetMusicUrl from "./GetMusicUrl";


export default new Vuex.Store({
    modules: {
        SlideShow,
        SongTable,
        Login,
        GetPlaylist,
        GetMusicUrl
    }
})