<template>
<div class="posts">
  <div class="page-subhead">最新文章(lastest articles)</div>
  <div class="pure-g">
    <post v-for="post in posts"
      :author="post.author"
      :title="post.title"
      :description="post.description"
      :datetime="post.datetime"
      :tags="post.tags"
      :url="post.url"
    />
  </div>
</div>
</template>

<script>
import Post from '../components/Post';

export default {
  data() {
    return {
      total: 1,
      posts: []
    };
  },
  mounted() {
    /* eslint-disable */
    const Mock = require('mockjs');

    // /\/source\/posts\/*\.json/
    fetch('/source/posts/posts.json')
      .then(res => res.json())
      .then((data) => {
        const mock = Mock.mock({
          total: function() {
            return this.posts.length;
          },
          'posts|4-10': [{
            author: '@cword(4,8)',
            title: '@title(5, 30)',
            description: '@sentence(30, 80)',
            datetime: '@datetime',
            'tags|2-3': ['@cword(2,10)'],
            url: '@url'
          }]
        });
        const { total, posts } = mock;
        this.posts = posts;
        this.total = total;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
    Post
  }
};
</script>

<style>
.post-images {
  margin: 1em 0;
}

.post-image-meta {
  margin-top: -3.5em;
  margin-left: 1em;
  color: #fff;
  text-shadow: 0 1px 1px #333;
}
</style>
