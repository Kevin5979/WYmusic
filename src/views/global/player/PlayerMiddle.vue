<template>
  <swiper :options="swiperOption" class="PlayerMiddle">
    <swiperSlide class="cd">
      <div class="cd-warpper" ref="cdWarpper">
        <img v-lazy="currentSong.picUrl" />
      </div>
      <p class="sortLyric">{{getCurrLyric()}}</p>
      <p class="sortLyric2">{{getCurrLyric2()}}</p>
    </swiperSlide>
    <swiperSlide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul class="lyricUl">
          <li
            v-for="(value,key) in currentLyric"
            :key="key"
            :class="{'no-lyric': (value === 'WY音乐,畅享好音质' || value === '纯音乐， 请欣赏'),'active': (currentLineNum === key)}"
          >{{value}}</li>
        </ul>
      </ScrollView>
    </swiperSlide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import ScrollView from "views/global/ScrollView";
import { mapGetters } from "vuex";

export default {
  name: "PlayerMiddle",
  props: {
    currentTime: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      swiperOption: {
        // 分页器
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "my-bullet", // 自定义默认类名
          bulletActiveClass: "my-bullet-active" // 自定义默认类名
        },
        // 异步加载
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: "0"
    };
  },
  methods: {
    getCurrLyric() {
      // for (let key in this.currentLyric) {
      //   return this.currentLyric[key];
      // }
      let act = document.querySelector(".lyricUl .active");
      if (act) {
        if (act.nextElementSibling && act.innerHTML !== "") {
          return act.innerHTML;
        }
      }
    },
    getCurrLyric2() {
      let act = document.querySelector(".lyricUl .active");
      if (act) {
        if (act.nextElementSibling && act.nextElementSibling.innerHTML !== "") {
          return act.nextElementSibling.innerHTML;
        }
      }
    },
    // 歌词立即同步
    getActiveLineNum(lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum;
      }
      let result = this.currentLyric[lineNum + ""];
      if (result === undefined || result === "") {
        lineNum -= 1;
        return this.getActiveLineNum(lineNum);
      } else {
        return lineNum + "";
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  computed: {
    ...mapGetters(["isPlaying", "currentSong", "currentLyric"])
  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWarpper.classList.add("active");
      } else {
        this.$refs.cdWarpper.classList.remove("active");
      }
    },
    currentTime(newValue, oldValue) {
      /** 以下处理歌词不能立即同步,原因：点击跳转是的时间没有对应歌词的key */
      // let lineNum = Math.floor(newValue) + "";
      // // 高亮歌词同步
      // // 有坑：歌词时间断层处理
      // let result = this.currentLyric[lineNum];
      // if (result !== undefined && result !== "") {
      //   this.currentLineNum = lineNum;
      //   // 歌词滚动同步
      //   let currentLyricTop = document.querySelector("li.active").offsetTop;
      //   // 有坑：this.$refs.lyric 没有拿到原生元素，而是组件元素
      //   let lyricHeight = this.$refs.lyric.$el.offsetHeight;
      //   if (currentLyricTop > lyricHeight / 2) {
      //     // 歌词开始滚动
      //     this.$refs.scrollView.scrollTo(
      //       0,
      //       lyricHeight / 2 - currentLyricTop,
      //       100
      //     );
      //   }
      // }

      /** 改造方法 */
      let lineNum = Math.floor(newValue) + "";
      this.currentLineNum = this.getActiveLineNum(lineNum);
      let currentLyricTop = document.querySelector("li.active").offsetTop;
      if (!document.querySelector("li.active").nextElementSibling) {
        // 这里解决了最后一个歌词抖动问题
        return;
      }
      // 有坑：this.$refs.lyric 没有拿到原生元素，而是组件元素
      let lyricHeight = this.$refs.lyric.$el.offsetHeight;
      if (currentLyricTop > lyricHeight / 2) {
        // 歌词开始滚动
        this.$refs.scrollView.scrollTo(
          0,
          lyricHeight / 2 - currentLyricTop,
          100
        );
      } else {
        this.$refs.scrollView.scrollTo(0, 0, 100);
      }
    },
    currentLyric(newValue, oldValue) {
      // 处理第一个歌词不为0秒，调用栈溢出问题
      for (let key in newValue) {
        this.currentLineNum = key;
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/mixin";
@import "assets/css/variable";

.PlayerMiddle {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-warpper {
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      animation: sport 5s linear infinite;
      animation-play-state: paused; // 设置播放状态
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      @include font_size($font_large);
      @include font_color();
    }
    p.sortLyric {
      margin-top: 75px;
    }
    p.sortLyric2 {
      color: #fff;
    }
  }
  .lyric {
    li {
      color: #bbb;
      text-align: center;
      @include font_size($font_medium_s);
      @include font_color();
      margin: 10px 0;
      &:last-of-type {
        padding-bottom: 50%;
      }
      &.no-lyric {
        position: relative;
        top: 350px;
        @include font_size($font_large);
      }
      &.active {
        color: #fff;
        @include font_size($font_large);
      }
    }
  }
}

@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss">
@import "assets/css/mixin";

.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 15px;
}

.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>
