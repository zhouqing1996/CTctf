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
                <router-link to="/admin/user/userinfo">
                  <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                  用户管理
                </router-link>
              </li>
              <li>
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">题库管理
                <ul>
                  <li><router-link to="/admin/bank/choose">
                    <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                    选择题
                  </router-link>
                  </li>
                  <li><router-link to="/admin/bank/fill">
                    <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                    填空题
                  </router-link>
                  </li>
                  <li><router-link to="/admin/bank/judge">
                    <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                    判断题
                  </router-link>
                  </li>
                  <li><router-link to="/admin/bank/choosem">
                    <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                    多选题
                  </router-link>
                  </li>
                  <li><router-link to="/admin/bank/programn">
                    <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                    编程题
                  </router-link>
                  </li>
                </ul>
              </li>
              <li>
                <router-link to="/admin/book">
                  <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                  图书管理
                </router-link>
              </li>
              <li>
                <router-link to="/admin/exam/create">
                  <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                  测试管理
                </router-link>
              </li>
              <li>
                <router-link to="/admin/practice/practice">
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
@import "../../common/css/admin/index.css";
</style>
