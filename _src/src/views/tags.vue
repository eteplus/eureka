<template>
<div class="tags">
  <div class="page-subhead">
    所有标签 (All tags)
  </div>
  <div class="tags-container">
    <transition-group name="tag">
      <router-link
        class="tag pure-button"
        v-for="tag in tags"
        :to="{ name: 'tag',  params: { tag: tag.name }}"
        :key="tag.name">
        {{tag.name}}
      </router-link>
    </transition-group>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['tags']),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.tags.length) {
        vm.$store.dispatch('FETCH', 'tags');
      }
    });
  }
};
</script>

<style>
.tags-container {
  padding-top: 10px;
}
.tag {
  font-family: serif;
  height: 2.5em;
  line-height: 1.5;
  min-width: 60px;
  color: white;
  background: #4d85d1;
  box-shadow: none;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: all 0.4s ease-out;
}

.tag-enter-active,
.tag-leave-active {
  opacity: 1;
}
.tag-enter, .tag-leave-active {
  opacity: 0
}
</style>
