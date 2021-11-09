<template>
  <div>
    <sea>
      <div slot="search">
        <div class="header">
          <div class="header-input">
            <span class="header-span">昵称</span>
            <input
              v-model="searchNike"
              placeholder="昵称"
            >
          </div>
          <div class="header-input">
            <span class="header-span">所属学科</span>
            <select v-model="select" placeholder="请选择">
              <option v-for="(item ,index) in formData.column" :key="index">{{ item }}</option>
            </select>
          </div>
          <div class="header-input">
            <span class="header-span">职位</span>
            <input
              placeholder="职位"
            >
          </div>
          <div class="header-input">
            <span class="header-span">工作年限</span>
            <input
              placeholder="起"
              style="width:60px"
            >
            <input
              placeholder="止"
              style="width:60px"
            >
          </div>
          <div class="header-input">
            <span class="header-span">手机号</span>
            <input
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
      <div slot="datay">
        <div>
          <el-table
            border
            :data="formData.lists"
            align="center"
            size="12"
          >
            <el-table-column
              type="selection"
              width="40"
            />
            <el-table-column
              prop="nick"
              label="昵称"
              align="center"
            />
            <el-table-column
              prop="phone"
              label="手机号"
              align="center"
            />
            <el-table-column
              prop="name"
              label="真实姓名"
              align="center"
            />
            <el-table-column
              prop="subject"
              label="所属学科"
              align="center"
            />
            <el-table-column
              prop="job"
              label="职位"
              align="center"
            />
            <el-table-column
              prop="year"
              label="工作年限"
              align="center"
            />
            <el-table-column
              prop="updateTime"
              label="录入时间"
              align="center"
              min-width="120"
            />
            <el-table-column
              label="操作"
              align="center"
              min-width="100"
            >
              <el-link type="primary">查看</el-link>
              <el-link type="primary">编辑</el-link>
              <el-link type="primary">删除</el-link>
            </el-table-column></el-table>
          <div v-show="formData.lists.length" class="jl">显示第1到{{ formData.lists.length }}行,总共{{ formData.lists.length }}条记录</div>
        </div>
      </div>
    </sea>
  </div>
</template>

<script>
import { getTestList } from '@/api/personal-data'
import sea from './operation/index.vue'
export default {
  components: { sea },
  data() {
    return {
      formData: {
        column: [],
        list: [],
        lists: []
      },
      searchNike: '',
      select: ''
    }
  },
  created() {
    getTestList().then(res => {
      const { code, data } = res
      if (code === 20000) {
        const { items } = data
        this.formData.list = items
        // 初始化一次过滤
        this.filPerons()
        this.searchSubject()
      }
    })
  },
  methods: {
    // 过滤数组
    filPerons() {
      this.formData.lists = this.formData.list.filter((p) => {
        return p.nick.indexOf(this.searchNike) !== -1 && p.subject.indexOf(this.select) !== -1
      })
    },
    // 获取学科下拉数据
    searchSubject() {
      this.formData.list.forEach(value => {
        this.formData.column.push(value.subject)
      })
      this.formData.column = new Set(this.formData.column)
    },
    // 重置按钮
    searchInput() {
      this.searchNike = ''
      this.select = ''
      this.filPerons()
    }
  }
}
</script>

<style>
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
/* ******************************** */
.el-table-clumn{
  font-size: 12px;
}
.el-link{
  padding-left: 5px;
}
.jl{
  width: 100%;
  line-height: 50px;
  font-size: 12px;
  border: 1px solid #dcdfe6;
}
</style>
