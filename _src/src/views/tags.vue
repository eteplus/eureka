<template>
<div class="tags">
  <div class="page-subhead">
    所有标签 (All tags)
  </div>
  <div class="tags-container">
    <router-link
      class="tag pure-button"
      v-for="tag in tags"
      :to="{ name: 'tag',  params: { tag: tag.name }}">
      {{tag.name}}
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      tags: []
    };
  },
  mounted() {
    fetch('/data/tags.json')
      .then(res => res.json())
      .then((data) => {
        this.tags = data;
      })
      .catch((err) => {
        console.warn(err);
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
  min-width: 60px;
  color: white;
  background: #4d85d1;
  box-shadow: none;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
