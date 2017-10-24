/**
 * Created by zhangbin on 2017/7/6.
 */
let wc = window.location;
//const platform =wc.protocol+'//'+wc.host+'/';
const platform = "/esocial/";
const host = "http://192.168.2.104:8080"
export default {
    interfaces: {
        "authentication": platform + "authentication.json",     // 登录
        "resetPassword": platform + "resetPassword.json",  // 重置密码
        "getUserInfo": platform + "getUserInfo.json",
        "logout": platform + 'logout.json',
        "uploadArticleAreaImage": platform + "siteEdit/uploadArticleAreaImage.json",   //图片上传接口
        "changePassword": platform + "changePassword.json",         //修改密码
        "notice": platform + "/task/list.json",
    }
}
