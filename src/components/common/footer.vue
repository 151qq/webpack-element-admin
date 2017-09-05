<template>
  <section class="footer">
    <div class="mid-box">
      <router-link class="logo-box" to="/business"><img src="../../assets/images/bottom-logo.png"></router-link>
      <p>
        2004-2017 © xx网® qyer.com All rights reserved. Version v5.57  京ICP备12003524号  京公网安备11010102001935  京ICP证140673号  营业执照  经营许可证<br>
        xx网为旅行者提供原创实用的出境游旅行指南和旅游攻略、旅行社区和问答交流平台，并提供签证、保险、机票、酒店预订、租车等服务。
      </p>
    </div>
  </section>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
  .footer {
    width: 100%;
    height: 90px;
    background: #000000;

    .mid-box {
      width: 1160px;
      margin: auto;
      overflow: hidden;

      p {
        float: left;
        font-size: 12px;
        color: #ffffff;
        line-height: 25px;
        margin-top: 20px;
      }
    }

    .logo-box {
      float: left;
      width: 98px;
      height: 29px;
      margin: 30px 67px 0 0;
    }
  }
</style>
