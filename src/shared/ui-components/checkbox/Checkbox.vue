<template>
  <div class="container" :style="{width: largura}">
    <label>
      <input
        type="checkbox"
        :checked="value"
        :disabled="disabled"
        @change="updateValue($event)"
        ref="refCampo"
      >
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: "checkbox",
  props: {
    value: Boolean,
    label: String,
    mw: {
      type: Number,
      default: 12
    },
    dw: {
      type: Number,
      default: 6
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      largura: "",
      mobWidth: 600
    };
  },
  mounted() {
    this.responsividade(window.innerWidth);
    window.addEventListener("resize", () =>
      this.responsividade(window.innerWidth)
    );
  },
  methods: {
    responsividade(w) {
      const eMobile = w <= this.mobWidth;
      const cols = eMobile ? this.mw : this.dw;
      this.largura = (100 / 12) * cols + "%";
    },
    updateValue(event) {
      this.$emit("input", event.target.checked);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300");

* {
  font-family: "Roboto", sans-serif;
}

.container {
  padding: 5px;
  box-sizing: border-box;
  display: inline-block;
}
</style>

