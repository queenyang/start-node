<template>
  <div class="home"><span>index</span><span>123123</span></div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      adcode: "330000"
    };
  },
  methods: {
    ...mapActions("map", ["getBoundary"])
  },
  mounted() {
    this.getBoundary();
  }
};
</script>
<style lang="scss" scoped>
.home {
  & span {
    color: blue;
  }
}
</style>
