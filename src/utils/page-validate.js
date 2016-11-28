/**
 * 验证数字
 * @param  {[Object]}   rule     [验证]
 * @param  {[String]}   value    [需要验证的内容]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function validateNum (rule, value, callback) {
  console.log(value)
  var num = parseInt(value, 10)
  if (!value || value.toString() === '0') {
    callback(new Error('该项为必填项'))
  } else if (!Number.isInteger(num)) {
    callback(new Error('请输入数字值'))
  } else {
    callback()
  }
}

/**
 * 验证url
 * @param  {[Object]}   rule     [验证]
 * @param  {[String]}   value    [需要验证的内容]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function validateUrl (rule, value, callback) {
  let regStr = '(http|ftp|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-@?^=%&/~\\+#])?'
  let urlReg = new RegExp(regStr)
  if (value === '') {
    callback(new Error('该项为必填项'))
  } else if (!urlReg.test(value)) {
    callback(new Error('请输入正确的链接'))
  } else {
    callback()
  }
}

/**
 * 验证手机号
 * @param  {[Object]}   rule     [验证]
 * @param  {[String]}   value    [需要验证的内容]
 * @param  {Function} callback [回调函数]
 * @return {[type]}            [description]
 */
export function validatePhone (rule, value, callback) {
  if (value === '') {
    callback(new Error('该项为必填项'))
  } else if (!/^1[3,4,5,6,7,8,9]\d{9}/.test(value)) {
    callback(new Error('手机号格式不正确'))
  } else {
    callback()
  }
}
