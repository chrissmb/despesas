<template>
  <div class="container" :style="{ width: largura }">
    <label>{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :title="getMsgValidate()"
      :class="{ error: hasError() }"
      :maxlength="maxlength"
      :minlength="minlength"
      :required="required"
      :name="name"
      :disabled="disabled"
      @input="updateValue()"
      @keyup.enter="$emit('enter', 1)"
      ref="refCampo"
    />
  </div>
</template>

<script>
export default {
  name: "textfield",
  props: {
    value: String,
    label: String,
    mw: {
      type: Number,
      default: 12,
    },
    dw: {
      type: Number,
      default: 6,
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    msgValidate: Array,
    maxlength: Number,
    minlength: Number,
    required: {
      type: Boolean,
      default: false,
    },
    name: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      largura: "",
      mobWidth: 600,
      dirty: false,
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
    hasError() {
      return (
        this.dirty && this.msgValidate != null && this.msgValidate.length > 0
      );
    },
    getMsgValidate() {
      if (this.hasError()) {
        return this.msgValidate.join("\n");
      } else {
        return "";
      }
    },
    updateValue() {
      this.dirty = true;
      this.$emit("input", this.$refs.refCampo.value);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300");

* {
  font-family: "Roboto", sans-serif;
}

label {
  display: block;
  font-size: 16px;
}

input {
  margin: 5px 0px;
  padding: 7px 0px;
  border-radius: 4px;
  border: solid 1px #ccc;
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}

.container {
  padding: 5px;
  box-sizing: border-box;
  display: inline-block;
}

.error {
  border-color: red;
}
</style>

