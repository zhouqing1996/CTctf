<template>
    <!--饼图-->
  <div>
    <div id="PieChart" :style="{height: '400px',width:'400px'}"></div>
  </div>
</template>

<script>
    import index from "../store";

    export default {
        name: "PieChart",
      data(){
          return{
            title:'',
            subtitle:'',
            name:[],
            data:[],
            sname:'占比'
          }
      },
      props:["sdata","t","subt"],
      mounted(){
          this.init()
      },
      watch:{
        sdata(oldVal, newVal) {
          this.drawPie();
        },
        t(oldVal, newVal) {
          this.drawPie();
        },
        subt(oldVal, newVal) {
          this.drawPie();
        },
      },
      created(){

      },
      methods:{
          init(){
            this.drawPie()
          },
        toData(data,t,st){
            this.title = t
          this.subtitle =st
            if(data!=null)
            {
              this.data = []
              data.forEach((value,index)=>{
                this.name.push("次数："+value.num)
                this.data.push({
                  value:value.value,
                  name:value.num+"次做答"
                })
              })
            }
        },
          drawPie:function () {
            let that =this
            that.toData(that.sdata,that.t,that.subt)
            console.log(that.data)
            let myChart = that.$echarts.init(
              document.getElementById("PieChart")
            );
            myChart.setOption({
              title:{
                text:that.title,
                subtext:that.subtitle,
                left:'center'
              },
              tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
              },
              legend:{
                orient:'vertical',
                left:'left',
                data:that.sdata
              },
              series:[
                {
                  name:that.sname,
                  type:'pie',
                  radius:'55%',
                  center:['50%','60%'],
                  data:that.data,
                  emphasis: {
                    itemStyle: {
                      shadowBlur:10,
                      shadowOffsetX:0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            })
          }
      }
    }
</script>

<style scoped>

</style>
