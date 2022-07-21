<template>
    <!-- 底部导航栏 -->
    <div id="FooterNav">
        <div class="footer-box">
            <i class="iconfont icon-tingge icon-box" :class="{ 'icon-active': currentIndex == 0 }"
                @click="changePage(0)"></i>
            <i class="iconfont icon-shequ icon-box" :class="{ 'icon-active': currentIndex == 1 }"
                @click="changePage(1)"></i>
            <i class="iconfont icon-diantai icon-box" :class="{ 'icon-active': currentIndex == 2 }"
                @click="changePage(2)"></i>
            <i class="iconfont icon-wode icon-box" :class="{ 'icon-active': currentIndex == 3 }"
                @click="changePage(3)"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FooterNav',
    data() {
        return {
            // 当前按钮的位置
            currentIndex: 0,
        };
    },
    watch: {
        // 检测路由的变化改变下标
        '$route.name': {
            handler(newValue, oldValue) {
                this.changeIcon(newValue)
            }
        }
    },
    methods: {
        // 跳转页面
        changePage(index) {
            // 跳蛛页面   目前只开发了home页面和user页面
            switch (index) {
                case 0: {
                    this.$router.push({ name: 'home' });
                    break;
                }
                case 1: {
                    alert('这个功能尚未开发，尽情期待');
                    break;
                }
                case 2: {
                    alert('这个功能尚未开发，尽情期待');
                    break;
                }
                case 3: {
                    this.$router.push({ name: 'user' });
                    break;
                }
                default:
                    break;
            }
        },
        // 更改图标
        changeIcon(newValue) {
            switch (newValue) {
                case 'home': {
                    this.currentIndex = 0;
                    break;
                }
                case 'user': {
                    this.currentIndex = 3;
                    break;
                }
                default:
                    break;
            }
        }
    },
    mounted() {
        // 组件创建时检查当前路由的位置更新图标
        this.changeIcon(this.$route.name);
    },
}
</script>

<style scoped lang="less">
.footer-box {
    width: 100%;
    height: 13vw;
    min-height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .icon-box {
        font-size: 3.25rem;
    }
}

.icon-active {
    color: #65bbf6;
}
</style>