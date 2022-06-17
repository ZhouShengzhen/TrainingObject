<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/admin/companies' }"
        >租户管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>租户中心</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-op">
      <el-input
        v-model="comIdInput"
        placeholder="请输入租户编号查询"
      ></el-input>
      <el-date-picker
        v-model="beginTimeInput"
        type="date"
        placeholder="请选择合同开始的时间"
      >
      </el-date-picker>
      <el-select v-model="value" placeholder="租赁楼层选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="query()">查询</el-button>
      <el-button type="primary">导出</el-button>
      <el-button type="primary">导入租户</el-button>
      <el-button type="primary">导入合同</el-button>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="lines"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="租户编号" prop="id"></el-table-column>
        <el-table-column label="租户名称" prop="name"></el-table-column>
        <el-table-column label="联系人" prop="callName"></el-table-column>
        <el-table-column label="联系电话" prop="callNum"></el-table-column>
        <el-table-column label="租赁楼层" prop="level"></el-table-column>
        <el-table-column label="门牌编号" prop="doorNum"></el-table-column>
        <el-table-column label="租户行业" prop="business"></el-table-column>
        <el-table-column
          label="合同开始时间"
          prop="compactCom[0].beginTime"
        ></el-table-column>
        <el-table-column
          label="合同结束时间"
          prop="compactCom[0].endTime"
        ></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row)" type="primary" size="mini"
              >查看</el-button
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      lines: null,
      comIdInput: null,
      beginTimeInput: null,
      options: [
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
      value: null,
      checked: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http({
        path: "/lines/findAllCom",
        method: "get",
        params: {
          idInput: this.comIdInput,
          level: this.value
          // beginTimeInput: this.beginTimeInput
        }
      }).then((res) => {
        this.lines = res.date
        console.log(this.lines)
      })
    },
    detail(row) {
      this.$router.push({
        path: "/admin/companies/detail",
        query: {
          comId: row.id
        }
      })
    },
    query() {
      this.getData()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
