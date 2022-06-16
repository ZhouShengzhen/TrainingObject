<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/user/staffsList' }"
        >租户端</el-breadcrumb-item
      >
      <el-breadcrumb-item>员工列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-op">
      <el-input v-model="nameInput" placeholder="请输入员工姓名查询"></el-input>
      <el-button type="primary" @click="query()">查询员工</el-button>
      <el-button type="primary" @click="dialogVisible = true"
        >新增员工</el-button
      >
      <el-button type="primary">有待商榷</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="staffs"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="证件类型" prop="certType"></el-table-column>
        <el-table-column label="证件号" prop="certNum"></el-table-column>
        <el-table-column label="联系电话" prop="callNum"></el-table-column>
        <!-- <el-table-column label="卡片状态" prop="level"></el-table-column> -->
        <el-table-column label="职位" prop="position"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="fun(scope.row)" type="primary" size="mini"
              >有待商榷</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页按钮 -->
      <!-- <el-pagination
        background
        layout="prev,pager,next"
        :total="count"
        :page-size="pageSize"
        :current-page="page"
        @current-change="changePage"
        style="margin-top: 20px"
      ></el-pagination> -->
    </div>
    <el-dialog
      title="信息登记"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="staffInf"
        :rules="rules"
        ref="staffInf"
        label-width="100px"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="staffInf.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="certType">
          <el-select v-model="staffInf.certType" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> </el-select
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="resetForm('staffInf')">重 置</el-button>
        <el-button type="primary" @click="add()">登 记</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staffs: null,
      nameInput: null,
      dialogVisible: false,
      staffInf: {
        name: null,
        certType: null
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        certType: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      console.log("getData")
    },
    add() {
      this.dialogVisible = true
    },
    query() {
      this.$http({
        path: "/staffs/findOne",
        method: "get",
        params: {
          name: this.nameInput
          // beginTimeInput: this.beginTimeInput
        }
      }).then((res) => {
        this.staffs = res.result
        console.log(this.staffs)
      })
    },
    fun(row) {
      console.log(row)
    },
    resetForm(staffInf) {
      this.$refs[staffInf].resetFields()
    }
  }
}
</script>

<style>
.el-input {
  width: 300px;
  margin: 5px;
}
.el-breadcrumb {
  margin: 5px;
}
</style>
