<template>
  <div class="container" :style="{ width: largura }">
    <div>
      <label>{{ label }}</label>
      <input
        type="date"
        :placeholder="placeholder"
        :value="value"
        :class="{ error: hasError() }"
        :title="getMsgValidate()"
        :required="required"
        :name="name"
        :disabled="disabled"
        @change="updateValue($event)"
        ref="refCampo"
      />
    </div>
    <div class="msgValidate">{{ getMsgValidate() }}</div>
  </div>
</template>

<script>
export default {
  name: "datefield",
  props: {
    value: String,
    label: String,
    mw: {
      type: Number,
      default: 12
    },
    dw: {
      type: Number,
      default: 6
    },
    placeholder: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    name: String,
    disabled: {
      type: Boolean,
      default: false
    },
    msgValidate: Array
  },
  data() {
    return {
      largura: "",
      mobWidth: 600,
      dirty: false
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
    updateValue(event) {
      this.dirty = true;
      this.$emit("input", event.target.value);
      this.$emit("change", event.target.value);
    },
    getDateString() {
      if (this.value == null) {
        return null;
      }
      const dia = this.value.getDate();
      const mes = this.value.getMonth() + 1;
      const ano = this.value.getFullYear();
      return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
    }
  }
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

.msgValidate {
  display: none;
}

/* Mobile **************************/
@media screen and (max-width: 600px) {
  .msgValidate {
    color: red;
    display: block;
  }
}
</style>