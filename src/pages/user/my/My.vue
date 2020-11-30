<template>
  <!--我的资料-->
  <div>
    <div >
      <el-page-header @back="goBack" content="个人资料">
      </el-page-header>
    </div>
    <div class="all">
      <div class="container">
        <h3 class="title">我的资料</h3>
        <p>
          <span class="label">用户编号：</span>
          {{userid}}
        </p>
        <p>
          <span class="label">用 户 名：
        </span>{{username}}
        </p>
        <p>
          <span class="label">用户工号：
          </span>
          {{userno}}
        </p>
        <p v-if="userrole==1"><span class="label">身        份：</span>超级管理员</p>
        <p v-if="userrole==2"><span class="label">身        份：</span>二级管理员</p>
        <p v-if="userrole==3"><span class="label">身         份：</span>普通用户</p>
        <span v-if="tList.length>0">
          <span class="label">我的导师:</span>
          <el-tag
            :key="tag.tid"
            v-for="tag in tList"
            closable
            :disable-transitions="false"
            @close="delTeacher(tag.tid)">
            <i class="el-icon-headset"></i>{{tag.tname}}
          </el-tag>
        </span>
        <span v-else style="color: #0ea0db;" @click="selectT">
          选择导师
        </span>
      </div>
      <div class="function">
        <h3 class="title">个人操作</h3>
        <el-button type="primary" round @click="chgeFlag=true">修改密码</el-button>
        <el-dialog title="修改密码" :visible.sync="chgeFlag" class="changePwd">
          <el-form >
            <el-form-item label="密       码:" :label-width="labelWidth">
              <el-input :type="passwordVisible" v-model="newpwd" auto-complete="off" placeholder="密码规则为：6-10位包含数字、字母、特殊字符的字串">
                <i slot="suffix" :class="icon" @click="showPass"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码:" :label-width="labelWidth">
              <el-input :type="passwordVisible1" v-model="newpwds" auto-complete="off" placeholder="确认密码">
                <i slot="suffix" :class="icon1" @click="showPass1"></i>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" style="align-content: center" class="dialog-footer">
            <el-button type="primary" @click="changePwd(newpwd,newpwds)">提交</el-button>
            <el-button @click="Reset">重置</el-button>
          </div>
        </el-dialog>
        <el-button type="primary" round @click="selectFlag=true">选择导师</el-button>
        <el-dialog title="选择导师" :visible.sync="selectFlag" class="changePwd">
          <el-form >
            <el-form-item label="导师" :label-width="labelWidth">
              <!--<span v-for="t in teacherList">-->
                <!--<p>{{t.username}}</p>-->
              <!--</span>-->
              <el-select v-model="selectId">
                <!--<el-option v-for="(x,i) in List" :label="x.username" :value="x.id" :key="i">{{x.username}}</el-option>-->
                <el-option  v-for=" t,index in teacherList" :value="t.id" :label="t.username" :key="index">{{t.username}}</el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" style="align-content: center" class="dialog-footer">
            <el-button type="primary" @click="selectT">选择</el-button>
            <el-button @click="selectFlag=false">取消</el-button>
          </div>
        </el-dialog>
        <el-button type="primary" round @click="logout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my",
    data(){
      return {
        userid:'',
        username:'',
        userrole:'',
        userno:'',
        chgeFlag:false,

        passwordVisible:'password',
        icon:"el-icon-view",
        passwordVisible1:'password',
        icon1:"el-icon-view",
        pwd:this.$store.getters.getsPwd,
        newpwd:'',
        newpwds:'',
        labelWidth:"150px",
        tList:[],
        selectFlag:false,
        teacherList:[],
        selectId:''
      }
    },
    created(){
      this.userid = this.$store.getters.getsId
      this.username = this.$store.getters.getsName
      this.userrole = this.$store.getters.getsRole
      this.userno = this.$store.getters.getsNo
      this.getTList()
      this.getTeacherList()
    },
    methods:{
      goBack:function () {
        this.$router.push({
          path: '/user/index'
        })
      },
      showPass() {
        let that =this
        if (that.passwordVisible === "text") {
          that.passwordVisible = "password";
          //更换图标
          that.icon = "el-icon-view";
        } else {
          that.passwordVisible = "text";
          that.icon = "el-icon-lock";
        }
      },
      showPass1() {
        let that =this
        if (that.passwordVisible1 === "text") {
          that.passwordVisible1 = "password";
          //更换图标
          that.icon1 = "el-icon-view";
        } else {
          that.passwordVisible1 = "text";
          that.icon1 = "el-icon-lock";
        }
      },
      //修改密码
      changePwd:function (newpwd,newpwds) {
        let that =this
        if(newpwd==newpwds) {
          var Reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{6,10}/)
          if(!Reg.test(that.newpwd))
          {
            that.$alert('密码规则为：6-10位包含数字、字母、特殊字符的字串', '警告', {
              confirmButtonText: '确定',})
          }
          else
          {
            that.$http.post('/home/user/changeuser', {
              flag: 3,
              userid: that.$store.getters.getsId,
              password: newpwd
            }).then(res => {
              console.log(res.data)
              if (res.data.message == "和原始密码一致") {
                that.$alert(res.data.message,'提示',{
                  confirmButtonText:'确定',
                  type:'warning'
                })
              }
              else if (res.data.message == "该用户密码修改成功") {
                console.log(res.data)
                that.$store.dispatch('sforget',res.data.data)
                that.$store.dispatch('userLogin',true)
                that.$alert(res.data.message,'提示',{
                  confirmButtonText:'确定',
                  type:'warning'
                })
                that.chgeFlag = false
                that.$router.push({path: '/admin/index'})
              }
              else {
                console.log(res.data.message)
                // alert(res.data.message)
                that.$alert(res.data.message,'提示',{
                  confirmButtonText:'确定',
                  type:'warning'
                })
              }
            }).catch(() => {
            })
          }
        }
        else{
          // alert("密码输入不一致！")
          that.$alert("密码输入不一致！",'提示',{
            confirmButtonText:'确定',
            type:'warning'
          })
        }
      },
      Reset:function () {
        this.newpwd=''
        this.newpwds=''
      },
      //退出登录
      logout:function () {
        let that = this
        let suserid=that.$store.getters.getsId
        console.log(suserid)
        that.$confirm("是否退出？","提示",{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
        }).then(()=>{
          that.$http.post('/home/index/logout',
            {
              userid:suserid
            }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="退出成功")
            {
              that.$store.dispatch('slogout')
              that.$alert(res.data.message, '提示', {
                confirmButtonText: '确定',
                type:'warning'
              })
              that.$router.push({path:'/login'})
            }
            else
            {
              that.$alert(res.data.message, '提示', {
                confirmButtonText: '确定',
                type:'warning'
              })
            }
          })
        }).catch(()=>
        {});
      },
      getTList:function () {
        let that = this
        that.$http.post('/student/student/stlist',{
          sid:that.userid
        }).then(function (res) {
          console.log(res.data)
          that.tList = res.data.data
        })
      },
      selectT:function() {
        let that = this
        if(that.selectId=='')
        {
          that.$alert('尚未选择导师', '警告', {
            confirmButtonText: '确定',})
        }
        else{
          that.$http.post('/student/student/choosest',{
            sid:that.$store.getters.getsId,
            tid:that.selectId
          }).then(function (res) {
            console.log(res.data)
            that.$alert(res.data.message, '成功', {
              confirmButtonText: '确定',
            type:'success'})
            that.getTList()
            that.getTeacherList()
            that.selectFlag=false
          })
        }
      },
      delTeacher:function(id) {
      //  退选导师
        let that =this
        console.log(that.userid)
        console.log(id)
        that.$confirm('确定退选该导师？','提醒',{
          confirmButtonText:'确定',
          cancelButtonText: '取消',
          type:'warning'
        }).then(()=>{
          that.$http.post('/student/student/exitteacher',{
            uid:that.userid,
            tid:id
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="成功退选导师")
            {
              that.getTList()
              that.getTeacherList()
              that.$alert('成功退选导师','成功',{
                confirmButtonText:'确认',
                type:'success'
              })

            }
          })
        }).catch(()=>{
        //  取消
        })

      },
      getTeacherList:function () {
        let that = this
        that.$http.post('/home/user/teacherlist',{
          uid:that.userid
        }).then(function (res) {
          console.log(res.data)
          that.teacherList = res.data.data
          console.log(that.teacherList)
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../common/css/my.css";
</style>
