<template>
    <div>
      <section class="loginContainer">
        <div class="loginInner">
          <div class="login_header">
            <h2 class="login_logo">蜗牛外卖</h2>
            <div class="login_header_title">
              <a href="javascript:;" :class="{on: loginType}" @click="loginType=true">短信登录</a>
              <a href="javascript:;" :class="{on: !loginType}" @click="loginType=false">密码登录</a>
            </div>
          </div>
          <div class="login_content">
            <form @submit.prevent="login">
              <div :class="{on: loginType}">
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                  <button :disabled="!rightPhone" class="get_verification" :class="{right_phone: rightPhone}"
                      @click.prevent="getCode">
                    {{computeTime > 0 ? `已发送${computeTime}s` : '获取验证码'}}
                  </button>
                </section>
                <section class="login_verification">
                  <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                </section>
                <section class="login_hint">
                  温馨提示：未注册蜗牛外卖帐号的手机号，登录时将自动注册，且代表已同意
                  <a href="javascript:;">《用户服务协议》</a>
                </section>
              </div>
              <div :class="{on: !loginType}">
                <section>
                  <section class="login_message">
                    <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                  </section>
                  <section class="login_verification">
                    <input type="password" maxlength="8" placeholder="密码" v-if="!isShowPwd" v-model="pwd">
                    <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                    <div class="switch_button" @click="isShowPwd=!isShowPwd" :class="isShowPwd ? 'on' : 'off'">
                      <div class="switch_circle" :class="{right : isShowPwd}"></div>
                      <span class="switch_text" >{{isShowPwd?'abc':'...'}}</span>
                    </div>
                  </section>
                  <section class="login_message">
                    <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                    <img class="get_verification" src="./images/captcha.svg" alt="captcha">
                  </section>
                </section>
              </div>
              <button class="login_submit">登录</button>
            </form>
            <a href="javascript:;" class="about_us">关于我们</a>
          </div>
          <a href="javascript:" class="go_back" @click="$router.back()">
            <i class="iconfont icon-jiantou2"></i>
          </a>
        </div>
      </section>
      <AlertTip :alertText="alertText" v-show="showTips" @closeTip="closeTip"></AlertTip>
    </div>
</template>

<script>
    import AlertTip from '../../components/AlertTip/AlertTip'
    export default {
      components: {AlertTip},
      data () {
        return {
          loginType: true, //  true代表短信登录
          computeTime: 0, //  计时时间
          phone: '',  //手机号
          code: '', //短信验证码
          name: '', //用户名
          pwd: '',  //用户密码
          isShowPwd: false, //是否显示密码
          captcha: '',  //图形验证码
          alertText: '',  //提示文本
          showTips: false,  //是否显示提示框
        }
      },
      computed: {
        rightPhone () {
          return /^1\d{10}$/.test(this.phone)
        }
      },
      methods: {
        getCode () {
          if(this.computeTime > 0){
            return
          }
          //启动倒计时
          this.computeTime = 30
          const intervalId = setInterval(() => {
            this.computeTime--
            if(this.computeTime <= 0){
              clearInterval(intervalId)
            }
          }, 1000)
          //发送ajax请求

        },
        login () {
          //前台表单验证
          //1.收集数据
          if(this.loginType){ //短信登录
            const {rightPhone, phone, code} = this
            if(!rightPhone){
              //手机号不正确
              this.showAlert("手机号不正确！")
            } else if(!/^\d{6}$/.test(code)){
              //验证码必须是6位数字
              this.showAlert("验证码必须是6位数字！")
            }
          } else {  ////用户名登录
            const {name, pwd, captcha} = this
            if(!name){
              //用户名验证
              this.showAlert("请正确输入用户名！")
            } else if(!pwd){
              //密码验证
              this.showAlert("请正确输入密码名！")

            } else if(!captcha){
              //图形验证码验证
              this.showAlert("图形验证码错误！")
            }
          }
        },
        showAlert (alertText) {
          this.alertText = alertText
          this.showTips = true
        },
        closeTip () {
          this.showTips = false
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
                &:focus
                  outline medium
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
