const state = {
  // userInfo: {},// 存储用户信息
  // membershipExpiry: null, // 会员到期时间
  // timeRemaining: '', // 剩余时间
};
// const state = {
//   userInfo: {
//     name: null,
//     nick: null,
//     avatar: null,
//     membershipExpiry: null,
//     timeRemaining: null
//   }
// };
  
  userInfo: {
      username: '',
      nickname: '',
	  userAvatar:'',
      phone: '',
      wechat: {
        name: '',
        id: '',
        avatar: ''
      },
      alipay: {
        name: '',
        id: '',
        avatar: ''
      }
  }
const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //state.userInfo = { ...state.userInfo, ...userInfo };
  setMembership(state, isMember) {
    state.userInfo.membership = isMember;
  },
  setMembershipExpiry(state, expiryDate) {
    state.userInfo.membershipExpiry = expiryDate;
  },
  setTimeRemaining(state, timeRemaining) {
    state.userInfo.timeRemaining = timeRemaining;
  },
  setPhone(state, phone) {
    state.userInfo.phone = phone;
  },
  setWechatInfo(state, wechatInfo) {
    state.userInfo.wechat = wechatInfo;
  },
  setAlipayInfo(state, alipayInfo) {
    state.userInfo.alipay = alipayInfo;
  }
};

  // SET_MEMBERSHIP_EXPIRY(state, expiryDate) {
    //state.membershipExpiry = expiryDate;

const actions = {
  updateUserInfo({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo);
  },
  updatePhone({ commit }, phone) {
    commit('setPhone', phone);
  },
  updateWechat({ commit }, wechatInfo) {
    commit('setWechatInfo', wechatInfo);
  },
  updateAlipay({ commit }, alipayInfo) {
    commit('setAlipayInfo', alipayInfo);
  }
  // updateMembershipExpiry({ commit }, expiryDate) {
  //   commit('SET_MEMBERSHIP_EXPIRY', expiryDate);
  // }
 //  updatePhone({ commit }, phone) {
	// commit('updatePhone', phone);
 //  },
 //  updateWechat({ commit }, wechatInfo) {
	// commit('updateWechat', wechatInfo);
 //  },
 //  updateAlipay({ commit }, alipayInfo) {
	// commit('updateAlipay', alipayInfo);
 //  }
  
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};