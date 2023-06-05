<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="body-bg">
    <el-card class="box-card" v-show="!dialogVisible">
      <div class="login-box">
        <h1>用户登录</h1>
        <p>账号</p>
        <el-input placeholder="请输入账号" v-model="username" clearable class="account"></el-input>
        <p>密码</p>
        <el-input placeholder="请输入密码" v-model="password" show-password class="password"></el-input>
      </div>
      <div class="btn">
        <el-button type="primary" @click="login" class="dl_btn" plain>登录</el-button>
        <el-button type="primary" @click="register" class="zc_btn" plain>注册</el-button>
      </div>
    </el-card>
    <!-- 注册的弹窗 -->
    <el-dialog :visible.sync="dialogVisible" width="25%">
      <div class="register-box">
        <h1>用户注册</h1>
        <p>账号</p>
        <el-input placeholder="请输入账号" v-model="username" clearable class="account"></el-input>
        <p>密码</p>
        <el-input placeholder="请输入密码" v-model="password" show-password class="password"></el-input>
        <p>性别</p>
        <el-select v-model="gender" placeholder="请选择性别" class="gender">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
        <p class="upload">上传头像</p>
        <el-upload class="upload-demo" action="http://127.0.0.1:3000/api/upload" name="img" :on-success="uploadSuccess">
          <el-button size="large" type="info">点击上传</el-button>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="regUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>




<script>
import axios from 'axios';
export default {
  mounted() {
  },
  data() {
    return {
      username: '',
      password: '',
      gender: '',
      dialogVisible: false,
      headImgUrl: ''//头像地址
    }
  },
  methods: {
    //登录
    async login() {
      if (this.username && this.password) {
        // 调用登录接口
        await axios.get('http://127.0.0.1:3000/api/users', {
          params: {
            username: this.username,
            password: this.password
          }
        }).then((res) => {
          const state = res.data.msg.state
          if (state === 0) {
            // 登录失败
            alert('用户名或密码错误！')
          }
          if (state === 1) {
            // 登录成功后把当前用户信息（账号，登录时间）存到vuex,到时候再掉接口获取用户数据（头像，昵称）
            // 登录成功跳转主页
            this.$router.push('/home')
          }
        })
          .catch((err) => {
            console.log(err);
          })

      }
    },
    //注册
    register() {
      this.dialogVisible = true //显示弹窗
    },
    async regUser() {
      if (this.username && this.password && this.gender && this.headImgUrl) {
        await axios.post('http://127.0.0.1:3000/api/users',
          {
            username: this.username,
            password: this.password,
            gender: this.gender,
            headImgUrl: this.headImgUrl
          }).then((res) => {
            if (res.data.msg.state === 0) {
              alert('注册用户失败！用户名已经存在')
            }
            if (res.data.msg.state === 1) {
              // 注册后把数据全都存到本地的vuex里
              const newArr = [{
                date: new Date().getTime(),
                username: this.username,
                password: this.password,
                gender: this.gender,
                headImgUrl: this.headImgUrl
              }]
              this.$store.commit('user/regUser', newArr)
              alert('注册成功!')
              this.$router.push('/home')
            }
          }).catch((err) => {
            console.log(err);
          })
      }

    }
    ,
    uploadSuccess(res) {
      this.headImgUrl = res.data
    },
  }
}
</script>

<style lang="less" scoped>
.body-bg {
  height: 100vh;
  display: flex;
  /*登录框水平垂直居中*/
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;

  .login-box {
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;

    h1 {
      text-align: center;
      color: #a0a0a0;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      color: #a0a0a0;
    }


    .account {
      margin-bottom: 20px;
      font-size: large;
    }

    .password {
      font-size: large;
      margin-bottom: 20px;
    }
  }

  .btn {
    text-align: end;
  }

  /deep/ .el-dialog {
    background: #a0a0a0;

    .register-box {
      width: 300px;
      height: 350px;
      display: flex;
      flex-direction: column;

      h1 {
        font-size: 40px;
        color: #f2f2f2;
        margin-bottom: 20px;
      }

      p {
        font-size: 18px;
        color: #f2f2f2;
      }


      .account {
        margin-bottom: 20px;
        font-size: large;
      }

      .password {
        font-size: large;
        margin-bottom: 20px;
      }

      .gender {
        font-size: large;
        margin-bottom: 20px;
      }

      .upload {
        margin-bottom: 20px;
      }
    }
  }

}
</style>