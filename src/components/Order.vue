<template>
    <div class="order">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/setting' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="tableData" border style="width: 100%" stripe>
            <el-table-column prop="oid" label="定单编号"></el-table-column>
            <el-table-column label="开始时间">
                <template slot-scope="scope">
                    <span>{{scope.row.startTime | datetime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="结束时间">
                <template slot-scope="scope">
                    <span>{{scope.row.endTime | datetime}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="customerCount" label="用餐人数"></el-table-column>
            <el-table-column prop="tableId" label="桌台编号"></el-table-column>
            <el-table-column prop="" label="菜品详情">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" plain @click="orderDetail">查看订单</el-button>
                </template>
            </el-table-column>
            <el-dialog>
                
            </el-dialog>
        </el-table>
    </div>
</template>

<script>
import {HOST, ERR_OK} from '@/common/js/config'

export default {
    data () {
        return {
            tableData: []
        }
    },
    created () {
        this.getTableData()
    },
    methods: {
        getTableData () {
            const url = `${HOST}/admin/order`
            this.$axios.get(url).then((res) => {
                if(res.data.code === ERR_OK) {
                    console.log(res.data.data)
                    this.tableData = res.data.data
                }
            })
        },
        orderDetail () {

        }
    }
}
</script>

<style lang="scss">
.el-table {
    margin-top: 20px;
}
</style>

