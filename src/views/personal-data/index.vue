<template>
  <div>
    <sea>
      <div slot="search">
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
      <div slot="datay">
        <LbTable
          :column="formData.column"
          :data="formData.lists"
          :border="true"
          align="center"
        />
        <div v-show="formData.lists.length" class="dady">显示第1到{{ formData.lists.length }}条数据，共{{ formData.list.length }}条数据</div>
      </div>
    </sea>
  </div>
</template>

<script>
import { getTestList } from '@/api/personal-data'
import sea from '@/components/Listlayout/Index.vue'
import LbTable from '@/components/lb-table/lb-table.vue'
export default {
  components: { sea, LbTable },
  data() {
    return {
      formData: {
        column: [
          {
            prop: 'nick',
            label: '昵称'
          },
          {
            prop: 'phone',
            label: '手机号'
          },
          {
            prop: 'name',
            label: '真实姓名'
          },
          {
            prop: 'subject',
            label: '所属学科'
          },
          {
            prop: 'job',
            label: '职位'
          },
          {
            prop: 'year',
            label: '工作年限'
          },
          {
            prop: 'updateTime',
            label: '上传日期'
          },
          {
            prop: 'actions',
            label: '操作',
            render(_, scope) {
              return (
                <div>
                  <a>查看</a>
                  <a>编辑</a>
                  <a>删除</a>
                </div>
              )
            }
          }
        ],
        list: [],
        lists: [],
        dropDown: []
      },
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
      this.filPerons()
      this.searchSubject()
    })
  },
  methods: {
    // 过滤数组
    filPerons() {
      // 如果没有工龄，则使用默认值
      const numstart = this.fuzzySearch.numstart || 0
      const numend = this.fuzzySearch.numend || 999
      // 数组过滤
      this.formData.lists = this.formData.list.filter((p) => {
        return p.nick.indexOf(this.fuzzySearch.searchNike) !== -1 &&
        p.subject.indexOf(this.fuzzySearch.select) !== -1 &&
        p.job.indexOf(this.fuzzySearch.position) !== -1 &&
        p.phone.toString().indexOf(this.fuzzySearch.phone) !== -1 &&
        (numstart < p.year && p.year < numend)
      })
    },
    // 获取学科下拉数据
    searchSubject() {
      this.formData.list.forEach(value => {
        this.formData.dropDown.push(value.subject)
      })
      this.formData.dropDown = new Set(this.formData.dropDown)
    },
    // 重置按钮
    searchInput() {
      this.fuzzySearch.searchNike = ''
      this.fuzzySearch.select = ''
      this.fuzzySearch.position = ''
      this.fuzzySearch.numstart = ''
      this.fuzzySearch.numend = ''
      this.fuzzySearch.phone = ''
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
.cell a {
  margin-left: 5px;
}
.dady{
  font-size: 12px;
  border: 1px solid #ccc;
  height: 40px;
  line-height: 40px;
}
</style>
