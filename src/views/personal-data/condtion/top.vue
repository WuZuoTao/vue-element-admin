<template>
  <div>
    <div class="header">
      <div class="header-input">
        <span class="header-span">昵称</span>
        <input
          v-model="fuzzySearch.searchNike"
          placeholder="昵称"
        >
      </div>
      <div class="header-input">
        <span class="header-span">所属学科</span>
        <select v-model="fuzzySearch.select" placeholder="请选择">
          <option v-for="(item ,index) in formData.dropDown" :key="index">{{ item }}</option>
        </select>
      </div>
      <div class="header-input">
        <span class="header-span">职位</span>
        <input
          v-model="fuzzySearch.position"
          placeholder="职位"
        >
      </div>
      <div class="header-input">
        <span class="header-span">工作年限</span>
        <input
          v-model="fuzzySearch.numstart"
          placeholder="起"
          style="width:60px"
        >
        <input
          v-model="fuzzySearch.numend"
          placeholder="止"
          style="width:60px"
        >
      </div>
      <div class="header-input">
        <span class="header-span">手机号</span>
        <input
          v-model="fuzzySearch.phone"
          placeholder="手机号"
        >
      </div>
      <div class="header-input-button">
        <el-button type="primary" icon="el-icon-search" size="small" @click="filPerons">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh-right" size="small" @click="searchInput">重置</el-button>
      </div>
    </div>
    <el-button-group>
      <el-button icon="el-icon-refresh-right" size="small" />
      <el-button icon="el-icon-share" size="small" />
      <el-button icon="el-icon-delete" size="small" />
    </el-button-group>
  </div>
</template>

<script>
import { getTestList } from '@/api/personal-data'
export default {
  name: 'Top',
  // eslint-disable-next-line vue/require-prop-types
  props: ['formData'],
  data() {
    return {
      fuzzySearch: {
        searchNike: '', // 昵称
        select: '', // 下拉
        position: '', // 职位
        numstart: '', // 工龄 起始
        numend: '', // 工龄 结束
        phone: '' // 手机号
      }
    }
  },
  created() {
    getTestList().then(res => {
      const { code, data } = res
      if (code === 20000) {
        const { items } = data
        return items
      }
    }).then(res => {
      this.formData.list = res
      // 初始化一次过滤
      this.$emit('filPerons', this.fuzzySearch)
      this.$emit('searchSubject')
    })
  },
  methods: {
    filPerons() {
      this.$emit('filPerons', this.fuzzySearch)
    },
    // 重置按钮
    searchInput() {
      this.fuzzySearch.searchNike = ''
      this.fuzzySearch.select = ''
      this.fuzzySearch.position = ''
      this.fuzzySearch.numstart = ''
      this.fuzzySearch.numend = ''
      this.fuzzySearch.phone = ''
      this.$emit('filPerons', this.fuzzySearch)
    }
  }
}
</script>

<style scoped>

.header{
  display: flex;
}
.header-input{
  display: flex;
  font-size: 14px;
  line-height: 28px;
  margin-right: 10px;
  width: 17%;
}
.header-input .header-span{
  display: inline-block;
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  text-align: center;
}
.header-input input{
  width: 140px;
  padding-left: 10px;
  color: #000;
  border: 1px solid #dcdfe6;
}
.header-input input:focus {
  outline:none;
  border: 1px solid #dcdfe6;
}
.header-input select{
  width: 100px;
  padding-left: 10px;
  color: #000;
  border: 1px solid #dcdfe6;
}
.header-input select:focus {
  outline:none;
  border: 1px solid #dcdfe6;
}
.header-input-button {
  width: 15%;
}
.el-button-group{
  float: right;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
