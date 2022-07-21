<template>
    <!-- 个人中心导航栏 -->
    <div class="user_nav">
        <h3 :class="{ active_h3: currentIndex == 0 }" @click="changeBtn(0)">喜欢</h3>
        <div class="line"></div>
        <h3 :class="{ active_h3: currentIndex == 1 }" @click="changeBtn(1)">收藏</h3>
    </div>
</template>

<script>
export default {
    name: 'UserNav',
    data() {
        return {
            // 当前按钮的位置
            currentIndex: 0,
        }
    },
    methods: {
        changeBtn(index) {
            this.currentIndex = index;

            // 触发全局事件总线 发送当前点击的位置
            this.$bus.$emit('isLove', index);
        }
    }
}
</script>

<style scoped lang="less">
.user_nav {
    width: 33vh;
    height: 6vh;
    // background-color: aqua;
    margin: 2vh auto;
    border-top: 2px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;


    .line {
        width: 1px;
        height: 4vh;
        background-color: #bfbfbf;
    }


    h3 {
        height: 5vh;
        font-size: 3vh;
        font-weight: 500;
        box-sizing: border-box;
    }

    .active_h3 {
        color: #65bbf6;
        border-bottom: 2px solid #65bbf6;
    }
}
</style>