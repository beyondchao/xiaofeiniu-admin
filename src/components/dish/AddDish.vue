<template>
    <div class="add-dish">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/setting' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>菜品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加菜品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="form" label-width="100px">
            <el-form-item label="菜品图片:">
                <el-upload class="xfn-uploader"
                :action="uploadAction"
                :on-success="doUploadSucc"
                name="dishImg"
                :show-file-list="false">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                    <img v-if="imageUrl" :src="imageUrl"/>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <div class="text">只能上传jpg/png文件,且不超过500kb</div>
            </el-form-item>
            <el-form-item label="主标题:">
                <el-input v-model="form.title" placeholder="请输入菜品标题"></el-input>
            </el-form-item>
            <el-form-item label="所属类别:">
                <el-radio-group v-model="form.categoryId">
                    <el-radio :label="1">肉类</el-radio>
                    <el-radio :label="2">海鲜河鲜</el-radio>
                    <el-radio :label="3">丸划类</el-radio>
                    <el-radio :label="4">蔬菜豆制品</el-radio>
                    <el-radio :label="5">菌菇类</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="价格:">
                <el-input v-model="form.price" placeholder="请输入菜品价格"></el-input>
            </el-form-item>
            <el-form-item label="菜品描述:">
                <el-input type="textarea"
                placeholder="请输入菜品描述"
                v-model="form.data"
                :rows="4"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="reInput">重填</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {HOST, ERR_OK} from '@/common/js/config'
export default {
    data () {
        return {
            imageUrl: '',
            uploadAction: `${HOST}/admin/dish/image`,
            form: {
                title: '',
                imgUrl: '',
                price: '',
                detail: '',
                categoryId: 1
            }
        }
    },
    methods: {
        doUploadSucc(res, file) {
            this.form.imgUrl = res.fileName
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        reInput () {
            this.form = {
                title: '',
                imgUrl: '',
                price: '',
                detail: '',
                categoryId: 1
            }
        },
        submit () {
            const url =`${HOST}/admin/dish`
            this.$axios.post(url, this.form).then((res) => {
                if (res.data.code === ERR_OK) {
                    console.log(res.data.msg)
                }
            })
        }
    }
}
</script>

<style lang="scss">
.el-form {
    margin-top: 20px;
}
.xfn-uploader {
    .el-upload {
        border: 1px dotted #aaa;
        border-radius: 3px;
        cursor: pointer;
        width: 250px;
        height: 177px;
        overflow: hidden;
        text-align: center;
        line-height: 177px;
        .el-icon-plus {
            font-size:25px;
        }
        &:hover {
            border-color: #409eff;
        }
    }
    img {
        max-width: 100%;
    }
}
</style>
