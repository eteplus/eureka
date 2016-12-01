<template>
<div class="archives">
  archives
</div>
</template>

<script>
export default {
  mounted() {
    const { params } = this.$store.state.route;
    console.log(params);
    fetch(`/data/posts/${params.year}/${params.month}/${params.title}.json`)
      .then(res => res.json())
      .then((data) => {
        this.article = {
          ...data
        };
      })
      .catch((err) => {
        console.warn(err);
      });
  }
};
</script>
