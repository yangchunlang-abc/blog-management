<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-button type="info" class="add-user" @click="showFrom">添加用户<i
        class="el-icon-circle-plus el-icon--right"></i></el-button>
    <!-- 添加用户的表单 -->
    <el-dialog title="添加用户信息" :visible.sync="dialogFormVisible">
      <!-- 表单 -->
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="userForm.gender" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('userForm')">取 消</el-button>
        <el-button type="primary" @click="resetForm('userForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('userForm')">添加</el-button>
      </div>
    </el-dialog>
    <!-- 用户列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="上次登录时间" width="240">
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="240">
      </el-table-column>
      <el-table-column prop="gender" label="用户性别" width="240">
      </el-table-column>
      <el-table-column prop="password" label="用户密码" width="240">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      tableData: (state) => state.userManagement.tableData
    })
  },
  data() {
    return {
      dialogFormVisible: false,// 【隐藏弹窗
      userForm: {//表单数据
        name: '',
        gender: '',
        password: ''
      },// 验证规则
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const newArr = [{
            date: '2023-6-1',
            name: this.userForm.name,
            gender: this.userForm.gender,
            password: this.userForm.password
          }]
          // 添加数据到vuex里的tableData列表
          this.$store.commit('userManagement/addUser', newArr)
          alert('添加用户成功!');
          this.cancel('userForm')
        } else {
          console.log('提交错误!!');
          return false;
        }
      });
    },
    resetForm(formName) { //重置表单
      this.$refs[formName].resetFields();
    },
    //显示编辑的列表信息
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style lang="less" scoped>
.add-user {
  font-size: large;
  margin: 20px 10px;
}

/deep/.el-form-item__label {
  font-size: large;
}

/deep/ .el-table .cell {
  font-size: x-large;
}

.el-button--mini {
  font-size: 20px;
}
</style>