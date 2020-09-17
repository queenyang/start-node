<template>
  <div class="wrp">
    <olmap />
  </div>
</template>
<script>
import olmap from "./../openlayers";
import { mapActions } from "vuex";
export default {
  components: { olmap },
  data() {
    return {};
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
.wrp {
  width: 100%;
  height: 100%;
}
</style>
