<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/admin/bank/choose'}"><span >选择题库</span></el-breadcrumb-item>
      <el-breadcrumb-item><span >添加选择题</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div>
      <el-row :gutter="20">
        <el-col :span="18">
          <div>
            <span class="additem">
              <el-row :gutter="20">
                <el-col :span="4">
                  <span class="item">题干：</span>
                </el-col>
                <el-col :span="18">
                  <vue-html5-editor :content="addList.item" :height="100" @change="updateDataCItem($event,1)"></vue-html5-editor>
                </el-col>
              </el-row>
            </span>
            <span class="additem">
              <el-row :gutter="20">
                <el-col :span="4">
                  <span class="item">选项一：</span>
                </el-col>
                <el-col :span="14">
                  <vue-html5-editor :content="addList.op1" :height="100"  @change="updateDataCItem($event,2)"></vue-html5-editor>
                </el-col>
                <el-col :span="4">
                  <span class="itemBtn">
                    <el-button v-on:click="SetCAns(1)" type="success" :id="sets1()">设置选项为答案</el-button><br>
                  </span>
                </el-col>
              </el-row>
            </span>
            <span class="additem">
              <el-row :gutter="20">
                <el-col :span="4">
                  <span class="item">选项二：</span>
                </el-col>
                <el-col :span="14">
                  <vue-html5-editor :content="addList.op2" :height="100"  @change="updateDataCItem($event,3)">
                </vue-html5-editor>
                </el-col>
                <el-col :span="4">
                  <span class="itemBtn">
                    <el-button v-on:click="SetCAns(2)" type="success" :id="sets2()">设置选项为答案</el-button><br>
                  </span>
                </el-col>
              </el-row>
            </span>
            <span class="additem">
              <el-row :gutter="20">
                <el-col :span="4">
                  <span class="item">选项三：</span>
                </el-col>
                <el-col :span="14">
                  <vue-html5-editor :content="addList.op3" :height="100"  @change="updateDataCItem($event,4)">
                </vue-html5-editor>
                </el-col>
                <el-col :span="4">
                  <span class="itemBtn">
                    <el-button v-on:click="SetCAns(3)" type="success" :id="sets3()">设置选项为答案</el-button><br>
                  </span>
                </el-col>
              </el-row>
            </span>
            <span class="additem">
              <el-row :gutter="20">
                <el-col :span="4">
                  <span class="item">选项四：</span>
                </el-col>
                <el-col :span="14">
                  <vue-html5-editor :content="addList.op4" :height="100"  @change="updateDataCItem($event,5)">
                </vue-html5-editor>
                </el-col>
                <el-col :span="4">
                  <span class="itemBtn">
                    <el-button v-on:click="SetCAns(4)" type="success" :id="sets4()" v-if="addList.ans==addList.op4">取消该答案</el-button><br>
                    <el-button v-on:click="SetCAns(4)" type="success" :id="sets4()" v-if="addList.ans!=addList.op4">设置选项为答案</el-button><br>
              </span>
                </el-col>
              </el-row>
            </span>
            <span class="additem">
              <el-row :gutter="20">
                <el-col :span="4">
                  <span class="item">详解：</span>
                </el-col>
                <el-col :span="18">
                 <vue-html5-editor :content="addList.tail" :height="100" @change="updateDataCItem($event,6)">
                </vue-html5-editor>
                </el-col>
              </el-row>
            </span>
            <span class="additem">
              <el-row :gutter="20">
                <el-col :span="4">
                  <span class="item">知识点：</span>
                </el-col>
                <el-col :span="18">
                  <vue-html5-editor :content="addList.rem" :height="100" @change="updateDataCItem($event,7)">
                </vue-html5-editor>
                </el-col>
              </el-row>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <span>
            <el-button v-on:click="AddCList" type="success" >更新该题目</el-button>
            <br>
            <br>
            <el-button v-on:click="Reset" type="success" >重置题目</el-button><br>
          </span>
          <div class="yulan">
            <span class="additem">
              <span class="item">题干：</span><br>
              <h3 v-html="addList.item">{{addList.item}}</h3>
            </span>
            <span class="additem">
              <el-radio-group >
                <el-radio :label="3" ><span v-html="addList.op1">{{addList.op1}}</span></el-radio><br>
                <el-radio :label="6" ><span v-html="addList.op2">{{addList.op2}}</span></el-radio><br>
                <el-radio :label="9" ><span v-html="addList.op3">{{addList.op3}}</span></el-radio><br>
                <el-radio :label="10"><span v-html="addList.op4">{{addList.op4}}</span></el-radio><br>
              </el-radio-group><br>
            </span>
            <span class="additem">
              <span class="item">答案：</span>
              <br>
              <span v-html="addList.ans">{{addList.ans}}</span><br>
            </span>
            <span class="additem">
              <span class="item">详解：</span>
              <br>
              <span v-html="addList.tail">{{addList.tail}}</span><br>
            </span>
            <span class="additem">
              <span class="item">知识点：</span>
              <br>
              <span v-html="addList.rem">{{addList.rem}}</span><br>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "changeChoose",
    data()
    {
      return {
        addList:{
          item:'',
          op1:'',
          op2:'',
          op3:'',
          op4:'',
          ans:'',
          tail:'',
          rem:'',
          id:''
        },
        formLabelWidth: '120px',
      }
    },
    created(){
      this.addList.id = this.$route.query.id
      this.getInfo()
    },
    methods:{
      getInfo:function()
      {
        let that = this
        that.$http.post('/bank/chooseq/info',{
          id:that.addList.id
        }).then(function (res) {
          console.log(res.data)
          let info = res.data.data
          that.addList.rem=info['cqrem']
          that.addList.tail=info['cqtail']
          that.addList.ans=info['cqans']
          that.addList.op1=info['cqcho'].split('---')[0]
          that.addList.op2=info['cqcho'].split('---')[1]
          that.addList.op3=info['cqcho'].split('---')[2]
          that.addList.op4=info['cqcho'].split('---')[3]
          that.addList.item=info['cqitem']
        })
      },
      //返回
      back:function()
      {
        this.$router.push({
          path:'/admin/bank/choose'
        })
      },
      updateDataCItem:function ($event,flag) {
        let that =this
        console.log($event)
        let c1 = $event.replace(/<img width="200px" height="200px"/g, "<img");
        let c2 = c1.replace(/<img/g, '<img width="200px" height="200px"');
        switch (flag) {
          case 1:
            that.addList.item = c2
            console.log(that.addList.item)
            break
          case 2:
            that.addList.op1 = c2
            console.log(that.addList.op1)
            break
          case 3:
            that.addList.op2 = c2
            console.log(that.addList.op2)
            break
          case 4:
            that.addList.op3 = c2
            console.log(that.addList.op3)
            break
          case 5:
            that.addList.op4 = c2
            console.log(that.addList.op4)
            break
          case 6:
            that.addList.tail = c2
            console.log(that.addList.tail)
            break
          case 7:
            that.addList.rem = c2
            console.log(that.addList.rem)
            break
          default:
            break
        }
        console.log(that.addList)
      },
      //设置选择题的答案
      sets1:function() {
        return "sets1()";
      },
      sets2:function() {
        return "sets2()";
      },
      sets3:function() {
        return "sets3()";
      },
      sets4:function() {
        return "sets4()";
      },

      SetCAns:function(flag) {
        let that =this
        switch (flag) {
          case 1:
            if(that.addList.ans==that.addList.op1)
            {
              that.addList.ans = ''
              document.getElementById("sets1()").innerHTML="设置选项为答案"
            }
            else {
              that.addList.ans=that.addList.op1
              document.getElementById("sets1()").innerHTML="取消该答案"
              document.getElementById("sets2()").innerHTML="设置选项为答案"
              document.getElementById("sets3()").innerHTML="设置选项为答案"
              document.getElementById("sets4()").innerHTML="设置选项为答案"
            }
            break
          case 2:
            if(that.addList.ans==that.addList.op2)
            {
              that.addList.ans = ''
              document.getElementById("sets2()").innerHTML="设置选项为答案"
            }
            else {
              that.addList.ans=that.addList.op1
              document.getElementById("sets2()").innerHTML="取消该答案"
              document.getElementById("sets1()").innerHTML="设置选项为答案"
              document.getElementById("sets3()").innerHTML="设置选项为答案"
              document.getElementById("sets4()").innerHTML="设置选项为答案"
            }
            break
          case 3:
            if(that.addList.ans==that.addList.op3)
            {
              that.addList.ans = ''
              document.getElementById("sets3()").innerHTML="设置选项为答案"
            }
            else {
              that.addList.ans=that.addList.op3
              document.getElementById("sets3()").innerHTML="取消该答案"
              document.getElementById("sets2()").innerHTML="设置选项为答案"
              document.getElementById("sets1()").innerHTML="设置选项为答案"
              document.getElementById("sets4()").innerHTML="设置选项为答案"
            }
            break
          case 4:
            if(that.addList.ans==that.addList.op4)
            {
              that.addList.ans = ''
              document.getElementById("sets4()").innerHTML="设置选项为答案"
            }
            else {
              that.addList.ans=that.addList.op4
              document.getElementById("sets4()").innerHTML="取消该答案"
              document.getElementById("sets2()").innerHTML="设置选项为答案"
              document.getElementById("sets3()").innerHTML="设置选项为答案"
              document.getElementById("sets1()").innerHTML="设置选项为答案"
            }
            break
            break
          default:
            break
        }
        console.log(that.addList.ans)
      },
      //添加题库
      AddCList:function () {
        let that =this
        console.log(that.addList)
        if(that.addList.item == '')
        {
          that.$alert('题干为空', '警告', {
            confirmButtonText: '确定',})
        }
        else if(that.addList.ans==''){
          that.$alert('答案为空', '警告', {
            confirmButtonText: '确定',})
        }
        else if(that.addList.op1==''||that.addList.op2==''||that.addList.op3==''||that.addList.op4==''){
          that.$alert('必须为四个选项', '警告', {
            confirmButtonText: '确定',})
        }
        else{
          that.$http.post('/bank/chooseq/changechoose',{
            id:that.addList.id,
            qitem:that.addList.item,
            op1:that.addList.op1,
            op2:that.addList.op2,
            op3:that.addList.op3,
            op4:that.addList.op4,
            ans:that.addList.ans,
            tail:that.addList.tail,
            rem:that.addList.rem,
            auth:that.$store.getters.getsId
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="更新单选题")
            {
              that.$alert("更新单选题成功",'成功',{
                confirmButtonText:'确定',
                type:'success'
              })
              that.Reset()
              that.back()
            }
            else
            {
              alert(res.data.message)
              that.Reset()
            }
          })
        }
      },
      //重置
      Reset:function () {
        let that =this
        that.addList.rem=""
        that.addList.tail=""
        that.addList.ans=""
        that.addList.op1=""
        that.addList.op2=""
        that.addList.op3=""
        that.addList.op4=""
        that.addList.item=""
        that.addList.id=""
      },
    }
  }
</script>

<style scoped>
  @import "../../../common/css/additem.css";
</style>
