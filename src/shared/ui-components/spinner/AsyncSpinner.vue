<template>
  <div class="assync-spinner" v-if="show">
    <spinner color="blue" /> Carregando
  </div>
</template>

<script>
import Spinner from "./Spinner";
export default {
  name: "async-spinner",
  components: { Spinner },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.$root.$on("spinner", (b) => (this.show = b));
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300");

* {
  font-family: "Roboto", sans-serif;
}

.assync-spinner {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>