<template>
  <div id="app">
    <MainHeader />
    <Tabbar />
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
    <Player />
  </div>
</template>

<script>
import MainHeader from "views/global/MainHeader";
import Tabbar from "views/global/Tabbar";
import Player from "views/global/player/Player";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    MainHeader,
    Tabbar,
    Player
  }
};
</script>>
