<template>
	<view class='courseintroduce-data-box'>
		<view class='courseintroduce-data-info' v-for='(item,index) in msg' :key='index'>
			<view class='courseintroduce-data-txt1'><text>{{item.num}}</text></view>
			<view class='courseintroduce-data-txt2'><text>{{item.txet}}</text></view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			msg:{
				type:Array,
				default:() => []				
				
			}
		},
		mounted(){
			console.log(this.msg)
		},
		
		methods: {
			
		}
	}
</script>

<style>
	
	.courseintroduce-data-box{
		display:flex;
		flex-direction:row;
		flex-wrap:wrap;
		width:100%;
		padding:15px 10px;
		box-sizing: border-box;
		justify-content: center;		
		.courseintroduce-data-info{
			display:flex;
			width:25%;
			height:80px;
			flex-direction: column;
			align-items: center;
			justify-content: center;			
			box-sizing: box;
			overflow: hidden;
			flex-grow:1;
			position:relative;
			
			.courseintroduce-data-txt1{
				text-align: center;
				width:100%;
				font-size:12px;
				color:#ff5200;
				overflow: ellipsis;
				margin-bottom: 10px;
				
				text{
					font-size: 16px;
				}
			}	
				
			.courseintroduce-data-txt2{					
				text-align: center;
				width:100%;
				font-size:12px;
				color:#333;
				overflow: ellipsis;
				white-space: nowrap;
				text-overflow: ellipsis;
	
			}	
		}
	}	
	
</style>
