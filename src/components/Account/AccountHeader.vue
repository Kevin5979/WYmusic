<template>
  <Header>
    <div slot="left" class="header-left" @click.stop="back"></div>
    <ul slot="center" class="header-title">
      <li :class="{'active':switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
      <li :class="{'active':switchNum === 1}" @click.stop="switchItem(1)">最近听的</li>
    </ul>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from "views/global/Header";

export default {
  name: "AccountHeader",
  data() {
    return {
      switchNum: 0
    };
  },
  components: {
    Header
  },
  methods: {
    back() {
      window.history.back();
    },
    switchItem(index) {
      this.switchNum = index;
      this.$emit("switchItem", index);
    }
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  border-bottom: 1px solid #fff;
  border-radius: 15px;
  @include font_size($font_medium);
  @include no-wrap();
  height: 60px;
  margin-top: 20px;
  li {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    &:nth-of-type(1) {
      border-right: 1px solid #fff;
    }
    &.active {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>

