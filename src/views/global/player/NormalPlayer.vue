<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div id="normal-player" v-show="this.isFullScreen">
      <div class="player-warpper">
        <PlayerHeader />
        <PlayerMiddle :currentTime="currentTime" />
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime" />
      </div>
      <div class="play-bg">
        <img :src="currentSong.picUrl" />
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from "./PlayerHeader";
import PlayerMiddle from "./PlayerMiddle";
import PlayerBottom from "./PlayerBottom";
import { mapGetters, mapActions } from "vuex";

import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui";

export default {
  name: "NormalPlayer",
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
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  methods: {
    ...mapActions(["setSongLyric"]),
    enter(el, done) {
      Velocity(el, "transition.shrinkIn", { duration: 500 }, function() {
        done();
      });
    },
    leave(el, done) {
      Velocity(el, "transition.shrinkOut", { duration: 500 }, function() {
        done();
      });
    }
  },
  computed: {
    ...mapGetters(["isFullScreen", "currentSong"])
  },
  // 只要歌曲一变化，就切换歌词
  watch: {
    currentSong(newValue, oldValue) {
      if (newValue.id === undefined) {
        return;
      }
      this.setSongLyric(newValue.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/variable";
@import "assets/css/mixin";

#normal-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .player-warpper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
  }
  .play-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(50px);
      opacity: .4;
    }
  }
}
</style>