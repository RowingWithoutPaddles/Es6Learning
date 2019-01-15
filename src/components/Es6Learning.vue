<template>
  <div class="main">
    <p>
      <button @click="destructuring">变量的解构赋值</button>
    </p>
    <p>
      <button @click="stringExt">字符串的扩展</button>
    </p>
    <p>
      <button @click="regExp">正则表达式</button>
    </p>
    <p>
      <button @click="numberExt">数值的扩展</button>
    </p>
    <p>
      <button @click="functionExt">函数的扩展</button>
    </p>
  </div>
</template>

<script>
import { es6_destructuring } from "@/js/destructuring.js";
import { string_ext } from "@/js/string_ext.js";
import { es6_regexp } from "@/js/regexp.js";
import { es6_numberExt } from "@/js/number_ext.js";
import { es6_functionExt } from "@/js/function_ext.js";

export default {
  methods: {
    destructuring() {
      es6_destructuring();
    },
    stringExt() {
      string_ext();
    },
    regExp() {
      es6_regexp();
    },
    numberExt() {
      es6_numberExt();
    },
    functionExt() {
      es6_functionExt();
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


