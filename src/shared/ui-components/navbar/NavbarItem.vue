<template>
  <li
    :class="{ dropdown: item.dropdown != null, right: item.right }"
    v-click-out="clickOut"
  >
    <router-link
      v-if="item.dropdown == null && !item.disabled"
      :to="item.link"
      routerLinkActive="active"
      ><span @click="clickIn()">{{ item.label }}</span></router-link
    >

    <a v-if="item.disabled" class="disabled">{{ item.label }}</a>

    <!-- [routerLinkActiveOptions]="{ exact: false, __change_detection_hack__: id }" -->
    <!-- [class.active]="isActive(item.link)" -->
    <div v-if="item.dropdown != null && !item.disabled">
      <a href="javascript:void(0)" @click="clickIn()">
        {{ item.label }}
        <span class="caret">&#9660;</span>
      </a>

      <div class="dropdown-content" :class="{ show: show }">
        <router-link
          v-for="subItem in item.dropdown"
          :to="subItem.link"
          routerLinkActive="active"
          :class="{ disabled: subItem.disabled }"
          :key="subItem.label"
          ><span @click="clickIn()">{{ subItem.label }}</span></router-link
        >
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "navbar-item",
  props: {
    item: Object,
    sidebar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      clickedIn: false,
      mobWidth: 600,
      clickOutHandler: null,
    };
  },
  methods: {
    clickIn() {
      this.show = !this.show;
      this.clickedIn = true;
    },
    clickOut() {
      if (!this.show || this.clickedIn) {
        this.clickedIn = false;
      } else if (window.innerWidth > this.mobWidth && !this.sidebar) {
        this.show = false;
      }
    },
  },
  directives: {
    "click-out": {
      bind(el, bind, vnode) {
        const metodoNaExpressao = vnode.context[bind.expression];
        const clickOutHandler = (e) => {
          e.stopPropagation();
          metodoNaExpressao();
        };
        vnode.context["clickOutHandler"] = clickOutHandler;

        document.addEventListener("click", clickOutHandler);
      },
      unbind(el, bind, vnode) {
        document.removeEventListener("click", vnode.context["clickOutHandler"]);
      },
    },
  },
};
</script>

<style scoped>
.navbar {
  float: left;
}

.navbar li {
  float: left;
  padding: 10px;
}

.navbar a,
.navbar router-link {
  display: block;
  color: #fff;
  padding: 10px;
  text-decoration: none;
  font-weight: 100;
}

.navbar a:hover:not(.active):not(.disabled),
.navbar router-link:hover:not(.active):not(.disabled) {
  color: #ddd;
}

.navbar .active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  pointer-events: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.navbar .disabled {
  color: #AAA;
  cursor: not-allowed;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.navbar .right {
  float: right;
}

.navbar.fixed-top {
  position: fixed;
  top: 0;
  width: 100%;
}

.navbar.fixed-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.sidebar li {
  padding: 10px;
}
.sidebar a,
.sidebar router-link {
  display: block;
  color: #fff;
  padding: 10px;
  text-decoration: none;
}

.sidebar .active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  pointer-events: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.sidebar .disabled {
  color: #AAA;
  cursor: not-allowed;
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.sidebar a:hover:not(.active):not(.disabled),
.sidebar router-link:hover:not(.active):not(.disabled) {
  color: #ddd;
}

.navbar .dropdown {
  display: inline-block;
}

.navbar .dropdown-content {
  display: none;
  position: absolute;
  background-color: #fff;
  border-radius: 5px;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 20;
}

.navbar .dropdown-content.show {
  display: block;
}

.dropdown-content a,
.dropdown-content router-link {
  padding: 12px 16px;
  display: block;
  text-align: left;
  text-decoration: none;
  color: black;
  margin: 2px;
}

.dropdown-content .active {
  color: #48f;
}

.dropdown-content a:hover:not(.active),
.dropdown-content router-link:hover:not(.active) {
  background-color: #eee;
  color: black;
}

.sidebar .dropdown-content {
  background-color: #fff;
  position: relative;
  display: block;
  border-radius: 5px;
  transition: max-height 0.5s;
  -webkit-transition: max-height 0.5s;
  -o-transition: max-height 0.5s;
  -moz-transition: max-height 0.5s;
  max-height: 0px;
  overflow: hidden;
}

.sidebar .dropdown-content.show {
  display: block;
  max-height: 500px;
  transition: max-height 2s;
  -webkit-transition: max-height 2s;
  -o-transition: max-height 2s;
  -moz-transition: max-height 2s;
}

.sidebar .dropdown-content a,
.sidebar .dropdown-content router-link {
  padding-left: 40px;
}

.caret {
  position: relative;
  font-size: 9px;
  bottom: 3px;
}

.sidebar .caret {
  float: right;
  top: 3px;
}

@media screen and (max-width: 600px) {
  .sidebar {
    width: auto;
    height: auto;
    position: static;
    overflow: hidden;
    float: none;
  }
  .sidebar li {
    float: left;
  }
  .sidebar li a,
  .sidebar li router-link {
    padding: 14px 16px;
  }
  .content {
    margin-left: 0;
  }
  .sidebar li.right,
  .sidebar li {
    float: none;
  }
  .navbar li.right,
  .navbar li {
    float: none;
  }
  .navbar .dropdown {
    display: list-item;
  }
  .navbar .dropdown-content {
    display: block;
    background-color: #f9f9f9;
    position: relative;
    box-shadow: none;
    transition: max-height 0.5s;
    -webkit-transition: max-height 0.5s;
    -o-transition: max-height 0.5s;
    -moz-transition: max-height 0.5s;
    max-height: 0px;
    overflow: hidden;
  }

  .navbar .dropdown-content.show {
    max-height: 500px;
    transition: max-height 0.5s;
    -webkit-transition: max-height 2s;
    -o-transition: max-height 2s;
    -moz-transition: max-height 2s;
  }

  .navbar .dropdown-content a,
  .navbar .dropdown-content router-link {
    padding-left: 40px;
  }
  .caret {
    float: right;
    top: 3px;
  }
}
</style>
