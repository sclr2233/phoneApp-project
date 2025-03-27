<template>
	<view class='course_nav_con'>
		<view class='course_nav_info' v-for='(item,index) in list' :key='index' @click="courseItemHandle(item.id,item.course)">
			<text class='course_nav_icon icon iconfont' :class='item.icon'></text>
			<view class='course_info_text'>{{item.text}}</view>
	    </view>
	</view>	
</template>

<script>
	export default {
		data() {
			return {

				list:[]
			}
		},
		mounted(){
			uni.request({
				url: 'http://127.0.0.1:5000/api/data1', //仅为示例，并非真实接口地址。
				
				success: (res) => {
					console.log(res.data);
					this.list = res.data.data.info
				},
				
			})	
		},
		methods:{
			courseItemHandle(id,course){
			
				uni.navigateTo({
					url:"/pages/course/courseintroduce/courseintroduce?id="+id+"&course="+course
				})
				
			}
		}
	}		
	
</script>

<style lang='scss'>
	@import '@/common/font/iconfont.css';
	
	.course_nav_con{
		display: flex;
		box-sizing: border-box;
		flex-direction: row;
		flex-wrap: wrap;
		padding:15px 10px;
		.course_nav_info{
			width:20%;
			flex-direction: column;
			flex-wrap: wrap;
			text-align: center;
			justify-items: center;
			margin-bottom: 15px;
			.course_nav_icon{
				font-size: 30px;
				color:green
			}
			.course_info_text{
				width:100%;
				font-size: 13px;
				margin-top: 10px;
				
				white-space-collapse: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
	
</style>