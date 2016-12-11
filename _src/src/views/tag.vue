<template>
<div class="tag-posts">
  <div class="page-subhead">
    含有标签 <span class="tag-name">"{{tag}}"</span> 的文章 (Posts with tag <span class="tag-name">"{{tag}}"</span>)
  </div>
  <div class="links-contianer" v-show="!loading">
    <post-link :posts="posts" />
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import PostLink from '../components/PostLink';

export default {
  computed: {
    ...mapState({
      loading: state => state.global.loading,
      tagOfPosts: state => state.tagOfPosts,
      tag: state => state.route.params.tag,
      posts: state => state.tag_posts
    })
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.tagOfPosts[vm.tag]) {
        vm.$store.dispatch('FETCH_TAGOFPOSTS', vm.tag);
      } else {
        vm.$store.commit('SET_TAGPOSTS', vm.tagOfPosts[vm.tag]);
      }
    });
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
