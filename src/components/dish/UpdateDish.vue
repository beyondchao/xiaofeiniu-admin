<template>
    <div class="delete-dish">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/setting' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>修改菜品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div solt="header" class="clearfix">
                <span>根据编号修改菜品:</span>
            </div>
            <el-form :model="form1" label-width="100px">
                <el-form-item label="菜品编号:">
                    <el-input v-model="form1.did" placeholder="请输入编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleDeleteNumb">修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div solt="header" class="clearfix">
                <span>根据名称修改菜品:</span>
            </div>
            <el-form :model="form2" label-width="100px">
                <el-form-item label="菜品名称:">
                    <el-input v-model="form2.dishName" placeholder="请输入菜品名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleDeleteName">修改</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {HOST, ERR_OK} from '@/common/js/config'

export default {
    data () {
        return {
            form1: {
                did: 0
            },
            form2: {
                dishName: ''
            }
        }
    },
    methods: {
        handleDeleteNumb () {
            this.$confirm(`确认修改编号为${this.form1.did}的菜品`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'waring'
            }).then(() => {
                const url = `${HOST}/admin/dish/${this.form1.did}`
                this.$axios.delete(url).then(res => {
                    if (res.data.code === ERR_OK) {
                        //console.log(res.data.msg)
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        })
                    } else {
                        this.$message({
                            message: '该编号不存在，请重新输入',
                            type: 'warning'
                        })
                    }
                })
            })
        },
        handleDeleteName () {
            this.$confirm(`确认修改名称为${this.form2.dishName}的菜品`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'waring'
            }).then(() => {
                const url = `${HOST}/admin/dish/byName/${this.form2.dishName}`
                this.$axios.delete(url).then(res => {
                    if (res.data.code === ERR_OK) {
                        //console.log(res.data.msg)
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        })
                    } else {
                        this.$message({
                            message: '该菜名不存在,请重试',
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
.delete-dish {
    .el-card {
        margin-top: 20px;
        .clearfix {
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .el-form {
            .el-form-item {
                .el-input {
                    max-width: 200px;
                }
            }
        }
    }
}
</style>
