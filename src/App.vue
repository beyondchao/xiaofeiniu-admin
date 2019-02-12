<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {HOST, ERR_OK} from '@/common/js/config'

export default {
  name: 'App',
  mounted () {
    var url = `${HOST}/admin/settings`
    this.$axios.get(url).then((res) => {
      if (res.status === ERR_OK) {
        this.$store.commit('setGlobalSettings', res.data)
        //console.log(res.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss">
#app {
  color: #303133;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC" ,"Hiragion Sans";
}
</style>
