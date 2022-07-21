<template>
    <!-- 顶部返回页 -->
    <div id="TopBack">
        <div class="top">
            <i @click="$router.back()" class="iconfont icon-fanhui"></i>
        </div>



        <div class="top-placeholder">
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopBack',
}
</script>

<style scoped lang="less">
#TopBack {


    .top-placeholder {
        width: 100%;
        height: 6vh;
        background-color: #ffffff;
    }


    .top {
        width: 100%;
        height: 6vh;
        background-color: #ffffff;
        // border-bottom: 1px solid #ccc;
        position: fixed;
        display: flex;
        align-items: center;


        i {
            font-size: 4.5vh;
        }
    }
}
</style>