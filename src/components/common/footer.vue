<template>
  <section class="footer">
    <div class="mid-box">
      <router-link class="logo-box" to="/business"><img src="../../assets/images/bottom-logo.png"></router-link>
      <p>
        2004-2017 © 商房云® chinacredata.com All rights reserved. 版本 1.0.0 京ICP备12003524号 京公网安备11010102001935 京ICP证140673号 营业执照。<br>
        为金融投资机构、物业业主、物业评估机构提供公正、真实的物业基础数据
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
