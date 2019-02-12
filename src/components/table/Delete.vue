<template>
    <div class="table-delete">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/setting' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
            <el-breadcrumb-item>删除桌台</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="桌台编号:">
                <el-input v-model="form.tid" placeholder="请输入要删除的桌台编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {ERR_OK, HOST} from '@/common/js/config'
export default {
    data () {
        return {
            form: {
                tid: 1
            }
        }
    },
    methods: {
        submit () {
              const url = `${HOST}/admin/table`
              this.$confirm("此操作不可逆，是否继续", "提示", {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$axios.delete(url, this.form).then((res) => {
                    if (res.data.code === ERR_OK) {
                        // console.log(res.data.msg)
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                    }
                })  
              })
              
        }
    }
}
</script>

<style lang="scss">
    .table-delete {
        .el-form {
            margin: 40px 0 0 0;
            .el-form-item {
                .el-form-item__label {
                    max-width: 66px;
                    white-space: nowrap;
                    padding-left:10px;
                }
                .el-input__inner {
                    min-width:50px;
                    max-width: 200px;
                }
                .text {
                    opacity: .6;
                    padding-left: 10px;
                    white-space: nowrap;
                }
            }
        }
    }
</style>
