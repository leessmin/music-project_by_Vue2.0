<template>
    <!-- 下拉加载更多 -->
    <div class="DropDownLoad" ref="DropDownLoad" @touchstart="touchStart($event)" @touchmove="touchMove($event)">
        <slot></slot>
        <!-- 底部提示 -->
        <div class="footer">
            <div class="more_tip" v-if="pullUpState == 1">
                <!-- 上拉加载更多 -->
                <span>{{ pullUpInfo.moreText }}</span>
            </div>
            <div class="loading_tip" v-if="pullUpState == 2">
                <!-- 加载中 -->
                <span>{{ pullUpInfo.loadingText }}</span>
            </div>
            <div class="no_more_tip" v-if="pullUpState == 3">
                <!-- 我是有底线的 -->
                <span>{{ pullUpInfo.noMoreText }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DropDownLoad',
    data() {
        return {
            top: 0,
            pullUpState: 0, //1:上拉加载更多   2:加载中....   3:我是有底线的
            isLoading: false,// 是否正在加载
            pullUpInfo: {
                moreText: '上拉加载更多',
                loadingText: '数据加载中...',
                noMoreText: '我是有底线的',
            },
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
        }
    },
    props: {
        onInfiniteLoad: {
            type: Function,
            require: false
        },
    },
    methods: {
        // 触摸开始，手指点击屏幕时
        touchStart(e) {
            // 获取 开始 触摸的坐标
            this.startX = e.touches[0].pageX;
            this.startY = e.touches[0].pageY;
        },

        // 接触点改变，滑动时
        touchMove(e) {
            this.endX = e.changedTouches[0].pageX;
            this.endY = e.changedTouches[0].pageY;
            let direction = this.getSlideDirection(this.startX, this.startY, this.endX, this.endY);
            switch (direction) {
                case 0:
                    // console.log('没滑动')
                    break
                case 1:
                    // console.log('向上')
                    this.scrollToTheEnd()
                    break
                case 2:
                    // console.log('向下')
                    break
                case 3:
                    // console.log('向左')
                    break
                case 4:
                    // console.log('向右')
                    break
                default:
            }
        },

        /**
        * 判断滚动条是否到底
        */
        scrollToTheEnd() {
            // 获取滚动条的高度
            let innerHeight = this.$refs.DropDownLoad.clientHeight;
            // 变量scrollTop是滚动条滚动时，距离顶部的距离
            let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            // 变量scrollHeight是滚动条的总高度
            let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight

            // 滚动条到底部的条件
            if (scrollTop + scrollHeight >= innerHeight) {
                // 判断当前状态
                if (this.pullUpState !== 3 && !this.isLoading) {
                    this.infiniteLoad()
                }
                // console.log('距顶部' + scrollTop + '滚动条总高度' + scrollHeight + '内容高度' + innerHeight)
            }
        },

        /**
        * 上拉加载数据
        */
        infiniteLoad() {
            if (this.pullUpState !== 2) {
                this.pullUpState = 2
                this.isLoading = true
                this.onInfiniteLoad(this.infiniteLoadDone)
            }
        },

        /**
        * 加载数据完成
        */
        infiniteLoadDone() {
            this.isLoading = false
            this.pullUpState = 1
        },

        /**
         * 返回角度
         */
        getSlideAngle(dx, dy) {
            return Math.atan2(dy, dx) * 100 / Math.PI;
        },

        /**
         * 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
         * @param {number} startX X轴开始位置
         * @param {number} startY X轴结束位置
         * @param {number} endX Y轴开始位置
         * @param {number} endY Y轴结束位置
         */
        getSlideDirection(startX, startY, endX, endY) {
            // 计算滑动的距离
            let dy = startY - endY;
            let dx = endX - startX;
            let result = 0;

            // 如果滑动距离太短 abs绝对值
            if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                return result;
            }

            // 获取滑动角度
            let angle = this.getSlideAngle(dx, dy);
            if (angle >= -45 && angle < 45) {
                result = 4
            } else if (angle >= 45 && angle < 135) {
                result = 1
            } else if (angle >= -135 && angle < -45) {
                result = 2
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3
            }

            return result;
        }
    }
}
</script>

<style scoped lang="less">
.DropDownLoad {
    width: 100%;
}

.more_tip,.loading_tip,.no_more_tip{
    width: 100%;
    height: 50px;
    text-align: center;

    span{
        color: #ccc;
    }
}
</style>