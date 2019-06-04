<template>
  <div ref="elememt" style="text-align:center" v-loading.fullscreen.lock="fullscreenLoading">
    <div ref="element1" class="header">
      <h2>
        <label v-show="companyInfo.companyName">{{companyInfo.companyName}}</label>欢迎您
      </h2>
      <label class="title-label"></label>
    </div>
    <div ref="element2" class="container">
      <div class="app-detail">
        <div class="sub-title">选择</div>
        <div
          v-if="isGroup"
          v-bind:style="{ color: 'red', fontSize: 12 + 'px',marginTop: 5 + 'px', float: 'right' }"
        >人员分组不能为空</div>
        <el-select
          class="select_el"
          v-model="group"
          value-key="id"
          placeholder="请选择分组"
          style="width: 311px;"
          @change="check_group()"
        >
          <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item">
            <span style="float: left">{{ item.name }}</span>
          </el-option>
        </el-select>
        <div class="sub-line"></div>
      </div>
      <div v-if="!isHotel" class="app-detail">
        <div class="sub-title">您的姓名</div>
        <div
          v-if="isName"
          v-bind:style="{ color: 'red', fontSize: 12 + 'px', float: 'right' }"
        >姓名不能为空</div>
        <el-input
          class="input_el"
          v-model="registerParams.name"
          placeholder="请输入您的姓名"
          @change="check_name()"
        ></el-input>
        <div class="sub-line"></div>
      </div>
      <!-- 摩登克斯需求 -->
      <template v-if="isHotel">
        <div v-if="fixedFields.length">
          <div v-for="(item, index) in fixedFields" class="app-detail" :key="`fixedFields${index}`">
            <div class="sub-title">{{fixedFields[index].fieldName}}</div>
            <div
              v-if="isShowFixed[index]"
              v-bind:style="{ color: 'red', fontSize: 12 + 'px', float: 'right' }"
            >
              <span
                v-if="fixedFields[index].fieldValue&&fixedFields[index].fieldName.includes('手机号')&& !/^1[34578]\d{9}$/g.test(fixedFields[index].fieldValue)"
              >{{fixedFields[index].fieldName}}格式有误</span>
              <span v-if="!fixedFields[index].fieldValue">{{fixedFields[index].fieldName}}不能为空</span>
            </div>
            <br>
            <el-input
              v-if="index !=1"
              style="width: 210px;"
              class="input_el"
              v-model="fixedFields[index].fieldValue"
              :placeholder="'请输入'+fixedFields[index].fieldName + '  (必填)'"
            ></el-input>
            <el-select
              v-if="index ===1"
              class="select_el"
              v-model="fixedFields[index].fieldValue"
              value-key="id"
              placeholder="请选择 Vip等级 (必填)"
              style="width: 311px;"
            >
              <template v-if="fixedFields[index].vipGroups">
                <el-option
                  v-for="($item,$index) in fixedFields[index].vipGroups"
                  :key="$index"
                  :value="$item.key"
                >
                  <span style="float: left">{{$item.label}}</span>
                </el-option>
              </template>
            </el-select>
            <button
              v-if="fixedFields[index]&&fixedFields[index].fieldName.includes('手机号')&& hasCheckcode"
              class="vcode_button"
              @click="sendMsg(fixedFields[index])"
              :disabled="isDisabled"
              v-bind:style="{ color: vcodeColor }"
            >{{buttonName}}</button>
            <div class="sub-line"></div>
          </div>
          <div v-if="hasCheckcode">
            <div class="app-detail">
              <label class="form-inline">验证码</label>
              <div
                v-if="isVcode"
                v-bind:style="{ color: 'red', fontSize: 12 + 'px', float: 'right' }"
              >验证码不正确</div>
              <el-input
                class="input_el"
                v-model="registerParams.vcode"
                placeholder="请输入验证码  (必填)"
                @change="check_vcode()"
              ></el-input>
              <div class="sub-line"></div>
            </div>
          </div>
          <div
            v-for="(item, index) in selectFields"
            class="app-detail"
            :key="`selectFields${index}`"
          >
            <div class="sub-title">{{selectFields[index].fieldName}}</div>
            <div v-if="false" v-bind:style="{ color: 'red', fontSize: 12 + 'px', float: 'right' }">
              <span
                v-if="selectFields[index].fieldValue&&selectFields[index].fieldName.includes('手机号')&& !/^1[34578]\d{9}$/g.test(selectFields[index].fieldValue)"
              >{{selectFields[index].fieldName}}格式有误</span>
              <span v-if="!selectFields[index].fieldValue">{{selectFields[index].fieldName}}不能为空</span>
            </div>
            <br>
            <el-input
              style="width: 210px;"
              class="input_el"
              v-model.trim="selectFields[index].fieldValue"
              :placeholder="'请输入'+selectFields[index].fieldName + '  (选填)'"
            ></el-input>

            <div class="sub-line"></div>
          </div>
        </div>
      </template>
      <!-- 物业自定义字段 -->
      <div v-if="propertyFieldList.length && !isHotel">
        <div v-for="(item, index) in propertyFieldList" class="app-detail" :key="index">
          <div class="sub-title">{{propertyFieldList[index].fieldName}}</div>
          <div
            v-if="isShowWY[index]"
            v-bind:style="{ color: 'red', fontSize: 12 + 'px', float: 'right' }"
          >
            <span
              v-if="propertyFieldList[index].fieldValue&&propertyFieldList[index].fieldName.includes('手机号')&& !/^1[34578]\d{9}$/g.test(propertyFieldList[index].fieldValue)"
            >{{propertyFieldList[index].fieldName}}格式有误</span>
            <span
              v-if="!propertyFieldList[index].fieldValue"
            >{{propertyFieldList[index].fieldName}}不能为空</span>
          </div>
          <el-input
            class="input_el"
            v-model.trim="propertyFieldList[index].fieldValue"
            :placeholder="'请输入'+propertyFieldList[index].fieldName"
          ></el-input>
          <button
            v-if="propertyFieldList[index].fieldName.includes('手机号')&&propertyFieldList[index].fieldType===2"
            class="vcode_button"
            @click="sendMsg(propertyFieldList[index])"
            :disabled="isDisabled"
            v-bind:style="{ color: vcodeColor }"
          >{{buttonName}}</button>
          <div class="sub-line"></div>
        </div>
      </div>
      <!-- 公司自定义字段 -->
      <template v-if="!isHotel">
        <div v-if="companyFieldList.length">
          <div v-for="(item, index) in companyFieldList" class="app-detail" :key="index">
            <div class="sub-title">{{companyFieldList[index].fieldName}}</div>
            <div
              v-if="isShowGS[index]"
              v-bind:style="{ color: 'red', fontSize: 12 + 'px', float: 'right' }"
            >
              <span
                v-if="companyFieldList[index].fieldValue&&companyFieldList[index].fieldName.includes('手机号')&& !/^1[34578]\d{9}$/g.test(companyFieldList[index].fieldValue)"
              >{{companyFieldList[index].fieldName}}格式有误</span>
              <span
                v-if="!companyFieldList[index].fieldValue"
              >{{companyFieldList[index].fieldName}}不能为空</span>
            </div>
            <br>
            <el-input
              style="width: 210px;"
              class="input_el"
              v-model.trim="companyFieldList[index].fieldValue"
              :placeholder="'请输入'+companyFieldList[index].fieldName"
            ></el-input>
            <button
              v-if="companyFieldList[index].fieldName.includes('手机号')&&companyFieldList[index].fieldType===2"
              class="vcode_button"
              @click="sendMsg(companyFieldList[index])"
              :disabled="isDisabled"
              v-bind:style="{ color: vcodeColor }"
            >{{buttonName}}</button>
            <div class="sub-line"></div>
          </div>
        </div>
        <div v-if="hasCheckcode">
          <div class="app-detail">
            <label class="form-inline">验证码</label>
            <div
              v-if="isVcode"
              v-bind:style="{ color: 'red', fontSize: 12 + 'px', float: 'right' }"
            >验证码不正确</div>
            <el-input
              class="input_el"
              v-model="registerParams.vcode"
              placeholder="请输入验证码"
              @change="check_vcode()"
            ></el-input>
            <div class="sub-line"></div>
          </div>
        </div>
      </template>
      <div class="app-detail">
        <div class="sub-title">访问截止时间</div>
        <el-input
          class="input_el input_el1"
          placeholder="请输入访问截止时间"
          :value="deadLineTime"
          :readonly="true"
          disabled="disabled"
        ></el-input>
        <div class="sub-line"></div>
      </div>
      <div class="app-detail">
        <div>
          <div class="sub-title">您的照片</div>
          <div
            v-if="showImage"
            v-bind:style="{ color: 'red', fontSize: 12 + 'px', float: 'right' }"
          >照片不能为空</div>
          <br>
          <div style="margin-top: 10px;">
            <el-upload
              ref="upload"
              name="file"
              type="file"
              accept="image/*"
              capture="camera"
              class="avatar-uploader"
              :action="actionUrl()"
              :show-file-list="false"
              :on-error="handeleUploadError"
              :on-success="handleAvatarSuccess"
              :on-change="handlePicturePreview"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="photo-desc">
              <div class="desc-title">
                <label>照片要求：</label>
              </div>
              <span>正面近照，脸部无遮挡，露出眉毛、额头、耳朵。</span>
              <br>
              <span>光线正常，曝光适度。</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-button class="submit-btn" type="primary" @click="registerVisitor">提交</el-button>
      </div>
    </div>
    <div v-if="successWhiteBox" class="white_content">
      <div class="icon-img">
        <img :src="imgSuccessUrl">
      </div>
      <div class="desc-content">
        <span>提交成功</span>
      </div>
      <el-button class="success-btn1" type="primary" round @click="registerSuccess">继续注册</el-button>
      <br>
      <el-button class="success-btn2" round @click="registerSuccess">完成</el-button>
      <br>
      <!-- <el-button class="success-btn2" round @click="linkQrcode">闸机通行二维码</el-button> -->
    </div>
    <div
      v-if="successBlackBox"
      class="black_overlay"
      v-bind:style="{ height: blackbgHeight + 'px' }"
    ></div>
  </div>
</template>
<script>
import pic from "@/assets/images/icon_success.svg";
import { getFieldsList, sendMsg, addVisitor, upload } from "@/api/register";
import { compress } from "./compress";
export default {
  data() {
    return {
      //摩登克斯需求
      registorType: 0,
      fixedFields: [
        {
          fieldId: 0,
          fieldName: "姓名",
          fieldValue: ""
        },
        {
          fieldId: 1,
          fieldName: "VIP等级",
          fieldValue: "",
          vipGroups: [
            {
              label: "V1",
              key: "V1"
            },
            {
              label: "V2",
              key: "V2"
            }
          ]
        },
        {
          fieldId: 2,
          fieldName: "手机号码",
          fieldValue: ""
        }
      ],
      selectFields: [
        {
          fieldId: 3,
          fieldName: "VIP号码",
          fieldValue: ""
        },
        {
          fieldId: 4,
          fieldName: "身份证号",
          fieldValue: ""
        },
        {
          fieldId: 5,
          fieldName: "喜好",
          fieldValue: ""
        },
        {
          fieldId: 6,
          fieldName: "禁忌",
          fieldValue: ""
        },
        {
          fieldId: 7,
          fieldName: "公司名称",
          fieldValue: ""
        },
        {
          fieldId: 8,
          fieldName: "职务",
          fieldValue: ""
        }
      ],
      isShowFixed: [],
      loadingInstance: null,
      registerUserId: "",
      companyInfo: {
        companyName: "",
        companyId: "",
        type: 2, //1.常驻 2.访客
        pageSize: 1000
      },
      registerParams: {
        propertyId: "",
        companyId: "",
        groupId: "",
        userType: "",
        intervieweePhone: "",
        name: "",
        vcode: "",
        deadLineTime: "",
        phone: "",
        phoneType: 1, //1:公司注册 2:物业注册
        headPath: "",
        threshold: 0.75,
        registerType: 6,
        fieldPojoList: []
      },
      errorFieldName: "",
      accessTime: "",
      imageUrl: "",
      imgSuccessUrl: pic,
      group: "",
      groupList: [],
      companyList: [],
      //页面公司自定义字段集合
      companyFieldList: [],
      propertyFieldList: [],
      isShowWY: [],
      isShowGS: [],
      isFieldList: [],
      deadLineTime: "",
      buttonName: "获取验证码",
      hasCheckcode: false,
      blackbgHeight: 800,
      vcodeColor: "#0084ca",
      isDisabled: false,
      time: 90,
      //判空
      isGroup: false,
      isVcode: false,
      isphone: false,
      isName: false,
      fullscreenLoading: false,
      showImage: false,
      successWhiteBox: false,
      successBlackBox: false,
      phoneType: 0
      //				updateHeight: 0
    };
  },
  computed: {
    isHotel() {
      if (
        this.companyInfo &&
        this.companyInfo.companyName &&
        this.companyInfo.companyName.includes("摩登克斯")
      ) {
        this.selectFields[0].fieldValue = this.randomMix(6); //随机生成6位字母数字组合
        return true;
      } else {
        return false;
      }
      // if (this.companyInfo.companyName.includes("robin")) {
      //   return true;
      // } else {
      //   return false;
      // }
    }
  },
  created: function() {
    //获取路径上的companyId,companyName,propertyId
    this.companyInfo.companyId = this.$route.query.companyId;
    this.companyInfo.companyName = this.$route.query.companyName;
    this.registerParams.propertyId = this.$route.query.propertyId;
    this.blackbgHeight =
      document.body.clientHeight + document.documentElement.scrollTop;
    //获取参数信息
    getFieldsList(this.companyInfo)
      .then(response => {
        this.listLoading = true;
        this.companyInfo.companyName = response.data.company.name;
        this.accessTime = response.data.company.accessTime;
        this.groupList = response.data.groupList;
        if (this.groupList.length) {
          this.group = this.groupList[0];
        }
        this.propertyFieldList = response.data.propertyFieldList;
        this.companyFieldList = response.data.companyFieldList;
        console.log(this.companyFieldList, this.propertyFieldList);
        if (this.companyFieldList.length && this.propertyFieldList.length) {
          this.uniqueFieldList();
        }
        if (this.companyFieldList.length || this.propertyFieldList.length) {
          this.hasCheckCode();
        }
        this.registerParams.fieldPojoList = response.data.propertyFieldList.concat(
          response.data.companyFieldList
        );
        //当前屏幕的高度
        //				var screen_height = window.screen.height;
        //				//元素内容的高度（包含滚动的高度）
        //				let scrollHeight = this.$refs.elememt.scrollHeight
        //				this.updateHeight = (scrollHeight - screen_height)*2
        this.registerParams.companyId = this.companyInfo.companyId;
        this.registerParams.userType = this.companyInfo.type;
        var aTime = 0;
        if (this.accessTime) {
          aTime = parseInt(this.accessTime);
          var date = new Date();
          date.setHours(date.getHours() + aTime);
          var m = date.getMonth() + 1;
          m = m < 10 ? "0" + m : m;
          var d = date.getDate();
          d = d < 10 ? "0" + d : d;
          var h = date.getHours();
          h = h < 10 ? "0" + h : h;
          var mm = date.getMinutes();
          mm = mm < 10 ? "0" + mm : mm;
          var ss = date.getSeconds();
          ss = ss < 10 ? "0" + ss : ss;
          var yyyy = date.getFullYear();
          var value = yyyy.toString() + "-" + m + "-" + d + " " + h + ":" + mm;
          this.deadLineTime = value;
          this.registerParams.deadLineTime =
            yyyy + "-" + m + "-" + d + " " + h + ":" + mm + ":" + ss;
        }
        //自定义字段传给第三方字段
        if (this.registerParams.fieldPojoList) {
          this.isFieldList = [];
          //判断自定义字段初始状态
          for (const item of this.registerParams.fieldPojoList) {
            if (item.fieldType === 1) {
              this.phoneType = 1;
            }
            if (item.fieldType === 2) {
              this.phoneType = 2;
            }
          }
        }
        this.listLoading = false;
        return;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {
    linkQrcode() {
      // console.log(this.registerUserId, process.env.QRCODE_URL);
      let userId = this.registerUserId;
      let qrcode = `${process.env.QRCODE_URL}`;
      let url = `${qrcode}vue/iim/iim-qrcode/?content=${userId}/#/`;
      if (userId) {
        window.open(url, "_self");
      }
    },
    actionUrl() {
      return process.env.BASE_API + "app/2.0.0/register/picture";
    },
    hasCheckCode() {
      for (let i = 0, item = this.companyFieldList; i < item.length; i++) {
        this.registorType = item[i].fieldType;
        if (item[i].fieldName.includes("手机号") && item[i].fieldType === 2) {
          this.hasCheckcode = true;
          break;
        }
      }
      for (let i = 0, item = this.propertyFieldList; i < item.length; i++) {
        this.registorType = item[i].fieldType;
        if (item[i].fieldName.includes("手机号") && item[i].fieldType === 2) {
          this.hasCheckcode = true;
          break;
        }
      }
    },
    //若同时配置了手机号
    uniqueFieldList() {
      let hasCompanyPhone = this.companyFieldList.findIndex(item =>
        item.fieldName.includes("手机号")
      );
      let hasPropertyPhone = this.propertyFieldList.findIndex(item =>
        item.fieldName.includes("手机号")
      );
      if (hasCompanyPhone > -1 && hasPropertyPhone > -1) {
        this.companyFieldList.splice(hasCompanyPhone, 1);
      }
    },
    //校验人员分组
    check_group() {
      console.log(this.group);
      if (this.group === "") {
        this.isGroup = true;
      } else {
        this.registerParams.groupId = this.group.id;
        this.isGroup = false;
      }
    },
    //校验手机号
    check_phone() {
      if (!/^1[34578]\d{9}$/.test(this.registerParams.phone)) {
        this.isphone = true;
        return;
      } else {
        this.isphone = false;
      }
    },
    //校验验证码
    check_vcode() {
      if (!/^\d{6}$/.test(this.registerParams.vcode)) {
        this.isVcode = true;
        return;
      } else {
        this.isVcode = false;
      }
    },
    //校验人名
    check_name() {
      let name = this.registerParams.name;
      if (name === "") {
        this.isName = true;
      } else {
        this.registerParams.name = name;
        this.isName = false;
      }
    },
    //校验自定义字段
    check_fieldName(fieldValue, fieldType) {
      this.checkFields();
      if (fieldType === 1 || fieldType === 2) {
        this.registerParams.phone = fieldValue;
      }
    },
    handeleUploadError() {
      this.loadingInstance.close();
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      console.log("图片上传，begin...");
      this.loadingInstance.close();
      this.imageUrl = URL.createObjectURL(file.raw);
      this.registerParams.headPath = res.data.url;
    },
    handlePicturePreview(file) {
      this.loadingInstance = this.$loading({
        lock: true,
        text: "图片上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      clearTimeout(timer);
      var timer = setTimeout(() => {
        this.loadingInstance.close();
      }, 5000);
      const isJPG = /.(gif|jpg|jpeg|png|GIF|JPG|PNG|JPEG)$/.test(file.name);
      if (!isJPG) {
        this.loadingInstance.close();
        this.$message.error("上传头像图片不识别!");
        return false;
      }
      this.compress(file.raw, 0.2).then(val => {
        console.log("图片压缩后", val);
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.loadingInstance.close();
          this.$message.error("上传图片大小不能超过 10M!");
          return;
        }
        var formData = new FormData();
        formData.append("file", val);
        upload(formData)
          .then(res => {
            if (res.code == 1) {
              this.imageUrl = URL.createObjectURL(file.raw);
              this.registerParams.headPath = res.data.url;
              this.showImage = false;
            } else {
              this.registerParams.headPath = "";
            }
          })
          .catch(err => {
            this.imageUrl = "";
            this.registerParams.headPath = "";
            this.$message.error("图片上传出错了，请重新上传");
          })
          .finally(() => {
            this.loadingInstance.close();
          });
      });
    },
    async compress(file, rate) {
      return await new Promise((resolve, reject) => {
        compress(file, rate, res => {
          resolve(res);
        });
      });
    },
    //图片限制
    beforeAvatarUpload(file) {
      console.log("图片上传校验，begin...", file.size);
      const isJPG = /.(gif|jpg|jpeg|png|GIF|JPG|PNG|JPEG)$/.test(file.name);
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("上传头像图片不识别!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      // return isJPG && isLt2M
      return false;
    },
    //发送短信
    sendMsg(phone) {
      console.log(phone);
      if (!phone.fieldValue) {
        this.isphone = true;
        this.$message.error("请输入手机号");
        return;
      } else {
        if (!/^1[34578]\d{9}$/.test(phone.fieldValue)) {
          this.isphone = true;
          this.$message.error("手机号格式有误");
          return;
        } else {
          this.isphone = false;
        }
        let me = this;
        me.isDisabled = true;
        Object.assign(this.registerParams, { phone: phone.fieldValue });
        sendMsg(this.registerParams)
          .then(response => {
            let interval = window.setInterval(function() {
              me.buttonName = me.time + "s";
              me.vcodeColor = "#999999";
              me.time--;
              this.time = me.time;
              if (me.time < 0) {
                window.clearInterval(interval);
                this.time = me.time = 90;
                me.buttonName = "获取验证码";
                me.vcodeColor = "#0084ca";
                me.isDisabled = false;
              }
            }, 1000);
            return;
          })
          .catch(response => {
            me.isDisabled = false;
            this.$message.error(response);
          });
      }
    },
    //判断是否是手机浏览器
    isMobile() {
      var userAgentInfo = navigator.userAgent;
      var mobileAgents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var mobile_flag = false;
      //根据userAgent判断是否是手机
      for (var v = 0; v < mobileAgents.length; v++) {
        if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
          mobile_flag = true;
          break;
        }
      }
      var screen_width = window.screen.width;
      var screen_height = window.screen.height;
      //根据屏幕分辨率判断是否是手机
      if (screen_width < 500 && screen_height < 800) {
        mobile_flag = true;
      }
      return mobile_flag;
    },
    checkCompanyFields() {
      //公司自定义字段校验
      //^1[34578]\d{9}$/.test(this.registerParams.phone
      this.isShowGS = [];
      for (let i = 0; i < this.companyFieldList.length; i++) {
        let companyField = this.companyFieldList[i];
        if (companyField.fieldValue) {
          if (companyField.fieldName.includes("手机号")) {
            this.registerParams.phone = companyField.fieldValue;
            if (/^1[34578]\d{9}$/.test(companyField.fieldValue)) {
              this.isShowGS.push(false);
            } else {
              this.isShowGS.push(true);
            }
          } else {
            this.isShowGS.push(false);
          }
        } else {
          this.isShowGS.push(true);
        }
      }
    },
    checkPropertyFields() {
      //物业自定义字段校验
      this.isShowWY = [];
      for (let i = 0; i < this.propertyFieldList.length; i++) {
        let propertyField = this.propertyFieldList[i];
        if (propertyField.fieldValue) {
          if (propertyField.fieldName.includes("手机号")) {
            this.registerParams.phone = propertyField.fieldValue;
            if (/^1[34578]\d{9}$/.test(propertyField.fieldValue)) {
              this.isShowWY.push(false);
            } else {
              this.isShowWY.push(true);
            }
          } else {
            this.isShowWY.push(false);
          }
        } else {
          this.isShowWY.push(true);
        }
      }
    },
    checkFixedFields() {
      this.isShowFixed = [];
      for (let i = 0, fields = this.fixedFields; i < fields.length; i++) {
        if (fields[i].fieldName.includes("姓名")) {
          this.registerParams.name = fields[i].fieldValue;
        }
        if (fields[i].fieldValue) {
          if (fields[i].fieldName.includes("手机")) {
            this.registerParams.phone = fields[i].fieldValue;
            if (/^1[34578]\d{9}$/.test(fields[i].fieldValue)) {
              this.isShowFixed.push(false);
            } else {
              this.isShowFixed.push(true);
            }
          } else {
            this.isShowFixed.push(false);
          }
        } else {
          this.isShowFixed.push(true);
        }
      }
    },
    //提交
    registerVisitor() {
      //摩登克斯活动
      if (this.isHotel) {
        console.log(this.group, this.registerParams);
        this.checkFixedFields();
        var hasError = this.isShowFixed.some(item => item);
        if (hasError) return;
        if (this.phoneType === 2) {
          if (!/^\d{6}$/.test(this.registerParams.vcode)) {
            this.isVcode = true;
            return;
          } else {
            this.isVcode = false;
          }
        }
        if (!this.registerParams.headPath) {
          this.showImage = true;
          return;
        } else {
          this.showImage = false;
        }
        this.selectFields.forEach(item => {
          item.fieldType = this.phoneType;
        });
        this.fixedFields.forEach(item => {
          item.fieldType = this.phoneType;
        });
        this.registerParams.fieldPojoList = [
          ...this.fixedFields,
          ...this.selectFields
        ];
        console.log("--注册--", this.registerParams);
        if (this.group === "") {
          this.isGroup = true;
          return;
        } else {
          this.registerParams.groupId = this.group.id;
          this.isGroup = false;
        }
        this.fullscreenLoading = true;
        addVisitor(this.registerParams)
          .then(response => {
            console.log(response);
            if (response.code === 1) {
              this.registerUserId = response.data.res;
              this.backToTop();
            }
            this.fullscreenLoading = false;
            this.successWhiteBox = true;
            this.successBlackBox = true;
            return;
          })
          .catch(response => {
            this.fullscreenLoading = false;
            this.$message.error(response);
            if (response == "图片加载失败，请重新拍照注册") {
              this.imageUrl = "";
              this.registerParams.headPath = "";
            }
            return;
          });
      } else {
        var mobile_flag = this.isMobile(); // true为PC端，false为手机端
        if (mobile_flag) {
          let height1 = this.$refs.element1.offsetHeight;
          let height2 = this.$refs.element2.offsetHeight;
          //获取元素的总高度
          this.blackbgHeight = height1 + height2 + 33 + 40;
        }
        if (this.group === "") {
          this.isGroup = true;
          return;
        } else {
          this.registerParams.groupId = this.group.id;
          this.isGroup = false;
        }
        //访客注册姓名校验
        let name = this.registerParams.name;
        if (name === "") {
          this.isName = true;
          return;
        } else {
          this.registerParams.name = name;
          this.isName = false;
        }
        //自定义字段校验
        if (this.propertyFieldList.length) {
          this.checkPropertyFields();
          let hasError = this.isShowWY.some(item => item);
          if (hasError) return;
        }
        if (this.companyFieldList.length) {
          this.checkCompanyFields();
          let hasError = this.isShowGS.some(item => item);
          if (hasError) return;
        }
        if (this.phoneType === 2) {
          if (!/^\d{6}$/.test(this.registerParams.vcode)) {
            this.isVcode = true;
            return;
          } else {
            this.isVcode = false;
          }
        }
        if (!this.registerParams.headPath) {
          this.showImage = true;
          return;
        } else {
          this.showImage = false;
        }
        this.fullscreenLoading = true;
        addVisitor(this.registerParams)
          .then(response => {
            console.log(response);
            if (response.code === 1) {
              this.registerUserId = response.data.res;
              this.backToTop();
            }
            this.fullscreenLoading = false;
            this.successWhiteBox = true;
            this.successBlackBox = true;
            return;
          })
          .catch(response => {
            this.fullscreenLoading = false;
            this.$message.error(response);
            if (response == "图片加载失败，请重新拍照注册") {
              this.imageUrl = "";
              this.registerParams.headPath = "";
            }
            return;
          });
      }
    },
    randomMix(len) {
      var rdmString = "";
      for (
        ;
        rdmString.length < len;
        rdmString += Math.random()
          .toString(36)
          .substr(2)
      );
      return rdmString.substr(0, len);
    },
    backToTop() {
      window.scrollTo(0, 0);
    },
    registerSuccess() {
      location.reload();
      this.successWhiteBox = false;
      this.successBlackBox = false;
    }
  }
};
</script>

<style scoped="scoped">
.app-detail {
  position: relative;
}
/* .app-detail button {
  position: absolute;
  right: 0;
  top: 0;
} */
.input_el >>> input.el-input__inner::-webkit-input-placeholder {
  font-weight: normal;
}

.input_el >>> input.el-input__inner::-moz-placeholder {
  font-weight: normal;
}

.input_el >>> input.el-input__inner:-ms-input-placeholder {
  font-weight: normal;
}

.input_el >>> input.el-input__inner {
  padding: 0px;
  width: 100%;
  border: 1px solid #ffffff;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
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
  color: #000000;
}

.select_el >>> input.el-input__inner:focus {
  border: 1px solid transparent;
}

.el-select-dropdown__item.selected {
  color: #3582da;
}

.header {
  margin-bottom: 40px;
}

.header h2 {
  margin: 0;
  padding-top: 33px;
  padding-bottom: 16px;
}

.header .title-label {
  font-size: 18px;
  font-weight: bold;
}

.container {
  margin-top: 25px;
  margin: 0 auto;
  width: 345px;
  text-align: left;
}

.app-detail {
  margin-top: 16px;
  margin-left: 17px;
  margin-right: 17px;
}

.sub-title {
  float: left;
}

.sub-line {
  width: 311px;
  height: 1px;
  background-color: #e8e8e8;
}

.button_el_round {
  width: 92px;
  height: 26px;
}

.vcode_button {
  font-size: 14px;
  color: #0084ca;
  background-color: #ffffff;
  border: 1px solid;
  width: 92px;
  height: 26px;
  border-radius: 13px;
  outline: none;
  padding: 0px 4px;
}

.submit-btn {
  width: 345px;
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  background-color: #3582da;
  border-color: #3582da;
  font-size: 17px;
}

.avatar-uploader {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 72px;
  height: 72px;
  float: left;
  background-color: #f7f7f7;
}

.avatar-uploader-icon {
  font-size: 23px;
  color: #bbbbbb;
  width: 72px;
  height: 72px;
  line-height: 72px;
  text-align: center;
}

.avatar {
  width: 72px;
  height: 72px;
  display: block;
}

.photo-desc {
  float: right;
  width: 228px;
  font-size: 14px;
  color: #999999;
}

.photo-desc .desc-title {
  font-size: 14px;
  color: #666666;
  margin-bottom: 5px;
}

.photo-desc span {
  font-size: 12px;
}

.black_overlay {
  display: block;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  background-color: #000000;
  z-index: 1001;
  -moz-opacity: 0.2;
  opacity: 0.2;
}

.white_content {
  display: block;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 280px;
  height: 400px;
  padding: 20px;
  border: 1px solid #ffffff;
  background-color: white;
  z-index: 1002;
  overflow: hidden;
  border-radius: 8px;
  text-align: center;
}

.icon-img {
  width: 110px;
  height: 110px;
  margin: auto;
}

.desc-content {
  margin-top: 16px;
  margin-bottom: 40px;
  font-size: 17px;
  font-weight: bold;
}

.success-btn1 {
  width: 220px;
  height: 40px;
  margin-bottom: 16px;
  background-color: #3582da;
  border-color: #3582da;
  font-size: 17px;
  padding: 0 23px;
}

.success-btn2 {
  width: 220px;
  height: 40px;
  margin-bottom: 16px;
  background-color: #ffffff;
  border-color: #3582da;
  font-size: 17px;
  color: #3582da;
  padding: 0 23px;
}
</style>
