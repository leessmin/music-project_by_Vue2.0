import axios from "axios";

// 获取获取歌单详情
const state = {
    // 歌单详情列表
    playlist: {},
    // 歌单列表
    musicList: [],
};
const mutations = {
    GETPLAYLISTDETAIL(state, data) {
        // 存储歌单详情
        state.playlist = data;
    },
    GETMUSICLIST(state, data) {
        // 存储歌单列表
        state.musicList = data;
    },
    // 清空 playlist   musicList
    CLEARPLAYLIST(state) {
        state.playlist = {};
        state.musicList = [];
    }
};
const actions = {
    // 获取歌单详情
    // /playlist/detail?id=24381616     id : 歌单 id
    /*
    上面的接口无法获取完整的歌单信息

    接口 : /playlist/track/all

    调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1

    必选参数 : id : 歌单 id

    可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量

    可选参数 : offset : 默认值为0
    */
    async getPlayListDetail({ commit }, { id }) {
        // 获取cookies   部分歌单列表需要登录才可以查看
        let cookies = localStorage.getItem("COOKIES");


        // 发送请求获取列表详情             获取列表详情
        let result = await (await axios.post(`http://localhost:3000/playlist/detail?id=${id}`, { cookie: cookies })).data;
        // 判断请求是否成功
        if (result.code == 200) {
            // 成功
            commit('GETPLAYLISTDETAIL', result.playlist);
        }


        // 获取歌单列表
        // 第一次发送请求歌单获取可能不完整，所有需要第二次发送 获取列表详情 传第一次获取到的歌单列表 才可以取得完整歌单列表
        axios.post(`http://localhost:3000/playlist/track/all?id=${id}`, { cookie: cookies }).then((response) => {
            // 判断请求是否成功
            if (response.data.code == 200) {
                // 成功
                commit('GETMUSICLIST', response.data);
            }
        })


    },
};
const getters = {
    // 歌单 歌的列表
    songList(state) {
        return state.musicList.songs || [];
    },
    // 歌单图片
    songImgUrl(state) {
        return state.playlist.coverImgUrl || './images/logo1.png';
    },
    // 歌单名字
    songListName(state) {
        return state.playlist.name || '加载中';
    },
    // 单个歌曲的信息
    songInfo(state, getters) {
        return (id) => {
            // 用来临时存储歌曲信息
            let temp;

            // 遍历歌单 歌的列表 取出和此id相同的歌曲的信息
            for (let i = 0; i < getters.songList.length; i++) {
                if (getters.songList[i].id == id) {
                    temp = getters.songList[i];
                }
            }

            // 返回取到的歌曲信息
            return temp;
        }
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}