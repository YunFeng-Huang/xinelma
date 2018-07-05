<template>
 <div class="select">
     <transition  name="fade" >
         <span class="icon icon-remove_circle_outline" @click="decrease" v-show="food.count>0" ></span>
     </transition>
     <span v-show="food.count>0">{{food.count}}</span>
     <span class="icon icon-add_circle" @click="add"></span>
 </div>
</template>

<script>
import Vue from 'vue'
export default {
    props:{
        food:{
            type:Object
        },
    },
    data() {
    return {
        count:'',
    }
    },
    components: {

    },
    computed:{
         
    }
    ,
    methods:{

        add(e){
             if(!this.food.count){
                 Vue.set(this.food,'count',1)
             }else{
                this.food.count++;
             }
               
        },
        decrease(){
            if(this.food.count<=1){
                this.food.count='';
            }else{
                this.food.count--;
                }  
        },
         
       
    }
}
</script>

<style scoped>
    .select{
            width: 120px;
            height: .24rem;
            text-align: center;
            font-size: .3rem;
            color: #00a0dc;
            }
        .select span{
            display: block;
            padding: .04rem;
        }
        .select span:nth-child(2){
           color: #999;
           font-size: .16rem;
           width: .3rem;
           height: .3rem;
           line-height: .3rem;
           float: left;
           margin-left: .04rem
            }
        .select span:nth-child(1){
            float: left;
        }
        .select span:nth-child(3){
            float: right;
        }
        .fade-enter,.fade-leave-to{
            transform: translateX(70px)rotate(180deg);
            }
       
        .fade-enter-active,.fade-leave-active{
            transition: all 0.5s
           }
        
</style>
