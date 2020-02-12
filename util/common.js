//	加密
import crypto from 'crypto'

const commonFun = {
	encryption: function(val, salt) {
		let newVal = val + ''
		const md5 = crypto.createHash("md5")
		const sha256 = require("js-sha256").sha256 //引入sha256库
		md5.update(newVal)
		newVal = md5.digest('hex')
		newVal += salt
		return newVal = sha256(newVal)
	}
}
export default commonFun
