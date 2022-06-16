<template>
  <div>
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/companies' }"
          >租户管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>租户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="primaryInf">
      <el-col :span="3"
        ><img src="../../assets/defaultCom.jpeg" class="logo" alt=""
      /></el-col>
      <el-col :span="6"
        ><div class="comInf">
          <el-row :gutter="5"
            ><el-col :span="6"><div>租户编号:</div></el-col>
            <el-col :span="18"
              ><div>{{ company.id }}</div></el-col
            ></el-row
          >
          <el-row :gutter="5"
            ><b>{{ company.name }}</b></el-row
          >
          <el-row :gutter="5"
            ><el-col :span="6"><div>租赁楼层:</div></el-col>
            <el-col :span="6"
              ><div>{{ company.level }}</div></el-col
            >
            <el-col :span="6"><div>门牌编号:</div></el-col>
            <el-col :span="6"
              ><div>{{ company.doorNum }}</div></el-col
            ></el-row
          >

          <el-row :gutter="5"
            ><el-col :span="6"><div>租户行业:</div></el-col>
            <el-col :span="6"
              ><div>{{ company.business }}</div></el-col
            >
            <el-col :span="6"><div>租户状态:</div></el-col>
            <el-col :span="6"
              ><div>{{ company.status }}</div></el-col
            ></el-row
          >
        </div>
      </el-col>
      <el-col :span="6" :offset="9"
        ><div>
          <el-button type="primary">导入租户</el-button>
          <el-button type="primary">导入合同</el-button>
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>公司详情</span>
        </div>
        <el-descriptions :column="2">
          <el-descriptions-item label="企业简称">{{
            company.nameShort
          }}</el-descriptions-item>
          <el-descriptions-item label="外文名">{{
            company.nameEn
          }}</el-descriptions-item>
          <el-descriptions-item label="税务登记号">{{
            company.taxNum
          }}</el-descriptions-item>
          <el-descriptions-item label="条形码">
            {{ company.barCode }}
          </el-descriptions-item>
          <el-descriptions-item label="客户性质">{{
            company.charater
          }}</el-descriptions-item>
          <el-descriptions-item label="法人代表">{{
            company.legalPer
          }}</el-descriptions-item>
          <el-descriptions-item label="生产经营许可证">{{
            company.license
          }}</el-descriptions-item>
          <el-descriptions-item label="纳税人类型">{{
            company.taxPayer
          }}</el-descriptions-item>
          <el-descriptions-item label="GSP认证">
            {{ company.gsp }}
          </el-descriptions-item>
          <el-descriptions-item label="上级客户">{{
            company.superior
          }}</el-descriptions-item>
          <el-descriptions-item label="工商注册号">{{
            company.registrationNum
          }}</el-descriptions-item>
          <el-descriptions-item label="客户分类">{{
            company.category
          }}</el-descriptions-item>
          <el-descriptions-item label="备注">
            {{ company.memo }}
          </el-descriptions-item>
          <el-descriptions-item label="地址">{{
            company.location
          }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>合同详情</span>
        </div>
        <el-descriptions direction="vertical" :column="6" border>
          <el-descriptions-item label="合同号">{{
            compact.id
          }}</el-descriptions-item>
          <el-descriptions-item label="租户编号">{{
            compact.comId
          }}</el-descriptions-item>
          <el-descriptions-item label="合同开始时间">{{
            compact.beginTime
          }}</el-descriptions-item>
          <el-descriptions-item label="合同结束时间">{{
            compact.endTime
          }}</el-descriptions-item>
          <el-descriptions-item label="租赁单元">{{
            compact.doorNum
          }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{
            compact.memo
          }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compact: {
        id: null,
        comId: null,
        beginTime: null,
        endTime: null,
        doorNum: null,
        memo: null
      },
      company: {
        id: null,
        name: null,
        level: null,
        doorNum: [],
        business: null,
        status: null,
        nameShort: null,
        nameEn: null,
        taxNum: null,
        barCode: null,
        charater: null,
        legalPer: null,
        license: null,
        taxPayer: null,
        gsp: null,
        superior: null,
        registrationNum: null,
        category: null,
        memo: null,
        location: null
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let comId = this.$route.query.comId
      this.$http({
        path: "/compacts/findOne",
        method: "get",
        params: {
          comId: comId
        }
      }).then((res) => {
        console.log(res)
        if (res.code === 200) {
          this.compact = res.result
        }
      })
      this.$http({
        path: "/companies/findOne",
        method: "get",
        params: {
          id: comId
        }
      }).then((res) => {
        console.log(res)
        this.company = res.result
      })
    }
  }
}
</script>

<style>
.el-breadcrumb {
  margin: 10px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.primaryInf {
  width: 100%;
  height: 100%;
}
.logo {
  height: 90%;
  width: 90%;
  margin-right: 10px;
  vertical-align: middle;
  display: inline-block;
}
.el-row {
  height: 100%;
  width: 100%;
}
.img {
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
