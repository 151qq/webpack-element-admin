export default {
  /**
   * 用户资料 get
   */
  userInfo: '/static/api/common/userInfo.json',
  /**
   * 修改头像 post
   */
  setPortrait: '/static/api/common/setPortrait.json',
  /**
   * 修改密码 post
   */
  setPassword: '/static/api/common/setPassword.json',
  /**
   * 我的任务列表 get
   * pageSize 每页多少条
   * currentPage 当前页数
   */
  notice: '/static/api/common/notice.json',
  /**
   * 任务详情 get
   * id 任务标识
   */
  noticeDetail: '/static/api/common/noticeDetail.json',
  /**
   * 图表数据 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   * id 为空是首页的图表数据，不为空为相应楼盘的图表数据
   */
  echarts: '/static/api/property/echarts.json',
  /**
   * 首页租金信息 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   */
  rents: '/static/api/property/rents.json',
  /**
   * 首页报告列表 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   */
  reports: '/static/api/property/reports.json',
  /**
   * 楼盘详情 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   * id 楼盘序列标识
   */
  info: '/static/api/property/info.json',
  /**
   * 楼盘详情的静态报告列表 get
   * type string（business house mall）页面类型
   * reportType string (join manage quit) 报告类型
   */
  reportType: '/static/api/property/reportType.json',
  /**
   * 楼盘详情的静态报告列表 get
   * type string（business house mall）页面类型
   * id 报告类型
   */
  reportStatic: '/static/api/property/reportStatic.json',
  /**
   * 楼盘对标列表 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   * id 楼盘序列标识
   */
  benchList: '/static/api/property/benchList.json',
  /**
   * 楼盘对标详情 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   * id eg: 0,1
   */
  benchMark: '/static/api/property/benchMark.json',
  /**
   * 计算页的初始什么什么率 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   * id 楼盘序列标识
   */
  rates: '/static/api/property/rates.json',
  /**
   * 我的报告列表 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   */
  reportList: '/static/api/report/reportList.json',
  /**
   * 我的报告搜索 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   * key 关键字
   */
  searchReport: '/static/api/report/reportList.json',
  /**
   * 报告详情 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   * id 报告序列标识
   */
  reportDetail: '/static/api/report/reportDetail.json',
  /**
   * 广告列表 get
   */
  adList: '/static/api/report/adList.json',
  /**
   * 发送邮件 post
   * email 邮件地址
   * id 报告序列标识
   */
  sendMail: '/static/api/report/sendMail.json',
  /**
   * 过滤地图数据 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   * vr 要过滤的数据
   * 可能还有过滤条件
   * areaCity: 'all' ’all‘ 或 ‘’ 代表全部条件 否则固定条件 eg: ‘朝阳’
   * areaCounty 'all' ’all‘ 或 ‘’ 代表全部条件 否则固定条件 eg: ‘大庄镇’
   * level: 'all' 'all' ’all‘ 或 ‘’ 代表全部条件 否则固定条件 eg: [‘甲级’, '乙级']
   * rent: 'all' 同level
   * hold: 'all' 同level
   * measure: 'all'  同level
   */
  searchMap: '/static/api/report/searchMap.json',
  /**
   * 过滤地图数据 get
   * id 楼盘序列标识 一个id返回一条，两个id返回两条 id以’,‘间隔
   */
  searchInfoMap: '/static/api/report/searchInfoMap.json',
  /**
   * 地图过滤条件 get
   * type string（business house mall）页面类型
   * city string eg: "北京" 所选城市
   */
  typeMap: '/static/api/property/typeMap.json',
  /**
   * 获取二维码 get
   * path
   */
  getEwm: '/static/api/common/getEwm.json'
}
