<template>
    <view class="container">
		<uni-forms ref="form" :model="formData" :rules="rules">
		     <!-- 用户名 -->
			<uni-forms-item label="用户名" name="username">
				<input v-model="formData.username" placeholder="请输入用户名">
			</uni-forms-item>
			
			<uni-forms-item label="邮箱" name="email">
				<input v-model="formData.email" placeholder="请输入邮箱">
			</uni-forms-item>

			  <!-- 密码 -->
			<uni-forms-item label="密码" name="password">
				<input type="password" v-model="formData.password" placeholder="请输入密码">
		    </uni-forms-item>

			  <!-- 确认密码 -->
			<uni-forms-item label="确认密码" name="confirmPassword">
				<input type="password" v-model="formData.confirmPassword" placeholder="请再次输入密码">
			</uni-forms-item>
			
			<!-- 昵称 -->
			<uni-forms-item label="昵称" name="nickname">
				<input v-model="formData.nickname" placeholder="请输入昵称">
			</uni-forms-item>

			<!-- 会员等级 -->
			<uni-forms-item label="会员等级" name="memberLevel">
				<picker @change="bindMemberLevelChange" :value="memberLevelIndex" :range="memberLevels">
					<view class="picker">
						当前选择：{{memberLevels[memberLevelIndex]}}
					</view>
				</picker>
			</uni-forms-item>

			<!-- 头像 -->
			<uni-forms-item class="avatar-item" label="头像" name="avatar">
				<uni-file-picker v-model="formData.avatar" fileMediatype="image" mode="grid" @success="uploadSuccess" @fail="uploadFail" />
			</uni-forms-item>


			  <!-- 提交按钮 -->
			<button type="primary" @click="submitForm">注册</button>
		</uni-forms>
	</view>
</template>

<script>
import UniForms from '@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue';
import UniFormsItem from '@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue';
import UniFilePicker from '@dcloudio/uni-ui/lib/uni-file-picker/uni-file-picker.vue';	

	
export default {
    data() {
		return {
		  // 表单数据
		    formData: {
				username: '',
				email:'',
				password: '',
				confirmPassword: '',
				nickname: '',
				memberLevel: '',
				avatar: ''				
			},
			
			// 会员等级选项
			memberLevels: ['普通会员', '高级会员', 'VIP会员'],
			memberLevelIndex: 0,
		  // 表单验证规则
			rules: {
				username: {
				    rules: [
						{ required: true, errorMessage: '用户名不能为空' },
						{ minLength: 3, maxLength: 12, errorMessage: '用户名长度在3到12个字符之间' }
					]
				},
				
				email: {
					rules: [
						{ required: true, errorMessage: '邮箱不能为空' },
						{ format: 'email', errorMessage: '邮箱格式不正确' }
					]
				},
								
				password: {
					rules: [
						{ required: true, errorMessage: '密码不能为空' },
						{ minLength: 6, maxLength: 16, errorMessage: '密码长度在6到16个字符之间' }
					]
				},
				confirmPassword: {
					rules: [
						{ required: true, errorMessage: '确认密码不能为空' },
						{
							validateFunction: (rule, value, data, callback) => {
								if (value !== this.formData.password) {
									callback('两次输入的密码不一致')
								}
								return true
							}
						}
					]
				},
				nickname: {
					rules: [
						{ required: true, errorMessage: '昵称不能为空' }
					]
				},
				memberLevel: {
					rules: [
						{ required: true, errorMessage: '请选择会员等级' }
					]
				},
				avatar: {
					rules: [
						{ required: false, errorMessage: '请上传头像' }
					]
				}												
			}	
		}
    },
 
    components: {
		UniForms,
		UniFormsItem,
		UniFilePicker
    },
  
    methods: {
		
	// 	submitForm() {
	// 		this.$refs.form.validate().then(res => {
	// 			console.log('表单数据:', this.formData)
	//          localStorage.setItem('userData', JSON.stringify(this.formData));
	// 			uni.showToast({
	// 				title: '注册成功',
	// 				icon: 'success'
	// 			})
	// 	// 这里可以添加注册逻辑，比如调用API
	// 		}).catch(err => {
	// 			console.log('表单验证失败:', err)
	// 		})
	// 	}
	// }			
    // 提交表单
        submitForm() {
            this.$refs.form.validate().then(res => {
                console.log('表单数据:', this.formData)
				const submitData = { ...this.formData };
				
				if (!submitData.avatar) {
					delete submitData.avatar; // 或者设置为默认头像URL
					// submitData.avatar = '@/static/avatar.png';
				}
				
				// this.$http.post('/api/register', submitData).then(response => {
                
				this.registerUser(this.submitData)
					.then(response => {
						// 注册成功处理
						uni.showToast({
							title: '注册成功',
							icon: 'success'
						});
						// 可以在这里进行页面跳转或其他操作
					})
					.catch(error => {
						// 注册失败处理
						console.error('注册失败:', error);
						uni.showToast({
							title: '注册失败，请重试',
							icon: 'none'
						});
					});
	
			}).catch(err => {
				console.log('表单验证失败:', err);
				uni.showToast({
					title: '表单验证失败',
					icon: 'none'
				});
			});
		},

		async registerUser(submitData) {
			try {
				const response = await uni.request({
					url: 'http://127.0.0.1:5002/register', // 替换为你的API地址
					method: 'POST',
					data: submitData,
					header: {
						'Content-Type': 'application/json'
					}
				});
	
				if (response.statusCode === 200) {					
					console.log('注册成功');														
				} else {
					throw new Error('注册失败');
				}
			} catch (error) {
				throw error;
			}
		},
		//会员等级选择
		bindMemberLevelChange(e) {
			this.memberLevelIndex = e.detail.value;
			this.formData.memberLevel = this.memberLevels[this.memberLevelIndex];
		},
		// 头像上传成功
		uploadSuccess(e) {
			console.log('上传成功', e);
			this.formData.avatar = e.tempFilePaths[0];
		},
        // 头像上传失败
		uploadFail(e) {
			console.log('上传失败', e);
		}
	}		
}

//在后台数据库中，确保你的用户表有对应的字段来存储 nickname、memberLevel 和 avatar 等信息。
//你可以在注册接口中接收这些字段并将其保存到数据库中。

</script>

<style lang='scss'>

.container {
    display: flex;
    flex-direction: column;
    width:100%;
    height:100%;
    background-color: #f5f5f5;
	.uni-forms {
		display:flex;
		background-color: #fff;
		box-sizing: border-box;
		width:100%;
		height:100%;
		padding:100rpx 50rpx 100rpx 50rpx;
		justify-content: center;
		align-content:space-between;
		.uni-forms-item {
			display:flex;		
		    box-sizing: border-box;
			justify-items:center;
		    width:100%;
		    height:50rpx;
		    padding: 0;	
			  
		    .input {
			    width: 100%;
				height:50rpx;				
				border: 1px solid #005bb5;
				border-radius: 4px;
				font-size: 14px;
			}
			.picker{
				width: 100%;
				height:50rpx;				
				border: 1px solid #005bb5;
				border-radius: 4px;
				font-size: 14px;
			}
		}	
		.avatar-item{
			display:flex;
			box-sizing: border-box;
			justify-items:center;
			width:200rpx;
			height:200rpx;
			
			.uni-file-picker{
				width: 200rpx;
				height:200rpx;				
				border: 1px solid #005bb5;
				border-radius: 100%;				
			}	  
		}
		.button {
			display: flex;
		    width: 100%;
			margin-top: 20rpx;
		    padding: 10px;
		    background-color: #007aff;
		    color: #fff;
		    border: none;
		    border-radius: 4px;
		    font-size: 16px;
		    cursor: pointer;
		}
		
		.button:hover {
		    background-color: #005bb5;
		}		
	}
}  
  
</style>
