<template>
    <div class="dish">
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="肉类" name="1">
                <el-row v-if="dish[0]">
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="(detail, index) in dish[0].dishList" :key="index">
                        <dish :dishDetail="detail"></dish>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="河鲜海鲜" name="2" v-if="dish[1]">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="(detail, index) in dish[1].dishList" :key="index">
                    <dish :dishDetail="detail"></dish>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="丸划类" name="3" v-if="dish[2]">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="(detail, index) in dish[2].dishList" :key="index">
                    <dish :dishDetail="detail"></dish>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="蔬菜豆制品" name="4" v-if="dish[3]">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="(detail, index) in dish[3].dishList" :key="index">
                    <dish :dishDetail="detail"></dish>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="菌菇类" name="5" v-if="dish[4]">
                <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" v-for="(detail, index) in dish[4].dishList" :key="index">
                    <dish :dishDetail="detail"></dish>
                </el-col>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {HOST, ERR_OK} from '@/common/js/config'
import Dish from '@/base/Dish'

export default {
    data () {
        return {
            activeName: "1",
            dish: []
        }
    },
    created () {
        this.getDishDetail()
    },
    methods: {
        getDishDetail () {
            var url = `${HOST}/admin/dish`
            this.$axios.get(url).then((res) => {
                if (res.status === ERR_OK) {
                    this.dish = res.data
                }
            })
        }
    },
    components: {
        Dish
    }
}
</script>

<style lang="scss">

</style>
