<template>
    <section class="mid-box">
        <el-table
                :data="changes"
                style="width: 100%">
            <el-table-column type="expand">
              <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="交易备注：">
                    <span>{{ props.row.tenantDesc }}</span>
                  </el-form-item>
                  <el-form-item label="评估机构：">
                    <span>{{ props.row.evalCodes }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                    prop="dateString"
                    label="交易日期">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格(万)">
            </el-table-column>
            <el-table-column
                    prop="changeA"
                    label="交易甲方">
            </el-table-column>
            <el-table-column
                    prop="changeB"
                    label="交易乙方">
            </el-table-column>
            <el-table-column
                    prop="tenantFinanceTool"
                    label="金融工具">
            </el-table-column>
            <el-table-column
                    prop="recordCreater"
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
                    id: this.$route.params.id,
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                }
            }).then(res => {
                res.result.result.changes.forEach((item) => {
                    item.dateString = item.date.split(' ')[0]
                })
                this.changes = res.result.result.changes
                this.total = this.total ? Number(this.total) : 0
            })
        },
        pageChange (page) {
            this.pageNumber++
            this.getChanges()
        }
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
        width: 50%;
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