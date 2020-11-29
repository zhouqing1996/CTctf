<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item><span @click="getQuery" style="font-weight: bold">练习</span></el-breadcrumb-item>
      </el-breadcrumb>
      <div><hr/></div>
    </div>
    <div>
      <el-tabs type="border-card">
        <!--选择题-->
        <el-tab-pane>
          <span slot="label" @click="getQuery1"><i class="el-icon-date" ></i> 选择题列表</span>
          <div>
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="选择题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" @click="search(1,inputname)" >搜索</button>
            </div>
            <br>
            <br>
            <el-divider></el-divider>
            <table >
              <tr>
                <th>序号</th>
                <th>题目编号 </th>
                <th>题干</th>
                <th>操作</th>
              </tr>
              <tr v-for=" (c,key) in currentPageData1" :key="key">
                <td style="width: 10%">{{key+1}}</td>
                <td style="width: 10%">{{c.cqid}}</td>
                <td style="width: 70%;text-align: left">{{c.cqitem}}</td>
                <td>
                  <span class="span2" @click="Click1(c.cqid)">进入练习</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="currentPage1!=1">
                <span class="page-link" v-on:click="prePage1">上一页</span>
              </li>
              <li class="page-item" >
                <span class="page-link" >第{{ currentPage1 }}页/共{{totalPage1}}页</span>
              </li>
              <li class="page-item" v-if="currentPage1!=totalPage1">
                <span class="page-link" v-on:click="nextPage1">下一页</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!--填空题-->
        <el-tab-pane>
          <span slot="label" @click="getQuery2"><i class="el-icon-date"></i> 填空题列表</span>
          <div>
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="填空题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" @click="search(2,inputname)">搜索</button>
            </div>
            <br>
            <br>
            <el-divider></el-divider>
            <table >
              <tr>
                <th>序号</th>
                <th>题目编号 </th>
                <th>题干</th>
                <th>操作</th>
              </tr>
              <tr v-for=" (f,key) in currentPageData2" :key="key">
                <td style="width: 10%">{{key+1}}</td>
                <td style="width: 10%">{{f.fqid}}</td>
                <td style="width: 70%;text-align: left">{{f.fqitem}}</td>
                <td>
                  <span class="span2" @click="Click2(f.fqid)">进入练习</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="currentPage2!=1">
                <span class="page-link" v-on:click="prePage2">上一页</span>
              </li>
              <li class="page-item" >
                <span class="page-link" >第{{ currentPage2 }}页/共{{totalPage2}}页</span>
              </li>
              <li class="page-item" v-if="currentPage2!=totalPage2">
                <span class="page-link" v-on:click="nextPage2">下一页</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!--判断题-->
        <el-tab-pane>
          <span slot="label" @click="getQuery3"><i class="el-icon-date"></i> 判断题列表</span>
          <div >
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="判断题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" @click="search(3,inputname)">搜索</button>
            </div>
            <br>
            <br>
            <el-divider></el-divider>
            <table >
              <tr>
                <th>序号</th>
                <th>题目编号 </th>
                <th>题干</th>
                <th>操作</th>
              </tr>
              <tr v-for=" (j,key) in currentPageData3" :key="key">
                <td style="width: 10%">{{key+1}}</td>
                <td style="width: 10%">{{j.jqid}}</td>
                <td style="width: 70%;text-align: left">{{j.jqitem}}</td>
                <td>
                  <span class="span2" @click="Click3(j.jqid)">进入练习</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="currentPage3!=1">
                <span class="page-link" v-on:click="prePage3">上一页</span>
              </li>
              <li class="page-item" >
                <span class="page-link" >第{{ currentPage3 }}页/共{{totalPage3}}页</span>
              </li>
              <li class="page-item" v-if="currentPage3!=totalPage3">
                <span class="page-link" v-on:click="nextPage3">下一页</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!--多选题-->
        <el-tab-pane>
          <span slot="label" @click="getQuery4"><i class="el-icon-date"></i> 多选题列表</span>
          <div>
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="多选题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" @click="search(4,inputname)">搜索</button>
            </div>
            <br>
            <br>
            <el-divider></el-divider>
            <table >
              <tr>
                <th>序号</th>
                <th>题目编号 </th>
                <th>题干</th>
                <th>操作</th>
              </tr>
              <tr v-for=" (m,key) in currentPageData4" :key="key">
                <td style="width: 10%">{{key+1}}</td>
                <td style="width: 10%">{{m.mqid}}</td>
                <td style="width: 70%;text-align: left">{{m.mqitem}}</td>
                <td>
                  <span class="span2" @click="Click4(m.mqid)">进入练习</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="currentPage4!=1">
                <span class="page-link" v-on:click="prePage4">上一页</span>
              </li>
              <li class="page-item" >
                <span class="page-link" >第{{ currentPage4 }}页/共{{totalPage4}}页</span>
              </li>
              <li class="page-item" v-if="currentPage4!=totalPage4">
                <span class="page-link" v-on:click="nextPage4">下一页</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <!--程序题-->
        <el-tab-pane>
          <span slot="label" @click="getQuery5"><i class="el-icon-date"></i> 程序题列表</span>
          <div>
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="程序题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" @click="search(5,inputname)">搜索</button>
            </div>
            <br>
            <br>
            <el-divider></el-divider>
            <table >
              <tr>
                <th>序号</th>
                <th>题目编号 </th>
                <th>题干</th>
                <th>操作</th>
              </tr>
              <tr v-for=" (p,key) in currentPageData5" :key="key">
                <td style="width: 5%">{{key+1}}</td>
                <td style="width: 5%">{{p.pqid}}</td>
                <td style="width: 80%;text-align: left">{{p.pqitem}}</td>
                <td>
                  <span class="span2" @click="Click5(p.pqid)">进入练习</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="page">
            <ul class="pagination pagination-sm"><!--分页-->
              <li class="page-item" v-if="currentPage5!=1">
                <span class="page-link" v-on:click="prePage5">上一页</span>
              </li>
              <li class="page-item" >
                <span class="page-link" >第{{ currentPage5 }}页/共{{totalPage5}}页</span>
              </li>
              <li class="page-item" v-if="currentPage5!=totalPage5">
                <span class="page-link" v-on:click="nextPage5">下一页</span>
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
        name: "Exercise",
      data(){
          return{
            inputname: '',
            //1：选择题
            //2：填空题
            //3：判断题
            //4：多选题
            //5：程序题
            //列表显示
            Lists1:[],
            Lists2:[],
            Lists3:[],
            Lists4:[],
            Lists5:[],

            // 翻页相关
            currentPage1: 1,
            totalPage1: 1,
            pageSize1: 10,
            currentPageData1: [],
            currentPage2: 1,
            totalPage2: 1,
            pageSize2: 10,
            currentPageData2: [],
            currentPage3: 1,
            totalPage3: 1,
            pageSize3: 10,
            currentPageData3: [],
            currentPage4: 1,
            totalPage4: 1,
            pageSize4: 10,
            currentPageData4: [],
            currentPage5: 1,
            totalPage5: 1,
            pageSize5: 10,
            currentPageData5: [],
          }
      },
      methods:{
        //分页
        setCurrentPageDate1: function () {
          let that = this
          let begin1 = (that.currentPage1 - 1) * that.pageSize1;
          let end1 = that.currentPage1 * that.pageSize1;
          that.currentPageData1 = that.Lists1.slice(begin1, end1)
        },
        setCurrentPageDate2: function () {
          let that = this
          let begin2 = (that.currentPage2 - 1) * that.pageSize2;
          let end2 = that.currentPage2 * that.pageSize2;
          that.currentPageData2 = that.Lists2.slice(begin2, end2)
        },
        setCurrentPageDate3: function () {
          let that = this
          let begin3 = (that.currentPage3 - 1) * that.pageSize3;
          let end3 = that.currentPage3 * that.pageSize3;
          that.currentPageData3 = that.Lists3.slice(begin3, end3)
        },
        setCurrentPageDate4: function () {
          let that = this
          let begin4 = (that.currentPage4 - 1) * that.pageSize4;
          let end4 = that.currentPage4 * that.pageSize4;
          that.currentPageData4 = that.Lists4.slice(begin4, end4)
        },
        setCurrentPageDate5: function () {
          let that = this
          let begin5 = (that.currentPage5 - 1) * that.pageSize5;
          let end5 = that.currentPage5 * that.pageSize5;
          that.currentPageData5 = that.Lists5.slice(begin5, end5)
        },
        prePage1:function() {
          let that = this
          console.log(that.currentPage1)
          if (that.currentPage1 == 1)
            return
          that.currentPage1--;
          that.setCurrentPageDate1()
        },
        prePage2:function() {
          let that = this
          console.log(that.currentPage2)
          if (that.currentPage2 == 1)
            return
          that.currentPage2--;
          that.setCurrentPageDate2()
        },
        prePage3:function() {
          let that = this
          console.log(that.currentPage3)
          if (that.currentPage3 == 1)
            return
          that.currentPage3--;
          that.setCurrentPageDate3()
        },
        prePage4:function() {
          let that = this
          console.log(that.currentPage4)
          if (that.currentPage4 == 1)
            return
          that.currentPage4--;
          that.setCurrentPageDate4()
        },
        prePage5:function() {
          let that = this
          console.log(that.currentPage5)
          if (that.currentPage5 == 1)
            return
          that.currentPage5--;
          that.setCurrentPageDate5()
        },
        nextPage1:function() {
          let that = this
          if (that.currentPage1 == that.totalPage1) return
          that.currentPage1++;
          that.setCurrentPageDate1()
        },
        nextPage2:function() {
          let that = this
          if (that.currentPage2 == that.totalPage2) return
          that.currentPage2++;
          that.setCurrentPageDate2()
        },
        nextPage3:function() {
          let that = this
          if (that.currentPage3 == that.totalPage3) return
          that.currentPage3++;
          that.setCurrentPageDate3()
        },
        nextPage4:function() {
          let that = this
          if (that.currentPage4 == that.totalPage4) return
          that.currentPage4++;
          that.setCurrentPageDate4()
        },
        nextPage5:function() {
          let that = this
          if (that.currentPage5 == that.totalPage5) return
          that.currentPage5++;
          that.setCurrentPageDate5()
        },
        //获取所有列表内容;只有有效题目
        getQuery1:function () {
          let that = this
          that.inputname=''
          //选择题
          that.$http.post('/bank/chooseq/querychoose',{
            flag:2
          }).then(function (res) {
            console.log(res.data)
            that.Lists1 = res.data.data
            that.totalPage1 =Math.ceil(that.Lists1.length/that.pageSize1)
            that.totalPage1=that.totalPage1==0?1:that.totalPage1
            that.setCurrentPageDate1()
          }).catch(function (error) {
            console.log(error)
          })
        },
        getQuery2:function () {
          let that = this
          that.inputname=''
          //填空题
          that.$http.post('/bank/fillq/queryfill',{
            flag:2
          }).then(function (res) {
            console.log(res.data)
            that.Lists2 = res.data.data
            that.totalPage2 =Math.ceil(that.Lists2.length/that.pageSize2)
            that.totalPage2=that.totalPage2==0?1:that.totalPage2
            that.setCurrentPageDate2()
          }).catch(function (error) {
            console.log(error)
          })
        },
        getQuery3:function () {
          let that = this
          that.inputname=''
          //判断题
          that.$http.post('/bank/judge/queryjudge',{
            flag:2
          }).then(function (res) {
            console.log(res.data)
            that.Lists3 = res.data.data
            that.totalPage3 =Math.ceil(that.Lists3.length/that.pageSize3)
            that.totalPage3=that.totalPage3==0?1:that.totalPage3
            that.setCurrentPageDate3()
          }).catch(function (error) {
            console.log(error)
          })
        },
        getQuery4:function () {
          let that = this
          that.inputname=''
          //多选题
          that.$http.post('/bank/choosem/querychoose',{
            flag:2
          }).then(function (res) {
            console.log(res.data)
            that.Lists4 = res.data.data
            that.totalPage4 =Math.ceil(that.Lists4.length/that.pageSize4)
            that.totalPage4=that.totalPage4==0?1:that.totalPage4
            that.setCurrentPageDate4()
          }).catch(function (error) {
            console.log(error)
          })
        },
        getQuery5:function () {
          let that = this
          that.inputname=''
          //程序题
          that.$http.post('/bank/program/queryprogram',{
            flag:2
          }).then(function (res) {
            console.log(res.data)
            that.Lists5 = res.data.data
            that.totalPage5 =Math.ceil(that.Lists5.length/that.pageSize5)
            that.totalPage5=that.totalPage5==0?1:that.totalPage5
            that.setCurrentPageDate5()
          }).catch(function (error) {
            console.log(error)
          })
        },
        Click1:function (id) {
          let that = this
          that.$router.push({
            path:'/user/exercisre/pchoose',
            query:{
              id:id
            }
          })
        },
        Click2:function (id) {
          let that = this
          that.$router.push({
            path:'/user/exercise/pfill',
            query:{
              id:id
            }
          })
        },
        Click3:function (id) {
          let that = this
          that.$router.push({
            path:'/user/exercise/pjudge',
            query:{
              id:id
            }
          })
        },
        Click4:function (id) {
          let that = this
          that.$router.push({
            path:'/user/exercise/pchoosem',
            query:{
              id:id
            }
          })
        },
        Click5:function (id) {
          let that = this
          that.$router.push({
            path:'/user/exercise/pprogram',
            query:{
              id:id
            }
          })
        },
        getQuery:function () {
          let that = this
          that.getQuery1()
          that.getQuery2()
          that.getQuery3()
          that.getQuery4()
          that.getQuery5()
        },
        search:function (id,name) {
          let that = this
          if(name=='')
          {
            that.$alert('搜索内容不能为空！', '警告', {
              confirmButtonText: '确定',})
          }
          else
          {
            that.$http.post('/student/exercise/search',{
              id:id,
              name:name
            }).then(function (res) {
              switch (id) {
                case 1:
                  that.Lists1 = res.data.data
                  that.totalPage1 =Math.ceil(that.Lists1.length/that.pageSize1)
                  that.totalPage1=that.totalPage1==0?1:that.totalPage1
                  that.setCurrentPageDate1()
                  break
                case 2:
                  that.Lists2 = res.data.data
                  that.totalPage2 =Math.ceil(that.Lists2.length/that.pageSize2)
                  that.totalPage2=that.totalPage2==0?1:that.totalPage2
                  that.setCurrentPageDate2()
                  break
                case 3:
                  that.Lists3 = res.data.data
                  that.totalPage3 =Math.ceil(that.Lists3.length/that.pageSize3)
                  that.totalPage3=that.totalPage3==0?1:that.totalPage3
                  that.setCurrentPageDate3()
                  break
                case 4:
                  that.Lists4 = res.data.data
                  that.totalPage4=Math.ceil(that.Lists4.length/that.pageSize4)
                  that.totalPage4=that.totalPage4==0?1:that.totalPage4
                  that.setCurrentPageDate4()
                  break
                case 5:
                  that.Lists5= res.data.data
                  that.totalPage5 =Math.ceil(that.Lists5.length/that.pageSize5)
                  that.totalPage5=that.totalPage5==0?1:that.totalPage5
                  that.setCurrentPageDate5()
                  break
                default:
                  break
              }
            })
          }
        }
      },
      created(){
        let that = this
          that.getQuery()
      }
    }
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
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
  .btn3 {
    width: 80px;/*px*/
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
    margin-top: 5px;
  }
  th {
    font-size: 14px;
    border: solid 1px #ccc;
    font-weight: bold;
    padding: 3px;
    background-color: #F1F1F1;
    text-align: center;
  }

  table, td {
    border: solid 1px #ccc;
    padding: 3px;
    text-align: center;
    font-size: 18px;
  }
  .display{
    padding-left: 5px;
    padding-top: 10px;
  }

  .display1{
    border: solid 1px #E5E7E9;
    height: auto;
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
    flex-flow: row nowrap;
    justify-content: center;
  }
  ul li {
    list-style: none;
    text-align: center;
    /*line-height: 30px;*/
    padding:2px;
    height: auto;
    width: 100px;
    margin: 0 2px;
  }
</style>
