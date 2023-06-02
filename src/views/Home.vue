<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>

    <el-col :span="6">
      <div class="grid-content bg-purple">
        <div class="userMessage">
          <el-card shadow="hover">
            <!-- 用户信息 -->
            <el-avatar :size="200" shape="square" :src="avatarSrc"></el-avatar>
            <div class="userDisplay">
              <h3>用户名</h3>
              <p>用户身份</p>
              <el-divider></el-divider>
            </div>
          </el-card>
        </div>
        <!-- 左侧列表 -->
        <el-card>
          鼠标悬浮时显示
          鼠标悬浮时显示
          鼠标悬浮时显示
          鼠标悬浮时显示
          鼠标悬浮时显示
          鼠标悬浮时显示
          鼠标悬浮时显示
          鼠标悬浮时显示
          鼠标悬浮时显示
        </el-card>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="grid-content bg-purple echart">
        <div class="echart1">
          <el-card>
            <div id="main" style="width: 600px;height:400px;"></div>
          </el-card>
        </div>
        <div class="echart2">
          <el-card>
            <div id="minor" style="width: 600px;height:400px;"></div>
          </el-card>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as echarts from 'echarts';
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      avatarSrc: (state) => state.tab.avatarSrc
    })
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('main'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
    // 第二个图表
    let myChart1 = echarts.init(document.getElementById('minor'))
    // 绘制图表
    myChart1.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
}
</script>

<style lang="less" scoped>
.userMessage {
  padding: 0 20px 20px 0;
}

.echart {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>