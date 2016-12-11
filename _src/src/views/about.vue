<template>
<div class="about-page">
  <div class="page-subhead">
    关于 (About)
  </div>
  <div class="page-content" v-html="page.content">
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      page: state => state.pages.about
    })
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.page.content) {
        vm.$store.dispatch('FETCH_PAGE', 'about');
      }
    });
  }
};
</script>

<style>
.page-content {
  margin: 0 auto;
  max-width: 800px;
  margin-bottom: 50px;
  line-height: 1.6em;
  transition: all .4s;
}
</style>
