<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{ path: '/admin/exam/create' }">测评题库</el-breadcrumb-item>
        <el-breadcrumb-item>创建试卷</el-breadcrumb-item>
      </el-breadcrumb>
      <div><hr/></div>
    </div>
    <div class="nnn">
      <el-row class="tac">
        <el-col :span="3">
          <el-menu class="el-menu-vertical-demo">
            <el-menu-item index="1" v-on:click="addCClick">
              <i class="el-icon-menu"></i>
              <span slot="title"  >单选题</span>
            </el-menu-item>
            <el-menu-item index="2" v-on:click="addFClick">
              <i class="el-icon-menu"></i>
              <span slot="title" >填空题</span>
            </el-menu-item>
            <el-menu-item index="3" v-on:click="addJClick">
              <i class="el-icon-menu"></i>
              <span slot="title" >判断题</span>
            </el-menu-item>
            <el-menu-item index="4" v-on:click="addCMClick">
              <i class="el-icon-chat-dot-round"></i>
              <span slot="title" >多选题</span>
            </el-menu-item>
            <el-menu-item index="5" v-on:click="addPClick">
              <i class="el-icon-menu"></i>
              <span slot="title" >程序题</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="16">
          <div>
            <div class="ttitle">
              试卷名称：<input type="text" v-model="exname" placeholder="试卷名称" class="exname" style="width: 300px"/>
              <br>
              规定时间(分钟)：<input type="text" v-model="gdtime" placeholder="规定时间" class="exname" style="display: inline-block"/>
              <hr/>
            </div>
            <div class="create">
              <!--单选题-->
              <el-form v-if="CList.length>0">
                <h3>选择题</h3>
                <el-form-item v-for="(item,index) in CList" :key="index">
                  <span>({{index+1}})</span>
                  题   干：<vue-html5-editor :content="item.cqitem" :height="100" @change="updateDataCItem($event,index)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.cqitem" placeholder="题目题干" class="input"></el-input>-->
                  <el-button @click.prevent="deleteCClick(index)" type="danger" >删除</el-button><br>
                  选项  一：
                  <vue-html5-editor :content="item.cqcho1" :height="100" @change="updateDataCcho($event,index,1)">
                  </vue-html5-editor>
                  <el-button v-on:click="SetCAns(index,1)" type="danger" :id="sets(index)">设置为正确答案</el-button><br>
                  <!--<el-input v-model="item.cqcho1" placeholder="题目选项一" class="input"></el-input><br>-->
                  选项  二：
                  <vue-html5-editor :content="item.cqcho2" :height="100" @change="updateDataCcho($event,index,2)">
                  </vue-html5-editor>
                  <el-button v-on:click="SetCAns(index,2)" type="danger" >设置为正确答案</el-button><br>
                  <!--<el-input v-model="item.cqcho2" placeholder="题目选项二" class="input"></el-input><br>-->
                  选项  三：
                  <vue-html5-editor :content="item.cqcho3" :height="100" @change="updateDataCcho($event,index,3)">
                  </vue-html5-editor>
                  <el-button v-on:click="SetCAns(index,3)" type="danger" >设置为正确答案</el-button><br>
                  <!--<el-input v-model="item.cqcho3" placeholder="题目选项三" class="input"></el-input><br>-->
                  选项  四：
                  <vue-html5-editor :content="item.cqcho4" :height="100" @change="updateDataCcho($event,index,4)">
                  </vue-html5-editor>
                  <el-button v-on:click="SetCAns(index,4)" type="danger" >设置为正确答案</el-button><br>
                  <!--<el-input v-model="item.cqcho4"rem placeholder="题目选项四" class="input"></el-input><br>-->
                  相关知识：
                  <vue-html5-editor :content="item.cqrem" :height="100" @change="updateDataCOther($event,index,2)">
                  </vue-html5-editor>
                  <!--<el-input v-model="item.cqrem" placeholder="题目相关知识" class="input"></el-input><br>-->
                  <!--答    案：-->
                  <!--<vue-html5-editor :content="item.cqans" :height="100" @change="updateDataCOther($event,index,1)">-->
                  <!--</vue-html5-editor>-->
                  <!--<el-input v-model="item.cqans" placeholder="题目答案" class="input"></el-input><br>-->
                  详    解：<vue-html5-editor :content="item.cqtail" :height="100" @change="updateDataCOther($event,index,3)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.cqtail" placeholder="题目详解" class="input"></el-input><br>-->
                </el-form-item>
              </el-form>
              <!--填空题-->
              <el-form v-if="FList.length>0">
                <h3>填空题</h3>
                <el-form-item v-for="(item,index) in FList" :key="index">
                  <span>（{{index+1}}）</span>
                  题  干：<vue-html5-editor :content="item.fitem" :height="100" @change="updateDataFItem($event,index,1)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.fitem" placeholder="题目题干" class="input"></el-input>-->
                  <el-button @click.prevent="deleteFClick(index)" type="danger" >删除</el-button><br>
                  相关知识：<vue-html5-editor :content="item.frem" :height="100" @change="updateDataFItem($event,index,3)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.frem" placeholder="题目相关知识" class="input"></el-input><br>-->
                  答    案：<vue-html5-editor :content="item.fans" :height="100" @change="updateDataFItem($event,index,2)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.fans" placeholder="题目答案" class="input"></el-input><br>-->
                  详    解：<vue-html5-editor :content="item.ftail" :height="100" @change="updateDataFItem($event,index,4)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.ftail" placeholder="题目详解" class="input"></el-input><br>-->
                </el-form-item>
              </el-form>
              <!--判断题-->
              <el-form v-if="JList.length>0">
                <h3>判断题</h3>
                <el-form-item v-for="(item,index) in JList" :key="index">
                  <span>（{{index+1}}）</span>
                  题    干：<vue-html5-editor :content="item.ftail" :height="100" @change="updateDataJItem($event,index,1)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.jitem" placeholder="题目题干" class="input"></el-input>-->
                  <el-button @click.prevent="deleteJClick(index)" type="danger" >删除</el-button><br>
                  相关知识：<vue-html5-editor :content="item.jrem" :height="100" @change="updateDataJItem($event,index,2)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.jrem" placeholder="题目相关知识" class="input"></el-input><br>-->
                  答    案：
                  <!--<el-input v-model="item.jans" placeholder="题目答案" class="input"></el-input><br>-->
                  <input type="radio" :name="index" v-model="item.jans" value="1">正确
                  <input type="radio" :name="index" v-model="item.jans" value="0">错误
                  <br>
                  详    解：<vue-html5-editor :content="item.jtail" :height="100" @change="updateDataJItem($event,index,3)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.jtail" placeholder="题目详解" class="input"></el-input><br>-->
                </el-form-item>
              </el-form>
              <!--多选题-->
              <el-form v-if="CMList.length>0">
                <h3>多选题</h3>
                <el-form-item v-for="(item,index) in CMList" :key="index">
                  <span>（{{index+1}}）</span>
                  题  干：<vue-html5-editor :content="item.mitem" :height="100" @change="updateDataCMItem($event,index,1)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.mitem" placeholder="题目题干" class="input"></el-input>-->
                  <el-button @click.prevent="deleteCMClick(index)" type="danger" >删除</el-button><br>
                  选项  一：<vue-html5-editor :content="item.mcho1" :height="100" @change="updateDataCMcho($event,index,1)">
                </vue-html5-editor>
                  <el-button v-on:click="SetCMAns(index,1)" type="danger" >设置为正确答案</el-button><br>
                  <!--<el-input v-model="item.mcho1" placeholder="题目选项一" class="input"></el-input><br>-->
                  选项  二：<vue-html5-editor :content="item.mcho2" :height="100" @change="updateDataCMcho($event,index,2)">
                </vue-html5-editor>
                  <el-button v-on:click="SetCMAns(index,2)" type="danger" >设置为正确答案</el-button><br>
                  <!--<el-input v-model="item.mcho2" placeholder="题目选项二" class="input"></el-input><br>-->
                  选项  三：<vue-html5-editor :content="item.mcho3" :height="100" @change="updateDataCMcho($event,index,3)">
                </vue-html5-editor>
                  <el-button v-on:click="SetCMAns(index,3)" type="danger" >设置为正确答案</el-button><br>
                  <!--<el-input v-model="item.mcho3" placeholder="题目选项三" class="input"></el-input><br>-->
                  选项  四：<vue-html5-editor :content="item.mcho4" :height="100" @change="updateDataCMcho($event,index,4)">
                </vue-html5-editor>
                  <el-button v-on:click="SetCMAns(index,4)" type="danger" >设置为正确答案</el-button><br>
                  <!--<el-input v-model="item.mcho4"rem placeholder="题目选项四" class="input"></el-input><br>-->
                  相关知识：<vue-html5-editor :content="item.mrem" :height="100" @change="updateDataCMItem($event,index,3)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.mrem" placeholder="题目相关知识" class="input"></el-input><br>-->
                  <!--答    案：<vue-html5-editor :content="item.mans" :height="100" @change="updateDataCMItem($event,index,2)">-->
                <!--</vue-html5-editor>-->
                  <!--<el-input v-model="item.mans" placeholder="题目答案" class="input"></el-input><br>-->
                  详    解：<vue-html5-editor :content="item.mtail" :height="100" @change="updateDataCMItem($event,index,4)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.mtail" placeholder="题目详解" class="input"></el-input><br>-->
                  <span>多选题答案选项用“---”连接，如答案为ABC 则显示在A---B---C</span>
                </el-form-item>
              </el-form>
              <!--程序题-->
              <el-form v-if="PList.length>0">
                <h3>程序题</h3>
                <el-form-item v-for="(item,index) in PList" :key="index">
                  <span>（{{index+1}}）</span>
                  题   干：<vue-html5-editor :content="item.pitem" :height="100" @change="updateDataPItem($event,index,1)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.pitem" placeholder="题目题干" class="input"></el-input>-->
                  <el-button @click.prevent="deletePClick(index)" type="danger" >删除</el-button><br>
                  相关知识：<vue-html5-editor :content="item.prem" :height="100" @change="updateDataPItem($event,index,2)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.prem" placeholder="题目相关知识" class="input"></el-input><br>-->
                  答    案：<vue-html5-editor :content="item.pans" :height="100" @change="updateDataPItem($event,index,4)">
                </vue-html5-editor>
                  <!--<MonacoEditor :codes="code_content"-->
                                <!--:read-only="false"-->
                                <!--:language="yuyan" @contentBody="changePValue"></MonacoEditor>-->
                  <!--<el-input v-model="item.pans" placeholder="题目答案" class="input"></el-input><br>-->
                  详    解：<vue-html5-editor :content="item.ptail" :height="100" @change="updateDataPItem($event,index,3)">
                </vue-html5-editor>
                  <!--<el-input v-model="item.ptail" placeholder="题目详解" class="input"></el-input><br>-->
                </el-form-item>
              </el-form>
            </div>
            <button class="btn2 el-icon-circle-plus-outline" @click="createOK">完成创建</button>
          </div>
        </el-col>
        <el-col :span="1">
          <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :span="4" >
          <div class="yulan">
            <div v-if="CList.length >0">
              <h3>选择题</h3>
              <span v-for="(c,key1) in CList":key="key1" >
                  ({{key1+1}})<span class="item" v-html="c.cqitem">{{c.cqitem}}</span><br>
                    <el-radio-group >
                      <el-radio :label="3" ><span v-html="c.cqcho1">{{c.cqcho1}}</span></el-radio><br>
                      <el-radio :label="6" ><span v-html="c.cqcho2">{{c.cqcho2}}</span></el-radio><br>
                      <el-radio :label="9" ><span v-html="c.cqcho3">{{c.cqcho3}}</span></el-radio><br>
                      <el-radio :label="10"><span v-html="c.cqcho4">{{c.cqcho4}}</span>,</el-radio><br>
                    </el-radio-group><br>
                  <span class="ans" >答案：<span v-html="c.cqans">{{c.cqans}}</span> </span><br>
                  <span class="tail">详解：<span v-html="c.cqtail">{{c.cqtail}}</span></span><br>
                  <span class="rem">相关知识：<span v-html="c.cqrem">{{c.cqrem}}</span> </span><br>
                </span>
            </div>

            <div v-if="FList.length>0">
              <h3>填空题</h3>
              <span v-for="(c,key1) in FList":key="key1" >
                  <span class="item">({{key1+1}})<span v-html="c.fitem"> {{c.fitem}}</span></span><br>
                  <span class="ans" >答案：<span v-html="c.fans">{{c.fans}}</span> </span><br>
                  <span class="tail">详解：<span v-html="c.ftail">{{c.ftail}}</span> </span><br>
                  <span class="rem">相关知识：<span v-html="c.frem">{{c.frem}}</span> </span><br>
                </span>
            </div>

            <div v-if="JList.length>0">
              <h3>判断题</h3>
              <span v-for="(c,key1) in JList":key="key1" >
                  <span class="item">({{key1+1}})<span v-html="c.jitem">{{c.jitem}}</span> </span><br>
                  <span class="ans" v-if="c.jans==1">答案：正确</span>
                  <span class="ans" v-if="c.jans==0">答案：错误</span><br>
                  <span class="tail">详解：<span v-html="c.jtail">{{c.jtail}}</span> </span><br>
                  <span class="rem">相关知识：<span v-html="c.jrem">{{c.jrem}}</span> </span><br>
                </span>
            </div>

            <div v-if="CMList.length>0">
              <h3>多选题</h3>
              <span v-for="(c,key1) in CMList":key="key1" >
                  <span class="item">({{key1+1}})<span v-html="c.mitem">{{c.mitem}}</span> </span><br>
                  <el-radio-group >
                      <el-radio :label="3"><span v-html="c.mcho1">{{c.mcho1}}</span> </el-radio><br>
                      <el-radio :label="6"><span v-html="c.mcho2">{{c.mcho2}}</span></el-radio><br>
                      <el-radio :label="9"><span v-html="c.mcho3">{{c.mcho3}}</span></el-radio><br>
                      <el-radio :label="10"><span v-html="c.mcho4">{{c.mcho4}}</span></el-radio><br>
                    </el-radio-group><br>
                  <span class="ans" >答案：<span v-html="c.mans">{{c.mans}}</span></span><br>
                  <span class="tail">详解：<span v-html="c.mtail">{{c.mtail}}</span></span><br>
                  <span class="rem">相关知识：<span v-html="c.mrem">{{c.mrem}}</span></span><br>
                </span>
            </div>

            <div v-if="PList.length>0">
              <h3>程序题</h3>
              <span v-for="(c,key1) in PList":key="key1" >
                  <span class="item">({{key1+1}})<span v-html="c.pitem">{{c.pitem}}</span></span><br>
                  <span class="ans" >答案：<span v-html="c.pans">{{c.pans}}</span></span><br>
                  <span class="tail">详解：<span v-html="c.ptail">{{c.ptail}}</span></span><br>
                  <span class="rem">相关知识：<span v-html="c.prem">{{c.prem}}</span></span><br>
                </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>

  import MonacoEditor from "../../../components/MonacoEditor";
  export default {
    name: "tNewcreate",
    components: {MonacoEditor},
    data(){
      return{
        exname:'',
        gdtime:0,
        CList:[],
        FList:[],
        JList:[],
        CMList:[],
        PList:[],
      }
    },
    methods:{
      //富文本编辑器
      //选择题
      updateDataCItem ($event="",f) {
        let that =this
        console.log($event)
        let c1 = $event.replace(/<img width="200px" height="200px"/g, "<img");
        let c2 = c1.replace(/<img/g, '<img width="200px" height="200px"');
        that.CList[f].cqitem = c2
        console.log(that.CList[f].cqitem)
      },
      updateDataCcho ($event="",f,flag) {
        let that =this
        console.log($event)
        let c1 = $event.replace(/<img width="200px" height="200px"/g, "<img");
        let c2 = c1.replace(/<img/g, '<img width="200px" height="200px"');
        switch (flag) {
          case 1:
            that.CList[f].cqcho1 = c2
            console.log(that.CList[f].cqcho1)
                break;
          case 2:
            that.CList[f].cqcho2 = c2
            console.log(that.CList[f].cqcho2)
            break;
          case 3:
            that.CList[f].cqcho3 = c2
            console.log(that.CList[f].cqcho3)
            break;
          case 4:
            that.CList[f].cqcho4 = c2
            console.log(that.CList[f].cqcho4)
            break;
          default:
            break
        }
      },
      updateDataCOther ($event="",f,flag) {
        let that =this
        console.log($event)
        let c1 = $event.replace(/<img width="200px" height="200px"/g, "<img");
        let c2 = c1.replace(/<img/g, '<img width="200px" height="200px"');
        switch (flag) {
          case 1:
            that.CList[f].cqans = c2
            console.log(that.CList[f].cqans)
            break;
          case 2:
            that.CList[f].cqrem = c2
            console.log(that.CList[f].cqrem)
            break;
          case 3:
            that.CList[f].cqtail = c2
            console.log(that.CList[f].cqtail)
            break;
          default:
            break
        }
      },
      //填空题
      updateDataFItem ($event="",f,flag) {
        let that =this
        console.log($event)
        let c1 = $event.replace(/<img width="200px" height="200px"/g, "<img");
        let c2 = c1.replace(/<img/g, '<img width="200px" height="200px"');
        switch (flag) {
          case 1:
            //item
            that.FList[f].fitem = c2
            console.log(that.FList[f].fitem)
                break
          case 2:
            that.FList[f].fans = c2
            console.log(that.FList[f].fans)
            break
          case 3:
            that.FList[f].frem = c2
            console.log(that.FList[f].frem)
            break
          case 4:
            that.FList[f].ftail = c2
            console.log(that.FList[f].ftail)
            break
          default:
            break
        }
      },
      //判断题
      updateDataJItem ($event="",f,flag) {
        let that =this
        console.log($event)
        let c1 = $event.replace(/<img width="200px" height="200px"/g, "<img");
        let c2 = c1.replace(/<img/g, '<img width="200px" height="200px"');
        switch (flag) {
          case 1:
            //item
            that.JList[f].jitem = c2
            console.log(that.JList[f].jitem)
            break
          case 2:
            that.JList[f].jrem = c2
            console.log(that.JList[f].jrem)
            break
          case 3:
            that.JList[f].jtail = c2
            console.log(that.JList[f].jtail)
            break
          default:
            break
        }
      },
      //多选题
      updateDataCMItem ($event="",f,flag) {
        let that =this
        console.log($event)
        let c1 = $event.replace(/<img width="200px" height="200px"/g, "<img");
        let c2 = c1.replace(/<img/g, '<img width="200px" height="200px"');
        switch (flag) {
          case 1:
            that.CMList[f].mitem = c2
            console.log(that.CMList[f].mitem)
                break
          case 2:
            that.CMList[f].mans = c2
            console.log(that.CMList[f].mans)
            break
          case 3:
            that.CMList[f].mrem = c2
            console.log(that.CMList[f].mrem)
            break
          case 4:
            that.CMList[f].mtail= c2
            console.log(that.CMList[f].mtail)
            break
          default:
            break
        }

      },
      updateDataCMcho ($event="",f,flag) {
        let that =this
        console.log($event)
        let c1 = $event.replace(/<img width="200px" height="200px"/g, "<img");
        let c2 = c1.replace(/<img/g, '<img width="200px" height="200px"');
        switch (flag) {
          case 1:
            that.CMList[f].mcho1 = c2
            console.log(that.CMList[f].mcho1)
            break;
          case 2:
            that.CMList[f].mcho2 = c2
            console.log(that.CMList[f].mcho2)
            break;
          case 3:
            that.CMList[f].mcho3 = c2
            console.log(that.CMList[f].mcho3)
            break;
          case 4:
            that.CMList[f].mcho4 = c2
            console.log(that.CMList[f].mcho4)
            break;
          default:
            break
        }
      },
      //程序题
      updateDataPItem ($event="",f,flag) {
        let that =this
        console.log($event)
        let c1 = $event.replace(/<img width="200px" height="200px"/g, "<img");
        let c2 = c1.replace(/<img/g, '<img width="200px" height="200px"');
        switch (flag) {
          case 1:
            //item
            that.PList[f].pitem = c2
            console.log(that.PList[f].pitem)
            break
          case 2:
            that.PList[f].prem = c2
            console.log(that.PList[f].prem)
            break
          case 3:
            that.PList[f].ptail = c2
            console.log(that.PList[f].ptail)
            break
          case 4:
            that.PList[f].pans = c2
            console.log(that.PList[f].pans)
            break
          default:
            break
        }
      },
      //添加选择题
      addCClick:function(){
        this.CList.push({
          cqitem:'',
          cqcho1:'',
          cqcho2:'',
          cqcho3:'',
          cqcho4:'',
          cqans:'',
          cqrem:'',
          cqtail:''
        })
      },
      //设置选择题的答案
      sets:function(id)
      {
          return "sets("+id+")";
      },
      SetCAns:function(id,flag) {
        let that =this
        switch (flag) {
          case 1:
            if(that.CList[id].cqans==that.CList[id].cqcho1)
            {
              that.CList[id].cqans = ''
              document.getElementById("sets("+id+")").innerHTML="设置选项为答案"
            }
            else {
              that.CList[id].cqans = that.CList[id].cqcho1
              document.getElementById("sets("+id+")").innerHTML="取消该答案"
            }
            break
          case 2:
            if(that.CList[id].cqans==that.CList[id].cqcho2)
            {
              that.CList[id].cqans = ''
              document.getElementById("sets("+id+")").innerHTML="设置选项为答案"
            }
            else {
              that.CList[id].cqans = that.CList[id].cqcho2
              document.getElementById("sets("+id+")").innerHTML="取消该答案"
            }
            break
          case 3:
            if(that.CList[id].cqans==that.CList[id].cqcho3)
            {
              that.CList[id].cqans = ''
              document.getElementById("sets("+id+")").innerHTML="设置选项为答案"
            }
            else {
              that.CList[id].cqans = that.CList[id].cqcho3
              document.getElementById("sets("+id+")").innerHTML="取消该答案"
            }
            break
          case 4:
            if(that.CList[id].cqans==that.CList[id].cqcho4)
            {
              that.CList[id].cqans = ''
              document.getElementById("sets("+id+")").innerHTML="设置选项为答案"
            }
            else {
              that.CList[id].cqans = that.CList[id].cqcho4
              document.getElementById("sets("+id+")").innerHTML="取消该答案"
            }
            break
            break
          default:
            break
        }
      },
      deleteCClick:function (id) {
        this.CList.splice(id,1)
      },
      addFClick:function () {
        this.FList.push({
          fitem:'',
          fans:'',
          frem:'',
          ftail:''
        })
      },
      deleteFClick:function (id) {
        this.FList.splice(id,1)
      },
      addJClick:function () {
        this.JList.push({
          jitem:'',
          jans:'',
          jrem:'',
          jtail:''
        })
      },
      deleteJClick:function (id) {
        this.JList.splice(id,1)
      },
      addCMClick:function () {
        this.CMList.push({
          mitem:'',
          mcho1:'',
          mcho2:'',
          mcho3:'',
          mcho4:'',
          mans:'',
          mrem:'',
          mtail:''
        })
      },
      //设置多选题的答案
      SetCMAns:function(id,flag) {
        let that =this
        switch (flag) {
          case 1:
            if(that.CMList[id].mans=='')
            {
              that.CMList[id].mans = that.CMList[id].mcho1
            }
            else
            {
              that.CMList[id].mans =that.CMList[id].mans+'---'+that.CMList[id].mcho1
            }
            break
          case 2:
            if(that.CMList[id].mans=='')
            {
              that.CMList[id].mans = that.CMList[id].mcho2
            }
            else
            {
              that.CMList[id].mans =that.CMList[id].mans+'---'+that.CMList[id].mcho2
            }
            break
          case 3:
            if(that.CMList[id].mans=='')
            {
              that.CMList[id].mans = that.CMList[id].mcho3
            }
            else
            {
              that.CMList[id].mans =that.CMList[id].mans+'---'+that.CMList[id].mcho3
            }
            break
          case 4:
            if(that.CMList[id].mans=='')
            {
              that.CMList[id].mans = that.CMList[id].mcho4
            }
            else
            {
              that.CMList[id].mans =that.CMList[id].mans+'---'+that.CMList[id].mcho4
            }
            break
          default:
            break
        }
      },
      DeleteCMAns:function(id,flag) {
        let that =this
        switch (flag) {
          case 1:
            if(that.CMList[id].mans=='')
            {
              that.CMList[id].mans = that.CMList[id].mcho1
            }
            else
            {
              that.CMList[id].mans =that.CMList[id].mans+'---'+that.CMList[id].mcho1
            }
            break
          case 2:
            if(that.CMList[id].mans=='')
            {
              that.CMList[id].mans = that.CMList[id].mcho2
            }
            else
            {
              that.CMList[id].mans =that.CMList[id].mans+'---'+that.CMList[id].mcho2
            }
            break
          case 3:
            if(that.CMList[id].mans=='')
            {
              that.CMList[id].mans = that.CMList[id].mcho3
            }
            else
            {
              that.CMList[id].mans =that.CMList[id].mans+'---'+that.CMList[id].mcho3
            }
            break
          case 4:
            if(that.CMList[id].mans=='')
            {
              that.CMList[id].mans = that.CMList[id].mcho4
            }
            else
            {
              that.CMList[id].mans =that.CMList[id].mans+'---'+that.CMList[id].mcho4
            }
            break
          default:
            break
        }
      },
      deleteCMClick:function (id) {
        this.CMList.splice(id,1)
      },
      addPClick:function () {
        let that =this
        that.PList.push({
          pitem:'',
          pans:'',
          prem:'',
          ptail:''
        })
      },
      deletePClick:function (id) {
        this.PList.splice(id,1)
      },
      createOK:function () {
        let that =this
        if(that.exname.length==0)
        {
          that.$alert('试卷没有名称', '警告', {
            confirmButtonText: '确定',
          type:'warning'})
        }
        else if(that.gdtime==0)
        {
          that.$alert('试卷没有设置时间', '警告', {
            confirmButtonText: '确定',
            type:'warning'})
        }
        else{
          let lc = that.CList.length;
          let lj =that.JList.length;
          let lp=that.PList.length;
          let lcm = that.CMList.length;
          let lf = that.FList.length;
          if(lc==0 || lj==0|| lp ==0 || lcm==0 ||lf==0)
          {
            that.$alert('试卷不完整，没有将五类题目都创建', '警告', {
              confirmButtonText: '确定',})
          }
          else{
            console.log(that.CList)
            console.log(that.FList)
            console.log(that.JList)
            console.log(that.PList)
            console.log(that.CMList)
            that.$http.post('/exam/index/addexam',{
              exname:that.exname,
              flag:3,
              CList:that.CList,
              FList:that.FList,
              JList:that.JList,
              PList:that.PList,
              CMList:that.CMList,
              gdtime:that.gdtime,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="完成创建试卷")
              {
                // alert(res.data.message)
                that.$alert(res.data.message, '成功', {
                  confirmButtonText: '确定',
                  type:'success'})
                that.$router.push({path:'/admin/exam/create'})
                that.CList =[]
                that.FList=[]
                that.JList =[]
                that.CMList =[]
                that.PList =[]
                that.gdtime =0
                that.exname=''
              }
              else {
                // alert(res.data.message)
                that.$alert(res.data.message, '失败', {
                  confirmButtonText: '确定',
                  })
              }
            })
          }
        }

      }
    },
    created(){

    }
  }
</script>

<style scoped>
  .ttitle{
    text-align: left;
    margin-left: 20px;
    font-weight: bold;
    line-height: 20px;
  }
  .exname{
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 13px 14px;
    font-size: 14px;
    font-weight: 700;
    font-family: "Microsoft soft";
  }
  .exname:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
  }
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 600px;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
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
  .input{
    outline-style: none ;
    border: 0px;
    border-radius: 3px;
    padding: 1px 1px;
    width: 300px;
    font-size: 14px;
    /*font-weight: 700;*/
    /*font-family: "Microsoft soft";*/
  }
  .input:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
  }
  .nnn{
    margin-top: 20px;
    margin-left: 50px;
    margin-right: 50px;
    width: 80%;
    height: 650px;
    font-weight: bold;
  }
  .item{
    margin-left: 20px;
    margin-top: 10px;
    font-size: 16px;
    width: auto;
  }
  .ans{
    font-size: 14px;
    width: auto;
  }
  .tail{
    font-size: 12px;
  }
  .rem{
    font-size: 10px;
  }
  /*预览试卷*/
  .yulan{
    text-align: left;
  }
  /*创建试卷*/
  .create{
    text-align: left;
    padding: 5px;
    margin-left: 5px;
  }
</style>
