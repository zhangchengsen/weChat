import $U from '../free-lib/util.js'
export default{
	onShow() {
		let token = $U.getStorage('token')
		if(!token) {
			uni.reLaunch({
				url:'/pages/common/login',
				fail: (err) => {
					console.log(err)
				}
			})
		}
	},
}