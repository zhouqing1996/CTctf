<template>
  <!--查看试卷-->
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{ path: '/teacher/create' }">测评题库</el-breadcrumb-item>
        <el-breadcrumb-item>{{examList.exname}}</el-breadcrumb-item>
        <el-breadcrumb-item>试卷查看</el-breadcrumb-item>
      </el-breadcrumb>
      <div><hr/></div>
    </div>
    <div id="waimian">
      <div>
        <h1>{{examList.id}}:<strong>{{examList.exname}}</strong></h1>
        <p><i class="el-icon-s-custom"></i>试卷创建人：{{examList.exUser}}  ||<i class="el-icon-date"></i>创建时间：{{examList.exCreateTime}}</p>
        <hr/>
        <h2>一、选择题</h2>
        <div>
      <span v-for="(c,key1) in chooseqList":key="key1">
      <li class="item">({{key1+1}})<span v-html="c.cqitem">{{c.cqitem}}</span> <br>
        <input type="radio"  value=""><span v-html="c.cqcho.split('---')[0]">{{c.cqcho.split('---')[0]}}</span> <br>
        <input type="radio"  value=""><span v-html="c.cqcho.split('---')[1]">{{c.cqcho.split('---')[1]}}</span><br>
        <input type="radio"  value=""><span v-html="c.cqcho.split('---')[2]">{{c.cqcho.split('---')[2]}}</span><br>
        <input type="radio"  value=""><span v-html="c.cqcho.split('---')[3]">{{c.cqcho.split('---')[3]}}</span><br>
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
      <div>
        <button class="btn2" @click="back">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Viewexam",
    data(){
      return{
        examList:{
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
        that.$http.post('/exam/exam/view',{
          id:id
        }).then(function (res) {
          console.log(res.data)
          that.examList.exname=res.data.data[0]
          that.examList.exUser=res.data.data[1].data.username
          that.examList.exCreateTime=res.data.data[2]
          that.chooseqList=res.data.data[3]
          that.fillqList=res.data.data[4]
          that.programqList=res.data.data[5]
          that.judgeList =res.data.data[6]
          // let m=res.data.data[7]
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
      that.examList.id =that.$route.query.id
      console.log(that.examList.id)
      that.getView(that.examList.id)
    },
  }
</script>

<style scoped>
  #waimian {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 5px;
    text-align: left;
    padding: 30px;
  }
  .item{
    /*background-color: sandybrown;*/
    margin-left: 20px;
    margin-top: 10px;
    font-family: "Times New Roman";
    font-size: 16px;
  }
  .ans{
    /*background-color: gray;*/
    font-size: 14px;
    font-family: "Times New Roman";
  }
  .tail{
    font-family: "Times New Roman";
    font-size: 12px;
  }
  .rem{
    font-family: "Times New Roman";
    font-size: 10px;
  }
  .btn2 {
    width: 100px;/*px*/
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #7F96FE;
    float: left;
    margin-left: 5px;
    margin-top: 17px;
    margin-bottom: 5px;
  }

  .btn2:hover {
    background-color: #5FA7FE;
  }
  li{list-style-type:none;}
</style>
