<template>
  <div id="app">
    <div class="header">
      <div class="title">
          <div class="avator">
              <img :src="seller.avatar" alt="" width="64" height="64">
            </div>
            <div class="info">
              <h2>{{seller.name}}</h2>
              <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
              <p>
                <img v-if="seller.supports" :src="map[seller.supports[index].type]" alt="" width="12" height="12">
                <span v-if="seller.supports">{{seller.supports[index].description}}</span>
              </p>
            </div>
      </div>
      <div class="ads" @click="openpop">
          <div class="ads-warp">
              <div class="text">
                  {{seller.bulletin}}
              </div>
              <div class="jump">
                <img src="./components/xiao-icon/jump.png" alt="">
              </div>
          </div>
      </div>
      <div class="btn" @click="openpop">
        <span>5</span><img src="./components/xiao-icon/jump.png" alt="">
      </div>

    <div class="pop_warp" >
      <div class="popup" v-show="open" ref="pop_warp">
              <div class="popup_contain" >
                    <div class="minheight">
                        <h1>{{seller.name}}</h1>
                        <div class="star">
                            <v-star :seller="seller" ref="star" ></v-star>
                        </div>
                        <div class="hr">
                          <p></p>
                          <h2>优惠信息</h2>
                          <p></p>
                        </div>
                        <ul class="_info">
                          <li v-for="(item,index) in seller.supports" :key="item.index" :style="{background:'url(' + map[index] + ')no-repeat',backgroundSize:size }">
                              {{item.description}}
                          </li>  
                        </ul>
                        <div class="hr">
                          <p></p>
                          <h2>优惠信息</h2>
                          <p></p>
                        </div>
                        <ul class="_info bul">
                          <p>{{seller.bulletin}}</p> 
                        </ul>
                      
                    </div>

                    <div @click="openpop">
                      <span class="close icon icon-close"></span>
                    </div>

              </div>
        </div>
    </div>
              
      
      
    </div>
    <div class="nav">
        <div><router-link to="/goods">商品</router-link></div>
        <div><router-link to="/ratings">评价</router-link></div>
        <div><router-link to="/merchant"  >商家</router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import decrease_4 from './components/xiao-icon/decrease_4@3x.png'
import discount_4 from './components/xiao-icon/discount_4@3x.png'
import guarantee_4 from './components/xiao-icon/guarantee_4@3x.png'
import invoice_4 from './components/xiao-icon/invoice_4@3x.png'
import special_4 from './components/xiao-icon/special_4@3x.png'

import BScroll from 'better-scroll'
import vStar from './components/star'
export default {
  name: 'app',
  data () {
    return {
      seller:{},
      flag:true,
      map:[decrease_4,discount_4,guarantee_4,invoice_4,special_4],
      index:1,
      open:false,
      size:'.22rem .22rem',
      
    }
  },
  methods:{
    toggle(){
      this.flag =false;
    },
     openpop(){
     this.open=!this.open
   }, 

  },
 computed:{
   
  },
 components:{
    vStar,
 },

  created(){
        this.$http.get('/api/seller').then((response)=>{
        response=response.body
        if(response.errno===0){
          this.seller = response.data
          this.$nextTick(()=>{
             this.scroll = new BScroll(this.$refs.pop_warp,{
               click:true,
               scrollY:true,})
             console.log(this.scroll)
          })
        };
      })
  },
  mounted(){
    
  }
}
</script>

<style>
  @import './components/icomoon/style.css';
  html{font-size: 625%}
  body{font-size: .12rem;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;color: #333;}
  ul,ol{list-style: none}
  *{padding: 0;margin: 0}
  .pop_warp{
    position: fixed;
      top: 0;
      left: 0;
    /* height: 100vh; */
      z-index: 20;
      background: rgba(0, 0, 0, 0.692); 
      width: 100%;
    }
  .header{
    height:1.17rem;
    background: url('./components/xiao-icon/header_bg.png')no-repeat;
    background-size: cover;
    color: #fff;
    padding: .24rem  .24rem 0 .24rem;
    position: relative;}
    .title{
          display: flex;
      }
      .avator img{
        vertical-align: bottom 
      }
      .info{
        margin-left: .16rem;
        display: flex;
        flex-flow: column;
        justify-content:space-between;
        }
        .info h2{
          width: 100%;
          height: .18rem;
          text-indent: .4rem;
          background: url('./components/xiao-icon/brand@3x.png') no-repeat;
          background-size: .3rem .18rem
        }
        .info p:last-child{
          display: flex;
          align-items: center
        }
        .info img{
          margin-right:.04rem
          }
    .ads{
      width: 100%;
      height: .28rem;
      line-height: .28rem;
      background: rgba(0, 0, 0, 0.2); 
      position: absolute;
      bottom: 0;
      left: 0
      }
      .ads-warp{
        display: flex;
        align-items: center 
        }
        .ads-warp .text{
          width:86%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-indent: .3rem;
          background: url('./components/xiao-icon/bulletin@3x.png') center left  no-repeat;
          background-size: .22rem .12rem;
          margin-left: .2rem
        }
        .ads-warp .jump img{
          display:block;
          align-self: center
        }
        .header .btn{
          position: absolute;
          right: .2rem;
          bottom: .5rem;
          width: .43rem;
          height: .24rem;
          background: rgba(0, 0, 0, 0.2);
          text-align: center;
          vertical-align: middle;
          line-height: .24rem;
          border-radius: 10px;
          
          }
          .header .btn img{
            vertical-align: initial;
            margin-left: .04rem
          }
    .popup{
      height: 100vh;
      /* overflow: hidden; */
      }
      .popup_contain{
        padding-top: .4rem;
        text-align: center;
         /* height: 1000px; */
          }
          .minheight{
            /* min-height: 60vh; */
      
          }
          .popup_contain h1{
            margin-bottom: .1rem
            }
          .hr{
            display: flex;
            align-items: center;
            width: 90%;
            margin-left: 5%;
            margin: .28rem auto;
            }
            .hr p:nth-child(1),.hr p:nth-child(3){
              flex-basis: 100px;
              flex-grow: 1;
              background: #f9f9f9;
              height: 1px
              }
            .hr h2:nth-child(2){
              margin: 0 .2rem;
              } 
              ._info{
                text-align: left;
                width: 80%;
                margin-left: 10%;
                text-indent: .3rem;
                font-size: .14rem;
              } 
              ._info li{
                text-indent: .3rem;

                line-height: .22rem;
                margin-bottom: .1rem
              }
              .bul{

                line-height: .28rem
                }
          .close{
            font-size: .3rem;
            color: #fff
          }
        
  .nav{
    width: 100%;
    height: .4rem;
    display: flex;
    justify-content:space-between;
    text-align: center;
    align-items: center;
    box-shadow: 0 0 1px 1px #d1d1d1;
    }
    .nav div {
      width: 100%;
      height: .4rem;
      line-height: .4rem;
    }
    .nav div a{
     text-decoration: none;
      color: black;
      font-size: .16rem;
       display: block;
    }
   .nav .router-link-active{
      color:red
    }
    .nav .color{
        color:red
      }






</style>
