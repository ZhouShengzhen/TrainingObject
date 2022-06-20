<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/companies' }">租户管理</el-breadcrumb-item>
      <el-breadcrumb-item>租户员工</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-op">
      <el-input v-model="stringInput" placeholder="请输入租户名称、姓名、手机号、证件号查询"></el-input>
      <el-select v-model="level" placeholder="租赁楼层选择">
        <el-option v-for="item in levels" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="statusInput" placeholder="卡片状态">
        <el-option v-for="item in statuses" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker v-model="timeInput" type="daterange" range-separator="至" start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>

      <el-button type="primary" @click="query()">查询</el-button>
      <el-button type="primary">导出</el-button>
      <el-button type="primary">发卡</el-button>
    </div>
    <div>
      <el-table ref="multipleTable" :data="lines" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="卡号" prop="cardPart[0].cardNum"></el-table-column>
        <el-table-column label="租户名称" prop="comName"></el-table-column>
        <el-table-column label="联系电话" prop="callNum"></el-table-column>
        <el-table-column label="租赁楼层" prop="levels"></el-table-column>

        <el-table-column label="卡片状态">
          <template slot-scope="scope">
            <span>{{
                scope.row.cardPart.length === 1 && scope.row.cardPart[0].possessed
                  ? "已开通"
                  : "未开通"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="人脸识别"><template slot-scope="scope">
            <span>{{
                scope.row.cardPart.length === 1 &&
                  scope.row.cardPart[0].faceUnlock
                  ? "已开通"
                  : "未开通"
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button @click="preAdd(scope.row)" type="primary" size="mini">发卡</el-button>
              <el-button @click="ban(scope.row)" type="primary" size="mini">禁用</el-button>
              <el-button @click="active(scope.row)" type="primary" size="mini">激活</el-button>
              <el-button @click="del(scope.row)" type="primary" size="mini">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="发卡" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="cardInf" :rules="rules" ref="cardInf" label-width="100pt">
        <el-form-item label="公 司：" prop="comName">
          <el-input v-model="cardInf.comName" disabled> </el-input>
        </el-form-item>
        <el-form-item label="员工姓名：" prop="name">
          <el-input v-model="cardInf.name" disabled> </el-input>
        </el-form-item>
        <el-form-item label="证件类型：" prop="certType">
          <el-input v-model="cardInf.certType" disabled> </el-input>
        </el-form-item>
        <el-form-item label="证件号：" prop="certNum">
          <el-input v-model="cardInf.certNum" disabled> </el-input>
        </el-form-item>
        <el-form-item label="楼 层：" prop="level">
          <el-select v-model="cardInf.levels" multiple placeholder="请选择需要开通权限的楼层（可多选）" disabled>
            <el-option v-for="item in levels" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式：" prop="callNum">
          <el-input v-model="cardInf.callNum" disabled> </el-input>
        </el-form-item>
        <el-form-item label="职 位：" prop="position">
          <el-input v-model="cardInf.position" disabled> </el-input>
        </el-form-item>
        <el-form-item label="卡 号：" prop="cardNum">
          <el-input v-model="cardInf.cardNum"> </el-input>
        </el-form-item>
        <el-form-item label="卡内编号：" prop="cardId">
          <el-input v-model="cardInf.cardId"> </el-input>
        </el-form-item>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add()">登 记</el-button>
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lines: null,
      stringInput: "",
      timeInput: null,
      statusInput: "",
      levels: [
        {
          value: null,
          lable: "全部楼层"
        },
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
      ],
      statuses: [
        {
          value: true,
          label: "有效"
        },
        {
          value: false,
          label: "无效"
        }
      ],
      level: null,
      checked: false,
      dialogVisible: false,
      cardInf: {
        cardNum: null,
        cardId: null,
        comName: null
      },
      rules: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      console.log(this.stringInput)
      console.log(this.level)
      console.log(this.statusInput)
      this.$http({
        path: "/lines/findAllStaff",
        method: "get",
        params: {
          stringInput: this.stringInput,
          level: this.level,
          stetusInput: this.statusInput
        }
      }).then((res) => {
        this.lines = res.date
        console.log(this.lines)
      })
    },
    preAdd(row) {
      this.dialogVisible = true
      this.cardInf = row
      console.log(this.cardInf)
    },
    ban(row) {
      this.$http({
        path: "/cards/update",
        method: "post",
        params: {
          cardNum: row.cardPart[0].cardNum,
          possessed: false,
          faceUnlock: false,
        }
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: res.code === 200 ? "success" : "error"
        })
        // console.log(res)
      })
      location.reload()
    },
    active(row) {
      console.log(row)
      this.$http({
        path: "/cards/update",
        method: "post",
        params: {
          cardNum: row.cardPart[0].cardNum,
          possessed: true,
          faceUnlock: true,
        }
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: res.code === 200 ? "success" : "error"
        })
        // console.log(res)
      })
      location.reload()
    },
    del(row) {
      this.$http({
        path: "/cards/del",
        method: "post",
        params: {
          cardNum: row.cardNum,
        }
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: res.code === 200 ? "success" : "error"
        })
        // console.log(res)
      })
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done()
        })
        .catch((_) => { })
    },
    add() {
      this.$http({
        path: "/cards/add",
        method: "post",
        params: {
          comName: this.cardInf.comName,
          username: this.cardInf.name,
          cardNum: this.cardInf.cardNum,
          id: this.cardInf.cardId
        }
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: res.code === 200 ? "success" : "error"
        })
        // console.log(res)
      })
      this.dialogVisible = false
      // location.reload()
    },
    query() {
      this.getData()
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

.input-top {
  width: auto;
}
</style>
