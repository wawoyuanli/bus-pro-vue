<template>
   <div id="header-wrap">
        <div class="pull-left header-icon" @click="navMenuState">
            <svg-icon iconClass="menu" className="menu" />
         </div>

        <div class="pull-right">
            
            <div class="user-info pull-left"  >
                <img src="../../assets/admin.jpg" alt="">
                 {{username}}
            </div>

            <div class="header-icon pull-left" @click="exit">
                <svg-icon iconClass="exit" className="exit" />
            </div>
        </div>
    </div>
</template>
<script>
import { computed ,ref} from '@vue/composition-api'

export default {
    name:'layout-header',
     setup(props, { root }){
       
    const username = computed(() =>  root.$store.state.app.username);
    
    // console.log(username,'username')
    
        const navMenuState = () => {
          // root.$store.dispatch('actionName')
            root.$store.commit('app/SET_COLLAPSE')
        }
        // 退出
        const exit = () => {
            root.$store.dispatch('app/exit').then(() => {
                root.$router.push({
                    name: 'Login'
                })
            })
        }
        return {
            navMenuState,
            exit,
            username   
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
#header-wrap{
    position: fixed;
    top: 0;
    right: 0;
    left: $navMenu;
    height: 75px;
    background-color: rgba(221, 78, 12,0.5);
    line-height: 75px;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .4));
    @include webkit(transition, all .3s ease 0s); //过渡
}
.open {
    #header-wrap { left: $navMenu; }
}
.close {
    #header-wrap { left: $navMenuMin; }
}
 .header-icon {
    padding: 0 50px;
    svg { 
        margin-bottom: -8px;
        font-size: 25px;
        cursor: pointer;
    }
}


.user-info {
    height: 100%;
    padding: 0 32px;
    border-right: 1px solid #ededed;
    + .header-icon {
        padding: 0 28px;
    }
    img {
        display: inline-block;
        margin-bottom: -12px;
        margin-right: 18px;
        width: 60px;
        height: 60px;
        border-radius: 50px;
          cursor: pointer;
    }
}
</style>