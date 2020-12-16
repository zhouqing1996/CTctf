<template>
  <!--查看练习-->
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{ path: '/teacher/pCreate' }">练习题库</el-breadcrumb-item>
        <el-breadcrumb-item>{{pList.exname}}</el-breadcrumb-item>
        <el-breadcrumb-item>练习试题查看</el-breadcrumb-item>
      </el-breadcrumb>
      <div><hr/></div>
    </div>
    <div id="waimian">
      <div>
        <h1>{{pList.id}}:<strong>{{pList.exname}}</strong></h1>
        <p><i class="el-icon-s-custom"></i>试卷创建人：{{pList.exUser}}  ||<i class="el-icon-date"></i>创建时间：{{pList.exCreateTime}}</p>
        <hr/>
        <h2>一、选择题</h2>
        <div>
      <span v-for="(c,key1) in chooseqList":key="key1">
        <li class="item">({{key1+1}})<span v-html="c.cqitem" >{{c.cqitem}}</span><br>
        <input type="radio"  value=""><span v-html="c.cqcho.split('---')[0]">{{c.cqcho.split('---')[0]}}</span> <br>
        <input type="radio"  value=""><span v-html="c.cqcho.split('---')[1]">{{c.cqcho.split('---')[1]}}</span> <br>
        <input type="radio"  value=""><span v-html="c.cqcho.split('---')[2]">{{c.cqcho.split('---')[2]}}</span> <br>
        <input type="radio"  value=""><span v-html="c.cqcho.split('---')[3]">{{c.cqcho.split('---')[3]}}</span> <br>
      </li>
      <p class="ans">答案：<span v-html="c.cqans">{{c.cqans}}</span> </p>
      <p class="tail">详解：<span v-html="c.cqtail">{{c.cqtail}}</span> </p>
      <p class="rem">相关知识点：<span v-html="c.cqrem">{{c.cqrem}}</span> </p>
    </span>
        </div>
        <hr/>
        <h2>二、填空题</h2>
        <div>
      <span v-for="(f,key2) in fillqList":key="key2">
      <li class="item">({{key2+1}})<span v-html="f.fqitem">{{f.fqitem}}</span> <br>
        <input type="text" value=""><br>
      </li>

      <p class="ans">答案：<span v-html="f.fqans">{{f.fqans}}</span> </p>
      <p class="tail">详解：<span v-html="f.fqtail">{{f.fqtail}}</span> </p>
      <p class="rem">相关知识点：<span v-html="f.fqrem">{{f.fqrem}}</span> </p>
    </span>
        </div>
        <hr/>
        <h2>三、判断题</h2>
        <div>
      <span v-for="(j,keyj) in judgeList":key="keyj">
         <li class="item">({{keyj+1}})<span v-html="j.jqitem">{{j.jqitem}}</span> <br>
        <input type="radio" :name="'judge'+j.jqid" @change="jr(j.jqid,1)">正确
        <input type="radio" :name="'judge'+j.jqid" @change="jr(j.jqid,0)">错误
      </li>
      <p class="ans">答案：<span v-html="j.jqans">{{j.jqans}}</span> </p>
      <p class="tail">详解：<span v-html="j.jqtail">{{j.jqtail}}</span> </p>
      <p class="rem">相关知识点：<span v-html="j.jqrem">{{j.jqrem}}</span> </p>
    </span>
        </div>
        <hr/>
        <h2>四、多选题</h2>
        <div>
          <div v-for="(m,index) in choosemList">
            <h3>({{index+1}})<span v-html="m.mitem">{{m.mitem}}</span> </h3>
            <ul>
              <li v-for="(x,i) in m.mcho" >
                <input type="checkbox" :name="'choosem'+m.mid+i"
                       @change="mr(m.mid,m.mcho[i])"/><span v-html="x">{{x}}</span>
              </li>
            </ul>
            <p class="ans">答案：<span v-html="m.mans">{{m.mans}}</span> </p>
            <p class="tail">详解：<span v-html="m.mtail">{{m.mtail}}</span> </p>
            <p class="rem">相关知识点：<span v-html="m.mrem">{{m.mrem}}</span> </p>
          </div>
        </div>
        <hr/>
        <h2>五、程序题</h2>
        <div>
      <span v-for="(p,key3) in programqList":key="key3">
        <hr/>
        <h3>({{key3+1}})<span v-html="p.pqitem">{{p.pqitem}}</span> </h3>
        <p class="ans">答案：<span v-html="p.pqans">{{p.pqans}}</span> </p>
        <p class="tail">详解：<span v-html="p.pqtail">{{p.pqtail}}</span> </p>
        <p class="rem">相关知识点：<span v-html="p.pqrem">{{p.pqrem}}</span> </p>
      </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vPractice",
    data(){
      return{
        pList:{
          id:'',
          exname:'',
          exUser:'',
          exCreateTime:'',
        },
        chooseqList:[],
        fillqList:[],
        judgeList:[],
        choosemList:[],
        programqList:[],
      }
    },
    methods:{
      back:function(){
        this.$router.push({
          path:'/teacher/create',
        })
      },
      getView(id){
        let that =this
        that.$http.post('/teacher/practice/viewpractice',{
          id:id
        }).then(function (res) {
          console.log(res.data)
          that.pList.exname=res.data.data[0]
          that.pList.exUser=res.data.data[1]
          that.pList.exCreateTime=res.data.data[2]
          that.chooseqList=res.data.data[3]
          that.fillqList=res.data.data[4]
          that.programqList=res.data.data[5]
          that.judgeList =res.data.data[6]
          let mList = res.data.data[7]
          for(let i=0;i<mList.length;i++)
          {
            that.choosemList.push({
              mid:mList[i].mqid,
              mitem:mList[i].mqitem,
              mcho:[mList[i].mqcho.split('---')[0],mList[i].mqcho.split('---')[1],mList[i].mqcho.split('---')[2],mList[i].mqcho.split('---')[3]],
              mrem:mList[i].mqrem,
              mans:mList[i].mqans,
              mtail:mList[i].mqtail
            })
          }
        })
      }
    },
    created(){
      let that =this
      that.pList.id =that.$route.query.id
      console.log(that.pList.id)
      that.getView(that.pList.id)
    },
  }
</script>
<style scoped>
  @import "../../../common/css/vpractice.css";
</style>
