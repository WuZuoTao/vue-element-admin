<template>
  <div class="container">
    <svitu-date #default=" {valuedate} " class="stide" :value="value" :rules="rules">
      <div class="left">活动名称</div>
      <el-input v-model="value" type="text" style="width: 50%" @blur="valuedate" />
    </svitu-date>
    <svitu-date class="stide">
      <div class="left">活动区域</div>
      <el-select v-model="region" placeholder="请选择" style="width: 50%">
        <el-option
          v-for="item in Regopm.list"
          :key="item.value"
          :label="item.region"
          :value="item.value"
        />
      </el-select>
    </svitu-date>
    <svitu-date #default=" {valuedate} " class="stide" :value="TimeDateAll" :rules="dates">
      <div class="left">活动时间</div>
      <el-input
        v-model="TimeDate.time"
        placeholder="请选择日期"
        prefix-icon="el-icon-date"
        style="width: 24%"
        @blur="valuedate"
      />
      <span>-</span>
      <el-input
        v-model="TimeDate.date"
        placeholder="请选择时间"
        prefix-icon="el-icon-search"
        style="width: 24%"
        @blur="valuedate"
      />
    </svitu-date>
    <svitu-date class="stide">
      <div class="left">即时配送</div>
      <el-switch
        v-model="value1"
        active-color="#409EFF"
      />
    </svitu-date>
    <svitu-date class="stide" :value="value" :rules="rules">
      <div class="left">活动性质</div>
      <div class="right-checkbox">
        <el-checkbox>美食/餐厅线上活动</el-checkbox>
        <el-checkbox>地推活动</el-checkbox>
        <el-checkbox>线下主题活动</el-checkbox>
        <el-checkbox>单纯品牌曝光</el-checkbox>
      </div>

    </svitu-date>
    <svitu-date class="stide" :value="value" :rules="rules">
      <div class="left">特殊资源</div>
      <el-radio v-model="radio" label="1">线上品牌商赞助</el-radio>
      <el-radio v-model="radio" label="2">线下场地免费</el-radio>
    </svitu-date>
    <svitu-date #default=" {valuedate} " :value="ActivityContent" :rules="rules" class="stide">
      <div class="left">活动形式</div><el-input
        v-model="ActivityContent"
        type="textarea"
        placeholder="请输入内容"
        style="width:50%"
        @blur="valuedate"
      />
    </svitu-date>
    <svitu-date class="stide">
      <el-button type="primary" class="btn-left">立即创建</el-button>
      <el-button>取消</el-button>
    </svitu-date>
  </div>
</template>

<script>
import SvituDate from './vitdata/svitudata.vue'
import { getRegionTest } from '@/api/rendurless'
export default {
  components: { SvituDate },
  data: () => ({
    value: '',
    value1: false,
    region: '',
    ActivityContent: '',
    radio: '',
    Regopm: {
      list: []
    },
    TimeDate: {
      time: '',
      date: ''
    },
    rules: [
      {
        test: function(value) {
          return /\S+/.test(value)
        },
        message: '输入框不能为空'
      }
    ],
    dates: [
      {
        test: function(value) {
          return /\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2}/.test(value)
        },
        message: '请正确输入格式xxxx-xx-xx xx:xx:xx'
      }
    ]
  }),
  computed: {
    TimeDateAll() {
      return this.TimeDate.time + this.TimeDate.date
    }
  },
  created() {
    getRegionTest().then(res => {
      const { code, data } = res
      if (code === 20000) {
        const { items } = data
        this.Regopm.list = items
      }
    })
  }

}
</script>

<style scoped>
.container{
    width: 700px;
    margin: 20px 0 0 80px;
    position: relative;
}
.stide{
    margin-top: 20px;
    display: flex;
    align-items: center;
}
.stide .left {
    width: 80px;
}
.right-checkbox{
    height: 70px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.el-checkbox{
    margin-top: 10px;
}
span{
    padding: 0 5px;
}
.btn-left {
    margin-left: 80px;
}
</style>
