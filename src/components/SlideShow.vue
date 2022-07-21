<template>
    <!-- 轮播图 -->
    <div id="slide-show">
        <div class="swiper-container" ref="swiper_container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(u, index) in urlArr" :key="index">
                    <img :src="u.url" alt="">
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination" ref="swiper_pagination"></div>
        </div>
    </div>
</template>

<script>
// 引入swiper插件
import Swiper from 'swiper';
// 引入Vuex辅助函数
import { mapState } from 'vuex';


export default {
    name: 'SlideShow',
    computed: {
        urlArr() {
            // 图片url
            return this.$store.state.SlideShow.urlArr;
        }
    },
    watch: {
        // 监听图片url是否拿到，如果拿到则注册swiper
        urlArr: {
            handler(newValue, oldValue) {
                // 下次dom更新时执行
                this.$nextTick(() => {
                    // swiper插件
                    var swiper = new Swiper(this.$refs.swiper_container, {
                        loop: true,         //循环
                        spaceBetween: 40,   //距离
                        autoplay: {         //自动播放
                            delay: 3000,
                            stopOnLastSlide: false,
                            disableOnInteraction: false,
                        },
                        pagination: {
                            el: this.$refs.swiper_pagination,
                        },
                    });
                })
            }
        }
    },
    mounted() {
        // 派发getUrl拿到图片url
        this.$store.dispatch('getUrl');
    },
}
</script>

<style scoped lang="less">
#slide-show {
    width: 91vw;
    height: 33vw;
    margin: 1vh auto;


    .swiper-container {
        width: 100%;
        height: 100%;

        img {
            width: 91vw;
            height: 33vw;

            border-radius: 15px;
        }
    }

}


/deep/ .swiper-pagination-bullet {
    width: 12px;
    height: 2px;
    background-color: white;
    border-radius: 0;
    opacity: 0.5;
}


/deep/ .swiper-pagination-bullet-active {
    background-color: #54d4ff;
    opacity: 1;
}
</style>