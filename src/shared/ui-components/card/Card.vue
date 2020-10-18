<template>
  <div class="card" :style="{width: largura, marginLeft: margin}">
    <div :class="'title ' + color">{{ title }}</div>
    <div class="ngcontent">
      <slot name="content"></slot>
    </div>
    <div class="ngfooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    mw: {
      type: Number,
      default: 12
    },
    dw: {
      type: Number,
      default: 6
    },
    mm: {
      type: Number,
      default: 0
    },
    dm: {
      type: Number,
      default: 0
    },
    title: String,
    color: String
  },
  data() {
    return {
      largura: null,
      margin: null,
      mobWidth: 600
    };
  },
  methods: {
    responsividade(w) {
      const eMobile = w <= this.mobWidth;
      const cols = eMobile ? this.mw : this.dw;
      const margin = eMobile ? this.mm : this.dm;
      this.largura = (100 / 12) * cols + "%";
      this.margin = (100 / 12) * margin + "%";
    }
  },
  mounted() {
    this.responsividade(window.innerWidth);
    window.addEventListener("resize", e =>
      this.responsividade(window.innerWidth)
    );
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300");

* {
  font-family: "Roboto", sans-serif;
}

.card {
  display: inline-block;
  border-collapse: collapse;
  margin: 30px 10px;
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.1);
}

.title {
  padding: 10px 30px;
  text-align: left;
  background: #48f;
  color: white;
  font-weight: bold;
}

.ngcontent {
  padding: 30px;
  background-color: white;
}

.ngfooter {
  padding: 10px 20px;
  text-align: right;
  background-color: white;
}

.ngfooter * {
  margin: 0px 10px;
}

/* Colors ***********************/
.green {
  background-color: #2ba;
}

.red {
  background-color: #f34;
}

.purple {
  background-color: #a6c;
}

.orange {
  background-color: #f82;
}
</style>
