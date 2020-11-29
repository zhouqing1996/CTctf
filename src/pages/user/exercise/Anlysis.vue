<template>
    <!--练习的数据分析-->
  <div>
    <RadarChart :fact="fact" :real="real"></RadarChart>
  </div>
</template>

<script>
    import RadarChart from "../../../components/RadarChart";
    export default {
        name: "Anlysis",
      components: {RadarChart},
      data(){
          return{
            //试题中的数据
            fact:{
              NC:0,
              NF:0,
              NJ:0,
              NP:0,
              NM:0
            },
            //用户作答的数据
            real:{
              NC:0,
              NF:0,
              NJ:0,
              NP:0,
              NM:0
            }
          }
      },
      created(){
        let that = this
          that.getData()
      },
      methods:{
          getData:function () {
            let that = this
            that.$http.post('/student/student/radar',{
              num:1,
              uid:8,
              eid:1,
            }).then(function (res) {
              console.log(res.data)
              that.fact.NC=res.data.data[0].nc
              that.fact.NF=res.data.data[0].nf
              that.fact.NP=res.data.data[0].np
              that.fact.NM=res.data.data[0].nm
              that.fact.NJ=res.data.data[0].nj
              that.real.NC=res.data.data[1].nc
              that.real.NF=res.data.data[1].nf
              that.real.NP=res.data.data[1].np
              that.real.NM=res.data.data[1].nm
              that.real.NJ=res.data.data[1].nj
              console.log(that.fact)
              console.log(that.real)
            })
          }
      }
    }
</script>

<style scoped>

</style>
