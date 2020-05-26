<template>
  <Header>
    <div slot="left" class="header-left" @click.stop="back"></div>
    <p slot="center" class="header-title">{{title}}</p>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from "views/global/Header";

export default {
  name: "SubHeader",
  props: {
    title: {
      type: String,
      rewuired: true
    }
  },
  components: {
    Header
  },
  methods: {
    back() {
      window.history.back();
    }
  },
  mounted() {
    // 获取主题
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/variable";
@import "assets/css/mixin";

.header-left {
  @include bg_img("~assets/images/back");
}
.header-right {
  @include bg_img("~assets/images/more");
}

.header-title {
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-weight: bold;
  @include font_size($font_medium);
  @include no-wrap();
}
</style>

