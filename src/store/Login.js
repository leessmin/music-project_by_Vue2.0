import axios from "axios";

// 登录注册
const state = {
    // 账户信息
    account: null,
    // 账号配置
    profile: null,
    // 歌单列表
    playlist: [],
};
const mutations = {

    // 将 账户登录状态 数据存进state中
    GETUSERSTATUS(state, data) {
        state.account = data.account;
        state.profile = data.profile;
    },

    // 将 用户歌单 数据存进state中
    GETPLAYLIST(state, data) {
        state.playlist = data.playlist;
    }
};
const actions = {
    // 登录
    // /login/cellphone?phone=xxx&password=yyy       phone:手机号码       password: 密码
    async loginWYYMusic({ dispatch }, { phone, password }) {

        let result = await (await axios.post(`http://localhost:3000/login/cellphone?phone=${phone}&password=${password}`)).data;

        // 判断是否登录成功
        if (result.code == 200) {
            // 登录成功

            // 存储token  在  localStorage
            localStorage.setItem("TOKEN", result.token);
            // 存储Cookies 在 localStorage
            localStorage.setItem("COOKIES", result.cookie);

            // 派发actions 获取用户登录状态
            dispatch('getUserStatus');

        } else {
            alert('密码或账号错误，登录失败！！！');
        }

    },

    // 携带cookies请求用户账号登录状态
    // /login/status
    async getUserStatus({ commit, dispatch }) {
        // 获取cookies
        let cookies = localStorage.getItem("COOKIES");

        // 判断本地是否有cookies如果有则进行校验用户信息
        if (cookies) {
            // console.log(encodeURIComponent(cookies));

            // 发送   携带cookie
            let result = await (await axios.post('http://localhost:3000/login/status', { cookie: cookies })).data;

            // console.log(result);
            // 判断请求是否成功
            if (result.data.code == 200) {
                // 成功
                commit('GETUSERSTATUS', result.data);

                // 派发actions 获取用户歌单列表
                dispatch('getPlaylist', { uid: result.data.account.id });
            }

        }
    },

    // 获取用户歌单
    // /user/playlist?uid=xxx  uid用户id
    async getPlaylist({ commit }, { uid }) {
        // 发送post请求
        let result = await (await axios.post(`http://localhost:3000/user/playlist?uid=${uid}`)).data;

        if (result.code == 200) {
            // 发送请求成功
            commit('GETPLAYLIST', result);
        }
    }

};
const getters = {
    // 用户头像
    avatarUrl(state) {
        return state.profile != null ? state.profile.avatarUrl : "./images/logo1.png";
    },
    // 用户昵称
    nickname(state) {
        return state.profile != null ? state.profile.nickname : "请登录";
    },
    // 获取用户id
    userId(state) {
        return state.profile != null ? state.profile.userId : "";
    },
    // 喜欢的歌单
    loveList(state, getters) {
        return function (isLove) {
            // 用来存放喜欢的歌单
            let arr = [];
            // 用来存储收藏的歌单
            let rearr = [];

            // 遍历歌单
            for (let i = 0; i < state.playlist.length; i++) {
                // 判断是否是用户自己创建的歌单 如果是则是喜欢的歌单 否则是收藏歌单
                if (getters.userId == state.playlist[i].userId) {
                    // 存储喜欢的歌单
                    arr.push(state.playlist[i]);
                } else {
                    // 存储收藏的歌单
                    rearr.push(state.playlist[i]);
                }
            }

            // isLove:0 返回喜欢歌单    否则返回收藏歌单
            if (isLove == 0) {
                return arr;
            } else {
                return rearr;
            }

        }
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}