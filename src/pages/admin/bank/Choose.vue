<template>
    <!--选择题-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css" style="font-size: 0.25rem">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>题库信息</el-breadcrumb-item>
      <el-breadcrumb-item ><span @click="getQuerycquestion" style="font-weight: bold">选择题</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div class="display1">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 选择题列表</span>
          <div class="display2">
            <div class="searchmem">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="模糊查找" size="mini"></el-input>
              </div>
              <button class="btn3 el-icon-search" v-on:click="searchC()">搜索</button>
              <button class="btn3 el-icon-circle-plus-outline" @click="dialogFormVisibleadd = true">添加</button>
              <el-dialog title="添加选择题" :visible.sync="dialogFormVisibleadd">
                <el-form :model="addList">
                  <el-form-item label="题干" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.item" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="选项1" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.op1" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="选项2" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.op2" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="选项3" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.op3" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="选项4" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.op4" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="答案" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.ans" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="详解" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.tail" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="知识点" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addList.rem" auto-complete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" style="align-content: center" class="dialog-footer">
                  <el-button type="primary" @click="addcQuestion(addList)">提交</el-button>
                  <el-button @click="Reset">重置</el-button>
                </div>
              </el-dialog>
              <button class="btn2 el-icon-folder" @click="getQuerycquestionY">有效题目</button>
              <button class="btn2 el-icon-folder-remove" @click="getQuerycquestionN">无效题目</button>
              <button class="btn2 el-icon-folder-checked" @click="getQuerycquestion">所有题目</button>
              <button class="btn2 el-icon-document" @click="addC">批量添加</button>
              <input type="file" @change="importExcel(that)" id="inputExcel"
                     accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none"/>
            </div>
            <br>
            <br>
            <div class="waimian" >
              <div v-for="(cQuestion,index) in currentPageData" class="detail">
                <div>
                  <div>
                    <h3>[<span>序号：{{index+1}}</span><span>题编号：{{cQuestion.cqid}}</span>]<span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeitem=true;changeList.id=cQuestion.cqid;item=cQuestion.cqitem" class="span2">修改</span>
                      {{cQuestion.cqitem}}
                      <div class="delete">
                        <span v-if="cQuestion.cqstatus==1">有效</span>
                        <span v-if="cQuestion.cqstatus==1"@click="deleteChoose(1,cQuestion.cqid)" class="span1"><i class="el-icon-delete">删除</i></span>
                        <span v-if="cQuestion.cqstatus==0">无效
                          <span v-if="cQuestion.cqstatus==0" @click="changeChoose(9,cQuestion.cqid)" class="span2">修改</span>
                          <span v-if="cQuestion.cqstatus==0" @click="deleteChoose(2,cQuestion.cqid)" class="span1"><i class="el-icon-delete">删除</i></span>
                        </span>
                      </div>
                    </h3>
                  </div>
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
                      <el-button type="primary" @click="changeChoose(1,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangeitem=false">退出</el-button>
                    </div>
                  </el-dialog>
                  <div class="xuanxiang">
                    <span><span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeop1=true;changeList.id=cQuestion.cqid;item=cQuestion.cqcho.split('---')[0]" class="span2">修改</span>
                      选项1：{{cQuestion.cqcho.split('---')[0]}}

                    <el-dialog title="修改选项1" :visible.sync="dialogFormVisiblechangeop1">
                      <el-form :model="changeList">
                        <el-form-item label="选项内容1" :label-width="formLabelWidth">
                          <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="选项内容" :label-width="formLabelWidth">
                          <el-input style="width: 350px;" v-model="changeList.op1" auto-complete="off"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" style="align-content: center" class="dialog-footer">
                        <el-button type="primary" @click="changeChoose(2,changeList)">提交</el-button>
                        <el-button @click="dialogFormVisiblechangeop1=false">退出</el-button>
                      </div>
                    </el-dialog>
                    </span><br>
                    <span>
                      <span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeop2=true;changeList.id=cQuestion.cqid;item=cQuestion.cqcho.split('---')[1]" class="span2">修改</span>
                       选项2：{{cQuestion.cqcho.split('---')[1]}}

                  <el-dialog title="修改选项2" :visible.sync="dialogFormVisiblechangeop2">
                    <el-form :model="changeList">
                      <el-form-item label="选项内容2" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="选项内容" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.op2" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeChoose(3,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangeop2=false">退出</el-button>
                    </div>
                  </el-dialog>
                    </span><br>
                    <span>
                      <span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeop3=true;changeList.id=cQuestion.cqid;item=cQuestion.cqcho.split('---')[2]" class="span2">修改</span>
                     选项3：{{cQuestion.cqcho.split('---')[2]}}

                  <el-dialog title="修改选项3" :visible.sync="dialogFormVisiblechangeop3">
                    <el-form :model="changeList">
                      <el-form-item label="选项内容3" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="选项内容" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.op3" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeChoose(4,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangeop3=false">退出</el-button>
                    </div>
                  </el-dialog>
                   </span><br>
                    <span>
                      <span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeop4=true;changeList.id=cQuestion.cqid;item=cQuestion.cqcho.split('---')[3]" class="span2">修改</span>
                       选项4：{{cQuestion.cqcho.split('---')[3]}}

                  <el-dialog title="修改选项4" :visible.sync="dialogFormVisiblechangeop4">
                    <el-form :model="changeList">
                      <el-form-item label="选项内容4" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="选项内容" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.op4" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeChoose(5,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangeop4=false">退出</el-button>
                    </div>
                  </el-dialog>
                    </span><br>
                  </div>
                  <div>
                    <span><span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeans=true;changeList.id=cQuestion.cqid;item=cQuestion.cqans" class="span2">修改</span>
                      答案：{{cQuestion.cqans}}

                  <el-dialog title="修改答案" :visible.sync="dialogFormVisiblechangeans">
                    <el-form :model="changeList">
                      <el-form-item label="选项内容4" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="选项内容" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.ans" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeChoose(6,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangeans=false">退出</el-button>
                    </div>
                  </el-dialog>
                    </span><br>
                    <span><span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeans=true;changeList.id=cQuestion.cqid;item=cQuestion.cqans" class="span2">修改</span>
                      详解：{{cQuestion.cqtail}}

                  <el-dialog title="修改答案" :visible.sync="dialogFormVisiblechangeans">
                    <el-form :model="changeList">
                      <el-form-item label="选项内容4" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="选项内容" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.ans" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeChoose(6,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangeans=false">退出</el-button>
                    </div>
                  </el-dialog>
                    </span><br>
                    <span><span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangerem=true;changeList.id=cQuestion.cqid;item=cQuestion.cqtail" class="span2">修改</span>
                      知识点：{{cQuestion.cqrem}}

                  <el-dialog title="修改知识点" :visible.sync="dialogFormVisiblechangerem">
                    <el-form :model="changeList">
                      <el-form-item label="选项内容4" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="选项内容" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.rem" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeChoose(8,changeList)">提交</el-button>
                      <el-button @click="dialogFormVisiblechangerem=false">退出</el-button>
                    </div>
                  </el-dialog>
                    </span>
                  </div>

                </div>
              </div>
            </div>
            <span>
              <!--<table >-->
              <!--<tr>-->
              <!--<th>序号</th>-->
              <!--<th>题编号 </th>-->
              <!--<th>题干</th>-->
              <!--<th>选项1</th>-->
              <!--<th>选项2</th>-->
              <!--<th>选项3</th>-->
              <!--<th>选项4</th>-->
              <!--<th>答案</th>-->
              <!--<th>详解</th>-->
              <!--<th>相关知识</th>-->
              <!--<th>状态</th>-->
              <!--<th>操作</th>-->
              <!--</tr>-->
              <!--<tr v-for=" (cQuestion,key) in currentPageData" :key="key">-->
              <!--<td>{{ key+1 }}</td>-->
              <!--<td>{{cQuestion.cqid}}</td>-->
              <!--<td>-->
              <!--<el-tooltip placement="top" effect="light">-->
              <!--<div slot="content">{{cQuestion.cqitem}}</div>-->
              <!--<el-button class="btn1">{{cQuestion.cqid}}</el-button>-->
              <!--</el-tooltip>-->
              <!--<span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeitem=true;changeList.id=cQuestion.cqid;item=cQuestion.cqitem" class="span2">修改</span>-->
              <!--<el-dialog title="修改题干" :visible.sync="dialogFormVisiblechangeitem">-->
              <!--<el-form :model="changeList">-->
              <!--<el-form-item label="题干内容1" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="题干内容" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="changeList.item" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div slot="footer" style="align-content: center" class="dialog-footer">-->
              <!--<el-button type="primary" @click="changeChoose(1,changeList)">提交</el-button>-->
              <!--<el-button @click="dialogFormVisiblechangeitem=false">退出</el-button>-->
              <!--</div>-->
              <!--</el-dialog>-->
              <!--</td>-->
              <!--<td>-->
              <!--<el-tooltip placement="top" effect="light">-->
              <!--<div slot="content">{{cQuestion.cqcho.split('-&#45;&#45;')[0]}}</div>-->
              <!--<el-button class="btn1">{{cQuestion.cqid}}</el-button>-->
              <!--</el-tooltip>-->
              <!--<span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeop1=true;changeList.id=cQuestion.cqid;item=cQuestion.cqcho.split('-&#45;&#45;')[0]" class="span2">修改</span>-->
              <!--<el-dialog title="修改选项1" :visible.sync="dialogFormVisiblechangeop1">-->
              <!--<el-form :model="changeList">-->
              <!--<el-form-item label="选项内容1" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="选项内容" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="changeList.op1" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div slot="footer" style="align-content: center" class="dialog-footer">-->
              <!--<el-button type="primary" @click="changeChoose(2,changeList)">提交</el-button>-->
              <!--<el-button @click="dialogFormVisiblechangeop1=false">退出</el-button>-->
              <!--</div>-->
              <!--</el-dialog>-->
              <!--</td>-->
              <!--<td>-->
              <!--<el-tooltip placement="top" effect="light">-->
              <!--<div slot="content">{{cQuestion.cqcho.split('-&#45;&#45;')[1]}}</div>-->
              <!--<el-button class="btn1">{{cQuestion.cqid}}</el-button>-->
              <!--</el-tooltip>-->
              <!--<span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeop2=true;changeList.id=cQuestion.cqid;item=cQuestion.cqcho.split('-&#45;&#45;')[1]" class="span2">修改</span>-->
              <!--<el-dialog title="修改选项2" :visible.sync="dialogFormVisiblechangeop2">-->
              <!--<el-form :model="changeList">-->
              <!--<el-form-item label="选项内容2" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="选项内容" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="changeList.op2" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div slot="footer" style="align-content: center" class="dialog-footer">-->
              <!--<el-button type="primary" @click="changeChoose(3,changeList)">提交</el-button>-->
              <!--<el-button @click="dialogFormVisiblechangeop2=false">退出</el-button>-->
              <!--</div>-->
              <!--</el-dialog>-->
              <!--</td>-->
              <!--<td>-->
              <!--<el-tooltip placement="top" effect="light">-->
              <!--<div slot="content">{{cQuestion.cqcho.split('-&#45;&#45;')[2]}}</div>-->
              <!--<el-button class="btn1">{{cQuestion.cqid}}</el-button>-->
              <!--</el-tooltip>-->
              <!--<span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeop3=true;changeList.id=cQuestion.cqid;item=cQuestion.cqcho.split('-&#45;&#45;')[2]" class="span2">修改</span>-->
              <!--<el-dialog title="修改选项3" :visible.sync="dialogFormVisiblechangeop3">-->
              <!--<el-form :model="changeList">-->
              <!--<el-form-item label="选项内容3" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="选项内容" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="changeList.op3" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div slot="footer" style="align-content: center" class="dialog-footer">-->
              <!--<el-button type="primary" @click="changeChoose(4,changeList)">提交</el-button>-->
              <!--<el-button @click="dialogFormVisiblechangeop3=false">退出</el-button>-->
              <!--</div>-->
              <!--</el-dialog>-->
              <!--</td>-->
              <!--<td>-->
              <!--<el-tooltip placement="top" effect="light">-->
              <!--<div slot="content">{{cQuestion.cqcho.split('-&#45;&#45;')[3]}}</div>-->
              <!--<el-button class="btn1">{{cQuestion.cqid}}</el-button>-->
              <!--</el-tooltip>-->
              <!--<span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeop4=true;changeList.id=cQuestion.cqid;item=cQuestion.cqcho.split('-&#45;&#45;')[3]" class="span2">修改</span>-->
              <!--<el-dialog title="修改选项4" :visible.sync="dialogFormVisiblechangeop4">-->
              <!--<el-form :model="changeList">-->
              <!--<el-form-item label="选项内容4" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="选项内容" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="changeList.op4" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div slot="footer" style="align-content: center" class="dialog-footer">-->
              <!--<el-button type="primary" @click="changeChoose(5,changeList)">提交</el-button>-->
              <!--<el-button @click="dialogFormVisiblechangeop4=false">退出</el-button>-->
              <!--</div>-->
              <!--</el-dialog>-->
              <!--</td>-->
              <!--<td>-->
              <!--<el-tooltip placement="top" effect="light">-->
              <!--<div slot="content">{{cQuestion.cqans}}</div>-->
              <!--<el-button class="btn1">{{cQuestion.cqid}}</el-button>-->
              <!--</el-tooltip>-->
              <!--&lt;!&ndash;<span v-if="cQuestion.cqstatus==1" @click="" class="span2">修改答案</span>&ndash;&gt;-->
              <!--<span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangeans=true;changeList.id=cQuestion.cqid;item=cQuestion.cqans" class="span2">修改</span>-->
              <!--<el-dialog title="修改答案" :visible.sync="dialogFormVisiblechangeans">-->
              <!--<el-form :model="changeList">-->
              <!--<el-form-item label="选项内容4" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="选项内容" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="changeList.ans" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div slot="footer" style="align-content: center" class="dialog-footer">-->
              <!--<el-button type="primary" @click="changeChoose(6,changeList)">提交</el-button>-->
              <!--<el-button @click="dialogFormVisiblechangeans=false">退出</el-button>-->
              <!--</div>-->
              <!--</el-dialog>-->
              <!--</td>-->
              <!--<td>-->
              <!--<el-tooltip placement="top" effect="light">-->
              <!--<div slot="content">{{cQuestion.cqtail}}</div>-->
              <!--<el-button class="btn1">{{cQuestion.cqid}}</el-button>-->
              <!--</el-tooltip>-->
              <!--&lt;!&ndash;<span v-if="cQuestion.cqstatus==1" @click="" class="span2">修改详解</span>&ndash;&gt;-->
              <!--<span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangetail=true;changeList.id=cQuestion.cqid;item=cQuestion.cqtail" class="span2">修改</span>-->
              <!--<el-dialog title="修改详解" :visible.sync="dialogFormVisiblechangetail">-->
              <!--<el-form :model="changeList">-->
              <!--<el-form-item label="选项内容4" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="选项内容" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="changeList.tail" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div slot="footer" style="align-content: center" class="dialog-footer">-->
              <!--<el-button type="primary" @click="changeChoose(7,changeList)">提交</el-button>-->
              <!--<el-button @click="dialogFormVisiblechangetail=false">退出</el-button>-->
              <!--</div>-->
              <!--</el-dialog>-->
              <!--</td>-->
              <!--<td>-->
              <!--<el-tooltip placement="top" effect="light">-->
              <!--<div slot="content">{{cQuestion.cqrem}}</div>-->
              <!--<el-button class="btn1">{{cQuestion.cqid}}</el-button>-->
              <!--</el-tooltip>-->
              <!--&lt;!&ndash;<span v-if="cQuestion.cqstatus==1" @click="" class="span2">修改知识点</span>&ndash;&gt;-->
              <!--<span v-if="cQuestion.cqstatus==1" @click="dialogFormVisiblechangerem=true;changeList.id=cQuestion.cqid;item=cQuestion.cqtail" class="span2">修改</span>-->
              <!--<el-dialog title="修改知识点" :visible.sync="dialogFormVisiblechangerem">-->
              <!--<el-form :model="changeList">-->
              <!--<el-form-item label="选项内容4" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="item" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--<el-form-item label="选项内容" :label-width="formLabelWidth">-->
              <!--<el-input style="width: 350px;" v-model="changeList.rem" auto-complete="off"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-form>-->
              <!--<div slot="footer" style="align-content: center" class="dialog-footer">-->
              <!--<el-button type="primary" @click="changeChoose(8,changeList)">提交</el-button>-->
              <!--<el-button @click="dialogFormVisiblechangerem=false">退出</el-button>-->
              <!--</div>-->
              <!--</el-dialog>-->
              <!--</td>-->
              <!--<td v-if="cQuestion.cqstatus==1">有效</td>-->
              <!--<td v-if="cQuestion.cqstatus==0">无效-->
              <!--<span v-if="cQuestion.cqstatus==0" @click="changeChoose(9,cQuestion.cqid)" class="span2">修改</span>-->
              <!--</td>-->
              <!--<td>-->

              <!--<span v-if="cQuestion.cqstatus==1"@click="deleteChoose(1,cQuestion.cqid)" class="span1"><i class="el-icon-delete">删除题目</i></span>-->
              <!--<span v-if="cQuestion.cqstatus==0" @click="deleteChoose(2,cQuestion.cqid)" class="span1"><i class="el-icon-delete">永久删除</i></span>-->
              <!--</td>-->
              <!--</tr>-->
              <!--</table>-->
            </span>
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
        name: "Choose",
      data(){
          return{
            formLabelWidth: '120px',
            //题库列表
            cQuestionList:[],
            //搜索
            inputname:'',
            //添加
            dialogFormVisibleadd:false,
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
            //修改
            changeList:{
              id:'',
              item:'',
              op1:'',
              op2:'',
              op3:'',
              op4:'',
              ans:'',
              tail:'',
              rem:'',
              status:''
            },
            item:'',
            dialogFormVisiblechangeitem:false,
            dialogFormVisiblechangeop1:false,
            dialogFormVisiblechangeop2:false,
            dialogFormVisiblechangeop3:false,
            dialogFormVisiblechangeop4:false,
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
        //分页
        setCurrentPageDate: function () {
          let that =this
          let begin = (that.currentPage - 1) * that.pageSize;
          let end = that.currentPage * that.pageSize;
          that.currentPageData = that.cQuestionList.slice(begin, end)
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
          //获取选择题列表
        getQuerycquestion:function(){
          let that =this
          that.$http.post('/bank/chooseq/querychoose',{
            flag:1
          }).then(function (res) {
            console.log(res.data)
            that.cQuestionList = res.data.data
            that.totalPage =Math.ceil(that.cQuestionList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          }).catch(function (error) {
            console.log(error)
          })
        },
        //获取有效选择题列表
        getQuerycquestionY:function(){
          let that =this
          that.$http.post('/bank/chooseq/querychoose',{
            flag:2
          }).then(function (res) {
            console.log(res.data)
            that.cQuestionList = res.data.data
            that.totalPage =Math.ceil(that.cQuestionList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          }).catch(function (error) {
            console.log(error)
          })
        },
        //获取无效选择题列表
        getQuerycquestionN:function(){
          let that =this
          that.$http.post('/bank/chooseq/querychoose',{
            flag:4
          }).then(function (res) {
            console.log(res.data)
            that.cQuestionList = res.data.data
            that.totalPage =Math.ceil(that.cQuestionList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          }).catch(function (error) {
            console.log(error)
          })
        },
          //搜索
        searchC:function () {
          let that =this
          console.log(that.name)
          that.$http.post('/bank/chooseq/querychoose',{
            flag:3,
            name:that.inputname
          }).then(function (res) {
            console.log(res.data)
            that.cQuestionList = res.data.data
            that.totalPage =Math.ceil(that.cQuestionList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          }).catch(function (error) {
            console.log(error)
          })
        },
        //添加题库
        addcQuestion:function (List) {
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
          else if(List.op1==''||List.op2==''||List.op3==''||List.op4==''){
            that.$alert('必须为四个选项', '警告', {
              confirmButtonText: '确定',})
          }
          else{
            that.$http.post('/bank/chooseq/addchoose',{
              qitem:List.item,
              op1:List.op1,
              op2:List.op2,
              op3:List.op3,
              op4:List.op4,
              ans:List.ans,
              tail:List.tail,
              rem:List.rem,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="插入选择题成功")
              {
                that.getQuerycquestion()
                alert("插入选择题成功")
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
          that.addList.op1=""
          that.addList.op2=""
          that.addList.op3=""
          that.addList.op4=""
          that.addList.item=""
        },
        //修改
        //1:题干
        //2：选项1
        //3：选项2
        //4：选项3
        //5：选项4
        //6：答案
        //7：详解
        //8：知识点
        //9:状态
        changeChoose:function (item,id) {
          let that =this
          console.log(item)
          if(item==1) {
            that.$http.post('/bank/chooseq/change',{
              cid:that.changeList.id,
              flag:1,
              item:that.changeList.item,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该选择题题干修改成功")
              {
                that.getQuerycquestion()
              }
              alert(res.data.message)
              that.dialogFormVisiblechangeitem=false
              that.changeList.id=""
              that.changeList.item=""
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==2) {
            that.$http.post('/bank/chooseq/change',{
              cid:that.changeList.id,
              flag:2,
              top:1,
              op1:that.changeList.op1,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该选择题选项1修改成功")
              {
                that.getQuerycquestion()
              }
              alert(res.data.message)
              that.dialogFormVisiblechangeop1=false
              that.changeList.id=""
              that.changeList.op1=""
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==3){
            that.$http.post('/bank/chooseq/change',{
              cid:that.changeList.id,
              flag:2,
              top:2,
              op2:that.changeList.op2,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该选择题选项2修改成功")
              {
                that.getQuerycquestion()
              }
              alert(res.data.message)
              that.dialogFormVisiblechangeop2=false
              that.changeList.id=""
              that.changeList.op2=""
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==4){
            that.$http.post('/bank/chooseq/change',{
              cid:that.changeList.id,
              flag:2,
              top:3,
              op3:that.changeList.op3,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该选择题选项3修改成功")
              {
                that.getQuerycquestion()
              }
              alert(res.data.message)
              that.dialogFormVisiblechangeop3=false
              that.changeList.id=""
              that.changeList.op3=""
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==5){
            that.$http.post('/bank/chooseq/change',{
              cid:that.changeList.id,
              flag:2,
              top:4,
              op4:that.changeList.op4,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该选择题选项4修改成功")
              {
                that.getQuerycquestion()
              }
              alert(res.data.message)
              that.dialogFormVisiblechangeop4=false
              that.changeList.id=""
              that.changeList.op4=""
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==6){
            that.$http.post('/bank/chooseq/change',{
              cid:that.changeList.id,
              flag:3,
              ans:that.changeList.ans,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该选择题答案修改成功")
              {
                that.getQuerycquestion()
              }
              alert(res.data.message)
              that.dialogFormVisiblechangeans=false
              that.changeList.id=""
              that.changeList.ans=""
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==7){
            that.$http.post('/bank/chooseq/change',{
              cid:that.changeList.id,
              flag:4,
              tail:that.changeList.tail,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该选择题详解修改成功")
              {
                that.getQuerycquestion()
              }
              alert(res.data.message)
              that.dialogFormVisiblechangetail=false
              that.changeList.id=""
              that.changeList.tail=""
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==8){
            that.$http.post('/bank/chooseq/change',{
              cid:that.changeList.id,
              flag:5,
              rem:that.changeList.rem,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="该选择题相关知识修改成功")
              {
                that.getQuerycquestion()
              }
              alert(res.data.message)
              that.dialogFormVisiblechangerem=false
              that.changeList.id=""
              that.changeList.tail=""
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==9){
            console.log(id)
            that.$http.post('/bank/chooseq/change',{
              cid:id,
              flag:6,
              auth:that.$store.getters.getsId
            }).then(function (res) {

              console.log(res.data)
              if(res.data.message=="该选择题状态修改成功")
              {
                that.getQuerycquestion()
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
        deleteChoose:function (item,id) {
          let that =this
          console.log(item)
          if(item==1)
          {
            that.$confirm("删除该用户选择题，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              that.$http.post('/bank/chooseq/delete',{
                cid:id,
                flag:1,
                auth:that.$store.getters.getsId
              }).then(function (res) {
                console.log(res.data)
                if(res.data.message=="该选择题删除成功")
                {
                  that.getQuerycquestion()
                }
                alert(res.data.message)
              })
            }).catch(function (error) {
              console.log(error)
            });
          }
          else if(item==2)
          {
            that.$confirm("永久删除该用户选择题，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              that.$http.post('/bank/chooseq/delete',{
                cid:id,
                flag:2
              }).then(function (res) {
                console.log(res.data)
                if(res.data.message=="该选择题永久删除成功")
                {
                  that.getQuerycquestion()
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
        addC:function()
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
                obj.op1= v.选项一
                obj.op2= v.选项二
                obj.op3= v.选项三
                obj.op4= v.选项四
                obj.ans= v.答案
                obj.tail= v.详解
                obj.rem= v.相关点
                obj.auth=_that.$store.getters.getsId
                arr.push(obj)
              })
              _that.memberList = [...arr]
              let data = {
                data: JSON.stringify(_that.memberList)
              }
              console.log(data)
              _that.$http.post('/bank/chooseq/importexcel', data).then(body => {
                alert(body.data.message)
                _that.getQuerycquestion()
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
          this.getQuerycquestion()
      }
    }
</script>

<style scoped>

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
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;

  }
  .delete{
    float: right!important;
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
  .waimian{
    margin-top: 60px;
    margin-top: 10px;
    text-align: left;
    width: auto;
    height: auto;
  }
  .xuanxiang{
    width: auto;
    color: gray;
    font-size: 14px;
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
</style>
