import Vue from 'vue'
import Router from 'vue-router'
import Register from '../pages/register'
import Forget from '../pages/forget'
import Login from '../pages/login'
import Index from '../pages/index'
//404错误
import NotFound from '../pages/404'

//admin
//全部公共页
import adminHome from '../pages/admin/Home'
//首页
import adminIndex from '../pages/admin/Index'
//我的信息
//修改密码
import Changepwd from '../pages/admin/my/Changepwd'
//我的资料
import My from '../pages/admin/my/My'

//用户信息
import Userinfo from '../pages/admin/user/Userinfo'
//添加用户
import Adduser from '../pages/admin/user/Adduser'

//题库信息
//选择题
import Choose from '../pages/admin/bank/Choose'
//填空题
import Fill from '../pages/admin/bank/Fill'
//程序题
import Program from '../pages/admin/bank/Program'
import ViewP from '../pages/admin/bank/ViewP'

import ProgramN from  '../pages/admin/bank/Programn'
//判断题
import Judge from '../pages/admin/bank/Judge'
//多选题
import ChooseM from '../pages/admin/bank/Choosem'

//添加题库
import addChoose from '../pages/admin/bank/addChoose'
import addChoosem from  '../pages/admin/bank/addChoosem'
import addFill from '../pages/admin/bank/addFill'
import addJudge from '../pages/admin/bank/addJudge'
import addProgram from '../pages/admin/bank/addProgram'
//修改题库
import changeChoose from '../pages/admin/bank/changeChoose'
import changeChoosem from '../pages/admin/bank/changeChoosem'
import changeFill from '../pages/admin/bank/changeFill'
import changeJudge from '../pages/admin/bank/changeJudge'
import changeProgram from '../pages/admin/bank/changeProgram'

//图书信息
import Book from '../pages/admin/book/Book'
import Bookitem from '../pages/admin/book/Bookitem'
//试卷信息
//创建试卷
import Create from '../pages/admin/exam/Create'
//查看试卷
import ViewA from '../pages/admin/exam/Viewexam'
//手动组卷（题库中选择）
import SelfCreate from '../pages/admin/exam/Selfcreate'
//创建试卷
import NewCreate from '../pages/admin/exam/Newcreate'
//分析试卷的答题情况
import AdminFenxi from '../pages/admin/exam/Fenxi'
// import AdminPractice from '../pages/admin/user/Practice'
//学生练习
import AdminPractice from '../pages/admin/practice/pPractice'
import AdminvpPractice from '../pages/admin/practice/vpPractice'

//教师用户
//教师主页
import TeacherHome from '../pages/teacher/Home'
import TeacherIndex from '../pages/teacher/Index'
//教师我的信息
import Teachermy from '../pages/teacher/my/My'
//教师修改密码
import Teacherchgpwd from '../pages/teacher/my/Changepwd'
//教师创建试卷主页
import TeacherCreate from '../pages/teacher/teach/Create'
//教师预览试卷
import TeacherView from '../pages/teacher/teach/Viewexam'
//教师手动创建试卷（从题库中选择）
import TeacherSelfCreate from '../pages/teacher/teach/Selfcreate'
//教师创建试卷（从无到有）
import TeacherNewCreate from '../pages/teacher/teach/Newcreate'
//教师管理学生
import TeacherSManage from '../pages/teacher/student/SManage'
//数据分析
import TeacherFenxi from '../pages/teacher/fenxi/fenxi'
import TeacherRecourse from '../pages/teacher/teach/Recource'
//练习题库
import TeacherPCreate from '../pages/teacher/pratice/pCreate'
import TeacherPractice from '../pages/teacher/pratice/Pratice'
import TeacherVPractice from '../pages/teacher/pratice/vPractice'


//用户身份
//框架
import UserHome from '../pages/user/Home'
//首页
import UserIndex from '../pages/user/Index'
//测评
import UserEvaluate from '../pages/user/evaluate/Evaluate'
//进入测评
import UserGoEva from '../pages/user/evaluate/Goeva'
//查看结果
import UserResult from '../pages/user/evaluate/Resultview'
//查看详情
import UserView from '../pages/user/evaluate/Result'
import UsernResult from '../pages/user/evaluate/nResult'
//排名
import UserRank from '../pages/user/rank/Rank'
//资源学习
import UserRecourse from '../pages/user/recourse/Recourse'

//练习部分的新形式
import UserPractice from '../pages/user/exercise/new/Pracu'
import UservPractice from '../pages/user/exercise/new/vPracu'
import UseransPractice from '../pages/user/exercise/new/ansPracu'
//练习
import UserExercise from '../pages/user/exercise/Exercise'
// 练习题目 选择题
import UserExerciseChoose from '../pages/user/exercise/ViewChoose'
//填空题
import UserExerciseFill from '../pages/user/exercise/ViewFill'
//程序题
import UserExerciseProgram from '../pages/user/exercise/ViewProgram'
//判断题
import UserExerciseJudge from '../pages/user/exercise/ViewJudge'
//多选题
import UserExerciseChoosem from '../pages/user/exercise/ViewChoosem'

//我的
import UserMy from '../pages/user/my/My'
import Userchangepwd from '../pages/user/my/Changepwd'
//选择教师/课程
import UserSelectTeacher  from '../pages/user/class/SelectTeacher'


//用户数据分析
//练习
import UserAnlysis from '../pages/user/exercise/Anlysis'

//图像
import SLineChart from '../components/SLineChart'
import RadarChart from '../components/RadarChart'
import CalenderHeatmap from '../components/CalenderHeatmap'
import BarChart from '../components/BarChart'
//代码编辑器
import CodeMirror from '../components/CodeMirror'
import Monaco from '../components/MonacoEditor'

Vue.use(Router)
const  router = new Router({
  // mode:'history',
  base:'/ComputeThinking/',
  mode:'hash',
  hash:true,
  routes: [
    {
      path:'/code',
      name:'code',
      meta:{
        isLogin:false
      },
      component:CodeMirror
    },
    {
      path:'/code2',
      name:'code2',
      meta:{
        isLogin:false
      },
      component:Monaco
    },
    {
      path:'/slinechart',
      name:'slinechart',
      meta:{
        isLogin:false
      },
      component:SLineChart
    },
    {
      path:'/heatmap',
      name:'heatmap',
      meta:{
        isLogin:false
      },
      component:CalenderHeatmap
    },
    {
      path:'/barchart',
      name:'barchart',
      meta:{
        isLogin:false
      },
      component:BarChart
    },
    {
      path:'/radarChart',
      name:'radarChart',
      meta:{
        isLogin:false
      },
      component:RadarChart
    },
    // {
    //   //测试
    //   path: '/',
    //   name: 'Index',
    //   meta:{
    //     isLogin:true,//需要登录
    //   },
    //   component: Index
    // },
    {
      //注册
      path: '/register',
      name: 'Register',
      meta:{
        isLogin:false,
      },
      component: Register
    },
    {
      //忘记密码
      path:'/forget',
      name:'Forget',
      meta:{
        isLogin:false,
      },
      component:Forget
    },
    {
      path:'/',
      name:'index',
      redirect: '/login'
    },
    {
      //登录
      path:'/login',
      name:'Login',
      meta:{
        isLogin:false,
      },
      component:Login
    },
    {
      path:'*',
      name:'notfound',
      meta:{
        isLogin:false
      },
      component:NotFound
    },
    {
      //管理员
      path:'/admin',
      name:'AdminHome',
      meta:{
        isLogin:true
      },
      component:adminHome,
      children:[
        {
          //管理员首页
          path:"/admin/index",
          name:"adminindex",
          meta:{
            isLogin:true
          },
          component:adminIndex
        },
        {
          //用户信息：用户信息
          path:'/admin/user/userinfo',
          name:'userinfo',
          meta:{
            isLogin:true
          },
          component:Userinfo
        },
        {
          path:'/admin/practice/practice',
          name:'AdminPractice',
          meta:{
            isLogin:true
          },
          component:AdminPractice
        },
        {
          path:'/admin/practice/vpractice',
          name:'AdminvpPractice',
          meta:{
            isLogin:true
          },
          component:AdminvpPractice
        },

        {
          //用户信息：添加用户
          path:'/admin/user/adduser',
          name:'adduser',
          meta:{
            isLogin:true
          },
          component:Adduser
        },
        //题库信息
        {
          path:'/admin/bank/addchoose',
          name:'addChoose',
          meta:{
            isLogin:true
          },
          component:addChoose
        },
        {
          path:'/admin/bank/addchoosem',
          name:'addChoosem',
          meta:{
            isLogin:true
          },
          component:addChoosem
        },
        {
          path:'/admin/bank/addfill',
          name:'addFill',
          meta:{
            isLogin:true
          },
          component:addFill
        },
        {
          path:'/admin/bank/addjudge',
          name:'addJudge',
          meta:{
            isLogin:true
          },
          component:addJudge
        },
        {
          path:'/admin/bank/addprogram',
          name:'addProgram',
          meta:{
            isLogin:true
          },
          component:addProgram
        },
        {
          path:'/admin/bank/changechoose',
          name:'changeChoose',
          meta:{
            isLogin:true
          },
          component:changeChoose
        },
        {
          path:'/admin/bank/changechoosem',
          name:'changeChoosem',
          meta:{
            isLogin:true
          },
          component:changeChoosem
        },
        {
          path:'/admin/bank/changefill',
          name:'changeFill',
          meta:{
            isLogin:true
          },
          component:changeFill
        },
        {
          path:'/admin/bank/changejudge',
          name:'changeJudge',
          meta:{
            isLogin:true
          },
          component:changeJudge
        },
        {
          path:'/admin/bank/changeprogram',
          name:'changeProgram',
          meta:{
            isLogin:true
          },
          component:changeProgram
        },
        {
          path:'/admin/bank/choose',
          name:'choose',
          meta:{
            isLogin:true
          },
          component:Choose
        },
        {
          path:'/admin/bank/fill',
          name:'fill',
          meta:{
            isLogin:true
          },
          component:Fill
        },
        {
          path:'/admin/bank/program',
          name:'program',
          meta:{
            isLogin:true
          },
          component:Program
        },
        {
          path:'/admin/bank/viewP',
          name:'viewP',
          meta:{
            isLogin:true
          },
          component:ViewP
        },
        {
          path:'/admin/bank/programn',
          name:'programn',
          meta:{
            isLogin:true
          },
          component:ProgramN
        },
        {
          path:'/admin/bank/judge',
          name:'judge',
          meta:{
            isLogin:true
          },
          component:Judge
        },
        {
          path:'/admin/bank/choosem',
          name:'choosem',
          meta:{
            isLogin:true
          },
          component:ChooseM
        },
        //图书
        {
          path:'/admin/book',
          name:'book',
          meta:{
            isLogin:true
          },
          component:Book
        },
        {
          path:'/admin/book/item',
          name:'Bookitem',
          meta:{
            isLogin:true
          },
          component:Bookitem
        },
        //试卷
        //创建试卷
        {
          path:'/admin/exam/create',
          name:'create',
          meta:{
            isLogin:true
          },
          component:Create
        },
        {
          path:'/admin/exam/fenxi',
          name:'AdminFenxi',
          meta:{
            isLogin:true
          },
          component:AdminFenxi
        },
        //查看试卷
        {
          path:'/admin/exam/viewexam',
          name:'viewexam',
          meta:{
            isLogin:true
          },
          component:ViewA
        },
        {
          path:'/admin/exam/selfcreate',
          name:'selfcreate',
          meta:{
            isLogin:true
          },
          component:SelfCreate
        },
        {
          path:'/admin/exam/newcreate',
          name:'newcreate',
          meta:{
            isLogin:true
          },
          component:NewCreate
        },
        {
          //我的信息:修改密码
          path:'/admin/my/changepwd',
          name:'changepwd',
          meta:{
            isLogin:true
          },
          component:Changepwd
        },
        {
          //我的信息:我的资料
          path:'/admin/my/my',
          name:'my',
          meta:{
            isLogin:true
          },
          component:My
        },

      ]
    },
    {
      path:'/teacher',
      name:'TeacherHome',
      meta:{
        isLogin:true
      },
      component:TeacherHome,
      children:[
        {
          //首页
          path:'/teacher/index',
          name:'Teacherindex',
          meta:{
            isLogin:true
          },
          component:TeacherIndex
        },
        {
          //我的信息
          path:'/teacher/my',
          name:'Teachermy',
          meta:{
            isLogin:true
          },
          component:Teachermy
        },
        {
          //修改密码
          path:'/teacher/changepwd',
          name:'Teacherchapwd',
          meta:{
            isLogin:true
          },
          component:Teacherchgpwd
        },
        {
        //  教师创建试卷主页
          path:'/teacher/create',
          name:'TeacherCreate',
          meta:{
            isLogin:true
          },
          component:TeacherCreate
        },
        {
        //  教师创建试卷（手动）
          path:'/teacher/selfcreate',
          name:"TeacherSelfCreate",
          meta:{
            isLogin:true
          },
          component:TeacherSelfCreate
        },
        {
        //  教师创建新问卷
          path:'/teacher/newcreate',
          name:'TeacherNewCreate',
          meta:{
            isLogin:true
          },
          component:TeacherNewCreate
        },
        {
        //  教师预览试卷
          path:'/teacher/viewexam',
          name:'TeacherViewexam',
          meta:{
            isLogin:true
          },
          component:TeacherView
        },
        {
          //资源管理
          path:'/teacher/resourse',
          name:'TeacherRecourse',
          meta:{
            isLogin:true
          },
          component:TeacherRecourse
        },
        {
          path:'/teacher/pCreate',
          name:'TeacherPCreate',
          meta:{
            isLogin:true
          },
          component:TeacherPCreate
        },
        {
          path:'/teacher/practice',
          name:'TeacherPractice',
          meta:{
            isLogin:true
          },
          component:TeacherPractice
        },
        {
          path:'/teacher/vpractice',
          name:'TeacherVPractice',
          meta:{
            isLogin:true
          },
          component:TeacherVPractice
        },
        {
        //  教师管理学生
          path:'/teacher/stuManage',
          name:'TeacherStuManage',
          meta:{
            isLogin:true
          },
          component:TeacherSManage
        },
        {
        //  试卷数据分析
          path:"/teacher/fenxi",
          name:'TeacherFenxi',
          meta:{
            isLogin:true
          },
          component:TeacherFenxi
        }
      ]
    },
    {
      path:'/user',
      name:'UserHome',
      meta:{
        isLogin:true
      },
      component:UserHome,
      children: [
        {
          //首页
          path:'/user/index',
          name:'userindex',
          meta:{
            isLogin:true
          },
          component:UserIndex
        },
        {
        //  测评
          path:'/user/evaluate',
          name:'Userevaluate',
          meta:{
            isLogin:true
          },
          component:UserEvaluate
        },
        {
          //  进入测评
          path:'/user/evaluate/goeva',
          name:'Usergoeva',
          meta:{
            isLogin:true
          },
          component:UserGoEva
        },
        {
        //  查看结果
          path:'/user/evaluate/result',
          name:'UserResult',
          meta:{
            isLogin:true
          },
          component:UserResult
        },
        {
          path:'/user/evaluate/userview',
          name:'UserViews',
          meta:{
            isLogin:true
          },
          component:UserView
        },
        {
          path:'/user/evaluate/userNresult',
          name:'UsernResult',
          meta:{
            isLogin:true
          },
          component:UsernResult
        },
        {
          //新的练习
          path:'/user/practice',
          name:'UserPractice',
          meta:{
            isLogin:true
          },
          component:UserPractice
        },
        {
          path:'/user/vpractice',
          name:'UservPractice',
          meta:{
            isLogin:true
          },
          component:UservPractice
        },
        {
          path:'/user/ansPractice',
          name:'UseransPractice',
          meta:{
            isLogin:true
          },
          component:UseransPractice
        },
        {
        //  练习
          path:'/user/exercise',
          name:'Userexercise',
          meta:{
            isLogin:true
          },
          component:UserExercise
        },
        {
          path:'/user/recourse',
          name:"UserRecourse",
          meta:{
            isLogin:true
          },
          component:UserRecourse
        },
        {
        //  用户练习选择题
          path:'/user/exercisre/pchoose',
          name:'UserpChoose',
          meta:{
            isLogin:true
          },
          component:UserExerciseChoose
        },
        {
        //  用户练习填空题
          path:'/user/exercise/pfill',
          name:'UserpFill',
          meta:{
            isLogin:true
          },
          component:UserExerciseFill
        },
        {
        //  用户练习程序题
          path:'/user/exercise/pprogram',
          name:'UserpProgram',
          meta:{
            isLogin:true
          },
          component:UserExerciseProgram
        },
        {
        //  用户练习判断题
          path:'/user/exercise/pjudge',
          name:"UserpJudge",
          meta:{
            isLogin:true
          },
          component:UserExerciseJudge
        },
        {
        //  用户练习多选题
          path:'/user/exercise/pchoosem',
          name:'UserpChoosem',
          meta:{
            isLogin:true
          },
          component:UserExerciseChoosem
        },
        {
          //  用户练习数据分析
          path:'/user/exercise/anlysis',
          name:'Useranlysis',
          meta:{
            isLogin:true
          },
          component:UserAnlysis
        },
        {
          //用户选择教师/课堂
          path:'/user/class/select',
          name:'SelectTeacher',
          meta:{
            isLogin:true
          },
          component:UserSelectTeacher
        },
        {
        //  我的
          path:'/user/my',
          name:'usermy',
          meta:{
            isLogin:true
          },
          component:UserMy
        },
        {
        //  我的密码
          path:'/user/my/changepwd',
          name:'userchangepwd',
          meta:{
            isLogin:true
          },
          component:Userchangepwd
        },
        {
        //  排名
          path:'/user/rank',
          name:'userRank',
          meta:{
            isLogin:true
          },
          component:UserRank
        }
      ]
    }
  ]
})
export default router;
