<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{title}}</h3>
    </div>
    <div class="personalized-list">
      <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
        <div class="image">
          <img v-lazy="value.picUrl" :alt="value.name" />
          <div>
            <i></i>
            <span>{{value.playCount | playCount}}</span>
          </div>
        </div>
        <p>{{value.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personalized",
  props: {
    personalized: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    selectItem(id) {
      let path = "/recommend/" + this.type;
      this.$router.push({
        path,
        query: {
          id
        }
      });
    }
  },
  filters: {
    // 歌单播放量
    playCount(value) {
      if (value >= 10000) {
        return parseInt(value / 10000) + "万";
        if (value > 100000000) {
          return parseInt(value / 100000000) + "亿";
        }
      } else {
        return value;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/mixin";
@import "assets/css/variable";
.personalized {
  @include bg_sub_color();
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3 {
      font-weight: bold;
      @include font_size($font_large);
      @include font_color();
    }
  }
  .personalized-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .item {
      width: 200px;
      padding-bottom: 10px;
      .image {
        width: 200px;
        height: 200px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
        div {
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: #fff;
          @include font-size($font_medium_s);
          z-index: 9;
          display: flex;
          justify-content: start;
          align-items: center;
          i {
            display: block;
            width: 36px;
            height: 36px;
            background: url("~assets/images/all_play.png") no-repeat;
            background-size: cover;
          }
          span {
            margin: 8px 0 0 8px;
            font-weight: 500;
          }
        }
      }
      p {
        @include clamp(2);
        @include font_color();
        @include font-size($font_medium_s);
        text-align: center;
      }
    }
  }
}
</style>