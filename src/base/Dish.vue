<template>
    <div class="dish" @mouseenter="enter" @mouseleave="leave" >
        <img v-if="imgUrl" :src="imgUrl" />
        <h4 class="title" :style="this.color">{{dishDetail.title}}</h4>
        <div class="mask" v-if="showMask" >
            <h4 class="text">{{dishDetail.detail}}</h4>
            <div class="price">{{dishDetail.price | currency}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgUrl: '',
            showMask: false,
            color: '#fff'
        }
    },
    created () {
        this.imgUrl = require('@/assets/img/dish/'+this.dishDetail.imgUrl)
    },
    props: {
        dishDetail: {
            type: Object
        }
    },
    methods: {
        enter () {
            this.showMask = true
            this.color =  `color: #0c0`
        },
        leave () {
            this.showMask = false
            this.color =  `color: #fff`
        }
    }
}
</script>

<style lang="scss">
    .dish {
        position: relative;
         margin: 5px;
        img {
            width: 100%;
            height: 100%;
        }
        .title {
            position: absolute;
            top: -12px;
            left: 4px;
            z-index: 10;
            color: #fff;
            font-size: 14px;
        }
        .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            overflow: hidden;
            .text {
                color: #eee;
                font-size: 0.9rem;
                font-weight: normal;
                position: relative;
                top: 18px;
                overflow: hidden;
            }
            .price {
                position: absolute;
                bottom: 2px;
                right: 2px;
                color: #0c0;
            }
        }
    }
</style>


