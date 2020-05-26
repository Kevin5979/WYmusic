<template>
  <div class="detail-top">
    <div class="img-container">
      <img v-lazy="path" alt="">
      <div class="mask" ref="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailTop",
  props: {
    path: {
      type: String,
      require: true
    }
  },
  methods:{
    changeMask(opacity){
      this.$refs.mask.style.opacity = opacity
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-top{
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
  img{
    position: relative;
    width: 100%;
  }
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
  }
}
</style>