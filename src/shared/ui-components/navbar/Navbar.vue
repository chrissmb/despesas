<template>
  <div>
    <ul :class="classes()">
      <navbar-item v-for="item in itens" :item="item" :sidebar="sidebar" :key="item.label"></navbar-item>
    </ul>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import NavbarItem from "@/shared/ui-components/navbar/NavbarItem";

export default {
  name: "navbar",
  props: {
    itens: Array,
    color: {
      type: String,
      default: ""
    },
    sidebar: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    classes() {
      return {
        sidebar: this.sidebar,
        navbar: !this.sidebar,
        red: this.color == "red",
        green: this.color == "green",
        purple: this.color == "purple",
        orange: this.color == "orange"
      };
    }
  },
  components: {
    NavbarItem
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300");

* {
  font-family: Roboto;
}

.navbar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #48f;
  overflow: hidden;
}

.sidebar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 25%;
  background-color: #48f;
  position: fixed;
  float: left;
  height: 100%;
  overflow: auto;
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

/* Content ***********************/
.content {
  padding: 20px;
}
.sidebar ~ .content {
  margin-left: 25%;
}
.content.center {
  padding: 1px 20px;
  max-width: 800px;
  margin: 0 auto 0 auto;
}

.navbar,
.sidebar {
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.1);
}

/* Mobile **************************/
@media screen and (max-width: 600px) {
  .sidebar {
    width: auto;
    height: auto;
    position: static;
    overflow: hidden;
    float: none;
  }

  .content {
    margin-left: 0;
    padding: 20px 5px;
  }

  .sidebar ~ .content {
    margin-left: 0;
  }
}
</style>
