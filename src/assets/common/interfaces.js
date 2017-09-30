/**
 * Created by zhangbin on 2017/7/6.
 */
let wc = window.location;
//const platform =wc.protocol+'//'+wc.host+'/';
const platform = "/esocial/";
export default {
    interfaces: {
        "authentication": "/esocial/authentication.json",     // 登录
        "getTelCode": "/static/api/common/telcode.json"       // 获取手机验证码
        "forgetPassword": "/static/api/common/telcode.json"   // 提交新密码
    }
}
