<template>
  <div class="login">
    <el-card class="xfn-login-card">
      <div slot="header">管理员登录</div>
      <div>
        <el-form label-width="80px">
          <el-form-item label="管理员名:" >
            <el-input v-model="user.aname" placeholder="请输入管理员名"></el-input>
          </el-form-item>
          <el-form-item label="登录密码:">
            <el-input type="password" v-model="user.apwd" placeholder="请输入管理员密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click.native="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import {HOST, ERR_OK} from '@/common/js/config'
export default {
  data () {
    return {
      user: {
        aname: 'admin',
        apwd: 123456
      }
    }
  },
  mounted () {
    
  },
  methods: {
    login () {
      const name = this.user.aname
      const pwd = this.user.apwd
      var url = `${HOST}/admin/login/${name}/${pwd}`
      this.$axios.get(url).then((res) => {
        if (res.data.code === ERR_OK) {
          //console.log(res.data)
          this.$router.push('/main')
          this.$store.commit('setAdminName', name)
        } else {
          this.$alert("请检查用户名或密码是否有误", "登陆失败", {type: 'error'})
          .then(() => {}).catch(() => {})
        }
      })
    },
    cancel () {
      this.user.aname = ''
      this.user.apwd = ''
    }
  }
}
</script>


<style lang="scss">
  .xfn-login-card {
    width: 400px;
    margin: 100px auto;
    .el-card__header {
      text-align: center;
      font-size: 1.2em;
    }
  }
</style>
