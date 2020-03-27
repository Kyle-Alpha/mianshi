<template>
  <div class="chart">
    <!-- 顶部卡片 -->
    <el-card>
      <ul>
        <li>
          <span class="circle">{{ topData.increment_users }}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span class="circle">{{ topData.total_users }}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="circle orange">{{ topData.increment_questions }}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="circle orange">{{ topData.total_questions }}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="circle green">{{ topData.total_done_questions }}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="circle green">{{ topData.personal_questions }}</span>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>

    <!-- 底部卡片 -->
    <el-card class="card-bottom">
      <div ref="box" class="box"></div>
    </el-card>
  </div>
</template>

<script>
import { dataTitle, dataStatistics } from '@/api/chart.js'

// 导入echarts
import echarts from 'echarts'

export default {
  data() {
    return {
      topData: {}
    }
  },
  created() {
    dataTitle().then(res => {
      this.topData = res.data.data
    })
  },

  mounted() {
    var myChart = echarts.init(this.$refs.box)

    // 接口在created里面调用一下
    dataStatistics().then(res => {
      let names = res.data.data.map(item => {
        return item.name
      })

      // 准备一个配置
      var option = {
        title: {
          text: '整体数据'
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: names
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data.data
          }
        ]
      }

      myChart.setOption(option)
    })
  }
}
</script>

<style lang="less">
.chart {
  .box {
    height: 500px;
  }

  .card-bottom {
    margin-top: 20px;
  }
  ul {
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;

    li {
      display: flex;
      // 修改主轴方向为y轴
      flex-direction: column;

      .circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid #2281db;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        margin-bottom: 20px;
        color: #2281db;
        // 交集，既要满足circle也要满足orange，两个类都要有
        &.orange {
          border-color: #dc6b54;
          color: dc6b54;
        }

        &.green {
          border-color: #74be8a;
          color: #74be8a;
        }
      }

      span {
        text-align: center;
      }
    }
  }
}
</style>
