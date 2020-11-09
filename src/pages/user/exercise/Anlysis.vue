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
          this.getData()
      },
      methods:{
          getData:function () {
            this.$http.post('/yii/student/student/radar',{
              num:1,
              uid:8,
              eid:1,
            }).then(function (res) {
              console.log(res.data)
              this.fact.NC=res.data.data[0].nc
              this.fact.NF=res.data.data[0].nf
              this.fact.NP=res.data.data[0].np
              this.fact.NM=res.data.data[0].nm
              this.fact.NJ=res.data.data[0].nj
              this.real.NC=res.data.data[1].nc
              this.real.NF=res.data.data[1].nf
              this.real.NP=res.data.data[1].np
              this.real.NM=res.data.data[1].nm
              this.real.NJ=res.data.data[1].nj
              console.log(this.fact)
              console.log(this.real)
            })
          }
      }
    }
</script>

<style scoped>

</style>
