<template>
    <section class="mid-box">
        <el-table
                :data="rates"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="交易日期"
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="vacancyRate"
                    label="空置率">
            </el-table-column>
            <el-table-column
                    prop="creater"
                    label="填报人">
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
</template>
<script>
import util from '../../assets/common/util'

export default {
    data () {
        return {
            rates: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1
        }
    },
    mounted () {
        this.getRents()
        document.title = '置空率历史明细'
    },
    methods: {
        getRents () {
            util.request({
                method: 'get',
                interface: 'rates',
                data: {
                    id: this.$route.params.id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(res => {
                res.result.result.forEach((item) => {
                    var dateData = item.createDate.split(' ')[0].split('-')
                    item.createDate = dateData[0] + '-' + dateData[1]
                })
                this.rates = res.result.result
                this.total = this.total ? Number(this.total) : 0
            })
        },
        pageChange (page) {
            this.pageNumber++
            this.getRents()
        }
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