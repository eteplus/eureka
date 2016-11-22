<template>
  <div class="index-page">
    <p class="index-page__text">index page</p>
  </div>
</template>

<script>
export default {
};
</script>

<style>
:root {
  --color: yellow;
  --danger-theme: {
    color: white;
    background-color: red;
  };
}
@b index-page {
  color: var(--color);

  @e text {
    color: blue;

    @m primary {
      color: blue;
    }

    @m danger {
      color: red;
    }
  }

  @m primary {
    color: blue;
  }
}
</style>
