<template>
	<view class='home'>
		<view class='courseIntroduce-box'>
			<view class='courseIntroduce-des'>
				<view class='courseIntroduce-info'>{{Introduce}}</view>
			</view>
			<courseIntroduceData :msg="IntroduceList" />
			
			<view class='courseIntroduce-tab-con'>
			    <text>课程章节</text>
				<CourseList :videoList="Colist" />								
			</view>	
		</view>	
	</view>				
</template>

<script>
	import courseIntroduceData from '@/components/courseintroduce-data/courseintroduce-data.vue';
	import CourseList from '@/components/courseList/courseList.vue';
	import courseJieShao from '@/components/course-jieshao/course-jieshao.vue';
	
	export default {
		data() {
			return {
				Introduce:"",
				IntroduceList:[],
			
				count:0,
				Colist:[],
				imageT:"",
				imageHeight:0
			}
		},
		
		components:{
			courseIntroduceData,
			CourseList,
			courseJieShao
		},
		
		onLoad(options){
			uni.request({
				url: `http://127.0.0.1:5000/api/data2?id=${options.id}&course=${options.course}`,
				// url:"http://127.0.0.1:5000/api/data2?id="+id+"&course="course,
				// data:{
				// 	id:options.id,
				// 	course:options.course
				// },
				success:(res)=>{					
					console.log(res.data);
											
					this.Introduce=res.data.introduce;
					this.IntroduceList=res.data.introduceList;
					this.Colist=res.data.Clist;
					this.imageT=res.data.image;
					this.imageHeight=res.data.height
				}
			})
		},
		methods: {
			change(index){
				this.count = index
			}
		}
		
	}
	
	
</script>

<style lang='scss'>

    .home{
		display:flex;
		width:100%;
		padding:0;
		box-sizing: border-box;
		flex-direction:column;
		margin-bottom: 90px;		
		.courseIntroduce-box{
			display:flex;
			width:100%;
			align-items: center;
			justify-content: center;			
			box-sizing: border-box;
			overflow: hidden;
			flex-direction: column;
			background-color:#fff;
			padding:0;
			.courseIntroduce-des{
				display:flex;
				width:100%;
				align-items: center;			
				box-sizing: border-box;				
				background-color:#0c9c8f;
				padding:0;
				
				.courseIntroduce-info{					
					display:flex;
					width:100%;
					align-items: center;			
					box-sizing: border-box;
					color:#fff;
					font-size:16px;
					line-height:24px;										
				}
			}	
			.courseIntroduce-tab-box{
				display:flex;			
				box-sizing: border-box;
				flex-direction:column;
				justify-content:‌space-between;
				
				.courseIntroduce-tab-nav{
					display:flex;
					flex-direction:row;
					background-color:#fff;
					border-bottom:1px solid #e4e4e4;
					margin-bottom:20px;
					justify-content:‌space-between;
					view{
						height:50px;
						line-height:50px;
						font-size:16px;
						flex-grow:1;
						text-align:center;
						background-color:#fff
					}					
				}
				.discount-info{
					display:none;
				}
				.btna{
					display:flex;
					box-sizing:border-box;
					justify-content:center;
					color:#ff0000;
					position:relative;
				}
				
				.btna::after{
					content:'';
					width:40px;
					height:3px;
					background-color:#ff0000;
					position:absolute;
					bottom:0;
					left:50%;
					margin-left:-20px;
				}
				.dis{
					display:block;
				}
			}	
		}		
	}			



</style>
