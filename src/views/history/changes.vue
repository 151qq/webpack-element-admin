<template>
    <section>
        <banner-changes :point="$route.query.point"
                        :house-name="$route.query.houseName"></banner-changes>
        <section class="mid-box">
            <el-table
                    :data="changes"
                    style="width: 100%">
                <el-table-column type="expand">
                  <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="评估机构：">
                        <span>{{ props.row.houseTradeEvaluationOrg }}</span>
                      </el-form-item>
                      <el-form-item label="咨询机构：">
                        <span>{{ props.row.houseTradeConsultingOrg }}</span>
                      </el-form-item>
                      <el-form-item label="交易类型：">
                        <span>{{ props.row.houseTradeType }}</span>
                      </el-form-item>
                      <el-form-item label="交易备注：">
                        <span>{{ props.row.houseTradeDesc }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                        prop="houseTradeDate"
                        label="交易日期"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="houseRradePrice"
                        label="价格(万)"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="houseTradeACode"
                        label="交易甲方">
                </el-table-column>
                <el-table-column
                        prop="houseTradeBCode"
                        label="交易乙方">
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
import bannerChanges from '../../components/views/banner-changes.vue'

export default {
    data () {
        return {
            changes: [],
            total: 0,
            pageSize: 10,
            pageNumber: 1
        }
    },
    mounted () {
        this.getChanges()
        document.title = '交易历史明细'
    },
    methods: {
        getChanges () {
            util.request({
                method: 'get',
                interface: 'changes',
                data: {
                    housesId: this.$route.params.id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(res => {
                res.result.result.changes.forEach((item) => {
                    item.houseTradeDate = item.houseTradeDate.split(' ')[0]
                })
                this.changes = res.result.result.changes
                this.total = this.total ? Number(this.total) : 0
            })
        },
        pageChange (page) {
            this.pageNumber++
            this.getChanges()
        }
    },
    components: {
        bannerChanges
    }
}
</script>
<style lang="scss">
.mid-box {
    width: 1000px;
    margin: 30px auto;

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        float: left;
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item__content {
        width: 340px;
        float: left;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }

    .el-dialog--small {
        top: 60px !important;
        width: 600px;

        .input-box {
            width: 480px;
        }
    }

    .page-box {
        margin-top: 15px;
    }
}
</style>