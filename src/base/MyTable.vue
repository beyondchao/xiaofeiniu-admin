<template>
    <div class="my-table">
        <el-card shadow="hover">
            <div class="icon" :style="tColor">
                <span>{{table.tid}}号桌:</span>
                <span>{{tableState}}</span>
            </div>
            <div class="btn">
                <el-button type="primary" plain size="small" @click="showDialog">详情</el-button>
                <el-button type="danger" plain size="small">修改</el-button>
            </div>
        </el-card>
        <!-- 桌台详情对话框 -->
        <el-dialog :title="table.tid + '桌台详情'" :visible.sync="dialogVisible" :before-close="closeDialog">
            <el-tabs type="border-card" @tab-click="makeQRCode">
                <el-tab-pane label="桌台状态">
                    <el-row class="table-name" v-if="this.tableDetail.tname">
                        <el-col :span="3" class="text grid-content">桌台名称:</el-col>
                        <el-col :span="18" class="grid-content">
                            <el-button type="info" size="small" plain>{{tableDetail.tname}}</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="tabState">
                        <el-col :span="3" class="text grid-content">桌台状态:</el-col>
                        <el-col :span="18" class="grid-content">
                            <el-button type="info" size="small" plain>{{tableDetail.status}}</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="contact-name" v-if="this.tableDetail.contactName">
                        <el-col :span="3" class="text grid-content">预约人:</el-col>
                        <el-col :span="18" class="grid-content">
                            <el-button type="info" size="small" plain>{{tableDetail.contactName}}</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="phone" v-if="this.tableDetail.phone">
                        <el-col :span="3" class="text grid-content">联系电话:</el-col>
                        <el-col :span="18" class="grid-content">
                            <el-button type="info" size="small" plain>{{tableDetail.phone}}</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="contact-time" v-if="this.tableDetail.contactTime">
                        <el-col :span="3" class="text grid-content">联系时间:</el-col>
                        <el-col :span="18" class="grid-content">
                            <el-button type="info" size="small" plain>{{tableDetail.contactTime | datetime}}</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="dinner-time" v-if="this.tableDetail.dinnerTime">
                        <el-col :span="3" class="text grid-content">用餐时间:</el-col>
                        <el-col :span="18" class="grid-content">
                            <el-button type="info" size="small" plain>{{tableDetail.dinnerTime | datetime}}</el-button>
                        </el-col>
                    </el-row>
                    <el-row class="table-type" v-if="this.tableDetail.ttype">
                        <el-col :span="3" class="text grid-content">桌台类型:</el-col>
                        <el-col :span="18" class="grid-content">
                            <el-button type="info" size="small" plain>{{tableDetail.ttype}}</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="桌台二维码">
                    <img :src="qrcodeData" />
                    <div class="text">提示：请将此二维码打印于对应桌台；顾客扫码即可点餐</div>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer">
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {HOST} from '@/common/js/config'
import TableDetails from '@/common/js/tableDetail'

export default {
    data () {
        return {
           dialogVisible: false,
           qrcodeData: '',
           tableDetail: {}
        }
    },
    props: {
        table: {
            type: Object
        }
    },
    methods: {
        showDialog () {
            this.dialogVisible = true
            this.createTableDetail(this.table)
        },
        closeDialog () {
            this.dialogVisible = false
        },
        makeQRCode () {
            var qrcode = require('qrcode');
            var tableUrl = `${HOST}/#/${this.table.tid}`
            qrcode.toDataURL(tableUrl, {
                width: 300,
                errCorrectionLevel: 'H'
            },(err, url) => {
                this.qrcodeData = url
            })
        },
        createTableDetail (table) {
            const status = table.status
            if (status === 1) {
                this.tableDetail = new TableDetails({
                    id: table.tid,
                    status: "空闲",
                    tname: table.tname
                })
                console.log(this.tableDetail)
            } else if (status === 2) {
                var url = `${HOST}/admin/table/reservation/${table.tid}`
                console.log(url)
                this.$axios.get(url).then((res) => {
                    console.log(res.data[0])
                    let result = res.data[0]
                    this.tableDetail = new TableDetails({
                        id: table.tid,
                        status: '预定',
                        tname: table.tname,
                        contactName: result.contactName,
                        phone: result.phone,
                        contactTime: result.contactTime,
                        dinnerTime: result.dinnerTime
                    })
                    console.log(this.tableDetail.dinnerTime)
                })
                
            } else if (status === 3) {
                this.tableDetail = new TableDetails({
                    id: table.tid,
                    status: "占用",
                    tname: table.tname,
                    ttype: table.ttype,

                })
            } else {
                this.tableDetail = new TableDetails({
                    id: table.tid,
                    status: "其他",
                    tname: table.tname
                })
            }
        }
    },
    computed: {
        tableState () {
            const status = this.table.status
            if (status === 1) {
                return '空闲'
            } else if (status === 2) {
                return '预定'
            } else if (status === 3) {
                return '占用'
            } else {
                return '其它'
            }
        },
        tColor () {
            const status = this.table.status
            if (status === 1) {
                return 'background: rgb(103, 194, 58)'
            } else if (status === 2) {
                return 'background: rgb(230, 162, 60)'
            } else if (status === 3) {
                return 'background: rgb(245, 108, 108)'
            } else {
                return 'background: rgb(144, 147, 153)'
            }
        }
    },
    components: {
        
    }
}
</script>

<style lang="scss">
.el-breadcrumb {
    overflow: hidden;
    height: 14px;
    min-width: 205px;
}
.my-table {
    border: 1px solid #e4e1e1;
    border-radius: 3px;
    height: 163px;
    overflow: hidden;
    margin-bottom: 5px;
    .el-card {
        border: 0;
        .el-card__body {
            padding: 0;
            .icon {
                height: 100px;
                line-height: 100px;
                width: 90%;
                border-radius: 50%;
                box-shadow: 5px -5px 5px #888;
                margin: 8px auto;
                // min-width: 145px;
                text-align: center;
            }
            .btn {
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                margin-bottom: 5px;
            }
        }
    }
    .el-dialog {
        .el-dialog__header {
            .el-dialog__title {
                font-size: 15px;
                font-weight: 900;
            }
        }
        .el-dialog__body {
            .el-tabs__content {
                .el-tab-pane {
                    .el-row {
                        margin-bottom: 10px;
                        line-height: 32px;
                        .text {
                            min-width: 62px;
                            margin-right: 10px;
                        }
                    }
                }
                #pane-1 {
                    text-align: center;
                }
            }
        } 
    }
}
</style>

