<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="body-bg">
    <div class="login-box">
      <h3>用户登录</h3>
      <input type="text" class="user" placeholder="请输入用户名" v-model="userName">
      <input type="password" class="password" placeholder="请输入密码" v-model="password">
      <button class="login-btn" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    //登录
    login() {
      if (this.userName === 'root' && this.password === '123') {
        this.$router.push('/')
      }
    }
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
    background-color: pink;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      text-align: center;
    }

    .user {
      width: 300px;
      height: 40px;
      margin: 20px 0 10px 0;
    }

    .password {
      width: 300px;
      height: 40px;
      margin: 10px 0 10px 0;
    }

    .login-btn {
      text-align: center;
      width: 300px;
      height: 40px;
      line-height: 40px;
      border: 1px solid black;
    }
  }
}
</style>