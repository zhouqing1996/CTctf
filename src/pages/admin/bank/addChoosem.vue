<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/admin/bank/choosem'}"><span >多选题库</span></el-breadcrumb-item>
      <el-breadcrumb-item><span >添加多选题</span></el-breadcrumb-item>
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
                    <el-button v-on:click="SetCMAns(1)" type="success" :id="setsm1()">设置选项为答案</el-button><br>
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
                    <el-button v-on:click="SetCMAns(2)" type="success" :id="setsm2()">设置选项为答案</el-button><br>
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
                    <el-button v-on:click="SetCMAns(3)" type="success" :id="setsm3()">设置选项为答案</el-button><br>
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
                <el-button v-on:click="SetCMAns(4)" type="success" :id="setsm4()">设置选项为答案</el-button><br>
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
            <el-button v-on:click="addChooseM" type="success" >添加该题目</el-button>
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
    name: "addChoosem",
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
          rem:''
        },
      }
    },
    methods:{
      //返回
      back:function()
      {
        this.$router.push({
          path:'/admin/bank/choosem'
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
      //设置多选题答案
      setsm1:function()
      {
        return "setsm1()";
      },
      setsm2:function()
      {
        return "setsm2()";
      },
      setsm3:function()
      {
        return "setsm3()";
      },
      setsm4:function()
      {
        return "setsm4()";
      },
      SetCMAns:function(flag) {
        let that =this
        console.log(that.addList.ans)
        switch (flag) {
          case 1:
            let ans1 = that.addList.ans.split('---')
            console.log(ans1.length)
            let flag1 = false
            let index1 = ans1.length
            for(let i=0;i<ans1.length;i++)
            {
              if(ans1[i]==that.addList.op1)
              {
                flag1 =true
                index1 = i
                break
              }
            }
            if(flag1)
            {
              that.addList.ans = ''
              if(ans1.length==1)
              {
                that.addList.ans = ''
              }
              else
              {
                for(let i=0;i<ans1.length;i++)
                {
                  if(i==index1)
                  {
                    continue
                  }
                  else if(that.addList.ans=='')
                  {
                    that.addList.ans = ans1[i]
                  }
                  else
                  {
                    that.addList.ans = that.addList.ans+'---'+ans1[i]
                  }
                }
              }
              document.getElementById("setsm1()").innerHTML = "设置选项为答案"
            }
            else
            {
              if(that.addList.ans=='')
              {
                that.addList.ans = that.addList.op1
              }
              else {
                that.addList.ans = that.addList.ans+'---'+that.addList.op1
              }
              document.getElementById("setsm1()").innerHTML = "取消该答案"
            }
            break
          case 2:
            let ans2 = that.addList.ans.split('---')
            let flag2 = false
            let index2 = ans2.length
            for(let i=0;i<ans2.length;i++)
            {
              if(ans2[i]==that.addList.op2)
              {
                flag2 =true
                index2 = i
                break
              }
            }
            if(flag2)
            {
              that.addList.ans = ''
              if(ans2.length==1)
              {
                that.addList.ans = ''
              }
              else
              {
                for(let i=0;i<ans2.length;i++)
                {
                  if(i==index2)
                  {
                    continue
                  }
                  else if(that.addList.ans=='')
                  {
                    that.addList.ans = ans2[i]
                  }
                  else
                  {
                    that.addList.ans = that.addList.ans+'---'+ans2[i]
                  }
                }
              }
              document.getElementById("setsm2()").innerHTML = "设置选项为答案"
            }
            else
            {
              if(that.addList.ans=='')
              {
                that.addList.ans = that.addList.op2
              }
              else {
                that.addList.ans = that.addList.ans+'---'+that.addList.op2
              }
              document.getElementById("setsm2()").innerHTML = "取消该答案"
            }
            break
          case 3:
            let ans3 = that.addList.ans.split('---')
            let flag3 = false
            let index3 = ans3.length
            for(let i=0;i<ans3.length;i++)
            {
              if(ans3[i]==that.addList.op3)
              {
                flag3 =true
                index3 = i
                break
              }
            }
            if(flag3)
            {
              that.addList.ans = ''
              if(ans3.length==1)
              {
                that.addList.ans = ''
              }
              else
              {
                for(let i=0;i<ans3.length;i++)
                {
                  if(i==index3)
                  {
                    continue
                  }
                  else if(that.addList.ans=='')
                  {
                    that.addList.ans = ans3[i]
                  }
                  else
                  {
                    that.addList.ans = that.addList.ans+'---'+ans3[i]
                  }
                }
              }
              document.getElementById("setsm3()").innerHTML = "设置选项为答案"
            }
            else
            {
              if(that.addList.ans=='')
              {
                that.addList.ans = that.addList.op3
              }
              else {
                that.addList.ans = that.addList.ans+'---'+that.addList.op3
              }
              document.getElementById("setsm3()").innerHTML = "取消该答案"
            }
            break
          case 4:
            let ans4 = that.addList.ans.split('---')
            let flag4 = false
            let index4 = ans4.length
            for(let i=0;i<ans4.length;i++)
            {
              if(ans4[i]==that.addList.op4)
              {
                flag4 =true
                index4 = i
                break
              }
            }
            if(flag4)
            {
              that.addList.ans = ''
              if(ans4.length==1)
              {
                that.addList.ans = ''
              }
              else
              {
                for(let i=0;i<ans4.length;i++)
                {
                  if(i==index4)
                  {
                    continue
                  }
                  else if(that.addList.ans=='')
                  {
                    that.addList.ans = ans4[i]
                  }
                  else
                  {
                    that.addList.ans = that.addList.ans+'---'+ans4[i]
                  }
                }
              }
              document.getElementById("setsm4()").innerHTML = "设置选项为答案"
            }
            else
            {
              if(that.addList.ans=='')
              {
                that.addList.ans = that.addList.op4
              }
              else {
                that.addList.ans = that.addList.ans+'---'+that.addList.op4
              }
              document.getElementById("setsm4()").innerHTML = "取消该答案"
            }
            break
          default:
            break
        }
        console.log(that.addList.ans)
      },
      //添加题库
      addChooseM:function () {
        let that =this
        console.log(that.addList)
        if(that.addList.item == '')
        {
          that.$alert('题干为空', '警告', {
            confirmButtonText: '确定',type:'warning'})
        }
        else if(that.addList.ans==''){
          that.$alert('答案为空', '警告', {
            confirmButtonText: '确定',type:'warning'})
        }
        else if(that.addList.op1==''){
          that.$alert('选项一为空', '警告', {
            confirmButtonText: '确定',type:'warning'})
        }
        else if(that.addList.op2==''){
          that.$alert('选项二为空', '警告', {
            confirmButtonText: '确定',type:'warning'})
        }
        else if(that.addList.op3==''){
          that.$alert('选项三为空', '警告', {
            confirmButtonText: '确定',type:'warning'})
        }
        else if(that.addList.op4==''){
          that.$alert('选项四为空', '警告', {
            confirmButtonText: '确定',type:'warning'})
        }
        else if(that.addList.rem==''){
          that.$alert('相关知识为空', '警告', {
            confirmButtonText: '确定',type:'warning'})
        }
        else if(that.addList.tail==''){
          that.$alert('详细为空', '警告', {
            confirmButtonText: '确定',
          type:'warning'})
        }
        else{
          that.$http.post('/bank/choosem/addchoose',{
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
            if(res.data.message=="插入多选题成功")
            {
              that.$alert('插入多选题成功', '成功', {
                confirmButtonText: '确定',type:'success'})
              // alert("插入多选题成功")
              that.Reset()
              that.back()
            }
            else
            {
              that.$alert(res.data.message, '失败', {
                confirmButtonText: '确定',type:'fail'})
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
      },
    }
  }
</script>

<style scoped>
  @import "../../../common/css/additem.css";
</style>

