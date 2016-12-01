<template>
<div class="tag-posts">
  <div class="page-subhead">
    含有标签 <span class="tag-name">"{{tag}}"</span> 的文章 (Posts with tag <span class="tag-name">"{{tag}}"</span>)
  </div>
  <div class="links-contianer">
    <post-link :posts="posts" />
  </div>
</div>
</template>

<script>
import PostLink from '../components/PostLink';

export default {
  data() {
    return {
      posts: []
    };
  },
  computed: {
    tag() {
      return this.$store.state.route.params.tag;
    }
  },
  mounted() {
    fetch(`/data/tags/${this.tag}.json`)
      .then(res => res.json())
      .then((posts) => {
        this.posts = posts;
      })
      .catch((err) => {
        console.warn(err);
      });
  },
  methods: {

  },
  components: {
    PostLink
  }
};
</script>

<style>
.tag-name {
  font-family: serif;
}
</style>
