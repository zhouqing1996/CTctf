<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="photo">
          <img src="../../common/img/wangzhanbeian.png" alt="宣传图片"/>
        </div>
        <div class="about">
          <span>关于计算思维</span>
          <ul>
            <li>
              <a href="https://baike.baidu.com/item/%E8%AE%A1%E7%AE%97%E6%80%9D%E7%BB%B4%E6%8A%80%E8%83%BD/2570318?fr=aladdin" target="_blank">计算思维百度百科</a>
            </li>
            <li>
              <a href="http://www.bebras.cn/">Bebras国际计算思维主题活动</a>
            </li>
            <li>
              <a href="https://www.luogu.com.cn/">洛谷在线编程</a>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <ul>
            <li>
              <router-link to="/teacher/stuManage">
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                学生管理
              </router-link>
            </li>
            <li>
              <router-link to="/teacher/resourse">
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                资源管理
              </router-link>
            </li>
            <li>
              <router-link to="/teacher/create">
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                评测管理
              </router-link>
            </li>
            <li>
              <router-link to="/teacher/pCreate">
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                练习管理
              </router-link>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>

<style scoped>
  @import "../../common/css/teacher/index.css";
</style>
