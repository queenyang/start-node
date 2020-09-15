<template>
  <div class="home"><span>index</span><span>123123</span></div>
</template>
<script>
export default {
  name: "home"
};
</script>
<style lang="scss" scoped>
.home {
  & span {
    color: blue;
  }
}
</style>
