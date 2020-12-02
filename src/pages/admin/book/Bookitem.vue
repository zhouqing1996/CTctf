<template>
    <!--书籍的详细信息-->
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/admin/book'}">书籍信息</el-breadcrumb-item>
        <el-breadcrumb-item>{{book.bookname}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div><hr/></div>
    </div>
    <div>
      <div v-if="bookItem.length>0">
        <div class="search">
          <el-button round @click="addFlag=true" class="searchBtn">添加章节</el-button>
          <el-dialog title="添加章节" :visible.sync="addFlag">
            <el-form :model="addItem">
              <el-form-item label="章节名称" :label-width="formLabelWidth">
                <el-input style="width: 350px;" v-model="addItem.item" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="知识点" :label-width="formLabelWidth">
                <el-input style="width: 350px;" v-model="addItem.rem" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" style="align-content: center" class="dialog-footer">
              <el-button type="primary" @click="AddItem">提交</el-button>
              <el-button @click="ItemReset">退出</el-button>
            </div>
          </el-dialog>
          <el-button round  class="searchBtn el-icon-document" @click="exportB">导出</el-button>
        </div>
        <div>
          <br>
          <br>
          <br>
          <hr>
        </div>
        <table>
          <th>序号</th>
          <th>章节</th>
          <th>知识点</th>
          <th>操作</th>
          <tr v-for="x,index in bookItem" :key="index">
            <td style="width: 10%">{{x.id}}</td>
            <td style="width: 10%">{{x.bookitem}}</td>
            <td style="width: 65%;text-align: left">{{x.bookrem}}</td>
            <td>
              <span v-if="x.bstatus==1">
                <span class="span1" @click="DelItem(x.id,1)">删除</span>
              </span>
              <span v-if="x.bstatus==0">
                <span @click="DelItem(x.id,2)" class="span2">删除</span>
                <span @click="DelItem(x.id,3)" class="span3">恢复</span>
              </span>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>
        <div class="search">
          <el-button round @click="addFlag=true" class="searchBtn">添加章节</el-button>
          <el-dialog title="添加章节" :visible.sync="addFlag">
            <el-form :model="addItem">
              <el-form-item label="章节名称" :label-width="formLabelWidth">
                <el-input style="width: 350px;" v-model="addItem.item" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="知识点" :label-width="formLabelWidth">
                <el-input style="width: 350px;" v-model="addItem.rem" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" style="align-content: center" class="dialog-footer">
              <el-button type="primary" @click="AddItem">提交</el-button>
              <el-button @click="ItemReset">退出</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Bookitem",
      data()
      {
        return {
          bid:'',
          bookItem:[],
          book:[],
          addFlag:false,
          addItem:{
            item:'',
            rem:''
          },
          formLabelWidth:'120px'
        }
      },
      created(){
          this.bid = this.$route.query.bid
        this.getBookInfo()
      },
      methods:{
          getBookInfo:function () {
            let that =this
            that.$http.post('/book/book/bookitem',{
              bid:that.bid
            }).then(function (res) {
              console.log(res.data)
              that.book = res.data.data[0]
              that.bookItem =res.data.data[1]
            })
          },
        exportB:function () {
          let that =this
          that.$http.post('/home/export/bookitem',{
            bid:that.bid
          }).then(function (res) {
            console.log(res.data)
            window.open(res.data.data)
          })
        },
        DelItem:function (mid,flag) {
          let that =this
          that.$http.post('/book/book/delitem',{
            bid:that.bid,
            mid:mid,
            flag:flag
          }).then(function (res) {
            console.log(res.data)
            that.getBookInfo()
          })
        },
        ItemReset:function()
        {
          this.addItem.item=''
          this.addItem.rem = ''
        },
        AddItem:function () {
          let that =this
          if(that.addItem.item==''||that.addItem.rem=='')
          {
            that.$alert('添加的章节有内容为空','提示',{
              confirmButtonText:'确认',
              type:'warning'
            })
          }
          else
          {
            that.$http.post('/book/book/additem',{
              bid:that.bid,
              list:that.addItem
            }).then(function (res) {
              console.log(res.data)
              that.getBookInfo()
              that.addFlag=false
              that.ItemReset()
              that.$alert('添加成功','成功',{
                confirmButtonText:'确认',
                type:'success'
              })
            })
          }
        }
      }

    }
</script>

<style scoped>
  @import "../../../common/css/manages.css";
</style>
