<template>
<div class="ratings_title">
        <div class="title_select">
            <div @click="selecttype(seltype.all)" :class="{active:type===seltype.all}">{{cod.one}}{{ratings.length}}</div>
            <div @click="selecttype(seltype.positive)" :class="{active:type===seltype.positive}">{{cod.two}}{{satisfaction}}</div>
            <div @click="selecttype(seltype.nasitive)" :class="{active:type===seltype.nasitive}">{{cod.three}}{{unsatisfaction}}</div>
        </div>
        <hr>
        <div>
            <span :class="{color1:flag}" class="icon icon-check_circle"  @click="swich"></span>
            <span >只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        ratings:{
            type:Array
        },
        seltype:{
            type:Object
        },
        cod:{
            type:Object
        }
    }, 
 data() {
  return {
    flag:false,  
    type:3,
  }
 },
 components: {
 },
 computed:{
   
     satisfaction (){
         let rateType = []
         this.ratings.forEach(element => {
            if(element.rateType===0){
                rateType.push(element.rateType)
            }
         });
         return rateType.length
     },
    unsatisfaction (){
         let rateType = []
         this.ratings.forEach(element => {
            if(element.rateType===1){
                rateType.push(element.rateType)
            }
         });
         return rateType.length
     },
 
 },
 methods:{
      swich(){
        this.flag =!this.flag
        this.$emit('swich-event',this.flag)
     },
     selecttype(number){
        this.type=number;
        this.$emit('selecttype-event',this.type)
     }
    
 }
}
</script>

<style scoped>
.color1{color: green}
.active{background-color:#00a0dc!important;color: #333 !important}
.ratings_title{
    margin-top: .16rem;
    padding: .2rem;
    background: #fff;
    }
    .ratings_title>div:last-child{
        color: #999;
        font-size: .2rem;
        height: .3rem;
        line-height: .3rem
        }
    .title_select>div{
        width: .6rem;
        height: .32rem;
        line-height: .32rem;
        background: #00a0dc;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        margin: 0 .1rem 0rem 0;
        color: #fff 
        }
        .title_select>div:nth-child(2){
            background: #6dd8ff;
            color: #666
            }
        .title_select>div:nth-child(3){
            background: #e9ebec;
            color:#666
            }
        .ratings_title hr{
            height: 0.5px;
            border: none;
            background: #e5e5e5;
            margin: .2rem 0;
            }
        .ratings_title .icon{
            font-size: .2rem;
            /* color: #b7bbbf; */
            vertical-align: baseline;
            }
        
</style>
