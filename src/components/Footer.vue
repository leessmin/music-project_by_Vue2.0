<template>
    <!-- 底部 -->
    <div>
        <!-- 用来占位的盒子，无实际意义 -->
        <div :class="[isNavShow ? 'placeholder_box': 'placeholder_box-show']"></div>
        <div id="footer">
            <Player></Player>
            <FooterNav v-if="isNavShow"></FooterNav>
        </div>
    </div>
</template>

<script>
import Player from './Player.vue'
import FooterNav from './FooterNav.vue';
export default {
    name: "Footer",
    props: {
        // 导航栏是否显示
        isNavShow: {
            typeof: Boolean,
            default: true
        }
    },
    components: { Player, FooterNav }
}
</script>

<style scoped lang="less">
.placeholder_box {
    width: 100%;
    height: 28vw;
}

.placeholder_box-show {
    width: 100%;
    height: 13vw;
}

#footer {
    width: 100%;
    // height: 6vh;
    background-color: #d9d9d9;
    position: fixed;
    bottom: 0;
    left: 0;
}

// 按钮被点击时的样式
.icon-active {
    color: #65bbf6;
}
</style>