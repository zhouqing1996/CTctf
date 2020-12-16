<template>
  <!--练习-->
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{path:'/teacher/pCreate'}">练习列表</el-breadcrumb-item>
        <el-breadcrumb-item> 添加练习</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div><hr/></div>
    <div class="display1">
      <el-tabs type="border-card">
        <!--选择题-->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 选择题列表</span>
          <div class="display2">
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="选择题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" >搜索</button>
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
                <td style="width: 70%;text-align: left"><span v-html="c.cqitem">{{c.cqitem}}</span> </td>
                <td>
                  <span class="span2" @click="Click1(c.cqid)" :id="tianjia1(c.cqid)">添加</span>
                </td>
              </tr>
            </table>
            <hr/>
            <div style="height: 20px">单选题：{{List1}}，填空题：{{List2}},判断题：{{List3}},多选题：{{List4}},程序题：{{List5}}</div>
            <hr/>
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
          <span slot="label"><i class="el-icon-date"></i> 填空题列表</span>
          <div class="display2">
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="填空题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" >搜索</button>
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
                <td style="width: 70%;text-align: left"><span v-html="f.fqitem">{{f.fqitem}}</span> </td>
                <td>
                  <!--<span  class="span2" @click="Click2(f.fqid)" >添加</span>-->
                  <span class="span2" @click="Click2(f.fqid)" :id="tianjia2(f.fqid)">添加</span>
                </td>
              </tr>
            </table>
          </div>
          <hr/>
          <div style="height: 20px">单选题：{{List1}}，填空题：{{List2}},判断题：{{List3}},多选题：{{List4}},程序题：{{List5}}</div>
          <hr/>
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
          <span slot="label"><i class="el-icon-date"></i> 判断题列表</span>
          <div class="display2">
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="判断题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" >搜索</button>
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
                <td style="width: 70%;text-align: left"><span v-html="j.jqitem">{{j.jqitem}}</span> </td>
                <td>
                  <!--<span  class="span2" @click="Click3(j.jqid)">添加</span>-->
                  <span class="span2" @click="Click3(j.jqid)" :id="tianjia3(j.jqid)">添加</span>
                </td>
              </tr>
            </table>
          </div>
          <hr/>
          <div style="height: 20px">单选题：{{List1}}，填空题：{{List2}},判断题：{{List3}},多选题：{{List4}},程序题：{{List5}}</div>
          <hr/>
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
          <span slot="label"><i class="el-icon-date"></i> 多选题列表</span>
          <div class="display2">
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="多选题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" >搜索</button>
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
                <td style="width: 70%;text-align: left"><span v-html="m.mqitem">{{m.mqitem}}</span> </td>
                <td>
                  <!--<span  class="span2" @click="Click4(m.mqid)">添加</span>-->
                  <span class="span2" @click="Click4(m.mqid)" :id="tianjia4(m.mqid)">添加</span>
                </td>
              </tr>
            </table>
          </div>
          <hr/>
          <div style="height: 20px">单选题：{{List1}}，填空题：{{List2}},判断题：{{List3}},多选题：{{List4}},程序题：{{List5}}</div>
          <hr/>
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
          <span slot="label"><i class="el-icon-date"></i> 程序题列表</span>
          <div class="display2">
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="程序题" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" >搜索</button>
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
                <td style="width: 10%">{{key+1}}</td>
                <td style="width: 10%">{{p.pqid}}</td>
                <td style="width: 70%;text-align: left"><span v-html="p.pqitem">{{p.pqitem}}</span> </td>
                <td>
                  <!--<span  class="span2" @click="Click5(p.pqid)">添加</span>-->
                  <span class="span2" @click="Click5(p.pqid)" :id="tianjia5(p.pqid)" >添加</span>
                </td>
              </tr>
            </table>
          </div>
          <hr/>
          <div style="height: 20px">单选题：{{List1}}，填空题：{{List2}},判断题：{{List3}},多选题：{{List4}},程序题：{{List5}}</div>
          <hr/>
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
        <el-tab-pane>
          <span slot="label" @click="SelfView"><i class="el-icon-date" ></i>完成组练习</span>
          <div class="parc">
            <div>
              <div v-if="ViewList1.length>0">
                <h3>选择题</h3>
                <span v-for="(c,key1) in ViewList1":key="key1">
                    <li class="item">({{key1+1}})<span v-html="c.cqitem">{{c.cqitem}}</span> <br>
                      <input type="radio"  value=""><span v-html="c.cqcho.split('---')[0]">{{c.cqcho.split('---')[0]}}</span> <br>
                      <input type="radio"  value=""><span v-html="c.cqcho.split('---')[1]">{{c.cqcho.split('---')[1]}}</span><br>
                      <input type="radio"  value=""><span v-html="c.cqcho.split('---')[2]">{{c.cqcho.split('---')[2]}}</span><br>
                      <input type="radio"  value=""><span v-html="c.cqcho.split('---')[3]">{{c.cqcho.split('---')[3]}}</span><br>
                    </li>
                  </span>
              </div>
              <div v-if="ViewList1.length>0">
                <h3>填空题</h3>
                <span v-for="(f,key2) in ViewList2":key="key2">
                    <li class="item">({{key2+1}})<span v-html="f.fqitem">{{f.fqitem}}</span> <br>
                        <input type="text" value=""><br>
                    </li>
                  </span>
              </div>

              <div v-if="ViewList3.length>0">
                <h3>判断题</h3>
                <span v-for="(j,key3) in ViewList3":key="key3">
                    <li class="item">({{key3+1}})<span v-html="j.jqitem">{{j.jqitem}}</span> <br>
                      <input type="radio"  value="1">对<br>
                      <input type="radio"  value="0">错<br>
                    </li>
                  </span>
              </div>
              <div v-if="ViewList4.length>0">
                <h3>多选题</h3>
                <span v-for="(m,key4) in ViewList4":key="key4">
                    <li class="item">({{key4+1}})<span v-html="m.mqitem">{{m.mqitem}}</span> <br>
                      <input type="checkbox" :name="'choosem'+m.mid"/><span v-html="m.mqcho.split('---')[0]">{{m.mqcho.split('---')[0]}}</span><br>
                      <input type="checkbox" :name="'choosem'+m.mid"/><span v-html="m.mqcho.split('---')[1]">{{m.mqcho.split('---')[1]}}</span><br>
                      <input type="checkbox" :name="'choosem'+m.mid"/><span v-html="m.mqcho.split('---')[2]">{{m.mqcho.split('---')[2]}}</span><br>
                      <input type="checkbox" :name="'choosem'+m.mid"/><span v-html="m.mqcho.split('---')[3]">{{m.mqcho.split('---')[3]}}</span><br>
                    </li>
                  </span>
              </div>
              <div v-if="ViewList5.length>0">
                <h3>程序题</h3>
                <span v-for="(p,key5) in ViewList5":key="key5">
                    <li class="item">({{key5+1}})<span v-html="p.pqitem">{{p.pqitem}}</span> <br>
                      <input type="text" value=""><br>
                    </li>
                  </span>
              </div>

              <button class="btn2 el-icon-circle-plus-outline" @click="dialogFormVisible=true">完成练习</button>
              <el-dialog title="练习题目" :visible.sync="dialogFormVisible">
                <el-form :model="SelfList">
                  <el-form-item label="练习名称" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="SelfList.name" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" style="align-content: center" class="dialog-footer">
                  <el-button type="primary" @click="SelfOK">提交</el-button>
                  <el-button @click="dialogFormVisible=false">退出</el-button>
                </div>
              </el-dialog>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Pratice",
    data(){
      return{
        inputname: '',
        //记录id
        //1：选择题
        //2：填空题
        //3：判断题
        //4：多选题
        //5：程序题
        List1:[],
        List2:[],
        List3:[],
        List4:[],
        List5:[],
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
        //  完成问卷
        dialogFormVisible:false,
        formLabelWidth: '120px',
        SelfList:{
          name:'',
        },
        //  预览问卷
        ViewList1:[],
        ViewList2:[],
        ViewList3:[],
        ViewList4:[],
        ViewList5:[],
      }
    },
    methods:{
      //分页
      setCurrentPageDate1: function () {
        let that =this
        let begin1 = (that.currentPage1 - 1) * that.pageSize1;
        let end1 = that.currentPage1 * that.pageSize1;
        that.currentPageData1 = that.Lists1.slice(begin1, end1)
      },
      setCurrentPageDate2: function () {
        let that =this
        let begin2 = (that.currentPage2 - 1) * that.pageSize2;
        let end2 = that.currentPage2 * that.pageSize2;
        that.currentPageData2 = that.Lists2.slice(begin2, end2)
      },
      setCurrentPageDate3: function () {
        let that =this
        let begin3 = (that.currentPage3 - 1) * that.pageSize3;
        let end3 = that.currentPage3 * that.pageSize3;
        that.currentPageData3 = that.Lists3.slice(begin3, end3)
      },
      setCurrentPageDate4: function () {
        let that =this
        let begin4 = (that.currentPage4 - 1) * that.pageSize4;
        let end4 = that.currentPage4 * that.pageSize4;
        that.currentPageData4 = that.Lists4.slice(begin4, end4)
      },
      setCurrentPageDate5: function () {
        let that =this
        let begin5 = (that.currentPage5 - 1) * that.pageSize5;
        let end5 = that.currentPage5 * that.pageSize5;
        that.currentPageData5 = that.Lists5.slice(begin5, end5)
      },
      prePage1:function() {
        let that =this
        console.log(that.currentPage1)
        if (that.currentPage1 == 1)
          return
        that.currentPage1--;
        that.setCurrentPageDate1()
      },
      prePage2:function() {
        let that =this
        console.log(that.currentPage2)
        if (that.currentPage2 == 1)
          return
        that.currentPage2--;
        that.setCurrentPageDate2()
      },
      prePage3:function() {
        let that =this
        console.log(that.currentPage3)
        if (that.currentPage3 == 1)
          return
        that.currentPage3--;
        that.setCurrentPageDate3()
      },
      prePage4:function() {
        let that =this
        console.log(that.currentPage4)
        if (that.currentPage4 == 1)
          return
        that.currentPage4--;
        that.setCurrentPageDate4()
      },
      prePage5:function() {
        let that =this
        console.log(that.currentPage5)
        if (that.currentPage5 == 1)
          return
        that.currentPage5--;
        that.setCurrentPageDate5()
      },
      nextPage1:function() {
        let that =this
        if (that.currentPage1 == that.totalPage1) return
        that.currentPage1++;
        that.setCurrentPageDate1()
      },
      nextPage2:function() {
        let that =this
        if (that.currentPage2 == that.totalPage2) return
        that.currentPage2++;
        that.setCurrentPageDate2()
      },
      nextPage3:function() {
        let that =this
        if (that.currentPage3 == that.totalPage3) return
        that.currentPage3++;
        that.setCurrentPageDate3()
      },
      nextPage4:function() {
        let that =this
        if (that.currentPage4 == that.totalPage4) return
        that.currentPage4++;
        that.setCurrentPageDate4()
      },
      nextPage5:function() {
        let that =this
        if (that.currentPage5 == that.totalPage5) return
        that.currentPage5++;
        that.setCurrentPageDate5()
      },

      //获取所有列表内容;只有有效题目
      getQuery1:function () {
        let that =this
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
        let that =this
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
        //判断题
        let that =this
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
        let that =this
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
        let that =this
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
      tianjia1:function(id)
      {
        return "tianjia1("+id+")";
      },
      tianjia2:function(id)
      {
        return "tianjia2("+id+")";
      },
      tianjia3:function(id)
      {
        return "tianjia3("+id+")";
      },
      tianjia4:function(id)
      {
        return "tianjia4("+id+")";
      },
      tianjia5:function(id)
      {
        return "tianjia5("+id+")";
      },
      // 点击添加至列表中
      Click1:function (id) {
        let that =this
        //  选择题
        console.log(id)
        if(that.List1.indexOf(id)>-1){
          that.List1.splice(that.List1.indexOf(id),1)
          document.getElementById("tianjia1("+id+")").innerHTML="添加"
        }
        else{
          that.List1.push(id)
          document.getElementById("tianjia1("+id+")").innerHTML="已添加"
        }
        console.log(that.List1)
      },
      Click2:function (id) {
        let that =this
        console.log(id)
        if(that.List2.indexOf(id)>-1){
          that.List2.splice(that.List2.indexOf(id),1)
          document.getElementById("tianjia2("+id+")").innerHTML="添加"
        }
        else{
          that.List2.push(id)
          document.getElementById("tianjia2("+id+")").innerHTML="已添加"
        }
        console.log(that.List2)
      },
      Click3:function (id) {
        let that =this
        console.log(id)
        if(that.List3.indexOf(id)>-1){
          that.List3.splice(that.List3.indexOf(id),1)
          document.getElementById("tianjia3("+id+")").innerHTML="添加"
        }
        else{
          that.List3.push(id)
          document.getElementById("tianjia3("+id+")").innerHTML="已添加"
        }
        console.log(that.List3)
      },
      Click4:function (id) {
        let that =this
        console.log(id)
        if(that.List4.indexOf(id)>-1){
          that.List4.splice(that.List4.indexOf(id),1)
          document.getElementById("tianjia4("+id+")").innerHTML="添加"
        }
        else{
          that.List4.push(id)
          document.getElementById("tianjia4("+id+")").innerHTML="已添加"
        }
        console.log(that.List4)
      },
      Click5:function (id) {
        let that =this
        console.log(id)
        if(that.List5.indexOf(id)>-1){
          that.List5.splice(that.List5.indexOf(id),1)
          document.getElementById("tianjia5("+id+")").innerHTML="添加"
        }
        else{
          that.List5.push(id)
          document.getElementById("tianjia5("+id+")").innerHTML="已添加"
        }
        console.log(that.List5)
      },

      //  预览试卷
      SelfView:function () {
        let that =this
        console.log("预览试卷")
        that.$http.post('/teacher/practice/addpractice',{
          k:1,
          chooseList:that.List1,
          fillList:that.List2,
          judgeList:that.List3,
          choosemList:that.List4,
          programList:that.List5
        }).then(function (res) {
          console.log(res.data)
          that.ViewList1 = res.data.data[0]
          that.ViewList2 = res.data.data[1]
          that.ViewList3 = res.data.data[2]
          that.ViewList4 = res.data.data[3]
          that.ViewList5 = res.data.data[4]
        }).catch(function (error) {
          console.log(error)
        })
      },
      SelfOK:function () {
        let that =this
        console.log("完成问卷")
        if(that.List1.length ==0 ||that.List2.length==0||that.List3.length==0||that.List4.length==0||that.List5.length==0)
        {
          that.$alert('五类题型中还有题型没有添加，请检查', '警告', {
            confirmButtonText: '确定',})
        }
        else{
          that.$http.post('/teacher/practice/addpractice',{
            k:2,
            chooseList:that.List1,
            fillList:that.List2,
            judgeList:that.List3,
            choosemList:that.List4,
            programList:that.List5,
            name:that.SelfList.name,
            auth:that.$store.getters.getsId
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="完成问卷试卷")
            {
              that.$router.push({path:'/teacher/pCreate'})
            }
            // alert(res.data.message)
            that.$alert(res.data.message, '成功', {
              confirmButtonText: '确定',
              type:'success'
            })
            that.dialogFormVisible = false
            that.SelfList.name =""
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      getQuery:function () {
        let that =this
        that.getQuery1()
        that.getQuery2()
        that.getQuery3()
        that.getQuery4()
        that.getQuery5()
      }
    },
    created(){
      this.getQuery()
    }
  }
</script>

<style scoped>
  /*@import "../../../common/css/create.css";*/
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
    font-size: 18px;
    overflow:hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .display{
    padding-left: 5px;
    padding-top: 10px;
  }

  .display1{
    /*border: solid 1px #E5E7E9;*/
    height: 600px;
    width: 98%;
    /*padding-left: 5px;*/
    /*padding-right: 5px;*/
    background-color: #fff;
  }
  .display2
  {
    /*border: solid 5px #E5E7E9;*/
    height: auto;
    width: 95%;
    /*padding-left: 5px;*/
    /*padding-right: 5px;*/
    background-color: #fff;
    /*margin-bottom: 40px;*/
  }
  .page {
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #0ea0db;
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
    line-height: 30px;
    padding: 10px;
    height: 30px;
    width: 100px;
    margin: 0 10px;
  }
  .parc{
    text-align: left;
    margin: 20px 30px 20px 30px;
  }

</style>


