<template>
  <sea>
    <SeaTop
      slot="search"
      :form-data="formData"
      @filPerons="filPerons"
    />
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
</template>

<script>
import sea from '@/components/Listlayout/Index.vue'
import LbTable from '@/components/lb-table/lb-table.vue'
import SeaTop from './condtion/top.vue'
export default {
  components: { sea, LbTable, SeaTop },
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
      }
    }
  },
  methods: {
    // 过滤数组
    filPerons(fuzzySearch) {
      // 如果没有工龄，则使用默认值
      const numstart = fuzzySearch.numstart || 0
      const numend = fuzzySearch.numend || 999
      // 数组过滤
      this.formData.lists = this.formData.list.filter((p) => {
        return p.nick.indexOf(fuzzySearch.searchNike) !== -1 &&
        p.subject.indexOf(fuzzySearch.select) !== -1 &&
        p.job.indexOf(fuzzySearch.position) !== -1 &&
        p.phone.toString().indexOf(fuzzySearch.phone) !== -1 &&
        (numstart < p.year && p.year < numend)
      })
    },
    // 获取学科下拉数据
    searchSubject() {
      this.formData.list.forEach(value => {
        this.formData.dropDown.push(value.subject)
      })
      this.formData.dropDown = new Set(this.formData.dropDown)
    }
  }
}

</script>

<style scoped>
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
