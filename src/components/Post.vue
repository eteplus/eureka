<template>
  <section class="post pure-u-1 pure-u-xg-1-2">
    <header class="post__header">
      <img class="post__avatar" :alt="author + '&#x27;s avatar'" height="48" width="48" :src="avatar">

      <router-link :to="{ name: 'article', params: { year: year, month: month, title: title }}" class="post__title">
        <h2>{{title}}</h2>
      </router-link>

      <p class="post__meta">
        <i class="iconfont icon-calendar"></i>&nbsp;&nbsp;{{ date }}
        &nbsp;<a href="#" class="post__author">{{author}}</a>
      </p>
    </header>
    <div class="post__description">
      <p v-html="description"></p>
    </div>
    <div class="post__footer">
      <div class="post__tags">
        <a class="post__tag"
          href="#"
          v-for="tag in tags">
          {{tag}}
        </a>
      </div>
      <router-link :to="{ name: 'article', params: { year: year, month: month, title: title }}" class="post__link-btn">Read More ...</router-link>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    url: String,
    author: String,
    title: String,
    datetime: String,
    description: String,
    tags: Array
  },
  computed: {
    avatar() {
      return `/static/img/authors/${this.author !== 'eteplus' ? 'eteplus' : this.author}.png`;
    },
    date() {
      return this.datetime.replace(/^\s+|\s+$/g, '').split(' ')[0];
    },
    year() {
      return new Date(this.datetime).getFullYear();
    },
    month() {
      return new Date(this.datetime).getMonth() + 1;
    }
  }
};
</script>

<style>
@b post {
  overflow: hidden;
  padding-bottom: 2em;
  padding-right: 1em;
  border-bottom: 1px dashed #eee;

  @e title {
    display: block;
    color: #222;
  }

  @e avatar {
    border-radius: 50px;
    float: right;
    margin-left: 1em;
    margin-right: 1em;
  }

  @e description {
    font-family: Georgia, "Cambria", serif;
    color: #444;
    line-height: 1.8em;
  }

  @e meta {
    color: #999;
    font-size: 90%;
    margin: 0;
  }

  @e tags {
    float: left;
  }

  @e tag {
    padding: 0.3em 0.4em;
    color: #fff;
    background: #999;
    font-size: 80%;
    border-radius: 0.3em;
    margin-right: 0.4rem;
    background: #4d85d1;

    @m css {
      background: #5aba59;
    }

    @m js {
      background: #df2d4f;
    }
  }

  @e link-btn {
    font-size: 85%;
    float: right;
    cursor: pointer;
  }
}

.post__title {
  &:hover, &:focus {
    text-decoration: none;
  }

  & h2 {
    font-weight: 300;
    font-size: 1.5em;
  }
}

.post__meta i {
  font-size: 90%;
}
</style>
