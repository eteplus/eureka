<template>
<div class="menu">
  <button id="menu-close" class="menu__close">
    <i class="iconfont icon-close"></i>
  </button>
  <div class="menu__profile">
    <router-link :to="{ name: 'home' }">
      <img class="menu__logo" :src=" '/static/' + logo " :alt="name + '\'s blog'">
    </router-link>
    <span>{{ name }}</span>
    <small v-if="desc" v-html="desc"></small>
  </div>
  <ul class="menu__links">
    <li>
      <router-link :to="{ name: 'home' }" title="首页" class="menu__link">
        <i class="menu__icon iconfont icon-hot"></i>
        <span>Recent</span>
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'archives' }" title="归档" class="menu__link">
        <i class="menu__icon iconfont icon-archive"></i>
        <span>Archive</span>
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'tags' }" title="标签" class="menu__link">
        <i class="menu__icon iconfont icon-tag"></i>
        <span>Tags</span>
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'about' }" title="关于" class="menu__link">
        <i class="menu__icon iconfont icon-account"></i>
        <span>About</span>
      </router-link>
    </li>
    <li v-if="github.show">
      <a :href="github.url" title="github" class="menu__link">
        <i class="menu__icon iconfont icon-github"></i>
        <span>Github</span>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    name: String,
    desc: String,
    logo: String,
    github: Object
  }
};
</script>

<style>

.app.active .menu {
  left: 250px;
  width: 250px;
}

@b menu {
  width: 250px;
  margin-left: -250px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  overflow-y: auto;
  background: rgb(61, 79, 93);
  color: #fff;
  -webkit-overflow-scrolling: touch;
  letter-spacing: normal;
  transition: all 0.2s ease-out;

  @e close {
    padding: 15px;
    position: absolute;
    border: none;
    background: none;
    margin: 0;
    z-index: 100;
    top: 0;
    right: 0;
    cursor: pointer;
    user-select: none;
    outline: none;
    transition: opacity 0.3s;
  }

  @e profile {
    width: 100%;
    text-align: center;
    padding-bottom: 1.5em;
  }

  @e logo {
    width: 50%;
    border-radius: 70px;
    overflow: hidden;
  }

  @e links {
    margin: 0 0 20px;
    padding: 0;
    list-style: none;
  }

  @e link {
    padding-left: 30%;
    display: block;
    color: white;
    transition: color .2s cubic-bezier(.4,.01,.165,.99);
    text-decoration: none;
  }

  @e icon {
    width: 30px;
    height: 45px;
    line-height: 45px;
    display: inline-block;
    vertical-align: middle;
  }
}

.menu__profile a {
  display: block;
  margin: 0 auto;
  padding: 1em;
}

.menu__profile span {
  display: block;
  padding: 10px;
}

.menu__profile small {
  font-family: "Playfair Display", serif;
  font-style: italic;
  height: 15px;
  line-height: 1.5;
  display: inline-block;
  padding: 0 15px 0 15px;

  & i {
    font-style: italic;
    font-size: 80%;
  }
}

.menu__links li {
  display: block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu__link:matches(:focus, :hover) {
  background: #3a4c5a;
  text-decoration: none;
}
.menu__link span {
  display: inline-block;
  vertical-align: middle;
}

@media (width >= 48em) {
  .menu {
    left: 250px;
  }
  .menu__close {
    opacity: 0;
    pointer-events: none;
  }
}

@media (width < 48em) {
  .menu .menu__close {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
