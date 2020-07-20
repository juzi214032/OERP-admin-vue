<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header">
        <div class="title">用户列表</div>
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
          :width="item.width ? item.width : ''">
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
import User from '@/model/user'

export default {
  components: {},
  data() {
    return {
      loading: false,
      total: 0,
      tableColumn: [{
        prop: 'userId',
        label: 'ID',
      }, {
        prop: 'name',
        label: '姓名',
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
      }, {
        prop: 'username',
        label: '用户名',
      }, {
        prop: 'phoneNumber',
        label: '手机号',
      }, {
        prop: 'identityNo',
        label: '身份证号',
      }, {
        prop: 'createTime',
        label: '注册时间',
        formatter(item) {
          return dayjs(item.createTime)
            .format('YYYY-MM-DD HH:mm')
        },
      }],
      tableData: [],
      pageOn: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getUser()
    this.loading = false
  },
  methods: {
    async getUser(pageOn = 1) {
      try {
        const data = await User.getUserList(pageOn)
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
      await this.getUser(pageOn)
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

      .title {
        height: 59px;
        line-height: 59px;
        color: $parent-title-color;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .pagination {
      display: flex;
      justify-content: flex-end;
      margin: 20px;
    }
  }
</style>
