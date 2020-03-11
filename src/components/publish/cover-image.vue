<template>
  <div class="cover-image">
      <!-- v-for循环 -->
      <!--  @click="openDialog(index)"传index为了在最外层有了url和索引才能确定对应的images -->
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-image-item">
          <!-- 图片的地址应该等于item 传的就是图片地址 -->
    <!-- 开始的item是一个空字符串 因为此时还没有选择图片此时可以根据item是否有值 来选择 -->
  <!-- 如果item没值默认图片 -->
  <img :src="item? item : defaultImage" alt="">
      </div>
      <!-- 弹层组件 -->
      <el-dialog @close="dialogVisible=false" :visible="dialogVisible">
          <!-- 选择素材 上传素材功能 -->
        <!-- 在封装一个选择图片和上传的组件 -->

        <!--子传父 监听谁的自定义事件就在谁的标签上写v-on /@ -->
            <select-image @selectOneImg='receiveImg'></select-image>
      </el-dialog>

  </div>

</template>

<script>
export default {
  props: ['list'], // list为要传递的属性 他里边有
  data () {
    return {
      defaultImage: require('../../assets/img/pic_bg.png'), // 默认图片 用变量接受
      dialogVisible: false, // 控制弹层的显示或者隐藏
      selectIndex: -1 // 用来记录当前点击了那个索引
    }
  },
  methods: {
    //   接受传递的地址url
    receiveImg (url) {
    //   alert(url)
    // 拿到数据源该干什么
    // props数据是只读 不能修改 再往上传递
    // 二次传递的时候需要吧之前记录的索引传出去
      this.$emit('selectTwoImg', url, this.selectIndex)// 将URL参数传出去 还要把index传出去
      //  关闭弹层
      this.dialogVisible = false
    },
    //   点击图片时弹层
    openDialog (index) {
      this.dialogVisible = true// 显示弹层
      this.selectIndex = index// 记录你淡季了哪一张图片 第二次子传父需要用到index
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image{
    display: flex;
    margin: 20px 100px;
    .cover-image-item{
        border: 1px solid #cccccc;
        width: 250px;
        height: 250px;
        padding: 20px;
        img{
            width: 100%;
        }
    }
}
</style>
