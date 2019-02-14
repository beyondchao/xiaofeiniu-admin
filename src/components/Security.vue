<template>
    <div class="security">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/setting' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>安全管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>修改管理员密码</span>
            </div>
            <el-form :model="form" ref="form" status-icon :rules="rules">
                <el-form-item label="旧密码" prop="oldKey">
                    <el-input type="password" v-model="form.oldKey" placeholder="请输入旧密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newKey">
                    <el-input type="password" v-model="form.newKey" placeholder="请输入新密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" prop="checkKey">
                    <el-input type="password" v-model="form.checkKey" placeholder="请确认新密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="primary" size="small" @click="submit('form')">确认</el-button>
                    <el-button size="small" @click="reset('form')">重输</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {HOST, ERR_OK} from '@/common/js/config'

export default {
    data () {
        var checkOldKey = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'))
            } else {
                callback()
            }
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.form.oldKey !== '') {
                    this.$refs.form.validateField('checkKey')
                }
                callback();
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.form.newKey) {
                callback(new Error('两次密码不一致'))
            } else {
                callback();
            }
        }
        return {
            form: {
                oldKey: '',
                newKey: '',
                checkKey: ''
            },
            rules: {
                oldKey: [
                    { validator: checkOldKey, trigger: 'blur'}
                ],
                newKey: [
                    { validator: validatePass, trigger: 'blur'}
                ],
                checkKey: [
                    { validator: validatePass2, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submit () {
            const url = `${HOST}/admin`
            var tmpForm = {}
            tmpForm.aname = this.$store.state.adminName
            tmpForm.oldPwd = this.form.oldKey
            tmpForm.newPwd = this.form.newKey
            this.$axios.patch(url, tmpForm).then(res => {
                if (res.data.code === 400) {
                    this.$message({
                        message: '旧密码输入不正确',
                        type: 'warning'
                    })
                } else if (res.data.code === 401) {
                    this.$message({
                        message: '密码未做修改',
                        type: 'success'
                    })
                } else if (res.data.code === ERR_OK) {
                    this.$message({
                        message: '密码修改成功！',
                        type: 'success'
                    })
                }
            })

            
        },
        reset (formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style lang="scss">
.security {
    .el-card {
        margin: 0 auto;
        margin-top: 40px;
        max-width: 500px;
        .el-form {
            .el-form-item {
                .el-form-item__label {
                    min-width: 70px;
                }
                .el-input {
                    max-width: 350px;
                }
            }
            .btn {
                text-align: center;
            }
        }
    }
}
</style>


