<template>
  <view class='word-content'>
    <web-view class='word-privacy' :src="htmlFilePath"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      htmlFilePath: '/static/privacy.html' // HTML 文件路径
    };
  }
};

</script>

<style lang='scss'>
	
.word-content {
	display: flex;
	box-sizing: border-box;
	justify-content: center;
	align-items: center;
	width:100vw;
	height: 100vh; /* 使 view 占满整个屏幕高度 */
	background-color: #f0f0f0; /* 设置背景颜色 */
	padding:30rpx 50rpx;
  
    .word-privacy {
		display: flex;
		width: 100%; /* 使 web-view 占满父容器的宽度 */
		height: 100%; /* 使 web-view 占满父容器的高度 */
		border: none; /* 去除边框 */
		box-sizing: border-box;
		
	}
}
	
	/* 设置 web-view 组件的样式 */
	

</style>
