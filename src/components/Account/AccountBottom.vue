<template>
  <div class="account-bottom">
    <div class="bottom-play" @click="selectAllMusic">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem :songs="switchNum === 0 ? favoriteList : historyList" />
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from "views/global/ScrollView";
import SongListItem from "components/SongList/SongListItem";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "AccountBottom",
  props: {
    switchNum: {
      type: Number,
      required: true
    }
  },
  components: {
    ScrollView,
    SongListItem
  },
  methods: {
    ...mapActions(["setFullScreen", "setSongDetail", "setCurrentIndex"]),
    ...mapMutations(["SET_SONG_DETAIL"]),
    // 优化性能
    selectAllMusic() {
      // let ids = [];
      if (this.switchNum === 0) {
        // ids = this.favoriteList.map(item => item.id);
        this.SET_SONG_DETAIL(this.favoriteList);
      } else {
        // ids = this.historyList.map(item => item.id);
        this.SET_SONG_DETAIL(this.historyList);
      }
      this.setFullScreen(true);
      this.setCurrentIndex(0);
      // this.setSongDetail(ids);
    }
  },
  computed: {
    ...mapGetters(["favoriteList", "historyList"])
  }
};
</script>

<style scoped lang="scss">
@import "assets/css/mixin";
@import "assets/css/variable";

.account-bottom {
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
}
.bottom-play {
  width: 260px;
  height: 60px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  @include border_color();
  border-radius: 30px;
  span {
    display: inline-block;
    &:nth-of-type(1) {
      width: 46px;
      height: 46px;
      @include bg_img("~assets/images/small_play");
      margin-right: 20px;
    }
  }
}
.bottom-wrapper {
  position: fixed;
  top: 200px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>