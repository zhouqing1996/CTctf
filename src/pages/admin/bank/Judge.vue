<template>
  <!--判断题-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css" style="font-size: 0.25rem">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>题库信息</el-breadcrumb-item>
      <el-breadcrumb-item ><span @click="getQueryJQuestion" style="font-weight: bold">判断题</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div class="display1">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 判断题列表</span>
          <div class="display2">
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="模糊查找" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" v-on:click="searchF()">搜索</button>
              <!--<button class="btn3 el-icon-circle-plus-outline" @click="dialogFormVisibleadd = true">添加</button>-->
              <button class="btn3 el-icon-circle-plus-outline" v-on:click="addJudge">添加</button>
              <el-dialog title="添加判断题" :visible.sync="dialogFormVisibleadd">
                <el-form :model="addList">
                  <el-form-item label="题干" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.item" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="答案" :label-width="formLabelWidth">
                    <!--<el-input style="width: 350px;" v-model="addList.ans" auto-complete="off"></el-input>-->
                    <select style="font-size:20px;width:150px;" v-model="addList.ans"  >
                      <option value="1">正确</option>
                      <option value="0">错误</option>
                    </select>
                  </el-form-item>
                  <el-form-item label="详解" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.tail" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="知识点" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.rem" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" style="align-content: center" class="dialog-footer">
                  <el-button type="primary" @click="addJQuestion(addList)">提交</el-button>
                  <el-button @click="Reset">重置</el-button>
                </div>
              </el-dialog>
              <button class="btn2 el-icon-folder" @click="getQueryJQuestionY">有效题目</button>
              <button class="btn2 el-icon-folder-remove" @click="getQueryJQuestionN">无效题目</button>
              <button class="btn2 el-icon-folder-checked" @click="getQueryJQuestion">所有题目</button>
              <button class="btn2 el-icon-document" @click="addF">批量添加</button>
              <button class="btn2 el-icon-document" @click="exportJ">导出</button>
              <input type="file" @change="importExcel(that)" id="inputExcel"
                     accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none"/>
            </div>
            <div class="waimian">
              <div v-for=" (JQuestion,key) in currentPageData" class="detail">
                <div>
                  <div>
                    <h3>
                      [<span>序号：{{key+1}}</span><span>题编号：{{JQuestion.jqid}}</span>]
                      <!--<span v-if="JQuestion.jqstatus==1" @click="dialogFormVisiblechangeitem=true;changeList.id=JQuestion.jqid;item=JQuestion.jqitem" class="span2">修改</span>-->
                      <span v-html="JQuestion.jqitem">{{JQuestion.jqitem}}</span>

                      <div class="delete">
                        <span v-if="JQuestion.jqstatus==1">有效
                          <span v-if="JQuestion.jqstatus==1"@click="deletejudge(1,JQuestion.jqid)" class="span1"><i class="el-icon-delete">删除</i></span>
                        </span>
                        <span v-if="JQuestion.jqstatus==0">无效
                          <span  @click="changejudge(5,JQuestion.jqid)" class="span2">修改</span>
                          <span  @click="deletejudge(2,JQuestion.jqid)" class="span1"><i class="el-icon-delete">永久删除</i></span>
                        </span>
                        <span v-on:click="change(JQuestion.jqid)" class="span1">修改题目</span>
                      </div>
                    </h3>
                    <el-dialog title="修改题干" :visible.sync="dialogFormVisiblechangeitem">
                      <el-form :model="changeList">
                        <el-form-item label="题干内容1" :label-width="formLabelWidth">
                          <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="题干内容" :label-width="formLabelWidth">
                          <el-input style="width: 350px;" v-model="changeList.item" auto-complete="off"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" style="align-content: center" class="dialog-footer">
                        <el-button type="primary" @click="changejudge(1,changeList)">提交</el-button>
                        <el-button @click="dialogFormVisiblechangeitem=false">退出</el-button>
                      </div>
                    </el-dialog>
                  </div>
                  <div>
                    <span>
                      <!--<span v-if="JQuestion.jqstatus==1" @click="dialogFormVisiblechangeans=true;changeList.id=JQuestion.jqid;item=JQuestion.jqans" class="span2">修改</span>-->

                      <!--<span v-if="JQuestion.jqstatus==1" @click="dialogFormVisiblechangeans=true;changeList.id=JQuestion.jqid;item=JQuestion.jqans" class="span2">修改</span></span>-->
                    答案：<span v-if="JQuestion.jqans==0">错误</span>
                      <span v-if="JQuestion.jqans==1">正确</span>
                    <el-dialog title="修改答案" :visible.sync="dialogFormVisiblechangeans">
                      <el-form :model="changeList">
                        <el-form-item label="原始答案" :label-width="formLabelWidth">
                          <span v-if="item==0">错误</span>
                          <span v-if="item==1">正确</span>
                          <!--<el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>-->
                        </el-form-item>
                        <el-form-item label="修改答案" :label-width="formLabelWidth">
                          <select style="font-size:20px;width:150px;" v-model="changeList.ans"  >
                            <option value="1">正确</option>
                            <option value="0">错误</option>
                          </select>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" style="align-content: center" class="dialog-footer">
                        <el-button type="primary" @click="changejudge(2,changeList)">提交</el-button>
                        <el-button @click="dialogFormVisiblechangeans=false">退出</el-button>
                      </div>
                    </el-dialog>
                    </span><br>
                    <span>
                      <!--<span v-if="JQuestion.jqstatus==1" @click="dialogFormVisiblechangetail=true;changeList.id=JQuestion.jqid;item=JQuestion.jqtail" class="span2">修改</span>-->
                  详解：<span v-html="JQuestion.jqtail">{{JQuestion.jqtail}}</span>
                      <el-dialog title="修改详解" :visible.sync="dialogFormVisiblechangetail">
                    <el-form :model="changeList">
                      <el-form-item label="原始详解" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="修改详解" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.tail" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changejudge(3,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangetail=false">退出</el-button>
                    </div>
                  </el-dialog>
                    </span><br>
                    <span>
                      <!--<span v-if="JQuestion.jqstatus==1" @click="dialogFormVisiblechangerem=true;changeList.id=JQuestion.jqid;item=JQuestion.jqrem" class="span2">修改</span>-->
                  知识点：<span v-html="JQuestion.jqrem">{{JQuestion.jqrem}}</span>
                      <el-dialog title="修改知识点" :visible.sync="dialogFormVisiblechangerem">
                    <el-form :model="changeList">
                      <el-form-item label="原始知识点" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="修改知识点" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.rem" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changejudge(4,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangerem=false">退出</el-button>
                    </div>
                  </el-dialog>
                    </span><br>
                  </div>
                </div>
              </div>
            </div>
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
    name: "judge",
    data(){
      return{
        formLabelWidth: '120px',
        //题库列表
        JudgeList:[],
        //搜索
        inputname:'',
        //添加
        dialogFormVisibleadd:false,
        addList:{
          item:'',
          ans:'',
          tail:'',
          rem:''
        },
        //修改
        changeList:{
          id:'',
          item:'',
          ans:'',
          tail:'',
          rem:'',
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
        pageSize: 10,
        currentPageData:[]
      }
    },
    methods:{
      addJudge:function()
      {
        this.$router.push({
          path:'/admin/bank/addjudge'
        })
      },
      change:function(id)
      {
        console.log(id)
        this.$router.push({
          path:'/admin/bank/changejudge',
          query:{
            id:id
          }
        })
      },
      exportJ:function()
      {
        let that =this
        that.$http.post('/home/export/exportjudge').then(function (res) {
          console.log(res.data)
          window.open(res.data.data)
        })
      },
      //分页
      setCurrentPageDate: function () {
        let that =this
        let begin = (that.currentPage - 1) * that.pageSize;
        let end = that.currentPage * that.pageSize;
        that.currentPageData = that.JudgeList.slice(begin, end)
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
      //获取判断题列表
      getQueryJQuestion:function(){
        let that =this
        that.$http.post('/bank/judge/queryjudge',{
          flag:1
        }).then(function (res) {
          console.log(res.data)
          that.JudgeList = res.data.data
          that.totalPage =Math.ceil(that.JudgeList.length/that.pageSize)
          that.totalPage=that.totalPage==0?1:that.totalPage
          that.setCurrentPageDate()
        }).catch(function (error) {
          console.log(error)
        })
      },
      //获取有效判断题列表
      getQueryJQuestionY:function(){
        let that =this
        that.$http.post('/bank/judge/queryjudge',{
          flag:2
        }).then(function (res) {
          console.log(res.data)
          that.JudgeList = res.data.data
          that.totalPage =Math.ceil(that.JudgeList.length/that.pageSize)
          that.totalPage=that.totalPage==0?1:that.totalPage
          that.setCurrentPageDate()
        }).catch(function (error) {
          console.log(error)
        })
      },
      //获取无效判断题列表
      getQueryJQuestionN:function(){
        let that =this
        that.$http.post('/bank/judge/queryjudge',{
          flag:4
        }).then(function (res) {
          console.log(res.data)
          that.JudgeList = res.data.data
          that.totalPage =Math.ceil(that.JudgeList.length/that.pageSize)
          that.totalPage=that.totalPage==0?1:that.totalPage
          that.setCurrentPageDate()
        }).catch(function (error) {
          console.log(error)
        })
      },
      //搜索
      searchF:function () {
        let that =this
        console.log(that.name)
        that.$http.post('/bank/judge/queryjudge',{
          flag:3,
          name:that.inputname
        }).then(function (res) {
          console.log(res.data)
          that.JudgeList = res.data.data
          that.totalPage =Math.ceil(that.JudgeList.length/that.pageSize)
          that.totalPage=that.totalPage==0?1:that.totalPage
          that.setCurrentPageDate()
        }).catch(function (error) {
          console.log(error)
        })
      },
      //添加题库
      addJQuestion:function (List) {
        let that =this
        console.log(List)
        if(List.item == '')
        {
          that.$alert('题干为空', '警告', {
            confirmButtonText: '确定',})
        }
        else if(List.ans==''){
          that.$alert('答案为空', '警告', {
            confirmButtonText: '确定',})
        }
        else{
          that.$http.post('/bank/judge/addjudge',{
            qitem:List.item,
            ans:List.ans,
            tail:List.tail,
            rem:List.rem,
            auth:that.$store.getters.getsId
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="插入判断题成功")
            {
              that.getQueryJQuestion()
              alert("插入判断题成功")
              that.dialogFormVisibleadd=false
              that.Reset()
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
        that.addList.item=""

      },
      //修改
      //1:题干
      //2：答案
      //3：详解
      //4：知识点
      //5:状态
      changejudge:function (item,id) {
        let that =this
        console.log(item)
        if(item==1) {
          that.$http.post('/bank/judge/change',{
            cid:that.changeList.id,
            flag:1,
            item:that.changeList.item,
            auth:that.$store.getters.getsId
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="该判断题题干修改成功")
            {
              that.getQueryJQuestion()
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
          that.$http.post('/bank/judge/change',{
            cid:that.changeList.id,
            flag:2,
            ans:that.changeList.ans,
            auth:that.$store.getters.getsId
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="该判断题答案修改成功")
            {
              that.getQueryJQuestion()
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
          that.$http.post('/bank/judge/change',{
            cid:that.changeList.id,
            flag:3,
            tail:that.changeList.tail,
            auth:that.$store.getters.getsId
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="该判断题详解修改成功")
            {
              that.getQueryJQuestion()
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
          that.$http.post('/bank/judge/change',{
            cid:that.changeList.id,
            flag:4,
            rem:that.changeList.rem,
            auth:that.$store.getters.getsId
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="该判断题相关知识修改成功")
            {
              that.getQueryJQuestion()
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
          that.$http.post('/bank/judge/change',{
            cid:id,
            flag:5,
            auth:that.$store.getters.getsId
          }).then(function (res) {

            console.log(res.data)
            if(res.data.message=="该判断题状态修改成功")
            {
              that.getQueryJQuestion()
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
      deletejudge:function (item,id) {
        let that =this
        console.log(item)
        if(item==1)
        {
          that.$confirm("删除该用户判断题，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            that.$http.post('/bank/judge/delete',{
              fid:id,
              flag:1,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该判断题删除成功")
              {
                that.getQueryJQuestion()
              }
              alert(res.data.message)
            })
          }).catch(function (error) {
            console.log(error)
          });
        }
        else if(item==2)
        {
          that.$confirm("永久删除该用户判断题，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            that.$http.post('/bank/judge/delete',{
              fid:id,
              flag:2
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该判断题永久删除成功")
              {
                that.getQueryJQuestion()
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
      addF:function()
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
              obj.item = v.题干
              obj.ans= v.答案
              obj.tail= v.详解
              obj.rem= v.相关点
              obj.auth = _that.$store.getters.getsId
              arr.push(obj)
            })
            _that.memberList = [...arr]
            let data = {
              data: JSON.stringify(_that.memberList)
            }
            console.log(data)
            _that.$http.post('/bank/judge/importexcel', data).then(body => {
              alert(body.data.message)
              _that.getQueryJQuestion()
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
      this.getQueryJQuestion()
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
    width: 80px;
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
    padding: 7px;
    color: white;
    background-color: gray;
    margin-left: 5px;
    margin-top: 17px;
    margin-bottom: 5px;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: auto;
    height: 30px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    border-radius: 2px;
  }
  .span1:hover{
    background-color: #5FA7FE;
  }
  /*修改*/
  .span2{
    color: #e33e33;
    background-color: rgba(227,62,51,0.1);
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: auto;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    border-radius: 2px;
  }
  .span2:hover{
    background-color: #5FA7FE;
  }
  .delete{
    float: right!important;
  }
  .waimian{
    margin-top: 60px;
    margin-top: 10px;
    text-align: left;
    width: auto;
    height: auto;
  }
  .detail {
    border-collapse: collapse;
    width: 80%;
    margin-top: 5px;
    table-layout: fixed;
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    padding: 5px;
    text-align: left;
    border-bottom: 1px solid #f0f2f5;
    position: relative;
    font-size: 14px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;

  }

  th {
    font-size: 14px;
    border: solid 1px #ccc;
    font-weight: bold;
    padding: 5px;
    background-color: #F1F1F1;
    text-align: center;
  }

  table, td {
    border: solid 1px #ccc;/*no*/
    padding: 5px;
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
