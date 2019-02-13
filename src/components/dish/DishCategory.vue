<template>
    <div class="dish-category">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/setting' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜品类别</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" size="small" plain class="btn" @click="addDish">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            添加新的菜品类别
        </el-button>
        <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        border
        style="width: 100%">
            <el-table-column prop="cid" label="编号">
            </el-table-column>
            <el-table-column prop="cname" label="名称">
            </el-table-column>
            <el-table-column prop="" label="操作" fixed="right" width="150">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" plain @click="updateDish(scope.row)">修改</el-button>
                    <el-button type="danger" size="small" plain @click="deleteDish(scope.row)">删除</el-button>
                </template>
            </el-table-column>
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
        getTableData() {
            const url = `${HOST}/admin/category`
            this.$axios.get(url).then((res) => {
                if (res.status === ERR_OK) {
                    this.tableData = res.data
                    //console.log(this.tableData)
                }
            })
        },
        tableRowClassName ({row, rowIndex}) {
            if (rowIndex%2 !== 0) {
                return "odd"
            }
        },
        addDish () {
            this.$prompt('请输入新的菜品名', '添加菜品类别', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '新菜品类别名'
            }).then(({ value }) => {
                var category = {}
                category.cname = value
                category.cid = this.tableData.length + 1
                const url = `${HOST}/admin/category`
                this.$axios.post(url, category).then((res) => {
                    if (res.data.code === ERR_OK) {
                        this.$message({
                            message: '新菜品添加成功',
                            type: 'success'
                        })
                        this.getTableData()
                    }
                })
            })
        },
        deleteDish (row) {
            console.log(row)
            this.$confirm('此操作将永久删除，是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const url = `${HOST}/admin/category/${row.cid}`
                this.$axios.delete(url).then((res) => {
                    if(res.data.code === ERR_OK) {
                        this.$message({
                            message: '菜品删除成功',
                            type: 'success'
                        })
                        this.getTableData()
                    } else {
                        //console.log(res.data)
                        this.$message({
                            message: '菜品删除失败',
                            type: 'warning'
                        })
                    }
                })
            })
        },
        updateDish (row) {
            this.$prompt('请输入新菜品名称', '修改菜品类别', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '新菜品类别名'
            }).then(({ value }) => {
                var category = {}
                category.cname = value
                category.cid = row.cid
                const url = `${HOST}/admin/category`
                this.$axios.put(url, category).then((res) => {
                    if(res.data.code === ERR_OK) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                        this.getTableData() //刷新表格
                    } else {
                        this.$message({
                            message: '菜品修改失败',
                            type: 'warning'
                        })
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss">
.dish-category {
    .btn {
        margin-top: 20px;
    }
    .el-table {
        margin-top: 20px;
        .odd {
            background: #f0f9eb;
        }
    }
}

</style>
