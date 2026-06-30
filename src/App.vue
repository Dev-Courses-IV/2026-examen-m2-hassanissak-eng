<template>
  <div class="min-h-screen bg-stone-950 text-stone-100 selection:bg-red-900">
    <HomeView />
  </div>
</template>

<script>
import HomeView from './views/HomeView.vue'

export default {
  name: 'App',
  components: {
    HomeView
  }
}
</script>