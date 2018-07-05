<template>
<div class="ratings_warp" ref="ratings_warp">
    <div class="ratings" >
        <div class="grade">
            <div>
                <h1 style="color:rgb(250,153,0)">{{seller.score}}</h1>
                <h2>综合得分</h2>
                <h5>高于周边商家{{seller.rankRate}}%</h5>
            </div>
            <div class="rat_" >
                    <div class="q">  
                        <strong class="a">服务评分</strong>
                        <div class="star2">
                            <v-star :seller="seller" ></v-star>
                        </div>
                        <strong class="c">{{seller.serviceScore}}</strong>
                    </div>
                    <div class="q">  
                        <strong class="a">食物评分</strong>
                        <div class="star2">
                            <v-star :seller="seller" ></v-star>
                        </div>
                        <strong class="c">{{seller.foodScore}}</strong>
                    </div>
                    <div class="q">  
                        <strong class="a">送达时间</strong>
                        <span style="margin-left:.1rem;color:#999">{{seller.deliveryTime}}分钟</span>
                    </div>
            </div>
        </div>
       <div >
            <v-ratings-select :cod="cod" :ratings="ratings" :seltype="seltype" v-on:swich-event="flag=$event" v-on:selecttype-event="type=$event"></v-ratings-select>
       </div>
        <ul class="ratings_content">
            <li v-for="rating in ratings" :key="rating.index" v-show="needshow(rating.rateType,rating.text)">
                <div><img :src="rating.avatar" alt="" width="28" height="28" style="border-radius:100%" ></div>
                <div class="ratings_content_right ">
                    <h4>{{rating.username}}</h4>
                    <div class="star3 "><v-star :seller="seller" ></v-star></div>
                    <div class="deliveryTime" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
                    <p class="text" v-if="rating.text">{{rating.text}}</p>
                    <div class="lab"> 
                        <span class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" style="color:#00a0dc"></span>
                        <span v-for="rec in rating.recommend" :key="rec.index" class="ele">{{rec}}</span>
                    </div>
                    <div class="date">
                        {{rateTime}}
                    </div>
                </div>
            </li>
        </ul>

    </div>
</div>
 
</template>

<script>
import vRatingsSelect from './ratings-select'
import BScroll from 'better-scroll'
import vStar from './star'
export default {
 data() {
  return {
    seller:{},
    ratings:[],
    flag:false,
    seltype:{
        all:3,
        positive:0,
        nasitive:1
    },
    type:3,
    cod:{
        one:'全部',
        two:'满意',
        three:'不满意'
    }

  }
 },
 components: {
  vStar,
  vRatingsSelect
 },
 computed:{
         rateTime(){
         let date1;
                this.ratings.forEach(element => {
                var date = new Date(element.rateTime)
                var year = date.getFullYear()
                var month = date.getMonth()
                var day = date.getDate()
                var minutes = date.getMinutes()
                var seconds = date.getSeconds()
                date1 = year+'/'+month+'/'+day+' '+seconds+':'+minutes;
                // date1 = date.toLocaleDateString()
                });
         return date1
     }
 },
 
  methods:{
     _initScroll(){
         
         this.ratingsscroll = new BScroll(this.$refs.ratings_warp,{
             click:true
         })
     },
       needshow(type,text){
        if(!text&&this.flag===true){
            return false
        }
        if(this.type===3){
            return true
        }else{
           return  this.type === type
        }
      
      
    },

 },
 created(){
   this.$http.get('/api/seller').then((res)=>{
       res=res.body
       if(res.errno===0){
           this.seller = res.data
       }
   });
    this.$http.get('/api/ratings').then((res)=>{
       res=res.body
       if(res.errno===0){
           this.ratings = res.data
           this.$nextTick(()=>{
               this._initScroll()
           })
       }
   })
 },

}
</script>

<style scoped >

    .ratings_warp{
        height: calc(100vh - 1.81rem);
        overflow: hidden;
        margin-top: .02rem
        }
    .ratings{
        background: #f3f5f7;

    }
    .grade{
        /* height: 1.07rem; */
        width: 100%;
        background: #fff;
        display: flex;
        padding:.2rem 0;
         }
        .grade>div:nth-child(1){
                border-right: 1px solid #d1d1d1; 
                text-align: center;
                /* height: 1.07rem; */
                display: flex;
                flex-flow: row wrap;
                align-content: space-around;
            }
        .grade h1,.grade h2,.grade h5{
            width: 100%;
        }
     
        .rat_{
            width: 100%;
            flex-flow: row wrap;
            align-content: space-around;
            padding: 0 .04rem;
        }
        .star2{transform: scale(0.9);
        }
        
@media screen and (max-width: 321px) {
      .rat_ .c{
            display: inline-block;
            color: #ff9900;
            font-size: .2rem;
            line-height: .32rem
        }
         .rat_ .q>div{
           display: inline-block;
           vertical-align: middle;
        }
       
}
@media screen and (min-width: 321px) {
     .rat_ .c{
            float: right;
            display: inline-block;
            color: #ff9900;
            font-size: .2rem;
            line-height: .32rem
        }
         .rat_ .q>div{
           display: inline-block;
           vertical-align: middle;
        }
       
}

      .ratings_content{
           margin-top: .02rem;
           padding: .2rem;
           background: #fff; 
            }
        .ratings_content li{
            display: flex;
            position: relative;
            margin-bottom: .2rem;
            padding-bottom: .2rem;
            border-bottom: 1px solid #d1d1d1
            }
            .ratings_content_right{
                margin-left: .2rem
            }
            .ratings_content_right .date{
                position: absolute;
                top: 0;
                right: 0;
                color: #999
            }
            .ratings_content_right .star3{
                transform: scale(0.6);
                display: inline-block;
                line-height: .24rem;
                margin-left: -.24rem;
                vertical-align: middle
            }
          
            .ratings_content_right .deliveryTime{
                display: inline-block;
                line-height: .24rem;
                margin-top: .02rem;
                margin-left: -.1rem;
                color: #999
                }
                .ratings_content_right .text{
                    margin: .1rem auto
                    }
                    .ratings_content_right .ele{
                        border: 1px solid #e5e5e5;
                        margin-left: .1rem;
                        padding: .02rem .1rem;
                        display: inline-block;
                        margin-bottom: .1rem
                    }
                    .lab{
                         text-align: left;
                         position: relative;
                    }
                    .lab span{
                        height: .2rem;
                        line-height: .2rem;
                        }
                                   
</style>
