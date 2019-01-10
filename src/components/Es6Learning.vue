<template>
  <div class="main">
      <p><button @click="destructuring">变量的解构赋值</button></p>
      <p><button @click="stringExt">字符串的扩展</button></p>
  </div>
</template>

<script>
import { es6_destructuring } from '@/js/destructuring.js'
import { string_ext } from '@/js/string_ext.js'

export default {
    methods: {
        destructuring() {
            es6_destructuring()
        },
        stringExt() {
            string_ext();
        },
    }
};
</script>

<style scoped>
.main {
  text-align: center;
  margin: 0 auto;
}
</style>


