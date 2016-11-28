  <template>
    <div>
      <nav-bar title="用户详情" :crumbs="navBarData"></nav-bar>
      <div class="member-info">
         <i class="face">
           <img :src="model.avatar" alt="" />
         </i>
         <div class="info">
           <h4 v-text="model.nickname"></h4>
           <p>
             公司：<span v-text="model.company"></span>  职位：<span v-text="model.title"></span>
           </p>
           <p>
             简介：<span v-text="model.overview"></span>
           </p>
           <p>
             <ul>
               <li>登录账号：<span v-text="model.nickname"></span></li>
                <li>绑定微信：<span v-text="model.weixin"></span></li>
                <li>绑定微博：<span v-text="model.qq"></span> </li>
             </ul>
           </p>
         </div>
         <div class="remarks">
           <p>
             注册时间：<span v-text="model.create_at"></span>
           </p>
           <p>
            最后登录时间：2016年12月23日
           </p>
           <ul>
             <li>
                <span v-text="model.margin"></span>
                <span>余额</span>
             </li>
             <li>
                <span v-text="model.prestige"></span>
                <span>威望</span>
             </li>
             <li>
                <span v-text="model.contribution"></span>
                <span>贡献</span>
             </li>
             <li>
                <span v-text="model.articles_count"></span>
                <span>分享</span>
             </li>
             <li>
                <span v-text="model.questions_count"></span>
                <span>提问</span>
             </li>
           </ul>
         </div>
      </div>
      <el-row class="member-contont">
        <el-col>
            <el-tabs class="detailTitle" @tab-click="tabHandleClick">
              <el-tab-pane label="TA的提问"></el-tab-pane>
              <el-tab-pane label="TA的回答"></el-tab-pane>
              <el-tab-pane label="TA的干货"></el-tab-pane>
              <el-tab-pane label="关注的话题"></el-tab-pane>
              <el-tab-pane label="关注的人"></el-tab-pane>
              <el-tab-pane label="TA的粉丝"></el-tab-pane>
              <el-tab-pane label="流水纪录"></el-tab-pane>
            </el-tabs>
        </el-col>
      </el-row>
      <questions-panel v-show="currentTab === '' || currentTab === 'TA的提问'" :uid="uid"></questions-panel>
      <answer-panel v-show="currentTab === 'TA的回答'" :uid="uid"></answer-panel>
      <article-panel v-show="currentTab === 'TA的干货'" :uid="uid"></article-panel>
      <topic-panel v-show="currentTab === '关注的话题'" :uid="uid"></topic-panel>
      <follow-panel v-show="currentTab === '关注的人'" :uid="uid"></follow-panel>
      <fans-panel v-show="currentTab === 'TA的粉丝'" :uid="uid"></fans-panel>
      <record-panel v-show="currentTab === '流水纪录'" :uid="uid"></record-panel>
    </div>
  </template>
  <script>
    import ywk from '../../utils/ywk.js'
    import navBar from '../../components/common/navBar.vue'
    import answerPanel from '../../components/member/answer.vue'
    import articlePanel from '../../components/member/article.vue'
    import fansPanel from '../../components/member/fans.vue'
    import followPanel from '../../components/member/follow.vue'
    import questionsPanel from '../../components/member/questions.vue'
    import recordPanel from '../../components/member/record.vue'
    import topicPanel from '../../components/member/topic.vue'

    export default {
      data () {
        return {
          navBarData: [
            {path: '/', name: '首页'},
            {path: '/member/manager', name: '会员管理'},
            {path: '/', name: '用户详情'}
          ],
          uid: '',
          currentTab: '',
          model: {}
        }
      },
      created () {
        this.uid = '' + this.$route.params.id
        ywk.getJson(`/api/member/detail/${this.uid}`, {}, (res) => {
          if (res.error_code === 0) {
            this.model = res.data
          }
        })
      },
      methods: {
        tabHandleClick (tab) {
          this.currentTab = tab.label
        }
      },
      components: {
        navBar,
        answerPanel,
        articlePanel,
        fansPanel,
        followPanel,
        questionsPanel,
        recordPanel,
        topicPanel
      }
    }
  </script>
  <style lang="scss" scoped>
    .member-info {
      width: 100%;
      height: 140px;
      border-bottom: 4px solid rgba(0, 0, 0, 0.03);
      .face {
        float: left;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 20px;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.2);
        img {
          width: 100%;
          height: auto;
        }
      }
      .info {
        float: left;
        margin-top: 20px;
        width: 600px;
        p {
          font-size: 12px;
          color: #666;
          width: 100%;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          li {
            list-style: none;
            float: left;
            margin-right: 40px;
            line-height: 40px;
          }
        }
      }
      .remarks {
        float: right;
        margin-top: 20px;
        p {
          font-size: 14px;
          text-align: right;
          padding-right: 20px;
          box-sizing: border-box;
        }
        li {
          float: left;
          padding: 8px 0;
          span {
            width: 100%;
            display: inline-block;
            text-align: center;
            font-size: 14px;
          }
          span:first-child{
            color: red;
          }
          span:last-child{
            color: #999;
          }
        }
      }
    }
  </style>
