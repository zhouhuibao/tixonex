

<template>
  <div>菜单管理</div>
</template>

<script>
import {menuList} from '@/api/backstageSetting'
export default {
    name:'menuMange',
    data() {
        return {

        }
    },
    mounted(){
      menuList().then(res=>{
          console.log(res)
          // this.loading = false
        }).catch(()=>{
          // this.loading=false
        })
    }
}
</script>

<style>

</style>
