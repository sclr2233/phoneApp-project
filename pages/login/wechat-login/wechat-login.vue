<template>
  <view class="container">
    <view class="login-box">
      <view class="title">微信扫码登录</view>
      
      <!-- 二维码展示区域 -->
      <view class="qrcode-container" v-if="qrcodeUrl && !loginSuccess">
        <image :src="qrcodeUrl" mode="aspectFit" class="qrcode-image"></image>
        <view class="tips">请使用微信扫描二维码登录</view>
      </view>
      
      <!-- 加载状态 -->
      <view class="loading" v-if="loading">
        <uni-load-more status="loading"></uni-load-more>
      </view>
      
      <!-- 登录成功展示 -->
      <view class="success-container" v-if="loginSuccess">
        <uni-icons type="checkmarkempty" size="60" color="#09BB07"></uni-icons>
        <view class="success-text">登录成功</view>
        <view class="user-info" v-if="userInfo">
          <image :src="userInfo.headimgurl" class="avatar"></image>
          <view class="nickname">{{ userInfo.nickname }}</view>
        </view>
        <button type="primary" @click="handleContinue">继续</button>
      </view>
      
      <!-- 错误提示 -->
      <view class="error-message" v-if="errorMessage">
        <uni-icons type="info" color="#DD524D"></uni-icons>
        <text>{{ errorMessage }}</text>
      </view>
      
      <!-- 二维码过期或失效 -->
      <view class="expired" v-if="qrcodeExpired">
        <button type="primary" @click="getWeChatQRCode">刷新二维码</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      qrcodeUrl: '',
      state: '',
      timer: null,
      checkInterval: 3000, // 3秒检查一次
      expiresIn: 300, // 二维码有效期
      errorMessage: '',
      loginSuccess: false,
      userInfo: null,
      qrcodeExpired: false
    }
  },
  onLoad() {
    this.getWeChatQRCode()
  },
  onUnload() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    async getWeChatQRCode() {
      this.loading = true
      this.errorMessage = ''
      this.qrcodeExpired = false
      
      try {
        const res = await uni.request({
          url: 'http://你的Flask后端地址/api/wechat/qrcode',
          method: 'GET'
        })
        
        const [error, data] = res
        
        if (error || data.code !== 200) {
          throw new Error(data.message || '获取二维码失败')
        }
        
        this.qrcodeUrl = this.generateQRCodeImage(data.data.qrcode_url)
        this.state = data.data.state
        this.expiresIn = data.data.expires_in
        
        // 开始轮询检查登录状态
        this.startPolling()
        
      } catch (error) {
        this.errorMessage = error.message
      } finally {
        this.loading = false
      }
    },
    
    generateQRCodeImage(url) {
      // 在实际项目中，你可以使用第三方服务将URL生成二维码图片
      // 这里简单返回URL，实际应用中应该生成真正的二维码图片
      return url
      
      // 或者使用uni-app的二维码生成插件，例如：
      // return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
    },
    
    startPolling() {
      // 先清除之前的定时器
      if (this.timer) {
        clearInterval(this.timer)
      }
      
      this.timer = setInterval(async () => {
        try {
          const res = await uni.request({
            url: 'http://你的Flask后端地址/api/wechat/check_login',
            method: 'GET',
            data: {
              state: this.state
            }
          })
          
          const [error, data] = res
          
          if (error || data.code !== 200) {
            throw new Error(data.message || '检查登录状态失败')
          }
          
          if (data.data.status === 'confirmed') {
            // 登录成功
            this.loginSuccess = true
            this.userInfo = data.data.user_info
            clearInterval(this.timer)
            
            // 在这里可以处理登录成功后的逻辑，例如保存用户信息等
            this.saveUserInfo(data.data.user_info)
            
          } else if (data.data.status === 'expired') {
            // 二维码过期
            this.qrcodeExpired = true
            clearInterval(this.timer)
          }
          // 其他状态(waiting, scanned)继续等待
          
        } catch (error) {
          console.error('轮询错误:', error)
          // 不显示错误，继续轮询
        }
      }, this.checkInterval)
    },
    
    saveUserInfo(userInfo) {
      // 保存用户信息到本地存储
      uni.setStorageSync('userInfo', userInfo)
      uni.setStorageSync('token', '模拟token') // 实际项目中应该是后端返回的token
    },
    
    handleContinue() {
      // 登录成功后跳转到首页或其他页面
      uni.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 80%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.qrcode-container {
  margin: 20px 0;
}

.qrcode-image {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: block;
  border: 1px solid #eee;
}

.tips {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

.loading {
  margin: 30px 0;
}

.success-container {
  margin: 20px 0;
}

.success-text {
  font-size: 18px;
  color: #09BB07;
  margin: 15px 0;
}

.user-info {
  margin: 20px 0;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  margin: 0 auto 10px;
}

.nickname {
  font-size: 16px;
  color: #333;
}

.error-message {
  color: #DD524D;
  font-size: 14px;
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message text {
  margin-left: 5px;
}

.expired {
  margin: 20px 0;
}
</style>
