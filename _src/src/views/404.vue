<template>
  <div class="not-found">
    <div class="page-subhead">
      404 NOT FOUND
    </div>
    <div class="not-found__message">
      <p>This is not the web page you are looking for.</p>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style>
.not-found__message {
  color: #6d5858;
  font-size: 2em;
  font-style: italic;
  font-family: fantasy;
  text-align: center;

  & p {
    font-weight: lighter;
  }
}
</style>
