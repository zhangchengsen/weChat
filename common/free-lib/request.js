// request.js
import $U from './util.js'
import $C from './config.js'
import $store from '../../store/store.js'
export default {
    // 全局配置
    common:{
        baseUrl:$C.baseUrl,
        header:{
            'Content-Type':'application/json;charset=UTF-8',
        },
        data:{},
        method:'GET',
        dataType:'json',
        token:true
    },
    // 请求 返回promise
    request(options = {}){
        // 组织参数
        options.url = this.common.baseUrl + options.url
        options.header = options.header || this.common.header
        options.data = options.data || this.common.data
        options.method = options.method || this.common.method
        options.dataType = options.dataType || this.common.dataType
        options.token = options.token === false ?  false : this.common.token

        // 请求之前验证...
        // token验证
        if (options.token) {
            let token = $U.getStorage('token')
            // 二次验证
            if (!token) {
                uni.showToast({ title: '请先登录', icon: 'none' });
                // token不存在时跳转
                return uni.reLaunch({
                    url: '/pages/common/login/login',
                });
            }
            // 往header头中添加token
            options.header.token = token
        }

        // 请求
        return new Promise((res,rej)=>{
            // 请求中...
            uni.request({
                ...options,
                success: (result) => {
                    // 返回原始数据
                    if(options.native){
                        return res(result)
                    }
                    // 服务端失败
                    if(result.statusCode !== 200){
                        if (options.toast !== false) {
                            uni.showToast({
                                title: result.data.data || '服务端失败',
                                icon: 'none'
                            });
                        }
						console.log('result',result)
						if(result.data.data === 'Token 令牌不合法' || result.data.data === '您没有访问该接口的权限')  {
							$store.dispatch('logout')
						}
                        return rej(result.data) 
                    }
                    // 其他验证...
                    // 成功
                    let data = result.data.data
					// if()
                    res(data)
                },
                fail: (error) => {
					console.log('error',error)
                    uni.showToast({ title: error.errMsg || '请求失败', icon: 'none' });
                    return rej(error)
                }
            });
        })
    },
    // get请求
    get(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'GET'
        return this.request(options)
    },
    // post请求
    post(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'POST'
        return this.request(options)
    },
    // delete请求
    del(url,data = {},options = {}){
        options.url = url
        options.data = data
        options.method = 'DELETE'
        return this.request(options)
    },
	upload(url,data,onProgress = false)
	{
		let token = $U.getStorage('token')
		if (!token) {
		    uni.showToast({ title: '请先登录', icon: 'none' });
		    // token不存在时跳转
		    return uni.reLaunch({
		        url: '/pages/common/login/login',
		    });
		}
	    return new Promise((resolve,reject)=>{
	       let uploadTask = uni.uploadFile({
	                url: this.common.baseUrl + url, //仅为示例，非真实的接口地址
	                filePath: data.filePath,
	                name: data.name ? data.name : 'files',
	            	header:{token},
	                success: (res) => {
	                    if(res.statusCode !=  200) {
							return uni.showToast({
								title:'上传失败',
								icon:'none'
							})
						}
						let message = JSON.parse(res.data)
						resolve(message.data)
					//最终的url message.data
	                },
					fail: (err) => {
						console.log(err)
						reject(err)            
					}
	           });
	      uploadTask.onProgressUpdate((res)=>{
	          console.log('上传进度' + res.progress);
	          if(typeof onProgress === 'function') {
	    		onProgress(res.progress) 
	          }      
	      })
	    })
	    
	}

} 