<template>

            <div >
                <span v-for="star in stars" :key="star.index">
                    <img :src="star" alt="" width="24" height="24">
                </span> 
              </div>

</template>

<script>

import star48_off from '../components/star/star48_off@3x.png'
import star48_on from './star/star48_on@3x.png'
import star48_half from './star/star48_half@3x.png'

export default {
    name:'star',
    props:{
        seller:{
            type:Object
        }
    }
,
 data() {
  return { 
  }
 },
 computed:{
     stars(){
         var  stars= [star48_off,star48_off,star48_off,star48_off,star48_off]
         let score =this.seller.score
         let score_length = Math.floor(score*2)/2
            if(score_length%2===0){
            for(var i=0;i<score_length-1;i++){
                tstars.splice(i,1,star48_on)
            }
            }else{
            for(var i=0;i<score_length-1;i++){
                stars.splice(i,1,star48_on)
                stars.splice(i+1,1,star48_half)
            }
            }
            return stars
        }

 },
 components: {

 },
 methods:{
  
 },
 created(){

    //   this.$nextTick(()=>{
    //        this.getstar() 
           
    //    })
 },
 mounted(){
         
 },

}
</script>

<style scoped >
        .star span{
            display: inline-block;
            margin:  .1rem
          }
        .star2 span{
            display: inline-block;
            margin: .02rem
        }
</style>
