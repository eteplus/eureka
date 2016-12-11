<template>
<svg class="spinner" :class="{ show: show }" width="44px" height="44px" viewBox="0 0 44 44">
    <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
  </svg>
</template>

<script>
export default {
  props: ['show']
};
</script>

<style>
.spinner {
  position: fixed;
  z-index: 999;
  right: 15px;
  /*bottom: 15px;*/
  top: 5px;
  opacity: 0;
  transition: opacity .15s ease;
  animation: rotator 1.4s linear infinite;
  animation-play-state: paused
}

.spinner.show {
  opacity: 1;
  animation-play-state: running
}

.spinner .path {
  stroke: #4d85d1;
  stroke-dasharray: 126;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite
}

@keyframes rotator {
  0% {
    transform: scale(.5) rotate(0deg)
  }
  to {
    transform: scale(.5) rotate(270deg)
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 126
  }
  50% {
    stroke-dashoffset: 63;
    transform: rotate(135deg)
  }
  to {
    stroke-dashoffset: 126;
    transform: rotate(450deg)
  }
}
</style>
