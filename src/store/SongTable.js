import axios from "axios";

// 歌单列表 数据
const state = {
    // 歌曲信息
    songData: [],
};
const mutations = {
    GETSINGERSONG(state, singerData) {
        // 截取数组长度
        let arr = singerData.slice(0, 3);
        // console.log(arr);
        state.songData.push(arr);
    }
};
const actions = {
    // 获取歌手歌单信息
    // /artist/top/song?id=6452   id : 歌手 id
    async getSingerSong({ commit }, singerId) {
        let result = await (await axios.get(`http://localhost:3000/artist/top/song?id=${singerId}`)).data;
        // 判断服务器响应是否成功 如果是个空数组那就不提交mutations
        if (result.code == 200 && result.songs) {
            commit('GETSINGERSONG', result.songs);
        }
    }
};
const getters = {
    song(state) {
        // 三首歌
        return function (songId) {
            return state.songData[songId] || null;
        }
    },
    // 歌手名字
    singerName(state, getters) {
        return function (songId) {
            // 接收歌曲
            let arr = getters.song(songId);
            // 等待数据响应，如果没有数据则返回空对象  有数据返回歌手名字
            return arr ? arr[0].ar[0].name : '加载中···';
        }
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}