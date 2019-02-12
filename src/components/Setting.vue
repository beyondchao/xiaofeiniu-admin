<template>
    <div class="setting">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/setting' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="应用名称:">
                <el-input v-model="form.appName"></el-input>
            </el-form-item>
            <el-form-item label="应用API网址:">
                <el-input v-model="form.apiUrl"></el-input>
            </el-form-item>
            <el-form-item label="后台管理端网址:">
                <el-input v-model="form.adminUrl"></el-input>
            </el-form-item>
            <el-form-item label="客户端App网址:">
                <el-input v-model="form.appUrl"></el-input>
            </el-form-item>
            <el-form-item label="ICP备案号:">
                <el-input v-model="form.icp" readonly></el-input>
            </el-form-item>
            <el-form-item label="版权声明:">
                <el-input v-model="form.copyright" readonly></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="conserve">保存修改</el-button>
                <el-button @click="cancel">取消修改</el-button>
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
                appName: '',
                apiUrl: '',
                adminUrl: '',
                appUrl: '',
                icp: '',
                copyright: ''
            }
        }
    },
    beforeCreate () {
        //组件创建前检查是否登录
        var aname = this.$store.state.adminName
        if (!aname) {
            this.$router.push('/login')
        }
    },
    mounted () {
        this.form = this.getSettings()
        //console.log(this.form)
    },
    methods: {
        getSettings () {
            var form = {}
            var settings = this.$store.state.globalSettings
            form.appName = settings.appName
            form.apiUrl = settings.apiUrl
            form.adminUrl = settings.adminUrl
            form.appUrl = settings.appUrl
            form.icp = settings.icp
            form.copyright = settings.copyright
            return form
        },
        cancel () {
           this.form = this.getSettings()
        },
        conserve () {
            var url = `${HOST}/admin/settings`
            this.$axios.put(url, this.form).then((res) => {
                if (res.data.code === ERR_OK) {
                    console.log(res.data.msg)
                    this.$message({
                        showClose: true,
                        message: '设置修改成功！',
                        type: 'success'
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
.setting {
    .el-breadcrumb {
        padding: 0 0 20px;
    }
    .el-form {
        border: 1px solid rgb(216, 215, 215);
        padding: 12px;
        border-radius: 5px;
        overflow: hidden;
        .el-form-item {
            white-space: nowrap;
        }
    }
}
</style>
