<template>
  <div class="main">
      <p><button @click="destructuring">变量的解构赋值</button></p>
      <p><button>变量的解构赋值</button></p>
  </div>
</template>

<script>
import {es6_destructuring} from '@/js/destructuring.js'

export default {
    methods: {
        destructuring() {
            es6_destructuring()
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


