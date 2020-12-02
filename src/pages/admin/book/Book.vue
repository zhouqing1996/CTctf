<template>
    <!--图书管理-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><span @click="getBookList(3)" style="font-weight: bold">书籍信息</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div class="display1">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 图书列表</span>
          <div class="display2">
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="模糊查找" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" v-on:click="searchB()">搜索</button>
              <button class="btn3 el-icon-circle-plus-outline" @click="dialogFormVisibleadd = true">添加</button>
              <el-dialog title="添加图书" :visible.sync="dialogFormVisibleadd">
                <el-form :model="addList">
                  <el-form-item label="书名" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="出版社" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.publish" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="作者" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.author" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="关于" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.about" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" style="align-content: center" class="dialog-footer">
                  <el-button type="primary" @click="addBook(addList)">提交</el-button>
                  <el-button @click="Reset">重置</el-button>
                </div>
              </el-dialog>
              <button class="btn2 el-icon-folder" @click="getBookList(1)">有效图书</button>
              <button class="btn2 el-icon-folder-remove" @click="getBookList(2)">无效图书</button>
              <button class="btn2 el-icon-folder-checked" @click="getBookList(3)">所有图书</button>
              <!--<button class="btn3" @click="AddB">批量添加</button>-->
              <button class="btn2 el-icon-document" @click="AddB">批量添加</button>
              <button class="btn2 el-icon-document" @click="exportB">导出</button>
              <input type="file" @change="importExcel(that)" id="inputExcel"
                       accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none"/>
            </div>
            <div class="waimian">
              <div v-for=" (Book,key) in currentPageData" class="detail">
                <div>
                  <h3>[<span>序号：{{key+1}}书编号：{{Book.bookid}}</span>]
                    <span v-if="Book.status==1" @click="dialogFormVisiblechangName=true;changeList.id=Book.bookid;item=Book.bookname" class="span2">修改</span>
                    {{Book.bookname}}
                    <div class="delete">
                      <span @click="BookLook(Book.bookid)" class="span3">查看</span>
                      <span v-if="Book.status==1">有效</span>
                      <span v-if="Book.status==1"@click="deleteBook(1,Book.bookid)" class="span1"><i class="el-icon-delete">删除</i></span>
                      <span v-if="Book.status==0">无效
                        <span v-if="Book.status==0" @click="changeBook(5,Book.bookid)" class="span2">修改</span>
                      </span>
                      <span v-if="Book.status==0" @click="deleteBook(2,Book.bookid)" class="span1"><i class="el-icon-delete">删除</i></span>
                    </div>
                  </h3>
                  <el-dialog title="修改书名" :visible.sync="dialogFormVisiblechangName">
                    <el-form :model="changeList">
                      <el-form-item label="书名内容1" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="书名内容" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.name" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeBook(1,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangName=false">退出</el-button>
                    </div>
                  </el-dialog>
                </div>
                <div>

                </div>
                <div>
                  <span>
                    <span v-if="Book.status==1" @click="dialogFormVisiblechangePublish=true;changeList.id=Book.bookid;item=Book.publish" class="span2">修改</span>
                    出版社：{{Book.publish}}

                  <el-dialog title="修改出版社" :visible.sync="dialogFormVisiblechangePublish">
                    <el-form :model="changeList">
                      <el-form-item label="原始出版社" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="修改出版社" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.publish" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeBook(2,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangePublish=false">退出</el-button>
                    </div>
                  </el-dialog>
                  </span><br>
                  <span>
                    <span v-if="Book.status==1" @click="dialogFormVisiblechangeAuthor=true;changeList.id=Book.bookid;item=Book.author" class="span2">修改</span>
                    作者：{{Book.author}}
                  <el-dialog title="修改作者" :visible.sync="dialogFormVisiblechangeAuthor">
                    <el-form :model="changeList">
                      <el-form-item label="原始作者" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="修改作者" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.author" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeBook(3,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangeAuthor=false">退出</el-button>
                    </div>
                  </el-dialog>
                  </span><br>
                  <span>
                    <span v-if="Book.status==1" @click="dialogFormVisiblechangeAbout=true;changeList.id=Book.bookid;item=Book.about" class="span2">修改</span>
                    关于：{{Book.about}}
                  <el-dialog title="修改关于" :visible.sync="dialogFormVisiblechangeAbout">
                    <el-form :model="changeList">
                      <el-form-item label="原始关于" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="修改关于" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.about" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeBook(4,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangeAbout=false">退出</el-button>
                    </div>
                  </el-dialog>
                  </span>
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
        name: "Book",
      data(){
          return{
            formLabelWidth: '120px',
            inputname:'',
            bookList:[],
            addList:{
              name:'',
              publish:'',
              author:'',
              about:''
            },
            dialogFormVisibleadd:false,
            dialogFormVisiblechangName:false,
            dialogFormVisiblechangePublish:false,
            dialogFormVisiblechangeAuthor:false,
            dialogFormVisiblechangeAbout:false,
            changeList:{
              id:'',
              name:'',
              publish:'',
              author:'',
              about:''
            },
            item:'',
            // 翻页相关
            currentPage: 1,
            totalPage: 1,
            pageSize: 10,
            currentPageData:[]
          }
      },
      methods:{
          exportB:function()
          {
            let that =this
            that.$http.post('/home/export/exportbook').then(function (res) {
              console.log(res.data)
              window.open(res.data.data)
            })
          },
        BookLook:function(id)
        {
          let that =this
          that.$router.push({
              path:'/admin/book/item',
              query:{
                bid:id
              }
            }
          )
        },
        //分页
        setCurrentPageDate: function () {
          let that =this
          let begin = (that.currentPage - 1) * that.pageSize;
          let end = that.currentPage * that.pageSize;
          that.currentPageData = that.bookList.slice(begin, end)
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
        searchB:function()
        {
          let that =this
          console.log(that.inputname)
          if(that.inputname=="")
          {
            alert("请输入需要查询的内容")
            return
          }
          that.$http.post('/book/book/querybook',{
            flag:4,
            name:that.inputname
          }).then(function (res) {
            console.log(res.data)
            that.bookList = res.data.data
            that.totalPage =Math.ceil(that.bookList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        },
          getBookList:function(item)
          {
            let that =this
            console.log(item)
            if(item==1)
            {
              //有效图书
              that.$http.post('/book/book/querybook',{
                flag:1
              }).then(function (res) {
                console.log(res.data)
                that.bookList = res.data.data
                that.totalPage =Math.ceil(that.bookList.length/that.pageSize)
                that.totalPage=that.totalPage==0?1:that.totalPage
                that.setCurrentPageDate()
              })
            }
            else if(item==2)
            {
              //无效图书
              that.$http.post('/book/book/querybook',{
                flag:2
              }).then(function (res) {
                console.log(res.data)
                that.bookList = res.data.data
                that.totalPage =Math.ceil(that.bookList.length/that.pageSize)
                that.totalPage=that.totalPage==0?1:that.totalPage
                that.setCurrentPageDate()
              })
            }
            else if(item==3)
            {
              //所有图书
              that.$http.post('/book/book/querybook',{
                flag:3
              }).then(function (res) {
                console.log(res.data)
                that.bookList = res.data.data
                that.totalPage =Math.ceil(that.bookList.length/that.pageSize)
                that.totalPage=that.totalPage==0?1:that.totalPage
                that.setCurrentPageDate()
              })
            }
            else
            {
              alert("错误")
            }
          },
        addBook:function () {
          let that =this
          console.log(that.addList)
          that.$http.post('/book/book/addbook',
            {
              bookname:that.addList.name,
              publish:that.addList.publish,
              author:that.addList.author,
              about:that.addList.about,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
            if(res.data.message=="图书添加成功")
            {
              that.getBookList(3)
            }
            that.dialogFormVisibleadd=false
            that.Reset()
            alert(res.data.message)
          })
        },
        Reset:function () {
          let that =this
          that.addList.name=""
          that.addList.publish=""
          that.addList.author=""
          that.addList.about=""
        },
        //修改
        //1：书名
        //2：出版社
        //3：作者
        //4:关于
        //5：状态
        changeBook:function (item,id) {
          let that =this
          console.log(item)
          console.log(that.changeList)
          if(item==1)
          {
            that.$http.post('/book/book/changebook',{
              bookid:that.changeList.id,
              flag:1,
              bookname:that.changeList.name,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该图书名修改成功")
              {
                that.getBookList(3)
              }
              that.dialogFormVisiblechangName=false
              alert(res.data.message)
              console.log(res.data.message)
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==2)
          {
            that.$http.post('/book/book/changebook',{
              bookid:that.changeList.id,
              flag:2,
              publish:that.changeList.publish,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该图书出版社修改成功")
              {
                that.getBookList(3)
              }
              that.dialogFormVisiblechangePublish=false
              alert(res.data.message)
              console.log(res.data.message)
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==3)
          {
            that.$http.post('/book/book/changebook',{
              bookid:that.changeList.id,
              flag:3,
              author:that.changeList.author,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该图书作者修改成功")
              {
                that.getBookList(3)
              }
              that.dialogFormVisiblechangeAuthor=false
              alert(res.data.message)
              console.log(res.data.message)
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==4)
          {
            that.$http.post('/book/book/changebook',{
              bookid:that.changeList.id,
              flag:4,
              about:that.changeList.about,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该图书关于修改成功")
              {
                that.getBookList(3)
              }
              that.dialogFormVisiblechangeAbout=false
              alert(res.data.message)
              console.log(res.data.message)
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==5)
          {
            that.$http.post('/book/book/changebook',{
              bookid:id,
              flag:5,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该图书状态修改成功")
              {
                that.getBookList(3)
              }
              alert(res.data.message)
              console.log(res.data.message)
            }).catch(function (error) {
              console.log(error)
            })
          }
          else
          {
            alert("错误")
          }
        },
        deleteBook(item,id)
        {
          let that =this
          console.log(item)
          if(item==1)
          {
            that.$confirm("删除该书籍，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              that.$http.post('/book/book/deletebook',{
                flag:1,
                bookid:id,
                auth:that.$store.getters.getsId
              }).then(function (res) {
                console.log(res.data)
                if(res.data.message=="该图书已删除")
                {
                  that.getBookList(3)
                }
                alert(res.data.message)
              })
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==2)
          {
            that.$confirm("永久删除该书籍，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              that.$http.post('/book/book/deletebook',{
                flag:2,
                bookid:id
              }).then(function (res) {
                console.log(res.data)
                if(res.data.message=="该图书已永久删除")
                {
                  that.getBookList(3)
                }
                alert(res.data.message)
              })
            }).catch(function (error) {
              console.log(error)
            })

          }
          else
          {
            alert("错误")
          }
        },

        //批量添加
        AddB:function () {
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
                  obj.name = v.书籍名
                  obj.publish= v.出版社
                  obj.author= v.作者
                  obj.about=v.关于
                  obj.auth=_that.$store.getters.getsId
                  arr.push(obj)
                })
              _that.memberList = [...arr]
              let data = {
                data: JSON.stringify(_that.memberList)
              }
              console.log(data)
                _that.$http.post('/book/book/importexcel', data).then(body => {
                  alert(body.data.message)
                  _that.getBookList(3)
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
      created(){
        this.getBookList(3)
      },
      mounted(){
          this.inputExcel = document.getElementById('inputExcel')
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
  /*查看*/
  /*删除*/
  .span3{
    padding: 7px;
    color: white;
    background-color: #0ea0db;
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
  .span3:hover{
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
    border: solid 1px #ccc;
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
