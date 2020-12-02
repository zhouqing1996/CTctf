<template>
  <!--程序题-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css" style="font-size: 0.25rem">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>题库信息</el-breadcrumb-item>
      <el-breadcrumb-item>程序题</el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div class="display1">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 程序题列表</span>
          <div class="display2">
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="模糊查找" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" v-on:click="searchP()">搜索</button>
              <button class="btn3 el-icon-circle-plus-outline" @click="dialogFormVisibleadd = true">添加</button>
              <el-dialog title="添加程序题" :visible.sync="dialogFormVisibleadd">
                <el-form :model="addList">
                  <el-form-item label="题目标题" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.title" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="题目背景" :label-width="formLabelWidth">
                  <el-input style="width: 350px;" v-model="addList.back" auto-complete="off"></el-input>
                </el-form-item>
                  <el-form-item label="题目描述" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.descri" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="输入格式" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.inputB" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="输出格式" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.outputB" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="输入输出样例" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.case" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="说明/提示" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.other" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="标签" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.label" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="推荐相关" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.rem" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="答案" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.ans" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" style="align-content: center" class="dialog-footer">
                  <el-button type="primary" @click="addpQuestion(addList)">提交</el-button>
                  <el-button @click="Reset">重置</el-button>
                </div>
              </el-dialog>
              <button class="btn2 el-icon-folder" @click="getQuerypQuestionY">有效题目</button>
              <button class="btn2 el-icon-folder-remove" @click="getQuerypQuestionN">无效题目</button>
              <button class="btn2 el-icon-folder-checked" @click="getQuerypQuestion">所有题目</button>
              <button class="btn2 el-icon-document" @click="addP">批量添加</button>
              <button class="btn2 el-icon-document" @click="exportP">导出</button>
              <input type="file" @change="importExcel(that)" id="inputExcel"
                     accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none"/>
            </div>
            <table >
              <tr>
                <th>序号</th>
                <th>题编号 </th>
                <th>题目标题</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              <tr v-for=" (pQuestion,key) in currentPageData" :key="key">
                <td>{{ key+1 }}</td>
                <td>{{pQuestion.pqid}}</td>
                <td>{{pQuestion.pqtitle}}</td>
                <td v-if="pQuestion.pqstatus==1">有效</td>
                <td v-if="pQuestion.pqstatus==0">无效
                  <span v-if="pQuestion.pqstatus==0" @click="changefill(5,pQuestion.pqid)" class="span2">修改</span>
                </td>
                <td>
                  <span @click="viewProgram(pQuestion.pqid)" class="span2">查看</span>
                  <span v-if="pQuestion.pqstatus==1"@click="deletefill(1,pQuestion.pqid)" class="span1"><i class="el-icon-delete">删除题目</i></span>
                  <span v-if="pQuestion.pqstatus==0" @click="deletefill(2,pQuestion.pqid)" class="span1"><i class="el-icon-delete">永久删除</i></span>
                </td>
              </tr>
            </table>
          </div>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="currentPage!=1">
                <span class="page-link" v-on:click="prePage">上一页</span>
              </li>
              <li class="page-item" >
                <span class="page-link" >第{{ currentPage }}页/共{{totalPage}}页</span>
              </li>
              <li class="page-item" v-if="currentPage!=totalPage">
                <span class="page-link" v-on:click="nextPage">下一页</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "fill",
    data(){
      return{
        formLabelWidth: '120px',
        //题库列表
        pQuestionList:[],
        //搜索
        inputname:'',
        //添加
        dialogFormVisibleadd:false,
        addList:{
          title:'',
          back:'',
          descri:'',
          inputB:'',
          outputB:'',
          case:'',
          other:'',
          label:'',
          rem:'',
          ans:''
        },
        //修改
        changeList:{
          id:'',
          back:'',
          descri:'',
          inputB:'',
          outputB:'',
          case:'',
          other:'',
          label:'',
          rem:'',
          ans:'',
          status:''
        },
        item:'',
        dialogFormVisiblechangeitem:false,
        dialogFormVisiblechangeans:false,
        dialogFormVisiblechangetail:false,
        dialogFormVisiblechangerem:false,
        // 翻页相关
        currentPage: 1,
        totalPage: 1,
        pageSize: 15,
        currentPageData:[]
      }
    },
    methods:{
      exportP:function()
      {
        let that =this
        that.$http.post('/home/export/exportprogram').then(function (res) {
          console.log(res.data)
          window.open(res.data.data)
        })
      },
      viewProgram:function(id){
        let that =this
        console.log(id)
        // that.$router.push({ name:'viewexam', params: { id: id }})
        that.$router.push({
          path:'/admin/bank/viewP',
          query:{
            id:id
          }
        })
      },
      //分页
      setCurrentPageDate: function () {
        let that =this
        let begin = (that.currentPage - 1) * that.pageSize;
        let end = that.currentPage * that.pageSize;
        that.currentPageData = that.pQuestionList.slice(begin, end)
      },
      prePage() {
        let that =this
        console.log(that.currentPage)
        if (that.currentPage == 1)
          return
        that.currentPage--;
        that.setCurrentPageDate()
      },
      nextPage() {
        let that =this
        if (that.currentPage == that.totalPage) return
        that.currentPage++;
        that.setCurrentPageDate()
      },
      //获取程序题列表
      getQuerypQuestion:function(){
        let that =this
        that.$http.post('/bank/programq/queryprogram',{
          flag:1
        }).then(function (res) {
          console.log(res.data)
          that.pQuestionList = res.data.data
          that.totalPage =Math.ceil(that.pQuestionList.length/that.pageSize)
          that.totalPage=that.totalPage==0?1:that.totalPage
          that.setCurrentPageDate()
        }).catch(function (error) {
          console.log(error)
        })
      },
      //获取有效程序题列表
      getQuerypQuestionY:function(){
        let that =this
        that.$http.post('/bank/programq/queryprogram',{
          flag:2
        }).then(function (res) {
          console.log(res.data)
          that.pQuestionList = res.data.data
          that.totalPage =Math.ceil(that.pQuestionList.length/that.pageSize)
          that.totalPage=that.totalPage==0?1:that.totalPage
          that.setCurrentPageDate()
        }).catch(function (error) {
          console.log(error)
        })
      },
      //获取无效程序题列表
      getQuerypQuestionN:function(){
        let that =this
        that.$http.post('/bank/programq/queryprogram',{
          flag:4
        }).then(function (res) {
          console.log(res.data)
          that.pQuestionList = res.data.data
          that.totalPage =Math.ceil(that.pQuestionList.length/that.pageSize)
          that.totalPage=that.totalPage==0?1:that.totalPage
          that.setCurrentPageDate()
        }).catch(function (error) {
          console.log(error)
        })
      },
      //搜索
      searchP:function () {
        let that =this
        console.log(that.name)
        that.$http.post('/bank/programq/queryprogram',{
          flag:3,
          name:that.inputname
        }).then(function (res) {
          console.log(res.data)
          that.pQuestionList = res.data.data
          that.totalPage =Math.ceil(that.pQuestionList.length/that.pageSize)
          that.totalPage=that.totalPage==0?1:that.totalPage
          that.setCurrentPageDate()
        }).catch(function (error) {
          console.log(error)
        })
      },
      //添加题库
      addpQuestion:function (List) {
        let that =this
        console.log(List)
        that.$http.post('/bank/programq/addprogram',{
          qtitle:that.addList.title,
          qback:that.addList.back,
          qdescri:that.addList.descri,
          qinputB:that.addList.inputB,
          qoutputB:that.addList.outputB,
          qcase:that.addList.case,
          qother:that.addList.other,
          qlabel:that.addList.label,
          qrem:that.addList.rem,
          qans:that.addList.ans,
          qauth:that.$store.getters.getsId
        }).then(function (res) {
          console.log(res.data)
          if(res.data.message=="插入程序题成功")
          {
            that.getQuerypQuestion()
            alert("插入程序题成功")
            that.dialogFormVisibleadd=false
            that.Reset()
          }
          else
          {
            alert(res.data.message)
            that.Reset()
          }
        })
      },
      //重置
      Reset:function () {
        let that =this
        that.addList.rem=""
        that.addList.tail=""
        that.addList.ans=""
        that.addList.item=""

      },
      //修改
      //1:题干
      //2：答案
      //3：详解
      //4：知识点
      //5:状态
      changefill:function (item,id) {
        let that =this
        console.log(item)
        if(item==1) {
          that.$http.post('/bank/programq/change',{
            cid:that.changeList.id,
            flag:1,
            item:that.changeList.item,
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="该程序题题干修改成功")
            {
              that.getQuerypQuestion()
            }
            alert(res.data.message)
            that.dialogFormVisiblechangeitem=false
            that.changeList.id=""
            that.changeList.item=""
          }).catch(function (error) {
            console.log(error)
          })
        }
        else if(item==2){
          that.$http.post('/bank/programq/change',{
            cid:that.changeList.id,
            flag:2,
            ans:that.changeList.ans
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="该程序题答案修改成功")
            {
              that.getQuerypQuestion()
            }
            alert(res.data.message)
            that.dialogFormVisiblechangeans=false
            that.changeList.id=""
            that.changeList.ans=""
          }).catch(function (error) {
            console.log(error)
          })
        }
        else if(item==3){
          that.$http.post('/bank/programq/change',{
            cid:that.changeList.id,
            flag:3,
            tail:that.changeList.tail
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="该程序题详解修改成功")
            {
              that.getQuerypQuestion()
            }
            alert(res.data.message)
            that.dialogFormVisiblechangetail=false
            that.changeList.id=""
            that.changeList.tail=""
          }).catch(function (error) {
            console.log(error)
          })
        }
        else if(item==4){
          that.$http.post('/bank/programq/change',{
            cid:that.changeList.id,
            flag:4,
            rem:that.changeList.rem
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="该程序题相关知识修改成功")
            {
              that.getQuerypQuestion()
            }
            alert(res.data.message)
            that.dialogFormVisiblechangerem=false
            that.changeList.id=""
            that.changeList.tail=""
          }).catch(function (error) {
            console.log(error)
          })
        }
        else if(item==5){
          console.log(id)
          that.$http.post('/bank/programq/change',{
            cid:id,
            flag:10
          }).then(function (res) {

            console.log(res.data)
            if(res.data.message=="该程序题状态修改成功")
            {
              that.getQuerypQuestion()
            }
            alert(res.data.message)
          })
        }
        else{
          alert("输入错误")
        }
      },
      //删除
      //1:暂时删除
      //2：永久删除
      deletefill:function (item,id) {
        let that =this
        console.log(item)
        if(item==1)
        {
          that.$confirm("删除该用户程序题，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            that.$http.post('/bank/programq/delete',{
              fid:id,
              flag:1
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该程序题删除成功")
              {
                that.getQuerypQuestion()
              }
              alert(res.data.message)
            })
          }).catch(function (error) {
            console.log(error)
          });
        }
        else if(item==2)
        {
          that.$confirm("永久删除该用户程序题，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            that.$http.post('/bank/programq/delete',{
              fid:id,
              flag:2
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该程序题永久删除成功")
              {
                that.getQuerypQuestion()
              }
              alert(res.data.message)
            })
          }).catch(function (error) {
            console.log(error)
          });
        }
        else{
          alert("输入错误！")
        }
      },
      addP:function()
      {
        this.inputExcel.click()
      },
      importExcel (obj) {
        let _that = this
        let inputDOM = this.$refs.inputer   // 通过DOM取文件数据
        that.file = event.currentTarget.files[0]
        var rABS = false // 是否将文件读取为二进制字符串
        var f = this.file
        var reader = new FileReader()
        // if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = ''
          var rABS = false // 是否将文件读取为二进制字符串
          var wb // 读取完成的数据
          var outdata
          var reader = new FileReader()
          reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result)
            var length = bytes.byteLength
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i])
            }
            var XLSX = require('xlsx')
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), { // 手动转化
                type: 'base64'
              })
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              })
            }
            // outdata就是你想要的东西 excel导入的数据
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            // excel 数据再处理
            let arr = []
            outdata.map(v => {
              let obj ={}
              obj.title = v.标题
              obj.back = v.题目背景
              obj.descri = v.题目描述
              obj.inputB = v.输入格式
              obj.outputB =v.输出格式
              obj.case = v.输入输出样例
              obj.other = v.说明
              obj.auth = _that.$store.getters.getsId
              obj.label = v.标签
              obj.rem = v.推荐相关
              obj.ans = v.答案
              arr.push(obj)
            })
            _that.memberList = [...arr]
            let data = {
              data: JSON.stringify(_that.memberList)
            }
            console.log(data)
            _that.$http.post('/bank/programq/importexcel', data).then(body => {
              alert(body.data.message)
              _that.getQuerypQuestion()
            })
          }
          reader.readAsArrayBuffer(f)
        }
        if (rABS) {
          reader.readAsArrayBuffer(f)
        } else {
          reader.readAsBinaryString(f)
        }
      },
    },
    mounted(){
      this.inputExcel = document.getElementById('inputExcel')
    },
    created(){
      this.getQuerypQuestion()
    }
  }
</script>

<style scoped>
  .btn1 {
    font-size: 10px;
    padding: 7px 7px;
    border: 1px solid #E5E7E9;
    cursor: pointer;
    background: #fff;
    margin-bottom: -1px;
    color: black;
    width: 40px;
  }
  .active {
    color: #01A6FE;
  }
  .btn2 {
    width: 100px;
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
  .btn3 {
    width: 80px;/*no*/
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

  .btn3:hover {
    background-color: #5FA7FE;
  }
  /*删除*/
  .span1{
    width: 100px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: gray;
    margin-left: 5px;
    margin-top: 17px;
    margin-bottom: 5px;
  }
  .span1:hover{
    background-color: #5FA7FE;
  }
  /*修改*/
  .span2{
    width: 50px;
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: sandybrown;
    margin-left: 5px;
    margin-top: 17px;
    margin-bottom: 5px;
  }
  .span2:hover{
    background-color: #5FA7FE;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;/*no*/
  }

  th {
    font-size: 16px;/*px*/
    border: solid 1px #ccc;
    font-weight: bold;
    padding: 5px;/*no*/
    background-color: #F1F1F1;
    text-align: center;
  }

  table, td {
    border: solid 1px #ccc;
    padding: 5px;/*no*/
    text-align: center;
    font-size: 18px;
  }
  .display{
    padding-left: 5px;
    padding-top: 10px;
  }

  .display1{
    border: solid 1px #E5E7E9;
    height: 600px;
    /*text-align: center;*/
    width: 98%;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #fff;
  }
  .page {
    text-align: center;
  }
  .meeting{
    float:left;
    margin:14px 0 10px 0;
    font-weight: bold;
    background-color: #00AAFF;
    border:solid 1px #00AAFF;
    border-radius: 5px;
    width: 20%;
    padding:2px;
  }
  li{list-style-type:none;}
  .dialog1{
    width: 350px;
    height:400px;
  }
  ul {
    display: flex;
    /*flex-direction: row;*/
    /*flex-wrap: nowrap;*/
    flex-flow: row nowrap;
    justify-content: center;
  }
  ul li {
    list-style: none;
    text-align: center;
    line-height: 30px;
    padding: 10px;
    height: 30px;
    width: 100px;
    margin: 0 10px;
  }
</style>
