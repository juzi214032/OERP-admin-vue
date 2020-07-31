<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="header-left"><p class="title">考试管理</p></div>
        <div class="header-right">
          <lin-search @query="onQueryChange" placeholder="输入考试名称搜索"/>
        </div>
      </div>
      <!-- 表格 -->
      <el-table v-loading="loading" :fit="true" :stripe="true" :data="tableData">
        <el-table-column type="selection" header-align="center" width="55"/>
        <el-table-column label="名称" prop="title" min-width="20"/>
        <el-table-column class="table-column" label="描述" :show-overflow-tooltip="true" prop="description"/>
        <el-table-column class="table-column" label="报名费用" prop="price" width="100"/>
        <el-table-column label="报名开始时间" prop="beginTime" width="160" :formatter="formatDate"/>
        <el-table-column label="报名截止时间" prop="endTime" width="160" :formatter="formatDate"/>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" plain type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          @current-change="changePage"
          :background="true"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import LinSearch from '@/component/base/search/lin-search'
import examModel from '@/model/exam'

export default {
  components: {
    LinSearch,
  },
  data() {
    return {
      loading: false,
      total: 0,
      tableData: [],
      pageOn: 1,
      // 搜索关键词
      keyword: '',
    }
  },
  async created() {
    this.loading = true
    await this.getExamList()
    this.loading = false
  },
  methods: {
    async getExamList(pageOn = 1, keyword = '') {
      try {
        const data = await examModel.getExamList(pageOn, 10, keyword)
        this.tableData = data.data.records
        this.total = data.data.total
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    async changePage(pageOn) {
      this.loading = true
      this.pageOn = pageOn
      await this.getExamList(pageOn, this.keyword)
      this.loading = false
    },

    // 搜索框输入值
    async onQueryChange(keyword) {
      this.loading = true
      this.keyword = keyword
      await this.getExamList(1, keyword)
      this.loading = false
    },

    // 点击删除按钮
    handleDelete(examId) {
      console.log('examId', examId)
      this
        .$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          this.loading = true
          await examModel.deleteExam(examId)
          this.$message.success('删除成功')
          await this.getExamList(this.pageOn)
          this.loading = false
        })
    },


    // 格式化状态信息
    formatStatus(row, column, cellValue) {
      if (cellValue === 0) {
        return '待支付'
      }
      if (cellValue === 1) {
        return '待审核'
      }
      if (cellValue === 2) {
        return '通过'
      }
      if (cellValue === 3) {
        return '拒绝'
      }
    },

    // 格式化日期
    formatDate(row, column, cellValue) {
      return dayjs(cellValue)
        .format('YYYY-MM-DD HH:mm')
    },

    // 格式化性别
    formatGender(row, column, cellValue) {
      if (cellValue === 0) {
        return '未知'
      }
      if (cellValue === 1) {
        return '男'
      }
      if (cellValue === 2) {
        return '女'
      }
    },
  },
}
</script>

<style>
.el-tooltip__popper {
  max-width: 20%;
}

.el-tooltip__popper, .el-tooltip__popper.is-dark {
  font-size: 14px;
  line-height: 1.5;
  background: #f5f5f5 !important;
  color: #303133 !important;
}
</style>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    border-bottom: 1px solid #dae1ed;

    .header-left {
      float: left;

      .title {
        height: 59px;
        line-height: 59px;
        color: $parent-title-color;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .header-right {
      float: right;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
