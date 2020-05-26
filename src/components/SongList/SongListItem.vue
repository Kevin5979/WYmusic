<template>
  <ul class="song-list">
    <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
      <img v-lazy="value.picUrl" />
      <div>
        <h3>{{value.name}}</h3>
        <p>{{value.singer}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SongListItem",
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(["setFullScreen", "setMiniPlayer", "setSongDetail"]),
    selectMusic(id) {
      this.setFullScreen(true);
      this.setSongDetail([id]);
    }
  }
};
</script>

<style scoped lang="scss">
@import "assets/css/mixin";
@import "assets/css/variable";

.song-list {
  width: 100%;
  overflow: hidden;
  .item {
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 20px;
      margin-right: 20px;
    }
    div {
      width: 70%;
      h3 {
        padding-right: 50px;
        box-sizing: border-box;
        @include font_size($font_large);
        @include font_color();
        @include clamp(1);
        @include no-wrap();
      }
      p {
        margin-top: 20px;
        opacity: 0.6;
        @include font_size($font_small);
        @include font_color();
        @include no-wrap();
      }
    }
  }
}
</style>