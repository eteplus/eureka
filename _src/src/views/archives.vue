<template>
<div class="archives">
  <div class="page-subhead">
    归档 (Archives)
  </div>
  <transition-group tag="div" name="list">
    <div class="archive" v-for="archive in archives" :key="archive.date">
      <h3>&nbsp; {{archive.date}}</h3>
      <post-link :posts="archive.posts">
    </div>
  </transition-group>
</div>
</template>

<script>
import { mapState } from 'vuex';
import PostLink from '../components/PostLink';

export default {
  computed: mapState(['archives']),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const length = Object.getOwnPropertyNames(vm.archives).length;
      if (length === 1) {
        vm.$store.dispatch('FETCH', 'archives');
      }
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

.archive {
  transition: all .3s;
}
</style>
