<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/admin/bank/judge'}"><span >判断题库</span></el-breadcrumb-item>
      <el-breadcrumb-item><span >修改判断题</span></el-breadcrumb-item>
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
                  <vue-html5-editor :content="addList.item" :height="100" @change="updateDataItem($event,1)"></vue-html5-editor>
                </el-col>
              </el-row>
            </span>
            <span class="additem">
              <el-row :gutter="20">
                <el-col :span="4">
                  <span class="item">答案：</span>
                </el-col>
                <el-col :span="18">
                    <select style="font-size:20px;width:150px;" v-model="addList.ans"  >
                      <option value="1">正确</option>
                      <option value="0">错误</option>
                    </select>
                </el-col>
              </el-row>
            </span>
            <span class="additem">
              <el-row :gutter="20">
                <el-col :span="4">
                  <span class="item">详解：</span>
                </el-col>
                <el-col :span="18">
                 <vue-html5-editor :content="addList.tail" :height="100" @change="updateDataItem($event,3)">
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
                  <vue-html5-editor :content="addList.rem" :height="100" @change="updateDataItem($event,4)">
                </vue-html5-editor>
                </el-col>
              </el-row>
            </span>
          </div>
        </el-col>
        <el-col :span="6">
          <span>
            <el-button v-on:click="addJudge" type="success" >更新该题目</el-button>
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

              <span class="item">答案：</span>
              <br>
              <span v-if="addList.ans==1">正确</span><br>
              <span v-if="addList.ans==0">错误</span><br>
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
    name: "addJudge",
    data()
    {
      return {
        addList:{
          item:'',
          ans:'',
          tail:'',
          rem:'',
          id:''
        },
      }
    },
    created()
    {
      this.addList.id = this.$route.query.id
      this.getInfo()
    },
    methods:{
      getInfo:function()
      {
        let that = this
        that.$http.post('/bank/judge/info',{
          id:that.addList.id
        }).then(function (res) {
          console.log(res.data)
          let info = res.data.data
          that.addList.rem=info['jqrem']
          that.addList.tail=info['jqtail']
          that.addList.ans=info['jqans']
          that.addList.item=info['jqitem']
        })
      },
      //返回
      back:function()
      {
        this.$router.push({
          path:'/admin/bank/judge'
        })
      },
      //填空题
      updateDataItem ($event="",flag) {
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
            that.addList.ans = c2
            console.log(that.addList.ans)
            break
          case 3:
            that.addList.tail = c2
            console.log(that.addList.tail)
            break
          case 4:
            that.addList.rem = c2
            console.log(that.addList.rem)
            break
          default:
            break
        }
      },
      //添加题库
      addJudge:function () {
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
        else if(that.addList.rem==''){
          that.$alert('相关知识为空', '警告', {
            confirmButtonText: '确定',})
        }
        else if(that.addList.tail==''){
          that.$alert('详解为空', '警告', {
            confirmButtonText: '确定',})
        }
        else{
          that.$http.post('/bank/judge/changejudge',{
            qitem:that.addList.item,
            ans:that.addList.ans,
            tail:that.addList.tail,
            rem:that.addList.rem,
            auth:that.$store.getters.getsId,
            id:that.addList.id
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="更新判断题")
            {
              that.$alert("更新判断题",'成功',{
                confirmButtonText:'确定',
                type:'success'
              })
              that.back()
              that.Reset()
            }
            else
            {
              that.$alert(res.data.message,'失败',{
                confirmButtonText:'确定',
                type:'fail'
              })
              // that.Reset()
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
        that.addList.item=""
        that.addList.id=''
      },
    }
  }
</script>

<style scoped>
  @import "../../../common/css/additem.css";
</style>
