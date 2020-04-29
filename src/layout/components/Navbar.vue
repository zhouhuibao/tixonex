<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div class="clearfix">
            <div class="pull-left">
              <el-image
               class="user-avatar"
              :src="userPhoto"
              >
              </el-image>
            </div>
            <div class="pull-right">
              {{userName}}
            </div>
          </div>
          
          
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <!-- <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item @click.native="clickUser">
            <span style="display:block;">用户设置</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getUserInfo } from "@/utils/auth";
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data(){
    const {name,avatar} =getUserInfo()
    return {
      userName:name,
      userPhoto:avatar,
    }
  },
  watch:{
    '$store.state.user.userInfo':{
        handler(newValue) {
          console.log(newValue)
          this.userName = newValue.name
          this.userPhoto = newValue.avatar
　　　　 },
　　　　deep: true
    }
  },
  created(){
    
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      const THIS = this
      await THIS.$store.dispatch('user/logout')
      setTimeout(item=>{
        THIS.$router.push(`/login?redirect=${THIS.$route.fullPath}`)
        this.$message({
          message:'退出成功',
          type:'success'
        })
      },500)
      
    },
    clickUser(){
      this.$router.push('/userSettings/index')
    }
  }
  
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        cursor: pointer;
        position: relative;
        height: 50px;
        padding-top: 5px;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.el-dropdown-menu{
  top: 50px !important;
}
</style>
