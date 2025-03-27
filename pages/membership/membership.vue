<template>
  <view class="container">
    <view class="membership-options">
      <view class="option" v-for="(option, index) in membershipOptions" :key="index" @click="selectOption(index)">
        <text>{{ option.name }} - {{ option.price }}元</text>
      </view>
    </view>
    <button @click="purchaseMembership">购买会员</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      membershipOptions: [
        { name: '1个月', price: 30, duration: 30 },
        { name: '3个月', price: 80, duration: 90 },
        { name: '6个月', price: 150, duration: 180 },
        { name: '1年', price: 280, duration: 365 }
      ],
      selectedOptionIndex: -1
    };
  },
  methods: {
    selectOption(index) {
      this.selectedOptionIndex = index;
    },
    purchaseMembership() {
      if (this.selectedOptionIndex === -1) {
        uni.showToast({
          title: '请选择会员时长',
          icon: 'none'
        });
        return;
      }

      const selectedOption = this.membershipOptions[this.selectedOptionIndex];
      // 这里调用支付接口，假设支付成功后返回会员到期时间
      this.payForMembership(selectedOption).then(expiryDate => {
        uni.showToast({
          title: '购买成功',
          icon: 'success'
        });
        this.$store.commit('setMembership', true);
		this.$store.commit('setMembershipExpiry', expiryDate);
        uni.navigateTo({
          url: '/pages/membership/membershipStatus'
        });
      }).catch(err => {
        uni.showToast({
          title: '购买失败',
          icon: 'none'
        });
		this.$store.commit('setMembership', false);
      });
    },
    payForMembership(option) {
      // 模拟支付接口，返回一个Promise
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + option.duration);
          resolve(expiryDate.toISOString());
        }, 1000);
      });
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.membership-options {
  margin-bottom: 20px;
}

.option {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>