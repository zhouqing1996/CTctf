<template>
    <!--饼图-->
  <div>
    <div id="PieChart" :style="{height: '400px',width:'80%'}"></div>
  </div>
</template>

<script>
    import initHtml5Editor from "../common/initHtml5Editor";

    export default {
        name: "PieChart",
      data(){
          return{
            title:'扇形图',
            tdata:[],
            name:'占比',
            sdata:[]
          }
      },
      props:[],
      mounted(){

      },
      watch:{

      },
      created(){

      },
      methods:{
          drawPie:function () {
            let that =this
            let myChart = that.$echarts.init(
              document.getElementById("PieChart")
            );
            myChart.setOption({
              title:{
                text:that.title,
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
                  name:that.name,
                  type:'pie',
                  radius:'55%',
                  center:['50%','60%'],
                  data:that.tdata,
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
