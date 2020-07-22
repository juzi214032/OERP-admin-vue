<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="header-left"><p class="title">用户管理</p></div>
        <div class="header-right">
          <lin-search @query="onQueryChange" placeholder="输入姓名搜索"/>
        </div>
      </div>
      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :fit="true"
        :stripe="true"
        :data="tableData">
        <el-table-column
          type="selection"
          header-align="center"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="item in tableColumn"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :show-overflow-tooltip="true"
          :filters="item.filters ? item.filters : null"
          :filter-method="item.filterMethod ? item.filterMethod : null"
          :column-key="item.filterMethod ? item.prop : null"
          :formatter="item.formatter ? item.formatter : null"
          :sortable="item.sortable ? item.sortable : false"
          :fixed="item.fixed ? item.fixed : false"
          :min-width="item.minWidth ? item.minWidth : '80'"
          :width="item.width ? item.width : ''">
        </el-table-column>

        <el-table-column min-width="150" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              plain
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              plain
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
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
import User from '@/model/user'

export default {
  components: {
    LinSearch,
  },
  data() {
    return {
      loading: false,
      total: 0,
      tableColumn: [{
        prop: 'userId',
        label: 'ID',
        minWidth: 40,
      }, {
        prop: 'name',
        label: '姓名',
        minWidth: 80,
      }, {
        prop: 'gender',
        label: '性别',
        formatter(item) {
          if (item.gender === 0) {
            return '未知'
          }
          if (item.gender === 1) {
            return '男'
          }
          return '女'
        },
        minWidth: 60,
      }, {
        prop: 'username',
        label: '用户名',
        minWidth: 100,
      }, {
        prop: 'phoneNumber',
        label: '手机号',
        minWidth: 100,
      }, {
        prop: 'identityNo',
        label: '身份证号',
        minWidth: 200,
      }, {
        prop: 'education',
        label: '学历',
      }, {
        prop: 'createTime',
        label: '注册时间',
        minWidth: '150',
        formatter(item) {
          return dayjs(item.createTime)
            .format('YYYY-MM-DD HH:mm')
        },
      }],
      tableData: [],
      pageOn: 1,
      // 搜索关键词
      keyword: '',
    }
  },
  async created() {
    this.loading = true
    await this.getUser()
    this.loading = false
  },
  methods: {
    async getUser(pageOn = 1, keyword = '') {
      try {
        const data = await User.getUserList(pageOn, keyword)
        this.tableData = data.records
        this.total = data.total
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    async changePage(pageOn) {
      this.loading = true
      this.pageOn = pageOn
      await this.getUser(pageOn, this.keyword)
      this.loading = false
    },
    handleDelete(index, row) {
      this
        .$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          this.loading = true
          await User.deleteUser(row.userId)
          await this.getUser(this.pageOn)
          this.loading = false
        })
    },

    // 搜索框输入值
    async onQueryChange(keyword) {
      this.loading = true
      this.keyword = keyword
      await this.getUser(1, keyword)
      this.loading = false
    },
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
