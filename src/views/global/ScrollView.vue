<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
// 导入iscroll
import IScroll from "iscroll/build/iscroll-probe";

export default {
  name: "ScrollView",
  methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling(fn) {
      this.iscroll.on("scroll", function() {
        fn(this.y);
      });
    },
    // 重新获取高度
    refresh() {
      setTimeout(() => {
        this.iscroll.refresh();
      }, 100);
    },
    // 滚动元素的方法
    scrollTo(x, y, time) {
      this.iscroll.scrollTo(x, y, time);
    }
  },
  mounted() {
    // 这里能拿到页面元素
    this.iscroll = new IScroll(this.$refs.wrapper, {
      // 这里有坑: 移动端添加 click: true,tap: true,mouseWheel: true 使点击事件生效
      // click: true,
      // tap: true,
      mouseWheel: true,
      scrollbars: false, // 隐藏滚动条
      probeType: 3, // 监听滚动偏移位
      // 解决拖拽卡顿问题(禁用其他事件)
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    });
    // 由于数据时网络获取,这里需要重新设置高度(不推荐使用计时器)
    // setTimeout(() => {
    //   this.iscroll.refresh();
    // }, 3000);

    // 1.创建一个观察者对象
    /**
     * MutationObserver 构造函数只要监听到了指定内容发生类变化,就会执行传入的回调函数
     * mutationList: 发生变化的数组
     * observer: 观察者对象
     */
    let observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh();
    });

    // 2.告诉观察者对象,需要观察什么内容
    let config = {
      childList: true, // 观察目标子节点的变化,添加或删除
      subtree: true, // 默认为false,设置为true可以观察后代子节点
      attributeFilter: ["height", "offsetHeight"] // 观察特定属性
    };

    // 3.告诉观察者对象,我们需要观察什么谁,观察什么内容
    /**
     * 第一个参数: 观察谁
     * 第二个参数: 观察什么内容
     */
    observer.observe(this.$refs.wrapper, config);
  }
};
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>