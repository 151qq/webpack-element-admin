
const platform = "/e2-site-api/";
// const platform = "http://192.168.2.105:8080/";

export default {
    interfaces: {
        "authentication": platform + "memberLogin.json",     // 登录
        "resetPassword": platform + "memberResetPassword.json",  // 重置密码
        "getUserInfo": platform + "findMemberInfoById.json",
        "logout": platform + 'memberLogout.json',
        "uploadArticleAreaImage": platform + "siteEdit/uploadArticleAreaImage.json",   //图片上传接口
        "changePassword": platform + "memberChangePassword.json",         //修改密码
        "notice": platform + "/task/list.json",
        "headImage": platform + "memberHeadImage.json",
        "sendSmsCode": platform + 'sendSmsCode.json',
        searchHousesKey: platform + 'houses/searchHousesKey.json',
        findUserInfoByCode: platform + 'findUserInfoByCode.json',

        changes: platform +'houseTradeDetail/showHouseTradeDetailByHousesId.json',
        rent: platform +'houses/findHousesRent.json',
        rates: platform +'houses/vacancyList.json',
        evalues: platform +'houses/findValuationHistory.json',
        /**
           * 图表数据 get
           * type string（business house mall）页面类型
           * city string eg: "北京" 所选城市
           * id 为空是首页的图表数据，不为空为相应楼盘的图表数据
           * echarts: '/static/api/property/echarts.json',
        */
        echarts: platform + 'houses/houseCharts.json',
        valueEcharts: platform + 'houses/houseValueCharts.json',
        findFinanceProductById: platform + 'houses/findFinanceProductById.json',

        /**
           * 首页租金信息 get
           * type string（business house mall）页面类型
           * city string eg: "北京" 所选城市
           * '/static/api/property/rents.json',
        */
        rents: platform + 'houses/rentsCharts.json',
        /**
           * 首页报告列表 get
           * type string（business house mall）页面类型
           * city string eg: "北京" 所选城市
           * '/static/api/property/reports.json'
        */
        reports: platform + 'report/reportCity.json',
        /**
           * 楼盘详情 get
           * type string（business house mall）页面类型
           * city string eg: "北京" 所选城市
           * id 楼盘序列标识
           * '/static/api/property/info.json'
        */
        info: platform + 'houses/houseInfo.json',
        record: platform + 'houses/findHousesTrade.json',
        /**
           * 楼盘详情的静态报告列表 get
           * type string（business house mall）页面类型
           * reportType string (join manage quit) 报告类型
           * '/static/api/property/reportType.json'
        */
        reportProduct: platform + 'report/reportProduct.json',
        /**
           * 楼盘详情的静态报告列表 get
           * type string（business house mall）页面类型
           * id 报告类型
           * '/static/api/property/reportStatic.json'
        */
        reportStatic: platform + 'report/searchEnterpriseReportByProductCode.json.json',
        /**
           * 楼盘对标列表 get
           * type string（business house mall）页面类型
           * city string eg: "北京" 所选城市
           * id 楼盘序列标识
        */
        benchList: platform + 'houses/findHousesInfoByArrayls.json',
        /**
           * 我的报告列表 get
           * type string（business house mall）页面类型
           * city string eg: "北京" 所选城市
           * '/static/api/report/reportList.json'
        */
        reportList: platform + 'report/reportList.json',
        /**
           * 我的报告搜索 get
           * type string（business house mall）页面类型
           * city string eg: "北京" 所选城市
           * key 关键字
        */
        searchReport: platform + 'report/reportList.json',
        /**
           * 报告详情 get
           * type string（business house mall）页面类型
           * city string eg: "北京" 所选城市
           * id 报告序列标识
        */
        reportDetail: platform + 'report/findReportInfoByCode.json',
        findRecommendArticleByCode: platform + 'report/findRecommendArticleByCode.json',
        /**
           * 发送邮件 post
           * email 邮件地址
           * id 报告序列标识
        */
        sendMail: platform + 'report/sendMail.json',
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
        searchMap: platform + 'houses/searchHousesFileter.json',
        getSecurityList: platform + 'financeProduct/selectCodeLogoAndCnamer.json',
        getInvestList: platform + 'enterprise/searchAllEnterpriseInfo.json',
        selectEntByNameOrNameReg: platform + 'enterprise/selectEntByNameOrNameReg.json',
        findHouseByEnterpriseCode: platform + 'enterprise/findHouseByEnterpriseCode.json',
        showEnterpriseInfo: platform + 'enterprise/showEnterpriseInfo.json',
        showHouseTradeDetail: platform + 'houseTradeDetail/showHouseTradeDetail.json',

        searchHousesFileter: platform + 'financeProduct/searchHousesFileter.json',
        findByProductInfo: platform + 'financeProduct/findByProductInfo.json',
        findDetail: platform + 'financeProduct/findDetail.json',
        fundCashflow: platform + 'financeProduct/fundCashflow.json',


        getCitys: '/static/api/common/city.json',
        saveInvestBase: platform + 'enterprise/updateEnterpriseInfo.json',
        getInvestBase: platform + 'enterprise/showEnterpriseInfoOfCode.json',
        investTypes: platform + 'enterprise/disOfEnterpriseInfo.json',
        findDictionaryByType: platform + 'enterprise/findDictionaryByType.json'
    }
}
