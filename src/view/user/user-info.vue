<template>
  <div class="container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      :label-position="labelPosition"
      ref="form"
      label-width="100px"
      @submit.native.prevent
      class="container-form"
    >
      <div class="container-wrapper">
        <div class="container-left">
          <el-form-item label="账号" prop="username">
            <el-input size="medium" clearable v-model="form.username" :disabled="isEdited"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input size="medium" clearable v-model="form.phoneNumber" :disabled="isEdited"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="identityNo">
            <el-input size="medium" clearable v-model="form.identityNo" :disabled="isEdited"></el-input>
          </el-form-item>
          <el-form-item v-if="pageType === 'add'" label="密码" prop="password">
            <el-input size="medium" clearable type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item v-if="pageType === 'add'" label="确认密码" prop="confirm_password" label-position="top">
            <el-input size="medium" clearable type="password" v-model="form.confirm_password"></el-input>
          </el-form-item>
        </div>

        <div class="container-right">
          <el-form-item label="昵称" prop="nickname">
            <el-input size="medium" clearable v-model="form.nickname" :disabled="isEdited"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input size="medium" clearable v-model="form.name" :disabled="isEdited"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birthday">
            <el-input size="medium" clearable v-model="form.birthday" :disabled="isEdited"></el-input>
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-input size="medium" clearable v-model="form.school" :disabled="isEdited"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-input size="medium" clearable v-model="form.education" :disabled="isEdited"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-form-item v-show="submit" class="submit">
        <el-button class="button" style="margin-right: 50px" @click="resetForm('form')">重 置</el-button>
        <el-button class="button" size="medium" type="primary" :loading="loading" @click="submitForm('form')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Admin from '@/lin/model/admin'
import User from '@/lin/model/user'

export default {
  props: {
    submit: {
      type: Boolean, // 表单是否显示功能按钮
      default: true,
    },
    id: {
      // 用户id
      type: Number,
      default: undefined,
    },
    labelPosition: {
      // 表单label位置
      type: String,
      default: 'right',
    },
    info: {
      // 用户信息
      type: Object,
      default: () => {
      },
    },
    pageType: {
      type: String,
      default: 'add', // 区分编辑页面/添加页面
    },
  },
  inject: ['eventBus'],
  data() {
    // 验证回调函数
    const checkUserName = (rule, value, callback) => {
      // eslint-disable-line
      if (!value) {
        callback(new Error('用户名不能为空'))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位数'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('confirm_password')
        }
        callback()
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false, // 加载动画
      isEdited: false, // 能否编辑
      form: {
        username: '',
        password: '',
        confirm_password: '',
      },
      // 验证规则
      rules: {
        username: [
          {
            validator: checkUserName,
            trigger: ['blur', 'change'],
            required: true,
          },
        ],
        phoneNumber: [{
          message: '手机号不能为空',
          required: true,
        }],
        identityNo: [{
          message: '身份证号不能为空',
          required: true,
        }],
        password: [{
          validator: validatePassword,
          trigger: 'blur',
          required: true,
        }],
        confirm_password: [{
          validator: validatePassword2,
          trigger: 'blur',
          required: true,
        }],
        nickname: [{
          message: '昵称不能为空',
          required: true,
        }],
        name: [{
          message: '姓名不能为空',
          required: true,
        }],
        birthday: [{
          message: '生日不能为空',
          required: true,
        }],
        school: [{
          message: '学校不能为空',
          required: true,
        }],
        education: [{
          message: '学历不能为空',
          required: true,
        }],

      },
    }
  },
  methods: {
    // 提交表单
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        // eslint-disable-line
        if (valid) {
          // 新增用户
          let res
          if (this.pageType === 'add') {
            try {
              this.loading = true
              res = await User.register(this.form)
              if (res.code < window.MAX_SUCCESS_CODE) {
                this.loading = false
                this.$message.success(`${res.message}`)
                this.eventBus.$emit('addUser', true)
                this.resetForm(formName)
              }
            } catch (e) {
              this.loading = false
              if (e.data.code === 10073) {
                this.$message.error(e.data.message)
              } else {
                this.$message.error('新增用户失败')
              }
              console.log(e)
            }
          } else {
            // 更新用户信息
            if (
              this.form.email === this.info.email
              && this.form.group_ids.sort()
                .toString() === this.info.group_ids.sort()
                .toString()
            ) {
              this.$emit('handleInfoResult', false)
              return
            }
            try {
              this.loading = true
              res = await Admin.updateOneUser(this.form.email, this.form.group_ids, this.id)
            } catch (e) {
              this.loading = false
              console.log(e)
            }
            if (res.code < window.MAX_SUCCESS_CODE) {
              this.loading = false
              this.$message.success(`${res.message}`)
              this.$emit('handleInfoResult', true)
            } else {
              this.loading = false
              this.$message.error(`${res.message}`)
            }
          }
        } else {
          console.log('error submit!!')
          this.$message.error('请填写正确的信息')
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      if (this.pageType === 'edit') {
        this.setInfo()
      } else {
        this.form.group_ids = []
        this.$refs[formName].resetFields()
      }
    },
    setInfo() {
      this.form.username = this.info.username
      this.form.email = this.info.email
      const temp = []
      this.info.group_ids.forEach(item => {
        temp.push(item.id)
      })
      this.form.group_ids = temp
    },
  },
  created() {
    // 通过是否接收到数据来判断当前页面是添加数据还是编辑数据
    if (this.pageType === 'edit') {
      this.setInfo()
      this.isEdited = true
    }
  },
}
</script>

<style lang="scss">
.button {
  span {
    font-size: 16px;
  }
}
</style>

<style lang="scss" scoped>

.container {
  margin-top: 20px;

  .button {
    width: 200px;
    height: 50px;
    border-radius: 4px;
  }

  .container-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .container-right {
      margin-left: 100px;
    }
  }

  .container-wrapper {
    display: flex;
    justify-content: space-between;
  }

}
</style>
