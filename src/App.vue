<template>
  <main id="app">
    <div id="flex">
      <VueAspectRatioWrapper>
        <div class="contents">16:9</div>
      </VueAspectRatioWrapper>
    </div>
    <div id="normal">
      <VueAspectRatioWrapper ratio="4:3" :flex="false">
        <div class="contents">4:3</div>
      </VueAspectRatioWrapper>
    </div>
  </main>
</template>

<script>
import VueAspectRatioWrapper from './components/VueAspectRatioWrapper'

export default {
  name: 'App',
  components: {
    VueAspectRatioWrapper,
  },
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#flex {
  display: flex;
}

#normal {
  display: block;
}

div {
  box-sizing: border-box;
  margin: auto;
  height: 30vh;
  width: 50vw;
  border: 1px solid gray;
  padding: 1rem;
}

div + div {
  margin-top: 2rem;
}

.contents {
  background-color: greenyellow;
  margin: 0;
  width: 100%;
  height: 100%;
  border: 5px solid gray;
}
</style>
