<template>
    <div class="table-list">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/setting' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
            <el-breadcrumb-item>所有桌台</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="10">
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="table in tableList" :key="table.tid">
                <my-table :table="table"></my-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import MyTable from '@/base/MyTable'
import {ERR_OK, HOST} from '@/common/js/config'

export default {
    data () {
        return {
            tableList: []
        }
    },
    created () {
        var url = `${HOST}/admin/table`
        this.$axios.get(url).then((res) => {
            if (res.status === ERR_OK) {
                console.log(res.data)
                this.tableList = res.data
            }
        }).catch(err => {
            console.log(err)
        })
    },
    components: {
        MyTable
    }
}
</script>

<style lang="scss">
.table-list {
    .el-breadcrumb {
        padding: 0 0 20px;
    }
}
</style>
