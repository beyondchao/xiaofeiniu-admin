<template>
    <div class="add-table">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/setting' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加桌台</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="桌台编号:">
                <el-col :span="3">
                    <el-input v-model="form.tid" :disabled="true" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="text">
                    自动生成 无需填写
                </el-col>
            </el-form-item>
            <el-form-item label="桌台别名:">
                <el-input v-model="form.tname" placeholder="给桌台起个喜庆的别名吧"></el-input>
            </el-form-item>
            <el-form-item label="桌台类型:">
                <el-input v-model="form.type" placeholder="这是几人桌呢？如8人桌、3-4人桌.."></el-input>
            </el-form-item>
            <el-form-item label="初始状态:">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1" checked>空闲</el-radio>
                    <el-radio :label="2" disabled>预定</el-radio>
                    <el-radio :label="3" disabled>占用</el-radio>
                    <el-radio :label="4" disabled>其他</el-radio>
                </el-radio-group>
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
                tid: 0,
                tname: '',
                type: '',
                status: 1
            }
        }
    },
    created () {
        this.getTables();
    },
    methods: {
        getTables () {
            const url = `${HOST}/admin/table`
            this.$axios.get(url).then((res) => {
                console.log(res.data)
                this.form.tid = res.data[res.data.length-1].tid + 1
            })
        },
        submit () {
            const url = `${HOST}/admin/table/add`
            this.$axios.post(url, this.form).then((res) => {
                if (res.data.code === ERR_OK) {
                    console.log(res.data.msg)
                    this.form.tid++
                }
            }).catch(err => {
                console.log(err)
            })  
            this.$alert(`新桌台添加成功！系统编号为:${this.form.tid}`, '添加桌台', {
                type: 'wraning'
            })
        }
    },
    computed: {
       
    }
}
</script>

<style lang="scss">
    .add-table {
        .el-form {
            margin: 30px 0 0 0;
            .el-form-item {
                .el-form-item__label {
                    max-width: 66px;
                    white-space: nowrap;
                    padding-left:10px;
                }
                .el-input__inner {
                    min-width:50px;
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
