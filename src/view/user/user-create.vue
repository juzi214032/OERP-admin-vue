<template>
  <div class="container">
    <div class="title">新增用户</div>
    <div class="wrap"><user-info :groups="groups" /></div>
  </div>
</template>

<script>
import UserInfo from './user-info'

export default {
  components: {
    UserInfo,
  },
  data() {
    return {
      groups: [],
    }
  },
  async created() {

  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 0px 20px;
  }
}
</style>
