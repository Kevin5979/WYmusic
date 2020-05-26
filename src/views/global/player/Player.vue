<template>
  <div id="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currTime" />
    <MiniPlayer />
    <ListPlayer />
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="ended"></audio>
  </div>
</template>

<script>
import NormalPlayer from "./NormalPlayer";
import MiniPlayer from "./MiniPlayer";
import ListPlayer from "./ListPlayer";

import { mapGetters, mapActions } from "vuex";
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from "tools";
import mode from "store/modeType";

export default {
  name: "Player",
  data() {
    return {
      totalTime: 0,
      currTime: 0
    };
  },
  methods: {
    ...mapActions([
      "setCurrentIndex",
      "setFavoriteList",
      "setHistorySong",
      "setHistoryList"
    ]),
    timeupdate(e) {
      this.currTime = e.target.currentTime;
    },
    ended() {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1);
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play();
      } else if (this.modeType === mode.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1);
        this.setCurrentIndex(index);
      }
    }
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      "currentSong",
      "isPlaying",
      "currentIndex",
      "currentTime",
      "modeType",
      "songs",
      "favoriteList",
      "historyList"
    ])
  },
  watch: {
    isPlaying(newValue, oldValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong);
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    currentIndex(newValue, oldValue) {
      /**
       * 注意点：在IOS中系统不会自动加载歌曲,所以oncanplay永远不会执行
       * 解决方案：如何监听IOS中歌曲已经准备好了,通过ondurationchange事件来监听
       * ondurationchange 当歌曲加载完成后执行
       */
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration;
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong);
          this.$refs.audio.play();
        } else {
          this.$refs.audio.pause();
        }
      };
    },
    currentTime(newValue, oldValue) {
      this.$refs.audio.currentTime = newValue;
    },
    favoriteList(newValue, oldValue) {
      setLocalStorage("favoriteList", newValue);
    },
    historyList(newValue, oldValue) {
      setLocalStorage("historyList", newValue);
    }
  },
  created() {
    let favoriteList = getLocalStorage("favoriteList");
    if (favoriteList === null) {
      return;
    }
    this.setFavoriteList(favoriteList);

    let historyList = getLocalStorage("historyList");
    if (historyList === null) {
      return;
    }
    this.setHistoryList(historyList);
  },
  mounted() {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration;
    };
  }
};
</script>