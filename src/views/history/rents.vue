<template>
    <section>
        <banner-history :point="$route.query.point"
                        :echarts-data="echartsData"
                        :house-name="$route.query.houseName"
                        :echarts-name="'echarts-rents'"></banner-history>
        <section class="mid-box">
            <el-table
                    :data="rents"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="tenantStartDate"
                        label="交易日期">
                </el-table-column>
                <el-table-column
                        prop="priceT"
                        label="高区租金">
                </el-table-column>
                <el-table-column
                        prop="priceM"
                        label="中区租金">
                </el-table-column>
                <el-table-column
                        prop="priceB"
                        label="低区租金">
                </el-table-column>
            </el-table>
            <el-pagination
                v-if="total"
                class="page-box"
                layout="prev, pager, next"
                @current-change="pageChange"
                :page-sizes="pageSize"
                :total="total">
            </el-pagination>
        </section>
    </section>
</template>
<script>
import util from '../../assets/common/util'
import bannerHistory from '../../components/views/banner-history.vue'

export default {
    data () {
        return {
            rents: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1,
            echartsData: {}
        }
    },
    mounted () {
        this.getEcharts()
        this.getRents()
        document.title = '租金历史明细'
    },
    methods: {
        // 获取echarts数据
        getEcharts () {
            var formData = {
                type: this.$route.params.type,
                city: localStorage.getItem('cityCode'),
                id: this.$route.params.id
            }
            util.request({
                method: 'get',
                interface: 'echarts',
                data: formData
            }).then(res => {
                if (res.result.success === '1') {
                    var objs = {
                        legend: ['租金'],
                        xAxis: res.result.result.xAxis,
                        seriesBar: res.result.result.seriesBar
                    }
                  this.echartsData = objs
                } else {
                  this.$message.error(res.result.message)
                }
            })
        },
        getRents () {
            util.request({
                method: 'get',
                interface: 'rent',
                data: {
                    id: this.$route.params.id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(res => {
                res.result.result.rents.forEach((item) => {
                    var dateData = item.tenantStartDate.split(' ')[0].split('-')
                    item.tenantStartDate = dateData[0] + '-' + dateData[1]
                })
                this.rents = res.result.result.rents
                this.total = this.total ? Number(this.total) : 0
            })
        },
        pageChange (page) {
            this.pageNumber++
            this.getRents()
        }
    },
    components: {
        bannerHistory
    }
}
</script>
<style lang="scss">
.mid-box {
    width: 1000px;
    margin: 30px auto;

    .el-dialog--small {
        width: 460px;

        .input-box {
            width: 340px;
        }
    }

    .page-box {
        margin-top: 15px;
    }
}
</style>