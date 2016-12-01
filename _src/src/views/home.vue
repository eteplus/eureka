<template>
<div class="posts">
  <div class="page-subhead">最新文章(lastest articles)</div>
  <div class="pure-g">
    <post v-for="post in posts"
      :author="post.author"
      :title="post.title"
      :description="post.description"
      :date="post.date"
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
      posts: []
    };
  },
  mounted() {
    // /\/source\/posts\/*\.json/
    fetch('/data/posts.json')
      .then(res => res.json())
      .then((data) => {
        // const { total, posts } = data;
        this.posts = data;
        // this.total = total;
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
