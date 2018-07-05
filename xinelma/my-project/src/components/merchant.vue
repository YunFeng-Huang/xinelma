<template>
<div class="warp4" ref="merchant_warp">
<div class="merchant">
     <div class="introduce">
         <div class="introduce_top_left">
             <h1>粥品香坊</h1>
             <div class="star3">
                <v-star :seller="seller" ></v-star>
            </div>
           <span style="color:#999">(661) &nbsp;&nbsp;&nbsp;月售690单</span>
      
        </div>
        <div class="introduce_top_right" @click="chang_introduce">
            <p class="icon icon-favorite"  :class="{change_icon:boo,change_icon2:!boo}"></p>
            <div class="chang_text" ref="chang_text">点击收藏</div>
        </div>
        <hr>
     </div>
     <div class="introduce_bottom">
            <div>
                <div>起送价</div>
                <div>
                    <strong>20</strong>元
                </div>
            </div>
            <p class="devition"></p>
            <div>
                <div>商家配送</div>
                <div>
                    <strong>4</strong>元
                </div>
            </div>
            <p class="devition"></p>
            <div>
                <div>平均配送时间</div>
                <div>
                    <strong>39</strong>分钟
                </div>
            </div>
        </div>
    <div class="notice">
        <div class="notice_warp">
            <h3>公告与活动</h3>
            <p>{{seller.bulletin}}</p>
            <ul>
                <li v-for="item in seller.supports" :key="item.index" >
                    <img :src="map[item.type]" alt="" width="22" height="22" style="vertical-align:middle;margin:.1rem 0;"> &nbsp;&nbsp;&nbsp;{{item.description}}
                </li>
            </ul>
            
        </div>
    </div>
    <div class="action">
        <h3>商家实景</h3>
        <div class="action_list_warp" ref="action_list_warp">
            <ul class="action_list">
                <li v-for="pic in seller.pics" :key="pic.index">
                    <div>
                        <img :src="pic" alt="" width="180" height="180">
                    </div>                   
                </li>
            </ul>
        </div>
    </div>
    <div class="info_">
        <h3>商家信息</h3>
        <ul>
            <li v-for="item in seller.infos" :key="item.index">{{item}}</li>
        </ul>
    </div>
    

 </div>
</div>
 
</template>

<script>
import BScroll from 'better-scroll'
import decrease_4 from './xiao-icon/decrease_4@3x.png'
import discount_4 from './xiao-icon/discount_4@3x.png'
import guarantee_4 from './xiao-icon/guarantee_4@3x.png'
import invoice_4 from './xiao-icon/invoice_4@3x.png'
import special_4 from './xiao-icon/special_4@3x.png'

import vStar from './star'
export default {
 name:'merchant',
 data() {
  return {
      seller:{
      },
      map:[decrease_4,discount_4,guarantee_4,invoice_4,special_4],
      boo:false
  }
 },
 components: {
     vStar,
 },
  methods:{
     _initscoll(){
         this.warpscroll= new BScroll(this.$refs.merchant_warp,{
             click:true,
             
         })
         this.action_list_warp = new BScroll(this.$refs.action_list_warp,{
             scrollX:true,
             
         })
     },
     chang_introduce(){
         if(this.boo===false){this.$refs.chang_text.innerHTML = '已收藏'}
         else{this.$refs.chang_text.innerHTML = '点击收藏'}
          this.boo=!this.boo
     }
 },
 created(){
     this.$http.get('/api/seller').then((res)=>{
         res=res.body;
         if(res.errno===0){
             this.seller = res.data
             this.$nextTick(()=>{
                 this._initscoll()
             })
         }
     })
 },


}
</script>

<style scoped >
.change_icon{color: red}
.change_icon2{color: #999}
.warp4{
    height: calc(100vh - 1.81rem);
    overflow: hidden;
    margin-top: .02rem;
    }
    .merchant{
        background: #f3f5f7;
        margin-top: 1px 
        }
    .introduce{
        padding: .18rem;
        background: #fff

        }
        .star3{
            transform: scale(0.8);
            margin-left: -.1rem;
            display: inline-block;
            vertical-align: middle
            }
        .introduce_top_left,introduce_top_right{
            display: inline-block
        }
        .introduce_top_right{
            float: right;
            text-align: center; 
            width: .48rem;
            height: .48rem
        }
        .icon{
            font-size: .28rem;
            
            
        }
       .introduce hr{
           margin: .1rem 0 0 0;
           height: 0.5px;
           background: #e5e5e5;
           border: none
       } 
       .introduce_bottom{
           display: flex;
           background: #fff;
           /* border-bottom: 1px solid #d1d1d1; */
            margin: 0 0 .1rem 0;
            }
            .devition{
                display: block;
                width: 1px;
                background: #d1d1d1;
                }
                .introduce_bottom>div{
                    flex-grow: 1;
                    /* background: red; */
                    text-align: center;
                    padding: .2rem;
                    }
                    .introduce_bottom strong{
                        font-weight: 200;
                        margin-right: .06rem;
                        font-size: .3rem
                        }
                    .notice,.action,.merchant .info_{
                        background: #fff;
                        padding: .2rem;
                        margin-top: .1rem
                    } 
                .info_ h3{margin-bottom: .3rem}
                .info_ li {
                    height: .6rem;
                    line-height: .6rem;
                    border-top: 1px solid #e5e5e5
                }
                .info_{margin-bottom: .2rem}
                    .notice p{
                        color: red;
                        text-indent: .2rem;
                        margin: .1rem 0;
                        line-height: .22rem
                        } 
                        .notice_warp li {
                            border-top:1px solid #e5e5e5
                        }  
                    .action_list{
                       width: 800px;
                        margin-top: .2rem;
                        margin-bottom: .2rem;
                        overflow: hidden;
                        }
                    .action_list li{
                        display: inline-block;
                        margin-right: .1rem
                        }

</style>
