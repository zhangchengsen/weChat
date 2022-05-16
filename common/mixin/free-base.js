import $Time from '../free-lib/time.js'
export default{
	filters:{
		formatTime(value) {
			return $Time.gettime(value)
		}
	}
}