<template>
    <div>
        <!-- 用来占位的盒子，无实际意义 -->
        <div class="placeholder_box"></div>
        <!-- 搜索 -->
        <div id="search">
            <i class="iconfont icon-shezhi"></i>
            <input type="text" name="" id="" placeholder="Hardwell">
            <i class="iconfont icon-yinle1"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchInput',
}
</script>

<style scoped lang="less">
.placeholder_box {
    width: 100%;
    height: 12vw;
}

#search {
    width: 100%;
    height: 12vw;
	background-color: #ffffff;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 10;


    i {
        font-size: 2.5rem;
    }


    input {
        width: 47vw;
        height: 7vw;
        border-radius: 3vh;
        border: 0;
        background-color: #eeeeee;
        text-align: center;
    }


}
</style>