<template>
    <!--用户信息-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><span @click="getQuery" style="font-weight: bold">用户信息</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <!--<div class="display1">-->
      <!--<el-tabs type="border-card">-->
        <!--<el-tab-pane>-->
          <!--<span slot="label" @click="getQuery"><i class="el-icon-date"></i> 用户列表</span>-->
          <div>
            <div>
              <div class="SearchInput" >
                <el-input v-model="inputname" placeholder="用户姓名" size="mini"></el-input>
              </div>
              <button class="btn el-icon-search" v-on:click="searchCom()">搜索</button>
              <!--<router-link :to="{ name: 'adduser' }">-->
                <!--<button class="btn3 el-icon-circle-plus-outline">添加</button>-->
              <!--</router-link>-->
              <!--//另一种形式-->
              <button class="btn el-icon-circle-plus-outline" @click="dialogFormVisible = true">添加</button>
              <!--添加-->
              <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
                <el-form :model="addUserList">
                  <el-form-item label="用户工号" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addUserList.addno" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addUserList.addname" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="用户密码" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addUserList.addpwd" auto-complete="off"  placeholder="6-10位包含数字、字母、特殊字符"></el-input>
                  </el-form-item>
                  <el-form-item label="用户角色" :label-width="formLabelWidth">
                    <select style="font-size:15px;width:180px;" v-model="addUserList.addrole"  >
                      <option value="1">超级管理员</option>
                      <option value="2">二级管理员</option>
                      <option value="3" selected="selected">普通用户</option>
                    </select>
                    <!--<el-input style="width: 350px;" v-model="addUserList.addrole" auto-complete="off"></el-input>-->
                  </el-form-item>
                  <el-form-item label="用户状态" :label-width="formLabelWidth">
                    <select style="font-size:15px;width:180px;" v-model="addUserList.addstatus"  >
                      <option value="1" selected="selected">有效</option>
                      <option value="0">无效</option>
                    </select>
                    <!--<el-input style="width: 350px;" v-model="addUserList.addstatus" auto-complete="off"></el-input>-->
                  </el-form-item>
                </el-form>
                <div slot="footer" style="align-content: center" class="dialog-footer">
                  <el-button type="primary" @click="addUser(addUserList)">提交</el-button>
                  <el-button @click="addReset">重置</el-button>
                </div>
              </el-dialog>
              <button class="btn el-icon-folder-checked" @click="getQueryS">学生用户</button>
              <button class="btn el-icon-folder-checked" @click="getQueryT">教师用户</button>
              <button class="btn el-icon-folder" @click="getQueryY">有效用户</button>
              <button class="btn el-icon-folder-remove" @click="getQueryN">无效用户</button>
              <button class="btn el-icon-folder-checked" @click="getQuery">所有用户</button>
              <button class="btn el-icon-document" @click="addU">批量添加</button>
              <button class="btn el-icon-document" @click="exportU">导出用户</button>
              <input type="file" @change="importExcel(this)" id="inputExcel"
                     accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="display: none"/>
            </div>
            <br>
            <br>
            <el-divider></el-divider>
            <table >
              <tr>
                <th>序号</th>
                <th>用户编号 </th>
                <th>用户名</th>
                <th>用户角色</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
              <tr v-for=" (userinfo,key) in currentPageData" :key="key">
                <td>{{key+1}}</td>
                <td>{{userinfo.id}}</td>
                <td>{{userinfo.username}}
                  <span v-if="userinfo.status==1" @click="dialogFormVisibleName=true;changeList.id=userinfo.id" class="span2">修改</span>
                </td>
                <td v-if="userinfo.role==1">超级管理员
                  <span v-if="userinfo.status==1" @click="dialogFormVisibleRole=true;changeList.id=userinfo.id" class="span2">修改</span>
                </td>
                <td v-if="userinfo.role==2">二级管理员
                  <span v-if="userinfo.status==1" @click="dialogFormVisibleRole=true;changeList.id=userinfo.id" class="span2">修改</span>
                </td>
                <td v-if="userinfo.role==3">普通用户
                  <span v-if="userinfo.status==1" @click="dialogFormVisibleRole=true;changeList.id=userinfo.id" class="span2">修改</span>
                </td>
                <!--<td>{{userinfo.role}}</td>-->
                <!--<td>{{userinfo.status}}</td>-->
                <td v-if="userinfo.status==1">有效</td>
                <td v-if="userinfo.status==0">无效
                  <span v-if="userinfo.status==0" @click="changeStatus(userinfo.id)" class="span2">修改</span>
                </td>
                <td>
                  <!--<span v-if="userinfo.status==1" @click="dialogFormVisibleName=true;changeList.id=userinfo.id" class="span2"><i class="el-icon-edit">修改用户名</i></span>-->
                  <!--更改用户名的对话框-->
                  <el-dialog title="修改用户名" :visible.sync="dialogFormVisibleName">
                    <el-form :model="changeList">
                      <el-form-item label="用户名称" :label-width="formLabelWidth">
                        <el-input style="width: 350px;" v-model="changeList.name" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeUsername(changeList)">提交</el-button>
                      <el-button @click="dialogFormVisibleName=false">退出</el-button>
                    </div>
                  </el-dialog>
                  <!--<span v-if="userinfo.status==1" @click="dialogFormVisibleRole=true;changeList.id=userinfo.id" class="span2"><i class="el-icon-edit">修改角色</i></span>-->
                  <!--更改用户角色的对话框-->
                  <el-dialog title="修改角色" :visible.sync="dialogFormVisibleRole" >
                    <el-form :model="changeList">
                      <el-form-item label="用户角色" :label-width="formLabelWidth">
                        <select style="font-size:20px;width:150px;" v-model="changeList.role"  >
                          <option value="1">超级管理员</option>
                          <option value="2">二级管理员</option>
                          <option value="3" selected="selected">普通用户</option>
                        </select>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" style="align-content: center" class="dialog-footer">
                      <el-button type="primary" @click="changeRole(changeList)">提交</el-button>
                      <el-button @click="dialogFormVisibleRole=false">退出</el-button>
                    </div>
                  </el-dialog>
                  <!--<span v-if="userinfo.status==0" @click="changeStatus(userinfo.id)" class="span2"><i class="el-icon-edit">修改状态</i></span>-->
                  <span v-if="userinfo.status==1&&userinfo.id!=userid"@click="deleteUser(userinfo.id)" class="span1"><i class="el-icon-delete">删除用户</i></span>
                  <span v-if="userinfo.status==0" @click="deleteUsers(userinfo.id)" class="span1"><i class="el-icon-delete">永久删除</i></span>
                </td>
              </tr>
            </table>
          </div>
        <!--</el-tab-pane>-->
      <!--</el-tabs>-->
      <div style="font-size: 16px">
        <ul><!--分页-->
          <li v-if="currentPage!=1">
            <span  v-on:click="prePage" class="page">上一页</span>
          </li>
          <li >
            <span >第{{ currentPage }}页/共{{totalPage}}页</span>
          </li>
          <li v-if="currentPage!=totalPage">
            <span v-on:click="nextPage" class="page">下一页</span>
          </li>
        </ul>
      </div>
    </div>
  <!--</div>-->

</template>

<script>
    export default {
      name: "Userinfo",
      data() {
        return {
          userid:this.$store.getters.getsId,
          //用户信息列表
          userinfoList: [],
          inputname: '',
          //对话框标志
          dialogFormVisible: false,
          dialogFormVisibleName: false,
          changeList: {
            id: '',
            name: '',
            role: '',
          },
          dialogFormVisibleRole: false,
          addUserList: {
            addname: '',
            addpwd: '',
            addrole: '',
            addstatus: '',
            addno:''
          },
          formLabelWidth: '120px',
          // 翻页相关
          currentPage: 1,
          totalPage: 1,
          pageSize: 15,
          currentPageData: []
        }
      },
      methods: {
        exportU:function()
        {
          let that =this
          that.$http.post('/home/export/exportuser').then(function (res) {
            console.log(res.data)
            window.open(res.data.data)
          })
        },
        //分页
        setCurrentPageDate: function () {
          let that =this
          let begin = (that.currentPage - 1) * that.pageSize;
          let end = that.currentPage * that.pageSize;
          that.currentPageData = that.userinfoList.slice(begin, end)
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
        //搜索
        searchCom:function(){
          let that =this
          console.log(that.inputname)
          that.$http.post('/home/user/query',
            {
              flag:4,
              name:that.inputname
            }).then(function (res) {
            console.log(res.data)
            that.userinfoList=res.data.data
            that.totalPage =Math.ceil(that.userinfoList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        },
        getQueryT:function(){
          let that =this
          that.$http.post('/home/user/query',
            {
              flag: 5,
            }).then(function (res) {
            console.log(res.data)
            // that.userinfoList = res.data.data
            that.userinfoList=res.data.data
            that.totalPage =Math.ceil(that.userinfoList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        },
        getQueryS:function(){
          let that =this
          that.$http.post('/home/user/query',
            {
              flag: 6,
            }).then(function (res) {
            console.log(res.data)
            // that.userinfoList = res.data.data
            that.userinfoList=res.data.data
            that.totalPage =Math.ceil(that.userinfoList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        },
        //获取全部的用户信息
        getQuery: function () {
          let that = this
          that.$http.post('/home/user/query',
            {
              flag: 2,
            }).then(function (res) {
            console.log(res.data)
            // that.userinfoList = res.data.data
            that.userinfoList=res.data.data
            that.totalPage =Math.ceil(that.userinfoList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        },
        //获取有效的用户信息
        getQueryY: function () {
          let that = this
          that.$http.post('/home/user/query',
            {
              flag: 1,
            }).then(function (res) {
            console.log(res.data)
            // that.userinfoList = res.data.data
            that.userinfoList=res.data.data
            that.totalPage =Math.ceil(that.userinfoList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        },
        //获取无效的用户信息
        getQueryN: function () {
          let that = this
          that.$http.post('/home/user/query',
            {
              flag: 3,
            }).then(function (res) {
            console.log(res.data)
            // that.userinfoList = res.data.data
            that.userinfoList=res.data.data
            that.totalPage =Math.ceil(that.userinfoList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        },
        //增加用户
        addUser: function (userList) {
          let that =this
          if(that.addUserList.addname==''||that.addUserList.addpwd==''||that.addUserList.addrole==''
            ||that.addUserList.addstatus==''||that.addUserList.addno=='')
          {
            that.$alert('添加用户信息不完整','提示',{
              confirmButtonText:'确定',
              type:'warning'
            })
          }
          else
          {
            let  Reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{6,10}/)
            let No = new RegExp(/^[0-9]*$/)
            if(!Reg.test(that.addUserList.addpwd)){
              that.$alert('密码不符规则','提示',{
                confirmButtonText:'确定',
                type:'warning'
              })
            }
            else if(!No.test(that.addUserList.addno))
            {
              that.$alert('工号格式不正确','提示',{
                confirmButtonText:'确定',
                type:'warning'
              })
            }
            else {
              that.$http.post('/home/user/adduser',
                {
                  addname: that.addUserList.addname,
                  addpwd: that.addUserList.addpwd,
                  addrole: that.addUserList.addrole,
                  addstatus: that.addUserList.addstatus,
                  addno:that.addUserList.addno
                }).then(function (res) {
                console.log(res.data)
                let msg = res.data.message
                if (msg == "该用户名已存在") {
                  // that.dialogFormVisible = false;
                  // alert("该用户名已存在,不能添加！")
                  that.$alert(res.data.message,'提示',{
                    confirmButtonText:'确定',
                    type:'warning'
                  })
                }
                else if (msg == "用户添加成功") {
                  that.$alert(res.data.message,'提示',{
                    confirmButtonText:'确定',
                    type:'warning'
                  })
                  that.dialogFormVisible = false;
                  that.getQuery();
                  that.addReset()
                }
                else {
                  // that.dialogFormVisible = false;
                  that.$alert(res.data.message,'提示',{
                    confirmButtonText:'确定',
                    type:'warning'
                  })
                }
              }).catch(function (error) {
                console.log(error)
              })
            }
          }
        },
        //添加用户时重置
        addReset: function () {
          this.addUserList.addstatus = "";
          this.addUserList.addrole = "";
          this.addUserList.addpwd = "";
          this.addUserList.addname = ""
          this.addUserList.addno=''
        },
        //修改状态
        changeStatus: function (userid) {
          let that = this
          console.log(userid)
          that.$confirm("修改该用户状态，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            that.$http.post('/home/user/changeuser',
              {
                flag: 4,
                userid: userid
              }).then(function (res) {
              console.log(res.data)
              if (res.data.message == "该用户状态修改成功") {
                that.getQuery()
                alert("该用户状态修改成功！")
              }
              else {
                alert(res.data.message)
              }
            })
          }).catch(function (error) {
            console.log(error)
          });
        },
        //修改角色
        changeRole: function (List) {
          let that = this
          console.log(List)
          that.$http.post('/home/user/changeuser',
            {
              flag: 2,
              userid: List.id,
              role: List.role
            }).then(function (res) {
            console.log(res.data)
            that.changeList.role = ""
            if (res.data.message == "该用户角色修改成功") {
              that.getQuery()
              that.dialogFormVisibleRole = false
              alert("该用户角色修改成功！")
            }
            else {
              that.dialogFormVisibleName = false
              alert(res.data.message)
            }
          }).catch(function (error) {
            console.log(error)
          })
        },
        //修改用户名
        changeUsername: function (List) {
          let that = this
          console.log(List)
          that.$http.post('/home/user/changeuser',
            {
              flag: 1,
              userid: List.id,
              username: List.name
            }).then(function (res) {
            console.log(res.data)
            that.changeList.name = ""
            if (res.data.message == "已有该用户名用户存在") {
              alert("已有该用户名用户存在,修改用户名失败")
              that.dialogFormVisibleName = false
            }
            else if (res.data.message == "该用户名修改成功") {
              that.getQuery()
              that.dialogFormVisibleName = false
              alert("该用户名修改成功！")
            }
            else {
              that.dialogFormVisibleName = false
              alert(res.data.message)

            }
          }).catch(function (error) {
            console.log(error)
          })

        },
        //删除用户（暂时删除）
        deleteUser: function (userid) {
          let that = this
          console.log(userid)
          that.$confirm("将该用户删除，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            that.$http.post('/home/user/deleteuser',
              {
                flag: 1,
                userid: userid
              }).then(function (res) {
              console.log(res.data)
              if (res.data.message == "该用户已删除") {
                that.getQuery()
                alert("删除该用户成功！")
              }
            })
          }).catch(function (error) {
            console.log(error)
          });
        },
        //永久删除
        deleteUsers: function (userid) {
          let that = this
          that.$confirm("该用户将永久删除，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            console.log("2222")
            that.$http.post('/home/user/deleteuser',
              {
                flag: 2,
                userid: userid
              }).then(function (res) {
              console.log(res.data)
              if (res.data.message == "该用户已永久删除") {
                that.getQuery()
                alert("永久删除该用户成功！")
              }
            })
          }).catch(function (error) {
            console.log(error)
          })
        },
        addU:function()
        {
          this.inputExcel.click()
        },
        importExcel (obj) {
          let _this = this
          let inputDOM = this.$refs.inputer   // 通过DOM取文件数据
          this.file = event.currentTarget.files[0]
          var rABS = false // 是否将文件读取为二进制字符串
          var f = this.file
          var reader = new FileReader()
          // if (!FileReader.prototype.readAsBinaryString) {
          FileReader.prototype.readAsBinaryString = function (f) {
            var binary = ''
            var rABS = false // 是否将文件读取为二进制字符串
            var pt = this
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
                obj.no = v.工号
                obj.name = v.用户名
                obj.password= v.密码
                obj.role= v.角色
                arr.push(obj)
              })
              _this.memberList = [...arr]
              let data = {
                data: JSON.stringify(_this.memberList)
              }
              console.log(data)
              _this.$http.post('/home/user/importexcel', data).then(body => {
                alert(body.data.message)
                _this.getQuery()
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
        this.getQuery()

      },
      mounted(){
        this.inputExcel = document.getElementById('inputExcel')
      }
    }
</script>

<style scoped>
  @import "../../../common/css/admin/user.css";
</style>
