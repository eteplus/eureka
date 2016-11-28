<template>
<div id="app" class="app pure-g">
  <a id="menu-open" class="menu-open" href="#menu">
    <i class="iconfont icon-category"></i>
  </a>
  <sidebar id="menu" />
  <div class="content pure-u-1">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
  <div class="footer pure-u-1">
    <div class="pure-menu pure-menu-horizontal">
      <span>© 2016.</span>
      <a href="http://maybeul.com">Eureka</a>
      <span>Powered by</span>
      <a href="https://github.com/eteplus/eblog">EBlog</a>
    </div>
  </div>
</div>
</template>

<script>
import Sidebar from './components/SideBar';

export default {
  mounted() {
    this.$nextTick(() => {
      const app = document.getElementById('app');
      const menu = document.getElementById('menu');
      const menuOpen = document.getElementById('menu-open');
      const menuClose = document.getElementById('menu-close');
      menuOpen.onclick = (e) => {
        const active = 'active';
        e.preventDefault();
        this.toggleClass(app, active);
        this.toggleClass(menu, active);
        this.toggleClass(menuOpen, active);
      };
      menuClose.onclick = (e) => {
        const active = 'active';
        e.preventDefault();
        this.toggleClass(app, active);
        this.toggleClass(menu, active);
        this.toggleClass(menuOpen, active);
      };
    });
  },
  methods: {
    toggleClass: (element, className) => {
      /* eslint-disable no-param-reassign */
      const classes = element.className.split(/\s+/);
      const length = classes.length;
      for (let i = 0; i < length; i++) {
        if (classes[i] === className) {
          classes.splice(i, 1);
          break;
        }
      }
      if (length === classes.length) {
        classes.push(className);
      }
      element.className = classes.join(' ');
    }
  },
  components: {
    Sidebar
  }
};
</script>

<style>
@import "./assets/css/grids-responsive-min.css";
@import "./assets/css/iconfont.css";
@import "./assets/css/_base.css";
@import "./assets/css/atelier-forest-light.css";

.app {
  position: relative;
  padding-left: 0;
}

.menu-open {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  font-size: 10px;
  z-index: 10;
  width: 4em;
  height: auto;
  padding: .6em;
  color: white;
  border-bottom-right-radius: 8px;

  &:matches(:hover, :focus) {
    text-decoration: none;
    background: rgb(61, 79, 93);
  }

  & i {
    font-size: 2.5em;
  }
}

.content {
  padding: 1em 2em;
}

.content,
.menu-open {
  transition: all 0.2s ease-out;
}

.page-subhead {
  text-transform: uppercase;
  color: #aaa;
  border-bottom: 1px solid #eee;
  font-size: 80%;
  font-weight: 500;
  letter-spacing: 0.1em;
  padding-bottom: 1em;
}

.footer {
  text-align: center;
  color: #8e8787;
  font-size: 90%;
  padding: 1em 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

@media (width >=48em) {
  .app {
    padding-left: 250px;
    left: 0;
  }
  .menu-open {
    position: fixed;
    left: 250px;
    display: none;
  }
  .app.active .menu-open {
    /*left: 250px;*/
  }
  .content {
    padding-left: 2em;
    padding-right: 2em;
  }
}

@media (width < 48em) {
  .app.active {
    position: relative;
  }
}
</style>
