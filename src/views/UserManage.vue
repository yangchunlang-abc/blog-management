<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="manage">
    <div class="manage-heard">
      <el-button type="primary" class="add-user" @click="showFrom">添加用户<i
          class="el-icon-circle-plus el-icon--right"></i></el-button>
      <!-- 搜索框 -->
    </div>
    <!-- 添加用户的表单 -->
    <el-dialog title="添加用户信息" :visible.sync="dialogFormVisible">
      <!-- 表单 -->
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
        <el-form-item label="用户账号" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="userForm.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('userForm')">取 消</el-button>
        <el-button type="primary" @click="resetForm('userForm')">重置</el-button>
        <el-button type="primary" @click="submitForm(userForm)">添加</el-button>
      </div>
    </el-dialog>
    <!-- 用户列表 -->
    <el-table :data="userList" style="font-size: larger;" border :stripe="true" height="90%" v-loading="loading"
      element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column prop="timestamps" label="上次登录时间" width="240">
      </el-table-column>
      <el-table-column prop="username" label="用户账号" width="240">
      </el-table-column>
      <el-table-column prop="gender" label="用户性别" width="240">
      </el-table-column>
      <el-table-column prop="password" label="用户密码" width="240">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" style="font-size: large;">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
            style="font-size: large;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="page"> <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      tableData: (state) => state.user.tableData
    })
  },
  data() {
    return {
      dialogFormVisible: false,// 【隐藏弹窗
      userForm: {//表单数据
        username: '',
        gender: '',
        password: ''
      },// 验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ]
      },
      //是否显示加载中
      loading: false,
      // 用户数据
      userList: [],
      modalType: 'add', //add表示新增 edit表示编辑
      searchText: '',//搜索框，搜索用户名
    }
  },

  methods: {
    // 获取用户数据
    async getUserList() {
      //来个弹窗获取数据中
      // this.loading = true
      await axios.get('http://127.0.0.1:3000/api/users/showusers')
        .then((res) => {
          //有用户数据
          if (res.data.msg.results.length) {
            this.userList = res.data.msg.results.reverse()
            // // 这个数据的时间格式有问题
            this.userList.forEach((item) => {
              let date = new Date(item.timestamps)
              item.timestamps = date.toLocaleDateString().split('/').join('-')
            });
          } else {
            this.userList = []
          }
        }).catch((err) => {
          console.log(err);
        })
    },
    // 添加用户接口方法
    async addUser(formName) {
      await axios.post('http://127.0.0.1:3000/api/users/adduser',
        {
          username: formName.username,
          password: formName.password,
          gender: formName.gender
        }).then((res) => {
          //添加用户失败
          if (res.data.msg.state === 0) {
            // 弹窗提示，用户名已经存在
            this.failure()
          }
          if (res.data.msg.state === 1) {
            // 弹窗提示添加用户成功
            this.success()
            // 重新调用查询用户列表接口
            this.getUserList()

          }
        }).catch((err) => {
          console.log(err);
        })
    },
    // 更新用户数据
    // async update(formName) {
    //   await axios.post('http://127.0.0.1:3000/api/users/updateuser',
    //     {
    //       username: formName.name,
    //       password: formName.password,
    //       gender: formName.gender
    //     }).then((res) => {
    //       //添加用户失败
    //       if (res.data.msg.state === 0) {
    //         // 弹窗提示，用户名已经存在
    //         this.failure()
    //       }
    //       if (res.data.msg.state === 1) {
    //         // 弹窗提示添加用户成功
    //         this.success()
    //         // 重新调用查询用户列表接口
    //         this.getUserList()

    //       }
    //     }).catch((err) => {
    //       console.log(err);
    //     })
    // },
    // 删除用户数据
    async deletUser(user_id) {
      await axios.post('http://127.0.0.1:3000/api/users/deletuser',
        { user_id }).then(res => {
          if (res.data.msg.state === 1) {
            // 重新调用查询用户列表接口
            this.getUserList()
          }
        }).catch(err => {
          console.log(err);
        })
    },
    //添加用户展示用户列表
    showFrom() {
      this.dialogFormVisible = true
    },
    // 取消提交表单
    cancel(form) {
      this.resetForm(form) //重置表单
      this.dialogFormVisible = false //关闭弹窗
    },
    // //添加用户数据到列表里
    submitForm(formName) {
      this.$refs['userForm'].validate(async (valid) => {
        if (valid) {
          // 验证通过
          console.log(formName);
          // 添加用户 调用添加用户接口
          this.addUser(formName)
          this.dialogFormVisible = false//关闭弹窗
          //重置表单
          this.resetForm('userForm')
        }
        else {
          console.log('err submit');
          return false
        }
      })
    },
    resetForm(formName) { //重置表单
      this.$refs[formName].resetFields();
    },
    //显示编辑的列表信息
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.delete_success(row.user_id)// 提示是否删除
    },
    // 提示弹窗
    failure() {
      this.$message({
        title: '警告',
        message: '添加用户失败！用户名重复!',
        type: 'warning'
      });
    },
    success() {
      this.$message({
        title: '成功',
        message: '添加用户成功！',
        type: 'success'
      })
    },
    delete_success(user_id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        // 用拿到的user_id删除数据库对应内容
        this.deletUser(user_id)

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    }

  },
  mounted() {
    // 调用查询用户列表接口
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.manage {
  height: 90%;

  .manage-heard {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  //分页插件
  .page {
    float: right;
    margin: 20px 20px 0 0;
  }
}

.add-user {
  font-size: large;
  margin: 20px 10px;
}

// 添加用户表单样式
/deep/.el-form-item__label {
  font-size: large;
}
</style>