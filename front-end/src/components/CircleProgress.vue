<template>
  <div class="progress">
    <div class="label">{{ hasPercent ? val + '%' : val }}</div>
    <div class="pie-wrap" ref="pie"></div>
    <h3>{{ title }}</h3>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/pie";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

export default {
  name: "circleprogress",
  props: {
    title: { type: String, required: true },
    val: { type: Number, required: true },
    hasPercent: { type: Boolean, required: true, default: false }
  },
  data() {
    return {};
  },
  mounted() {
    this.initCircle();
  },
  created() {},
  watch: {
    val: function() {
      this.initCircle();
    }
  },
  methods: {
    initCircle() {
      let data = [];
      if (this.hasPercent) {
        data.push({ value: this.val, name: "" });
        data.push({ value: 100 - this.val, name: "" });
      } else {
        data.push({ value: 0, name: "" });
        data.push({ value: 100, name: "" });
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.pie);
      // 绘制图表
      myChart.setOption({
        color: ["rgb(140,125,200)", "rgb(223, 223, 223)"],
        series: [
          {
            name: this.title,
            type: "pie",
            radius: ["90%", "100%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "center",
                textStyle: {
                  fontSize: "48",
                  fontWeight: "bold"
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin hwwrap {
  width: px2rem(175);
  height: px2rem(175);
}
.progress {
  position: relative;
  text-align: center;
  color: #000;

  .label {
    line-height: px2rem(175);
    position: absolute;
    @include hwwrap;
    left: px2rem(0);
    top: px2rem(0);
    font-size: px2rem(52);
    span {
      vertical-align: super;
      font-size: px2rem(42);
    }
  }
  h3 {
    font-size: $text-size;
    padding: px2rem(27) 0 px2rem(52);
    line-height: $text-size;
  }
  .pie-wrap {
    @include hwwrap;
  }
}
</style>
