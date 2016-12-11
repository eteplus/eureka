<template>
  <ul class="posts-link">
    <li v-for="post in posts" class="posts-link__item">
      <span class="anchor"></span>
      <router-link
      class="post-link"
      :title="post.title"
      :to="{ path: '/article' + post.url }">
      {{post.title}}
      </router-link>
      <span class="post-date"><i class="iconfont icon-calendar"></i>&nbsp; {{format(post.date)}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    posts: Array
  },
  methods: {
    format(date) {
      return date.split(' ')[0];
    }
  }
};
</script>

<style>
@b posts-link {
  list-style: none;
  padding-left: 0;

  @e item {
    border-bottom: 1px dashed #dbd2d2;
    padding: 10px 0 10px 0;
  }
}

.posts-link__item {
  line-height: 1.5;

  &:hover {
    background-color: #EFEFEF;
  }
}

.anchor:before {
  float: left;
  content: "\0BB \020";
}

.post-link {
  /*display: inline-block;
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;*/
  font-size: 16px;
  padding: 0 10px 0 10px;
  text-decoration: none;
}

.post-date {
  color: gray;
  margin-left: 15px;

  & i {
    font-size: 15px;
  }
}
</style>
