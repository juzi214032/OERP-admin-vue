<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="header-left"><p class="title">报名记录</p></div>
        <div class="header-right">
          <lin-search @query="onQueryChange" placeholder="输入姓名搜索"/>
        </div>
      </div>
      <!-- 表格 -->
      <el-table v-loading="loading" :fit="true" :stripe="true" :data="tableData">
        <el-table-column type="selection" header-align="center" width="55"/>
        <el-table-column label="考生" prop="name" width="100"/>
        <el-table-column label="性别" prop="gender" width="60" :formatter="formatGender"/>
        <el-table-column label="学历" prop="education" min-width="60"/>
        <el-table-column label="学校" prop="school" min-width="120"/>
        <el-table-column label="身份证号" prop="identityNo" width="200"/>
        <el-table-column label="考试名称" prop="title" min-width="160"/>
        <el-table-column label="考试时间" prop="examTime" width="160" :formatter="formatDate"/>
        <el-table-column label="报名时间" prop="createTime" width="160" :formatter="formatDate"/>
        <el-table-column label="状态" prop="status" width="120" :formatter="formatStatus">
          <template #default="{row}">
            <el-tag :type="judgeStatusType(row.status)" effect="plain" size="mini">{{formatStatus(null,null,row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="success" :disabled="scope.row.status===0||scope.row.status===2" @click="handleAuditPassButton(scope.row.applyId)">通过</el-button>
            <el-button size="mini" plain :disabled="scope.row.status===0||scope.row.status===3" @click="handleAuditRefuseButton(scope.row.applyId)">拒绝</el-button>
            <el-button size="mini" plain type="danger" @click="handleDelete(scope.row.applyId)">删除</el-button>
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
import applyModel from '@/model/apply'

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
    await this.getApplyList()
    this.loading = false
  },
  methods: {
    async getApplyList(pageOn = 1, keyword = '') {
      try {
        const data = await applyModel.getApplyList(pageOn, 10, keyword)
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
      await this.getApplyList(pageOn, this.keyword)
      this.loading = false
    },

    // 搜索框输入值
    async onQueryChange(keyword) {
      this.loading = true
      this.keyword = keyword
      await this.getApplyList(1, keyword)
      this.loading = false
    },

    // 点击删除按钮
    handleDelete(applyId) {
      this
        .$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          this.loading = true
          await applyModel.deleteApplyList(applyId)
          this.$message.success('删除成功')
          await this.getApplyList(this.pageOn)
          this.loading = false
        })
    },


    // 点击审核通过按钮
    handleAuditPassButton(applyId) {
      this
        .$confirm('是否通过该用户的报名申请', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          this.loading = true
          await applyModel.auditApply(applyId, 2)
          this.$message.success('审核成功')
          await this.getApplyList(this.pageOn)
          this.loading = false
        })
    },

    // 点击审核拒绝按钮
    handleAuditRefuseButton(applyId) {
      this
        .$confirm('是否拒绝该用户的报名申请', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          this.loading = true
          await applyModel.auditApply(applyId, 3)
          this.$message.success('审核成功')
          await this.getApplyList(this.pageOn)
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

    judgeStatusType(status) {
      const statusMap = new Map()
      statusMap.set(0, 'info')
      statusMap.set(1, 'waring')
      statusMap.set(2, 'success')
      statusMap.set(3, 'danger')

      return statusMap.get(status)
    }
  },
}
</script>

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
