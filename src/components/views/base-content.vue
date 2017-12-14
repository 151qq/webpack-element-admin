<template>
    <section>
        <div class="out-box">
            <p class="base-b">
                <span class="title">楼盘名字：</span>
                <span class="base-content">{{base.housesCname}}</span>
            </p>
            <p class="base-b">
                <span class="title">所在城市：</span>
                <span class="base-content">{{base.city}}</span>
            </p>
            <p class="base-b">
                <span class="title">所属商圈：</span>
                <span class="base-content">{{base.mall}}</span>
            </p>
            <p class="base-b">
                <span class="title">星标：</span>
                <span class="base-content">{{base.star == '0' ? '否' : '是'}}</span>
            </p>
            <p class="base-b">
                <span class="title">楼盘等级：</span>
                <span class="base-content">{{base.level}}</span>
            </p>
            <p class="base-b">
                <span class="title">楼盘地址：</span>
                <span class="base-content">{{base.address}}</span>
            </p>
            <p class="base-b">
                <span class="title">剩余年限：</span>
                <span class="base-content">{{base.year}}</span>
            </p>
            <p class="base-b">
                <span class="title">容积率(%)：</span>
                <span class="base-content">{{base.ratio}}</span>
            </p>
            <p class="base-b">
                <span class="title">网站地址：</span>
                <a class="base-content"
                        target="_blank" 
                        :href="base.webSite.indexOf('http') > 0 ? base.webSite : 'http://' + base.webSite">
                    {{base.webSite}}
                </a>
            </p>
            <p class="base-b">
                <span class="title">物业信息：</span>
                <span class="base-content">{{base.property}}</span>
            </p>
            <p class="base-b">
                <span class="title">物业持有：</span>
                <span class="base-content">{{base.holding}}</span>
            </p>
            <p class="base-b">
                <span class="title">楼盘类型：</span>
                <span class="base-content">{{base.type}}</span>
            </p>
            <p class="base-b base-big">
                <span class="title">业主信息：</span>
                <span class="base-content">{{base.owner}}</span>
            </p>
            <p class="base-b base-big">
                <span class="title">现在租户：</span>
                <span class="base-content">{{base.rent}}</span>
            </p>
            <p class="base-b">
                <span class="title">所属地块：</span>
                <span class="base-content">{{base.massif}}</span>
            </p>
            <p class="base-b">
                <span class="title">面积(m²)：</span>
                <span class="base-content">{{base.area}}</span>
            </p>
            <p class="base-b">
                <span class="title">总层数：</span>
                <span class="base-content">{{base.plies}}</span>
            </p>
            <p class="base-b">
                <span class="title">层高(m)：</span>
                <span class="base-content">{{base.height}}</span>
            </p>
            <p class="base-b">
                <span class="title">车位：</span>
                <span class="base-content">{{base.park}}</span>
            </p>
            <p class="base-b">
                <span class="title">电梯数：</span>
                <span class="base-content">{{base.elevator}}</span>
            </p>
            <p class="base-b">
                <span class="title">空调数：</span>
                <span class="base-content">{{base.conditioner}}</span>
            </p>
            <p class="base-b">
                <span class="title">地板类型：</span>
                <span class="base-content">{{base.floor}}</span>
            </p>
            <p class="base-b base-big">
                <span class="title">交通状况：</span>
                <span class="base-content">{{base.traffic}}</span>
            </p>
        </div>
    </section>
</template>
<script>
export default {
  props: ['base', 'record']
}
</script>
<style lang="scss" scoped>
.out-box {
    padding: 20px 0 20px;
    overflow: hidden;
    border-top: 1px solid #EFF2F7;

    .base-b {
        float: left;
        width: 360px;
        margin-right: 20px;

        .title {
            float: left;
            width: 100px;
            font-size: 16px;
            line-height: 40px;
            color: #666666;
        }

        .base-content {
            float: right;
            width: 260px;
            font-size: 16px;
            line-height: 40px;
            color: #000000;
        }
    }

    .base-big {
        width: 1100px;

        .base-content {
            width: 1000px;
            line-height: 30px;
            padding: 5px 0;
        }
    }
}
</style>