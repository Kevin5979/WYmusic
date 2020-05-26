<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" @click.stop="favorite" :class="{'active': isFavorite(currentSong)}"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import modeType from "store/modeType";

import { formartTime } from "tools";

export default {
  name: "PlayerBottom",
  props: {
    totalTime: {
      type: Number,
      required: true
    },
    currentTime: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurrentTime",
      "setFavoriteSong"
    ]),
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
    mode() {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one);
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
      } else if (this.modeType === modeType.random) {
        this.setModeType(modeType.loop);
      }
    },
    prev() {
      this.setCurrentIndex(this.currentIndex - 1);
    },
    next() {
      this.setCurrentIndex(this.currentIndex + 1);
    },
    progressClick(e) {
      // 点击跳转播放,这里有坑：往回点出错,拿到背景的offsetLeft
      //1.距离本元素位置
      // let normalLeft = e.target.offsetLeft;
      let normalLeft = this.$refs.progressBar.offsetLeft;
      //2.距离页面位置
      let eventLeft = e.pageX;
      let clickLeft = eventLeft - normalLeft;
      // let progressWidth = e.target.offsetWidth;
      let progressWidth = this.$refs.progressBar.offsetWidth;
      let value = clickLeft / progressWidth;
      this.$refs.progressLine.style.width = value * 100 + "%";

      //计算播放节点
      let currentTime = this.totalTime * value;
      this.setCurrentTime(currentTime);
    },
    favorite() {
      this.setFavoriteSong(this.currentSong);
    },
    isFavorite(song) {
      let result = this.favoriteList.find(currentValue => {
        return currentValue.id === song.id;
      });
      return result !== undefined;
    }
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "modeType",
      "currentIndex",
      "currentSong",
      "favoriteList"
    ])
  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    modeType(newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove("random");
        this.$refs.mode.classList.add("loop");
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove("loop");
        this.$refs.mode.classList.add("one");
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove("one");
        this.$refs.mode.classList.add("random");
      }
    },
    totalTime(newValue, oldValue) {
      let time = formartTime(newValue);
      this.$refs.eleTotalTime.innerHTML = time.minute + ":" + time.second;
    },
    currentTime(newValue, oldValue) {
      // 1.格式化时间
      let time = formartTime(newValue);
      this.$refs.eleCurrentTime.innerHTML = time.minute + ":" + time.second;
      // 2.计算比例
      let value = (newValue / this.totalTime) * 100;
      this.$refs.progressLine.style.width = value + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/variable";
@import "assets/css/mixin";

.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @include font_size($font_small);
      @include font_color();
    }
    .progress-bar {
      margin: 0 10px;
      width: 100%;
      height: 10px;
      background: rgba(0, 0, 0, 0.3);
      .progress-line {
        position: relative;
        width: 0%;
        height: 100%;
        @include bg_sub_color();
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          @include bg_sub_color();
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom-controll {
    width: 80%;
    margin: 0 auto;
    padding: 50px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      width: 84px;
      height: 83px;
    }
    .mode {
      &.loop {
        @include bg_img("~assets/images/loop");
      }
      &.one {
        @include bg_img("~assets/images/one");
      }
      &.random {
        @include bg_img("~assets/images/shuffle");
      }
    }
    .prev {
      @include bg_img("~assets/images/prev");
    }
    .play {
      @include bg_img("~assets/images/play");
      &.active {
        @include bg_img("~assets/images/pause");
      }
    }
    .next {
      @include bg_img("~assets/images/next");
    }
    .favorite {
      @include bg_img("~assets/images/un_favorite");
      &.active {
        @include bg_img("~assets/images/favorite");
      }
    }
  }
}
</style>