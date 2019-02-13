<template>
    <div class="main">
        <el-container>
            <el-aside width="210px">
                <el-menu default-active="/setting"
                :unique-opened="true"
                background-color="#2b303b"
                text-color="#fff"
                :router="true"
                class="el-menu-vartical-demo"
                :collapse-transition="true">
                    <el-menu-item index="/setting">
                        <template slot="title">
                            <i class="iconfont">&#xe78e;</i>
                            <span>全局设置</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="/table">
                        <template slot="title">
                            <i class="iconfont">&#xe853;</i>
                            <span>桌台管理</span>
                        </template>
                        <el-menu-item index="/table/list">所有桌台</el-menu-item>
                        <el-menu-item index="/table/add">添加桌台</el-menu-item>
                        <el-menu-item index="/table/delete"> 删除桌台</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/dishCategory">
                        <template slot="title">
                            <i class="iconfont">&#xe7de;</i>
                            <span>菜品类别</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="/dish">
                        <template slot="title">
                            <i class="iconfont">&#xe645;</i>
                            <span>菜品管理</span>
                        </template>
                        <el-menu-item index="/dish/dish">所有菜品</el-menu-item>
                        <el-menu-item index="/dish/addDish">添加菜品</el-menu-item>
                        <el-menu-item index="/dish/deleteDish">删除菜品</el-menu-item>
                        <el-menu-item index="/dish/updateDish">修改菜品</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/order">
                        <template slot="title">
                            <i class="iconfont">&#xe644;</i>
                            <span>订单列表</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/security">
                        <template slot="title">
                            <i class="iconfont">&#xe7c4;</i>
                            <span>安全管理</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <!-- 顶部信息 -->
                <el-header height="70px">
                    <el-card shadow="hover">
                        <div class="text">小肥牛后台管理系统</div>
                        <div class="user">
                            <span class="text">登录用户:</span>
                            <span class="username">{{aname}}</span>
                            <el-button type="primary" size="small" plain @click="logout">退出</el-button>
                        </div>
                    </el-card>
                </el-header>
                <!-- 主体 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
           
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
        this.$router.push('/setting')
    },
    computed: {
        aname () {
            return this.$store.state.adminName
        }
    },
    methods: {
        logout () {
            this.$store.commit('logout')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'iconfont';  /* project id 1037036 */
  src: url('//at.alicdn.com/t/font_1037036_oqcooe1rq8.eot');
  src: url('//at.alicdn.com/t/font_1037036_oqcooe1rq8.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1037036_oqcooe1rq8.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1037036_oqcooe1rq8.woff') format('woff'),
  url('//at.alicdn.com/t/font_1037036_oqcooe1rq8.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1037036_oqcooe1rq8.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.el-container {
    height: 611px;
    .el-aside {
        .el-menu {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            border: 0;
            .el-menu-item {
                width: 100%;
                margin: 0;
                span {
                    font-weight: bold;
                }
            }
            .el-submenu {
                @extend .el-menu-item;
            }
        }
    }
    .is-vertical {
        width: 100%;
        .el-header {
            .el-card {
                height: 100%;
                .el-card__body {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: space-around;
                    white-space: nowrap;
                    align-items: center;
                    padding: 0;
                    .text {
                        display: inline;
                        font-size: 1.17rem;
                        font-weight: 400;
                        color: #909399;
                        padding-right: 40px;
                    }
                    .user {
                        display: inline;
                        .text {
                            font-size: 1rem;
                            font-weight: normal;
                            color: #909399;
                            padding: 0 4px;
                        }
                        .username {
                            color: #909399;
                        }
                        .el-button {
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
        .el-main {
            padding-bottom: 0;
        }
    }
}
</style>
