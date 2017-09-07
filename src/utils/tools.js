import Cookies from 'js-cookie'
import $ from 'webpack-zepto'
import apis from './common/api.js'

let assemblingData = (isGet) => {
  let header = {
    AUTHENTICATION: Cookies.get('token'),
    UID: Cookies.get('uid'),
    'Content-Type': 'application/json'
  }
  if (isGet) {
    delete header['Content-Type']
  }
  return header
}

export default {
  postJson (url, data, cb, fail) {
    return $.ajax({
      url: apis[url],
      type: 'post',
      dataType: 'json',
      data: window.JSON.stringify(data),
      headers: assemblingData(true),
      success (res) {
        cb(res)
      },
      error () {
        fail ? fail() : ''
      }
    })
  },
  getJson (url, data, cb, fail) {
    return $.ajax({
      url: apis[url] + '?timestamp=' + new Date().getTime(),
      type: 'get',
      dataType: 'json',
      data: data,
      headers: assemblingData(),
      success (res) {
        cb ? cb(res) : ''
      },
      error () {
        fail ? fail() : ''
      }
    })
  },
  deleteJson (url, data, cb) {
    return $.ajax({
      url: apis[url],
      type: 'DELETE',
      dataType: 'json',
      data: window.JSON.stringify(data),
      headers: assemblingData(),
      success (res) {
        cb(res)
      }
    })
  },
  putJson (url, data, cb) {
    return $.ajax({
      url: apis[url],
      type: 'PUT',
      dataType: 'json',
      data: data,
      headers: assemblingData(),
      success (res) {
        cb(res)
      }
    })
  },
  postFile (url, data, cb) {
    return $.ajax({
      type: 'POST',
      url: apis[url],
      cache: false,
      dataType: 'json',
      data: data,
      headers: assemblingData(true),
      processData: false,
      contentType: false,
      success (res) {
        cb(res)
      }
    })
  },
  /** 获取国际化数据
   * 获取国际化数据
   */
  i18n () {
    let lang = Cookies.get('_lang') || (navigator.language || navigator.browserLanguage).toLowerCase()
    let p = '/static/locale/locale-en.json'
    if (lang === 'zh-cn') {
      p = '/static/locale/locale-zh-cn.json'
    }
    $.ajax({
      type: 'GET',
      url: p,
      dataType: 'json',
      success (res) {
        window.CODE = res.CODE
        window.COMMONS = res.COMMONS
      },
      error (err) {
        console.log(`getJSONerr${err}`)
      }
    })
  },
  /**
   * 获取服务端返回的_xsrf
   * @return {[String]} [服务端返回的_xsrf]
   */
  get_xsrf () {
    this.getJson('/api/user/signed', {})
  },
  /**
   * 格式化日期函数
   * @param date {Date|Date String} [需要格式化的日期]
   * @param frm {String} [格式(如：yyyy-MM-dd hh:mm:ss)]
   * @return 格式化后的日期
   */
  formatDate (date, fmt) {
    let theDate = new Date(date)
    var o = {
      'M+': theDate.getMonth() + 1, // 月份
      'd+': theDate.getDate(), // 日
      'h+': theDate.getHours(), // 小时
      'm+': theDate.getMinutes(), // 分
      's+': theDate.getSeconds(), // 秒
      'q+': Math.floor((theDate.getMonth() + 3) / 3), // 季度
      'S': theDate.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (theDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}
