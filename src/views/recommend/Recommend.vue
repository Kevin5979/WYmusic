<template>
  <div class="recommend">
    <div class="recommend-warpper">
      <ScrollView>
        <div>
          <Banner :banners="banners" />
          <Personalized :personalized="song_sheet" :title="'推荐歌单'" :type="'personalized'" />
          <Personalized :personalized="albums" :title="'最新专辑'" :type="'album'" />
          <SongList :songs="songs" />
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getNewAlbum, getNewsong } from "api";

import ScrollView from "views/global/ScrollView";
import Banner from "components/Recommend/Banner";
import Personalized from "components/Recommend/Personalized";
import SongList from "components/SongList/SongList";
import MetaInfo from "../../../vue-meta-info";
export default {
  name: "Recommend",
  MetaInfo: MetaInfo.recommend,
  data() {
    return {
      banners: [],
      song_sheet: [],
      albums: [],
      songs: []
    };
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  created() {
    // 轮播图
    getBanner()
      .then(data => {
        this.banners = data.banners;
      })
      .catch(err => {
        console.log(err);
      });

    // 推荐歌单
    getPersonalized()
      .then(data => {
        this.song_sheet = data.result;
      })
      .catch(err => {
        console.log(err);
      });
    // 最新专辑
    getNewAlbum()
      .then(data => {
        this.albums = data.albums.splice(0, 6);
      })
      .catch(err => {
        console.log(err);
      });
    // 最新音乐
    getNewsong()
      .then(data => {
        // this.songs = data.result;
        let list = [];
        data.result.forEach(value => {
          let obj = {};
          obj.id = value.id;
          obj.name = value.name;
          obj.picUrl = value.song.album.picUrl;
          let singer = value.song["artists"][0].name;
          let len = value.song["artists"].length;
          while (len > 1) {
            singer += "、" + value.song["artists"][len - 1].name;
            len -= 1;
          }
          obj.singer = singer;
          list.push(obj);
        });
        this.songs = list;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
}

.recommend-warpper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.v-enter {
  transform: translateX(100%);
}

.v-enter-to {
  transform: translateX(0%);
}

.v-enter-active {
  transition: transform 0.5s;
}

.v-leave {
  transform: translateX(0%);
}

.v-leave-to {
  transform: translateX(100%);
}

.v-leave-active {
  transition: transform 0.5s;
}
</style>