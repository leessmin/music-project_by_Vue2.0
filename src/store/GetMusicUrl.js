import axios from "axios";

// 获取音乐url
const state = {
    // 音乐url信息
    musicInfo: [],
};
const mutations = {
    // 获取音乐的url
    GETMUSICURL(state, data) {
        state.musicInfo = data;
    }
};
const actions = {
    // 获取音乐的url
    // /song/url?id=33894312     id歌曲id
    async getMusicUrl({ commit }, { id }) {
        // 发送请求
        let result = await (await axios.post(`http://localhost:3000/song/url?id=${id}&br=320000`)).data;


        // 判断是否请求成功
        if (result.code == 200) {
            // 递交commit
            commit('GETMUSICURL', result.data);
            return '成功';
        } else {
            console.error(result);
            throw "Error";
        }
    }
};
const getters = {
    // 音乐url
    musicUrl(state) {
        return state.musicInfo.length == 0 ? '无音乐' : state.musicInfo[0].url;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}