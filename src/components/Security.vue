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
            <el-form :mode="form" ref="form" status-icon :rules="rules">
                <el-form-item label="旧密码" prop="oldKey">
                    <el-input type="password" v-model="form.oldKey" placeholder="请输入旧密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newKey">
                    <el-input type="password" v-model="form.newKey" placeholder="请输入新密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" prop="checkKey">
                    <el-input type="password" v-model="form.checkKey" placeholder="请确认新密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small">确认</el-button>
                    <el-button size="small">重输</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
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
                newKey: [
                    { validator: validatePass, trigger: 'blur'}
                ],
                checkKey: [
                    { validator: validatePass2, trigger: 'blur'}
                ]
            }
        }
    }
}
</script>

<style lang="scss">
.security {
    .el-card {
        margin-top: 20px;
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
        }
    }
}
</style>


