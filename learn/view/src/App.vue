<template>
  <div>
    hello
    <el-button type="success">按钮</el-button>
  </div>
</template>

<script>
// 封装前
// export default {
//   mounted() {
//     this.$axios
//       .get('http://localhost:3000/users/find')
//       .then((res) => {
//         console.log(res.data)
//       })
//       .catch((err) => {
//         console.error('请求异常', err)
//       })
//   }
// }

export default {
  create() {
    this.$http({
      path: 'https://cnodejs.org/api/v1/topics',
      method: 'get',
      parmas: {}
    })
      .then((res) => {
        console.log(res)
        console.log('111')
      })
      .catch((err) => {
        console.error('请求异常', err)
      })
  }
}
</script>

<style></style>
