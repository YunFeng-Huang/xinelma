<template>
 <div class="goods">
    <div class="side-main">
        <div class="wrapper" ref="wrapper">
            <ul class="content">
                <li v-for="(good,index) in goods" :key="good.index" ref="side" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
                    <span>
                        <img src="./xiao-icon/special_4@3x.png" alt="" width="14" height="14" v-if="good.type==2" >
                        {{good.name}}
                    </span>
                </li>
              
            </ul> 
        </div>
    </div>
    <div class="main">
        <div class="wrapper2" ref="wrapper2" >
            <ul class="content" >
                <li v-for="good in goods" :key="good.index" ref="title" >
                    <h3>{{good.name}}</h3>
                    <div class="info_warp" v-for="food in good.foods" :key="food.index" >
                            <div class="avator_" @click="getfood(food)">
                                <img :src="food.image" alt="" width="57" height="57">
                            </div>
                            <div class="title_" @click="getfood(food)"  >
                                <h4>{{food.name}}</h4>
                                <p>{{food.description}}</p>
                                <p>
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}</span>
                                </p>
                                <p class="price">
                                    <strong>￥{{food.price}}</strong>
                                    <span v-if="food.Oldprice">￥{{food.Oldprice}}</span>
                                </p>
                            </div>
                            <div class="select1" ref="select1">
                                <v-select :food="food" ></v-select>
                            </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="footer" :class="{color:totolcount<1}">
        <div class="footer_left">
            <div class="shopping_bg" @click="shopping">
                <span class="icon icon-shopping_cart" :class="{color:totolcount<1}"></span>
                <p v-show="totolcount > 0">{{totolcount}}</p>
            </div>  
        </div>
        <div class="footer_center">
            <p>{{totolprice}}元</p>
            <p></p>
            <p>另需配送费￥4元</p>
        </div>
        <div class="footer_right" :class="{bgcolor:totolprice > minprice}">
            {{totoldiff}}
        </div>
    </div>
    <transition name="fade2">
        <div class="footer_memu" v-show="open_shop&&totolcount>0">
            <div class="footer_memu_bg"></div>
            <div class="_memu_warp">
                <div class="f_header" >
                    <div>购物车</div>
                    <div @click="empty">清空</div>
                </div>
                <div class="f_contant">
                    <ul>
                        <li v-for="foo in selectfood" :key="foo.index">
                            <div>
                                {{foo.name}}
                            </div>
                            <div>
                                {{foo.price}}￥
                            </div>
                            <div class="select2" >
                                <v-select  :food="foo"></v-select>
                            </div>
                            </li>
                    </ul>
                </div>
            </div>
        </div>                  
    </transition>
    <transition name="fade3">
        <div class="particulars" v-show="show_particulars" ref="particulars">
            <ul class="particulars_content">
                <li >
                    <img :src="food.image" alt="" >
                </li>
                <li class="title_3">
                    <h2>{{food.name}}</h2>
                    <p>月售1132份&nbsp;&nbsp;&nbsp;&nbsp;好评率{{food.rating}}</p>
                    <p><strong>￥{{food.price}} </strong><span v-show="food.Oldprice">￥{{food.Oldprice}}</span></p>
                    <span class="shopping_b" v-if="!food.count" @click="addfoodcount">
                        加入购物车{{food.count}}
                    </span>
                     <div class="select5" v-else>
                        <v-select :food="food"></v-select>
                    </div>
                </li>
                <li class="int">
                    <h2>商品评价</h2>
                    <div>
                        <v-ratings-select :cod="cod" :ratings="ratings" :seltype="seltype" v-on:swich-event="flag=$event" v-on:selecttype-event="type=$event"></v-ratings-select>
                    </div>
                </li>
               <li>
                    <ul class="ratings_content">
                    <li v-for="rating in ratings" :key="rating.index" v-show="needshow(rating.rateType,rating.text)" >
                        <div class="date">{{rateTime}} </div>
                        <div class="lab"> 
                                <span class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" style="color:#00a0dc;vertical-align:middle"></span>
                                <span class="text" v-if="rating.text">{{rating.text}}{{rating.rateType}}</span>
                        </div>
                        <div class="avatar_g">
                            <h4>{{rating.username}}</h4>
                            <img :src="rating.avatar" alt="" width="18" height="18" style="border-radius:100%;margin-left:.1rem" >
                        </div>
                        <hr>
                    </li>
                </ul>
               </li>
               <div class="return" @click="show_particulars = !show_particulars">
                   <span class="icon icon-arrow_lift"></span>
               </div>
            </ul>
        </div>
    </transition>
   <!-- <transition-group name="fade4" 
   v-on:before-enter="beforeEnter" 
   v-on:enter="Enter"
   >
        <div class="glo" v-for=" (glo,index) in glos" :key="index" v-show="glo.show" ref="glo">
            <span>{{glo}}</span>
        </div> 
    </transition-group>  -->
 </div>
</template>

<script>
import vRatingsSelect from './ratings-select'
import vue from 'vue'
import BScroll from 'better-scroll'
import vSelect from './select'
export default {
    name:'goods',
    data() {
    return {
       goods:[],
       ratings:[],
       listHeight:[],
       scrollY:0,
       minprice:20,
       open_shop:false,
       food:[],
       show_particulars:false,
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
        },
        flag:false,
        glos:[
                { show:false },
                { show:false },
                { show:false },
                { show:false },
                { show:false }
            ],
        top:46,
       
    }
    },
    computed: {
        
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
     },
            currentIndex() {
                    for(let i = 0; i < this.listHeight.length; i++) {
                        let height1 = this.listHeight[i];
                        let height2 = this.listHeight[i + 1];
                        if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                            return i;
                        }
                    }
                    return 0;
                },
            selectfood(){
                let foods=[]
                this.goods.forEach(element => {
                    element.foods.forEach(food=>{
                        if(food.count){
                            foods.push(food)
                        }
                    })
                });
                return foods
            },
            totolprice(){
                let totolprice = 0
                this.selectfood.forEach(element=>{
                   totolprice+= element.price*element.count
                })
                return totolprice
            },
             totolcount(){
                let totolcount = 0
                this.selectfood.forEach(element=>{
                   totolcount+= element.count
                })
                return totolcount
            },
             totoldiff(){
                if(this.totolprice===0){
                    return `￥${this.minprice}元起送`
                }else if(this.totolprice<this.minprice){
                    let diff = this.minprice-this.totolprice
                    return `还差￥${diff}起送`
                }else{
                   return `去结账`
                }
            },
           
           
               
    },
    methods:{

        _initScroll(){
            this.wrapperscroll = new BScroll(this.$refs.wrapper,{
                click: true,  
            })
            this.wrapper2scroll = new BScroll(this.$refs.wrapper2,{
                click: true,
                probeType:3,
            })
            this.particularsscroll =new BScroll(this.$refs.particulars,{
                click:true,
            })
            this.wrapper2scroll.on('scroll',(pos)=>{
                this.scrollY = Math.abs(Math.round(pos.y));
            })
        },  
        car(){
                var element = this.$refs.title
                for(var i =0;i<element.length;i++){
                    this.listHeight.push(element[i].offsetTop)
                    //  console.log(this.listHeight)
            }                                                                                                                                                          
        },
        selectMenu(index, event) {
            if(!event._constructed) {
                return;
            }
            var element = this.$refs.title
            let el = element[index];
            this.wrapper2scroll.scrollToElement(el, 300);
        },
         empty(){
                this.selectfood.forEach(element=>{
                    element.count=0
                });
                this.open_shop=false
            },
        shopping(){
            if(this.totolcount)this. open_shop=!this.open_shop
        },
        getfood(food){
               this.show_particulars = !this.show_particulars
              return  this.food =food
            },
        addfoodcount(){
            vue.set(this.food,'count',1)
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
    components: {
        vSelect,
          vRatingsSelect
    },
    created(){
         this.$http.get('/api/ratings').then((res)=>{
       res=res.body
       if(res.errno===0){
           this.ratings = res.data
       }
   })
        this.$http.get('/api/goods').then((response)=>{
                response=response.body;
                if(response.errno===0){
                    this.goods=response.data
                  this.$nextTick(()=>{
                    this._initScroll()
                    this.car()
                    
                    })
                }
            })
    },
    mounted () {
           
                },
    }
</script>

<style  scoped>
.fade4-enter{
    position: fixed;
    
}
.fade4-enter-active{
    transition: all cubic-bezier(0.445, 0.05, 0.55, 0.95)
}
.glo{
   position: fixed;
    left: .3rem;
    bottom: .3rem;
    width: 30px;
    height: 30px;
    background: #00a0dc;
    border-radius: 100%;
    z-index: 100;
}
    .main .select1{
            position: absolute;
            right: .12rem;
            bottom: -.12rem;
            }
    .color{color: #999 !important}
    .bgcolor{background-color:#00a0dc !important}
    .current{background-color: #fff}
    .goods{
        padding-top: 0.5px;
        display: flex;
        }
    .goods .wrapper{
        width: .8rem;
        height: calc(100vh - 1.81rem - .58rem);
        background: #f3f5f7; 
        overflow: hidden;
        }
        .goods .side-main li{
            width: .8rem;
            height: .54rem;
            /* background: white; */
            
            display: table;
            }
             
            .goods .side-main li span{
                display: table-cell;
                text-align: center;
                vertical-align: middle;
                border-bottom: 0.5px dashed #d1d1d1; 
                padding: 0 .1rem;
                text-align: left;
                }
                .goods .side-main li span img{
                    vertical-align: text-top;
                    margin-right: .06rem
                }
    .goods .wrapper2{
        height: calc(100vh - 1.81rem - .58rem);
        overflow: hidden; 
        }            
    .goods .main{
        flex-grow: 1;
        }
        .wrapper2 li{
            margin-bottom: .2rem
            }
        .goods .main h3{
            width: 100%;
            height: .26rem;
            background: #f3f5f7
            }
            .goods .main h3{
                text-indent: .2rem;
                line-height: .26rem;
                color: #999
                }
            .goods .main .info_warp{
                display: flex;
                margin: .2rem 0 0 .2rem;
                position: relative;
                }
                .goods .main .info_warp .title_{
                    margin-left: .1rem
                    }
                    .goods .main .info_warp .title_ p{
                        margin-top: .1rem
                        }
                    .goods .main .info_warp .title_ .price strong{
                        font-size: .18rem;
                        color: red;
                        margin-right: .1rem
                        }
                    .goods .main .info_warp .title_ .price span{
                        text-decoration: line-through;
                        color: #999
                        }

    .footer{
        position: fixed;
        bottom: 0;
        left:0;
        width: 100%;
        height: .58rem;
        background-color: rgba(7, 17, 27, 0.95);
        line-height: .58rem;
        display: flex;
        justify-content: space-between;
        color: #fff;
        z-index: 10
        }
        .footer_left{
            width: .8rem;
            height: .8rem;
            background-color: rgba(7, 17, 27, 0.95);
            margin-left: .14rem;
            border-radius: 100px;
            position: relative;
            bottom: .2rem
            }
            .footer_left .shopping_bg{
                width: .6rem;
                height: .6rem;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 100px;
                position: absolute;
                top: .1rem;
                left: .1rem;
                z-index: 10;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center
                }
                .shopping_bg p{
                    display: block;
                    padding: 0 .06rem;
                    height: .2rem;
                    line-height: .2rem;
                    border-radius: 10px;
                    background: red;
                    position: absolute;
                    top: 0;
                    right: 0;
                    text-align: center
                }
                .icon{
                    color: #fff;
                    font-size: .32rem;
                    }
        .footer_center{
            display: flex;
            align-items: center
            }
            .footer_center p:nth-child(1){
                font-size: .2rem
                }
            .footer_center p:nth-child(2){
                width: 1px;
                height: .2rem;
                background: rgb(66, 66, 66);
                margin: 0 .1rem
                }
                .footer_right{
                    width: 1rem;
                    background-color: rgba(255, 255, 255, 0.1);
                    text-align: center;
                    }
    .footer_memu{
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9;
        padding-bottom: .58rem;
        transform: translateY(0)
        }
        .f_header{
            background: #fff;
            display: flex;
            justify-content: space-between;
            padding:  0 .2rem;
            height: .44rem;
            line-height: .44rem;
            border: 1px solid #f1f1f1
            }
            .f_contant{
                 background: #fff;
                }
            .f_contant li{
                display:flex;
                align-items: center;
                margin:  0 .2rem;
                line-height: .58rem;
                border-bottom: 1px dashed #d1d1d1
                }
                .f_contant li div:nth-child(1){
                    flex-basis: 2rem
                }
                .f_contant li div:nth-child(2){
                    padding:  0 .2rem;
                    font-size: .2rem;
                    color: red
                }
            .fade2-enter,.fade2-leave-to{
                transform: translateY(100%)
                }
        
            .fade2-enter-active,.fade2-leave-active{
                transition: all 0.2s ease
            } 
            .footer_memu_bg {
                width: 100%;
                height: 100vh;
                background: rgba(100, 100, 100,0);
            }
.particulars{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #e5e5e5;
    z-index: 40;
    }      
    .particulars ul>li{
        background: #fff;
        padding: .1rem auto;
        position: relative;
        
        }  
        .particulars ul>li img{
            max-width: 100%;
            }     
   
    .title_3{
        padding: .2rem  ;
         position: relative;
    }  
    .int{margin-top: .2rem}
    .int h2{
        padding : .2rem .2rem  0 .2rem ;
         position: relative;
    }
    .int>div{
        padding: -.2rem 0 -.2rem -.2rem;
        margin-top: -.2rem
    }
    .title_3 p{
        margin-top: .1rem;
       
        } 
        .shopping_b{
            padding: .1rem;
            background-color: #00a0dc;
            color: #fff;
            border-radius: 20px;
            position: absolute;
            top: .2rem;
            right: .2rem;
            }  
        .select5{
             position: absolute;
            top: .2rem;
            right: .2rem;
        }  
        .ratings_content{
            padding: .2rem;
            border-top: 1px solid #e5e5e5
        }
        .lab .icon{
            font-size: .12rem
        }
        .lab{
            margin: .1rem auto;
            height: .4rem;}
        .avatar_g{
            position: absolute;
            top: .1rem;
            right: 0;
            /* width: 100px; */
            display: flex;}
            .ratings_content hr{
                margin: .1rem 0;
                height: 1px;
                background: #f3f5f7;
                width: 100%;
                border: none
            }
    .fade3-enter,.fade3-leave-to{
        transform: translateX(100%)
    }
     .fade3-enter-active,.fade3-leave-active{
        transition: all .5s ease
    }
    .return{
        position: absolute;
        top: .22rem;
        left: .12rem;
        font-size: .24rem
    }

</style>
