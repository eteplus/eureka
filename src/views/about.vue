<template>
  <div class="index-page">
    <div id="wrapper">
      <h1>Ete Plus</h1>
      <h2>An Art Coder</h2>
      <p><a href="http://blog.coderfun.com/" target="_blank">Blog</a></p>
      <p><a href="https://twitter.com/eteplus" target="_blank">Twitter</a></p>
      <p><a href="https://github.com/eteplus" target="_blank">Github</a></p>
      <p><a href="http://weibo.com/u/1762715757" target="_blank">微博</a></p>
    </div>
    <div class="footer">
      <p class="copyright">
        <a href="http://www.miitbeian.gov.cn" target="_blank" style="font-family:Arial;">粤ICP备14079312号</a>
      </p>
    </div>
    <canvas width="2476" height="1364"></canvas>
  </div>
</template>

<script>
  export default {
    mounted() {
      /* eslint-disable no-mixed-operators, prefer-template, no-bitwise */
      document.addEventListener('touchmove', (e) => {
        e.preventDefault();
      });
      const c = document.getElementsByTagName('canvas')[0];
      const x = c.getContext('2d');
      const pr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const f = 90;
      let q;
      const m = Math;
      let r = 0;
      const u = m.PI * 2;
      const v = m.cos;
      const z = m.random;
      c.width = w * pr;
      c.height = h * pr;
      x.scale(pr, pr);
      x.globalAlpha = 0.6;

      const y = (p) => {
        const t = p + (z() * 2 - 1.1) * f;
        return (t > h || t < 0) ? y(p) : t;
      };

      const d = (i, j) => {
        x.beginPath();
        x.moveTo(i.x, i.y);
        x.lineTo(j.x, j.y);
        const k = j.x + (z() * 2 - 0.25) * f;
        const n = y(j.y);
        x.lineTo(k, n);
        x.closePath();
        r -= u / -50;
        x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16);
        x.fill();
        q[0] = q[1];
        q[1] = {
          x: k,
          y: n
        };
      };

      const i = () => {
        x.clearRect(0, 0, w, h);
        q = [{
          x: 0,
          y: (h * 0.7) + f
        }, {
          x: 0,
          y: (h * 0.7) - f
        }];
        while (q[1].x < w + f) {
          d(q[0], q[1]);
        }
      };
      document.onclick = i;
      document.ontouchstart = i;
      i();
    }
  };
</script>

<style>
#wrapper {
  position: absolute;
  left: 0;
  width: 320px;
  text-align: center;
  top: 50%;
  left: 50%;
  margin-left: -160px;
  margin-top: -160px;
  user-select: none;
}

.footer {
  width: 100%;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
}

.copyright {
  color: #999;
  text-align: right;
  padding: 3px;
  font-size: 12px; /* px */
}

h1 {
  font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 700;
  font-size: 30px; /* px */
  letter-spacing: 9px;
  text-transform: uppercase;
  margin: 12px 0;
  left: 4px;
}

h2 {
  color: #999;
  font-weight: normal;
  font-size: 15px; /* px */
  letter-spacing: .12em;
  margin-bottom: 30px;
  left: 3px;
}

h1,
h2 {
  position: relative;
}

p {
  font-size: 14px; /* px */
  line-height: 2em;
  margin: 0;
  letter-spacing: 2px;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
