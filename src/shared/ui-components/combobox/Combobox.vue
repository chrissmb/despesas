<template>
  <div class="container" :style="{ width: largura }">
    <label>{{ label }}</label>
    <select
      :required="required"
      :name="name"
      :disabled="disabled"
      @change="updateValue()"
      v-model="itemSelecionado"
      ref="refCampo"
    >
      <option :value="null" v-if="nullable"></option>
      <option
        v-for="item in list"
        :selected="item == value"
        :key="item[chave]"
        :value="item"
      >
        {{ itemLabel(item) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "combobox",
  props: {
    value: null,
    list: Array,
    label: String,
    itemLabel: Function,
    chave: String,
    nullable: {
      type: Boolean,
      default: false,
    },
    mw: {
      type: Number,
      default: 12,
    },
    dw: {
      type: Number,
      default: 6,
    },
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
      itemSelecionado: null,
    };
  },
  mounted() {
    this.responsividade(window.innerWidth);
    window.addEventListener("resize", (e) =>
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
      return this.msgValidate != null && this.msgValidate.length > 0;
    },
    getMsgValidate() {
      if (this.hasError()) {
        return this.msgValidate.join("\n");
      } else {
        return "";
      }
    },
    updateValue() {
      this.$emit("input", this.itemSelecionado);
      this.$emit("change", this.itemSelecionado);
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

select {
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