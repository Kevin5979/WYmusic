<template>
  <ul class="detail-bottom">
    <li class="bottom-top" @click="selectAllMusic">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li v-for="value in tracks" :key="value.id" class="item" @click="selectMusic(value.id)">
      <h3>{{value.name}}</h3>
      <p>{{value.al.name}}-{{value.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DetailBottom",
  props: {
    tracks: {
      // 歌单列表
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(["setFullScreen", "setSongDetail"]),

    selectMusic(id) {
      // this.$store.dispatch("setFullScreen", true);
      this.setFullScreen(true);
      this.setSongDetail([id]);
    },
    selectAllMusic() {
      this.setFullScreen(true);
      let ids = this.tracks.map(item => item.id);
      this.setSongDetail([ids]);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/variable";
@import "assets/css/mixin";

.detail-bottom {
  width: 100%;
  li {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
  }
  .bottom-top {
    display: flex;
    align-items: center;
    border-radius: 50px 50px 0 0;
    .bottom-icon {
      width: 60px;
      height: 60px;
      @include bg_img("~assets/images/small_play");
    }
    .bottom-title {
      margin-left: 20px;
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item {
    padding: 20px;
    padding-right: 100px;
    box-sizing: border-box;
    h3 {
      @include font_color();
      @include font_size($font_medium);
      @include no-wrap();
    }
    p {
      @include font_color();
      @include font_size($font_small);
      margin-top: 10px;
      opacity: 0.6;
      @include no-wrap();
    }
  }
}
</style>