<template>
<div class="article">
  <div class="page-subhead" v-show="loading">Loading...</div>
  <transition name="article">
    <div class="article__title" v-show="!loading" v-cloak>
      <h1>{{article.title}}</h1>
      <div class="article__meta">
        <i class="iconfont icon-calendar" v-show="!loading"></i> &nbsp;{{article.date}}
        &nbsp;<a href="/about">{{article.author}}</a>
      </div>
      <div class="article__tags">
        <router-link
          class="article__tag pure-button"
          v-for="tag in article.tags"
          :to="{ name: 'tag', params: { tag: tag }}">
          {{tag}}
        </router-link>
      </div>
    </div>
  </transition>
  <transition name="article">
    <div class="article__content markdown-body" v-show="!loading" v-html="article.content">
    </div>
  </transition>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      loading: state => state.global.loading,
      article: state => state.article
    })
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const { params } = vm.$store.state.route;
      vm.$store.dispatch('FETCH_ARTICLE', params);
    });
  }
};
</script>

<style>

@b article {

  @e title {
    margin: 0;
    color: #333;
    text-align: center;
    border-bottom: 1px dashed #eee;
    transition: all .3s;
  }

  @e meta {
    /*color: #9d9494;*/
    color: #605858;
    width: 100%;
    padding: 1em 0;
  }

  @e tags {
    padding: 0 0 1em 0;
  }

  @e tag {
    /* padding: 0.3em 0.4em; */
    color: #fff;
    background: #4d85d1;
    font-size: 80%;
    border-radius: 20px;
    margin-right: 0.4rem;
    cursor: pointer;
    height: 2em;
    line-height: 1;
  }

  @e content {
    margin: 0 auto;
    /*padding: 0 2em;*/
    max-width: 800px;
    margin-bottom: 50px;
    line-height: 1.6em;
    transition: all .4s;
  }
}

.article .page-subhead {
  font-weight: 600;
  text-align: center;
  color: #4d85d1;
}

.article__title {
  & h1 {
    margin: 0.2em 0;
    font-size: 1.5em;
    font-weight: 400;
  }
  & h2 {
    font-weight: 300;
    color: #ccc;
    padding: 0;
    margin-top: 0;
  }
}

.article__content {

  & pre {
    overflow: auto;
    margin: 15px 0;
    padding: 15px;
    font-size: 13px;
    color: #4d4d4c;
    background: #f7f7f7;
    /*background: rgba(221, 221, 221, 0.35);*/
    line-height: 1.6;
  }

  & code {
    font-family: 'Monaco', 'monospace';
  }
}

.article-enter, .article-leave {
  opacity: 0;
}

.article-enter-active {
  opacity: 0;
  transform: translateY(-20px);
}

.article-leave-active {
  position: absolute;
}
</style>
