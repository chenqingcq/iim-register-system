<template>
  <div style="text-align:center">
    <div class="header">
      <h2>
        <label v-show="propertyInfo.propertyName">{{propertyInfo.propertyName}}</label>欢迎您
      </h2>
      <label class="title-label">访客注册</label>
    </div>
    <div class="container">
      <div class="sub-title">要访问的公司</div>
      <el-select
        class="select_el"
        v-model="company"
        value-key="id"
        placeholder="请选择要访问的公司"
        style="width: 311px;"
      >
        <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item">
          <span style="float: left">{{ item.name }}</span>
        </el-option>
      </el-select>
      <div class="sub-line"></div>
    </div>
    <el-button class="submit-btn" type="primary" @click="toRegister">下一步</el-button>
  </div>
</template>
<script>
import {
  getCompanyList,
  getFieldsList,
  sendMsg,
  addVisitor
} from "@/api/register";
export default {
  data() {
    return {
      rowId: "",
      propertyInfo: {
        propertyId: "",
        propertyName: "中新智擎",
        companyId: "",
        companyName: "",
        pageSize: 1000
      },
      company: "",
      companyList: []
    };
  },
  created: function() {
    if (this.$route.query.propertyId) {
      this.propertyInfo.propertyId = this.$route.query.propertyId;
    } else {
      this.propertyInfo.propertyId = "1975c2d089de4159863b9cc8akhjr551";
    }
    getCompanyList(this.propertyInfo)
      .then(response => {
        this.companyList = response.data;
        if (response.data.length > 0) {
          this.propertyInfo.propertyName = response.data[0].propertyName;
        } else {
          this.$message({
            message: "该物业下暂未管理公司",
            type: "error"
          });
        }
        return;
      })
      .catch(() => {});
  },
  methods: {
    toRegister() {
      if (this.company === "") {
        this.$message({
          message: "请选择到访公司",
          type: "error"
        });
        return;
      } else {
        this.propertyInfo.companyId = this.company.id;
        this.propertyInfo.companyName = this.company.name;
      }
      this.$router.push({
        path: "/register",
        query: {
          companyId: this.propertyInfo.companyId,
          companyName: this.propertyInfo.companyName,
          propertyId: this.propertyInfo.propertyId
        }
      });
    }
  }
};
</script>

<style scoped="scoped">
.header {
  margin-bottom: 40px;
}
.header h2 {
  margin-top: 33px;
  margin-bottom: 16px;
}
.header .title-label {
  font-size: 18px;
  font-weight: bold;
}
.container {
  margin: 0 auto;
  width: 311px;
}
.sub-title {
  float: left;
}
.select_el >>> input.el-input__inner::-webkit-input-placeholder {
  font-weight: normal;
}
.select_el >>> input.el-input__inner::-moz-placeholder {
  font-weight: normal;
}
.select_el >>> input.el-input__inner:-ms-input-placeholder {
  font-weight: normal;
}
.select_el >>> input.el-input__inner {
  padding: 0px;
  width: 100%;
  border: 1px solid #ffffff;
  font-size: 16px;
  font-weight: bold;
}
.select_el >>> input.el-input__inner:focus {
  border: 1px solid transparent;
}
.sub-line {
  width: 311px;
  height: 1px;
  background-color: #e8e8e8;
}
.submit-btn {
  width: 345px;
  margin-top: 326px;
  margin-bottom: 40px;
  background-color: #3582da;
  font-size: 17px;
}
</style>
