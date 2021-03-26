<template>
  <article ref="main" class="aspect-ratio-wrapper" :class="{
    'aspect-ratio-wrapper--flex-item': flex,
     'aspect-ratio-wrapper--self-container': !flex,
           }"
           @click="resizeSelf">
    <slot/>
  </article>
</template>

<script>
import {elementResizeWatcher} from '../watcher'

export default {
  name: "CAspectRatioWrapper",
  props: {
    ratio: {
      type: String,
      default: () => "16:9",
    },
    flex: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {watcher: null}
  },
  methods: {
    resizeSelf() {
      this.resizePadding(this.$refs.main.getBoundingClientRect())
    },
    resizePadding(ev) {
      const {width, height} = ev
      if (!width || !height) {
        return
      }

      const r = width / height
      if (Math.abs(this.aspectRatio - r) < 0.01) {
        return
      }

      this.watcher.stop()
      const style = this.$refs.main.style
      // 가로가 긴 경우 width is longer then height
      if (r > this.aspectRatio) {
        style.setProperty("--verticalPadding", 0)
        style.setProperty("--horizontalPadding", `${(width - height * this.aspectRatio) / 2}px`)
      } else if (r < this.aspectRatio) {
        // 세로가 긴 경우 height is longer then width
        style.setProperty("--verticalPadding", `${(height - width / this.aspectRatio) / 2}px`)
        style.setProperty("--horizontalPadding", 0)
      }
      this.watcher.start()
    },
  },
  mounted() {
    this.watcher = elementResizeWatcher(this.$refs.main, this.resizePadding)
    this.$nextTick(() => {
      this.resizeSelf()
    })
  },
  beforeDestroy() {
    if (this.watcher) {
      this.watcher.stop()
      this.watcher = null
    }
  },
  computed: {
    aspectRatio() {
      const strings = this.ratio.split(":")
      if (strings.length < 2) {
        return 1.7777777777777777
      }
      return parseInt(strings[0]) / parseInt(strings[1])
    },
  },
}
</script>

<style scoped>
.aspect-ratio-wrapper {
  position: relative;
  overflow: hidden;
  display: block;

  --horizontalPadding: 0;
  --verticalPadding: 0;
  padding: var(--verticalPadding) var(--horizontalPadding);
}

.aspect-ratio-wrapper--flex-item {
  flex-grow: 1;
  align-self: stretch;
}

.aspect-ratio-wrapper--self-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
