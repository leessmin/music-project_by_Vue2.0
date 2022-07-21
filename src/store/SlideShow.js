import axios from "axios";

// 轮播图
const state = {
    urlArr: [],
};
const mutations = {
    GETURL(state, urlArr){
        state.urlArr = urlArr;
    }
};
const actions = {
    // 获取图片地址
    getUrl({ commit }) {
        axios.get('/mock/imgurl').then((response) => {
            commit("GETURL", response.data)
        })
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}