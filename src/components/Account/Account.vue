<template>
  <transition appear>
    <div class="account">
      <AccountHeader @switchItem="switchItem" />
      <AccountBottom :switchNum="switchNum" />
    </div>
  </transition>
</template>

<script>
import AccountHeader from "./AccountHeader";
import AccountBottom from "./AccountBottom";
import MetaInfo from "../../../vue-meta-info";
export default {
  name: "Account",
  MetaInfo: MetaInfo.recommend,
  data() {
    return {
      switchNum: 0
    };
  },
  methods: {
    switchItem(index) {
      this.switchNum = index;
    }
  },
  components: {
    AccountHeader,
    AccountBottom
  }
};
</script>

<style scoped lang="scss">
@import "assets/css/mixin";
@import "assets/css/variable";

.account {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @include bg_sub_color();
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