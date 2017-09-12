<template>
    <section>
        <div class="out-box">
            <p class="base-b">
                <span class="title">名称：</span>
                <span class="base-content">{{base.name}}</span>
            </p>
            <p class="base-b">
                <span class="title">楼盘类型：</span>
                <span class="base-content">{{base.type}}</span>
            </p>
            <p class="base-b">
                <span class="title">楼盘等级：</span>
                <span class="base-content">{{base.level}}</span>
            </p>
            <p class="base-b">
                <span class="title">地址：</span>
                <span class="base-content">{{base.address}}</span>
            </p>
            <p class="base-b">
                <span class="title">地块：</span>
                <span class="base-content">{{base.massif}}</span>
            </p>
            <p class="base-b">
                <span class="title">剩余年限：</span>
                <span class="base-content">{{base.year}}</span>
            </p>
            <p class="base-b">
                <span class="title">容积率：</span>
                <span class="base-content">{{base.ratio}}</span>
            </p>
            <p class="base-b base-big">
                <span class="title">业主：</span>
                <span class="base-content">{{base.owner}}</span>
            </p>
            <p class="base-b">
                <span class="title">物业：</span>
                <span class="base-content">{{base.property}}</span>
            </p>
        </div>
        <div class="out-box">
            <p class="base-b base-big">
                <span class="title">交易记录：</span>
                <span class="base-content">{{base.record}}</span>
            </p>
            <p class="base-b base-big">
                <span class="title">现在租户：</span>
                <span class="base-content">{{base.rent}}</span>
            </p>
        </div>
        <div class="out-box">
            <p class="base-b">
                <span class="title">面积：</span>
                <span class="base-content">{{base.area}}</span>
            </p>
            <p class="base-b">
                <span class="title">总层数：</span>
                <span class="base-content">{{base.plies}}</span>
            </p>
            <p class="base-b">
                <span class="title">层高：</span>
                <span class="base-content">{{base.height}}</span>
            </p>
            <p class="base-b">
                <span class="title">电梯：</span>
                <span class="base-content">{{base.elevator}}</span>
            </p>
            <p class="base-b">
                <span class="title">车位：</span>
                <span class="base-content">{{base.park}}</span>
            </p>
            <p class="base-b">
                <span class="title">空调：</span>
                <span class="base-content">{{base.conditioner}}</span>
            </p>
            <p class="base-b">
                <span class="title">地板：</span>
                <span class="base-content">{{base.floor}}</span>
            </p>
            <p class="base-b">
                <span class="title">物业持有：</span>
                <span class="base-content">{{base.holding}}</span>
            </p>
            <p class="base-b base-big">
                <span class="title">交通：</span>
                <span class="base-content">{{base.traffic}}</span>
            </p>
        </div>
    </section>
</template>
<script>
export default {
  props: ['base']
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
            width: 80px;
            font-size: 16px;
            line-height: 40px;
            color: #666666;
        }

        .base-content {
            float: right;
            width: 280px;
            font-size: 16px;
            line-height: 40px;
            color: #000000;
        }
    }

    .base-big {
        width: 1100px;

        .base-content {
            width: 1020px;
        }
    }
}
</style>