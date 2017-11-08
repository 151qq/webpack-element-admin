<template>
    <section class="mid-box">
        <el-table
                :data="rents"
                border
                style="width: 100%">
            <el-table-column
                    prop="createDate"
                    label="交易日期"
                    width="360">
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
            <el-table-column
                    prop="author"
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
            rents: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1
        }
    },
    mounted () {
        // this.getRents()
        document.title = '租金历史明细'
    },
    methods: {
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
                this.rents = res.result.result.rents
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