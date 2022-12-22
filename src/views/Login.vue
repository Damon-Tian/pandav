/* Login.vue */
<template>
  <div>
    <div class="login-container">
      <div class="login-wrap">
        <div class="login-content">
          <div class="title">大熊猫国家公园成都片区自然资源</div>
          <div class="title-desc">大屏监测平台</div>
          <el-form
            ref="loginFormRef"
            class="login-form"
            :model="param"
            :rules="rules"
            size="large"
            status-icon
          >
            <el-form-item prop="username">
              <div class="logo-form-item">
                <img src="@/assets/icons/用户.svg" class="form-icon" />
                <el-input
                  v-model="param.username"
                  class="form-item"
                  placeholder="请输入账号/手机号"
                />
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="logo-form-item">
                <img src="@/assets/icons/密码.svg" class="form-icon" />
                <el-input
                  v-model="param.password"
                  type="password"
                  class="form-item"
                  placeholder="请输入密码"
                  @keyup.enter="submitForm"
                />
              </div>
            </el-form-item>
            <el-form-item prop="code">
              <div class="logo-form-item veri-code">
                <img src="@/assets/icons/验证码_fill.svg" class="form-icon" />
                <el-input
                  v-model="param.code"
                  class="form-item"
                  placeholder="请输入验证码"
                  @keyup.enter="submitForm"
                />
                <img :src="codeInfo.img" @click="getVeriCode" />
              </div>
            </el-form-item>
            <!-- <el-form-item prop="">
              <div class="logo-form-item">
                <el-checkbox v-model="param.savePassword" class="checkbox">
                  记住密码
                </el-checkbox>
              </div>
            </el-form-item> -->
            <div class="login-btn">
              <el-button
                type="primary"
                :loading="btnLoading"
                @click="submitForm"
              >
                登录
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <video autoplay muted loop :src="bg" class="bg-video"></video>
  </div>
</template>

<script>
import { required } from "@/utils/validate"
import { user_code, get_login_bg } from "@/api/user"
import { Message } from "element-ui"
export default {
  name: "Login",
  data() {
    return {
      btnLoading: false,
      param: {
        username: "",
        password: "",
        code: "",
        savePassword: false,
        largeScreen: "yes"
      },
      rules: {
        username: [required("请输入账号/手机号")],
        password: [required("请输入密码")],
        code: [required("请输入验证码")]
      },
      codeInfo: {},
      bg: ""
    }
  },
  created() {
    this.getVeriCode()
    this.getLoginBg()
    if (this.$store.state.user.savePassword) {
      this.param.savePassword = this.$store.state.user.savePassword
      this.param.username = this.$store.state.user.name
      this.param.password =
        this.$store.state.user.password &&
        window.atob(this.$store.state.user.password)
    }
  },
  methods: {
    async submitForm() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          // 访问登录接口
          this.$store
            .dispatch("user/login", this.param)
            .then(() => {
              this.$store.commit("user/SET_SAVEPASSWORD", {
                savePassword: this.param.savePassword,
                password: window.btoa(this.param.password)
              })
              this.$router.push("/")
            })
            .catch((e) => {
              Message.error(e.msg)
              this.getVeriCode()
            })
            .finally(() => {
              this.btnLoading = false
            })
        }
      })
    },
    async getVeriCode() {
      const code = await user_code()
      this.codeInfo = code
      this.param.uuid = this.codeInfo.uuid
    },
    async getLoginBg() {
      this.bg = await get_login_bg()
    }
  }
}
</script>

<style lang="less" scoped>
.bg-video {
  position: relative;
  position: fixed;
  width: 100vw;
  height: 100vh;
  object-fit: fill;
}

.login-container {
  position: fixed;
  z-index: 1;
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background-color: transparent;
  background-size: cover;

  .login-wrap {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    .login-content {
      width: 500px;
      height: 460px;
      box-sizing: border-box;
      padding: 40px;
      background: rgba(255, 255, 255, 50%);
      border-radius: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 20%);

      .title {
        width: 421px;
        height: 27px;
        color: #303350;
        font-size: 28px;
        font-weight: 700;
        text-align: left;
      }

      .title-desc {
        width: 250px;
        height: 50px;
        margin: 15px auto 40px;
        background: #2740ff;
        border-radius: 25px;
        color: #fff;
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 3.92px;
        line-height: 50px;
        text-align: center;
      }

      .logo-form-item {
        position: relative;
        width: 100%;

        .form-icon {
          position: absolute;
          z-index: 1;
          top: 8px;
          left: 5px;
          width: 24px;
          height: 24px;
        }

        & :deep .el-input__inner {
          padding: 1px 15px 1px 50px;
          border: none;
          border-bottom: 1px solid #cecece;
          border-radius: 0;
          color: #333;
          font-size: 16px;
        }

        .checkbox {
          margin-left: 10px;
          color: #999;
        }

        & :deep .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          border-color: #2740ff;
          background-color: #2740ff;
        }

        & :deep .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #2740ff;
        }
      }

      .veri-code {
        & :deep .el-input__suffix {
          margin-right: 120px;
        }

        img {
          position: absolute;
          right: 0;
          width: 120px;
          height: 38px;
        }
      }

      .login-btn {
        & :deep .el-button {
          width: 100%;
          height: 50px;
          background-color: #2740ff;
          font-size: 20px;
          letter-spacing: 5px;
        }
      }
    }
  }
}
</style>
