<template>
<div class="archives">
  <div class="page-subhead">
    归档 (Archives)
  </div>
  <div class="archive" v-for="(posts, date) in archives">
    <h3>&nbsp; {{date}}</h3>
    <post-link :posts="posts">
  </div>
</div>
</template>

<script>
import PostLink from '../components/PostLink';

export default {
  data() {
    return {
      archives: {}
    };
  },
  mounted() {
    fetch('/data/archives.json')
      .then(res => res.json())
      .then((archives) => {
        this.archives = archives;
      })
      .catch((err) => {
        console.warn(err);
      });
  },
  components: {
    PostLink
  }
};
</script>

<style>
.archive h3 {
  line-height: 1;
  font-weight: 400;
  margin-bottom: 0;
  border-left: 3px solid #4d85d1;
}
</style>
