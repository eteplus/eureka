<template>
<div class="article">
  <div class="article__title">
    <h1>{{article.title}}</h1>
    <div class="article__meta">
      <i class="iconfont icon-calendar"></i> &nbsp;{{article.date}}
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
  <div class="article__content markdown-body" v-html="article.content">
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      article: {}
    };
  },
  computed: {
    // date() {
    //   return this.article.date && this.article.date.split(' ')[0];
    // }
  },
  mounted() {
    const { params } = this.$store.state.route;
    console.log(params);
    fetch(`/data/posts/${params.year}/${params.month}/${params.title}.json`)
      .then(res => res.json())
      .then((data) => {
        this.article = {
          ...data
        };
      })
      .catch((err) => {
        console.warn(err);
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
  }

  @e meta {
    color: #9d9494;
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
  }

  @e content {
    margin: 0 auto;
    /*padding: 0 2em;*/
    max-width: 800px;
    margin-bottom: 50px;
    line-height: 1.6em
  }
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
    line-height: 1.6;
  }

  & code {
    font-family: 'Monaco', 'monospace';
  }
}
</style>
