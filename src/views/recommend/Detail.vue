<template>
  <div class="detail">
    <DetailHeader :title="playlist.name" />
    <DetailTop :path="playlist.coverImgUrl" ref="top" />
    <div class="bottom">
      <ScrollView ref="scrollView">
        <DetailBottom :tracks="tracks" />
      </ScrollView>
    </div>
  </div>
</template>

<script>
import { getPlayList, getAlbum, getArtistsSongs, getTopList } from "api";
import DetailHeader from "components/Detail/DetailHeader";
import DetailTop from "components/Detail/DetailTop";
import DetailBottom from "components/Detail/DetailBottom";
import ScrollView from "views/global/ScrollView";
import MetaInfo from "../../../vue-meta-info";

export default {
  name: "Detail",
  MetaInfo: MetaInfo.recommend,
  data() {
    return {
      playlist: {},
      tracks: []
    };
  },
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  created() {
    if (this.$route.path.includes("personalized")) {
      // 歌单详情
      getPlayList({
        id: this.$route.query.id
      })
        .then(data => {
          this.playlist = data.playlist;
          this.tracks = this.playlist.tracks;
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.$route.path.includes("album")) {
      // 专辑详情
      getAlbum({
        id: this.$route.query.id
      })
        .then(data => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl
          };
          this.tracks = data.songs;
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.$route.path.includes("singer")) {
      // 歌手详情
      getArtistsSongs({
        id: this.$route.query.id
      })
        .then(data => {
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl
          };
          this.tracks = data.hotSongs;
        })
        .catch(err => {
          console.log(err);
        });
    } else if (this.$route.path.includes("rank")) {
      // 排行榜详情
      getTopList({
        idx: this.$route.query.id
      })
        .then(data => {
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl
          };
          this.tracks = data.playlist.tracks;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // this.$refs.top.$el : 获取组件根元素
    let defaultHeight = this.$refs.top.$el.offsetHeight;
    // 监听滚动
    this.$refs.scrollView.scrolling(offsetY => {
      if (offsetY < 0) {
        // 向上滚动
        let opacity = Math.abs(offsetY) / defaultHeight;
        this.$refs.top.changeMask(opacity);
        // 高斯模糊效果十分消耗性能的，不推荐使用，非要使用，建议只设置一次
        // let scale = 1 + Math.abs(offsetY) / defaultHeight;
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
      } else {
        // 向上滚动
        let scale = 1 + offsetY / defaultHeight;
        this.$refs.top.$el.style.transform = `scale(${scale})`;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/mixin";

.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>