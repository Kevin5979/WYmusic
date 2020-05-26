<template>
  <!-- swiper的bug, 如果数据时网络获取的，轮播图到最后一张后停止轮播 -->
  <!-- 加上v-if="数据.length > 0"条件解决 -->
  <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
    <!-- slides -->
    <swiperSlide v-for="value in banners" :key="value.bannerId">
      <a :href="value.url">
        <img :src="value.pic" />
      </a>
    </swiperSlide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// 这里有坑: Swiper,SwiperSlide 首字母必须大写,注册组件也需要大写
// 否则报组件未定义错误
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css"; // 必须安装swiper,vue-awesome-swiper

export default {
  name: "Banner",
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOption: {
        loop: true, //循环模式
        autoplay: {
          delay: 1500, //自动切换时间 ms
          stopOnLastSlide: false, //当切换到最后一个slide是停止切换
          disableOnInteraction: false // 用户操作swiper之后,是否禁止autoplay
        },
        // 分页器
        pagination: {
          el: ".swiper-pagination"
        },

        // 异步加载
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    };
  },
  components: {
    Swiper,
    SwiperSlide
  }
};
</script>

<style lang="scss" scoped>
.banner {
  img {
    width: 100%;
    height: 300px;
  }
}
</style>

<style lang="scss">
@import "~assets/css/mixin";
.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    @include bg_color();
  }
}
</style>