<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/user/staffsList' }"
        >租户端</el-breadcrumb-item
      >
      <el-breadcrumb-item>员工列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-op">
      <el-input
        v-model="nameInput"
        placeholder="请输入员工姓名查询"
        class="input-name"
      ></el-input>
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
        label-width="100pt"
      >
        <el-form-item label="公 司：" prop="comName">
          <el-input v-model="comName" disabled></el-input>
        </el-form-item>
        <el-form-item label="员工姓名：" prop="name">
          <el-input v-model="staffInf.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型：" prop="certType">
          <el-select v-model="staffInf.certType" placeholder="请选择">
            <el-option label="居民身份证" value="idCard"></el-option>
            <el-option label="港澳通行证" value="permit"></el-option>
            <el-option label="护照" value="passport"></el-option> </el-select
        ></el-form-item>
        <el-form-item label="证件号：" prop="certNum">
          <el-input v-model="staffInf.certNum"></el-input>
        </el-form-item>
        <el-form-item label="楼 层：" prop="level">
          <el-select
            v-model="staffInf.level"
            multiple
            placeholder="请选择需要开通权限的楼层（可多选）"
          >
            <el-option
              v-for="item in levels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item label="联系方式：" prop="callNum">
          <el-input v-model="staffInf.callNum"></el-input>
        </el-form-item>
        <el-form-item label="职 位：" prop="position">
          <el-input
            v-model="staffInf.position"
            placeholder=" 默认为 实习生"
          ></el-input>
        </el-form-item>
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
      comName: this.$store.state.user.username,
      staffs: null,
      nameInput: null,
      dialogVisible: false,
      staffInf: {
        name: null,
        certType: null,
        certNum: null,
        level: [],
        callNum: null,
        position: "实习生"
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, message: "长度至少为 2", trigger: "blur" }
        ],
        certType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        certNum: [{ required: true, message: "请输入证件号", trigger: "blur" }],
        level: [
          { required: true, message: "请选择开通权限的楼层", trigger: "change" }
        ],
        callNum: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的号码", trigger: "blur" }
        ]
      },
      levels: [
        {
          value: "LV1",
          label: "LV1"
        },
        {
          value: "LV2",
          label: "LV2"
        },
        {
          value: "LV3",
          label: "LV3"
        },
        {
          value: "LV4",
          label: "LV4"
        },
        {
          value: "LV5",
          label: "LV5"
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http({
        path: "/staffs/findAll",
        method: "get",
        params: {
          comName: this.comName
        }
      }).then((res) => {
        console.log(res)
        this.staffs = res.result
        console.log(this.staffs)
      })
      console.log("getData")
      console.log(this.comName)
    },
    add() {
      this.$http({
        path: "/staffs/add",
        method: "post",
        params: {
          levels: this.staffInf.level,
          position: this.staffInf.position,
          comName: this.comName,
          name: this.staffInf.name,
          certType: this.staffInf.certType,
          certNum: this.staffInf.certNum,
          callNum: this.staffInf.callNum
        }
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: res.code === 200 ? "success" : "error"
        })
        // console.log(res)
      })
      this.$refs["staffInf"].resetFields()
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

    resetForm(cardInf) {
      console.log("reset")
      this.$refs[cardInf].resetFields()
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done()
        })
        .catch((_) => {})
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
.el-dialog {
  overflow: scroll;
}
.el-input {
  width: 100%;
}
.el-select {
  width: 100%;
}
.input-name {
  width: auto;
}
</style>
