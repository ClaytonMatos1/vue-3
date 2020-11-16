<template>
  <div class="home">
    <Repositories />
  </div>
</template>

<script>
import Repositories from '@/components/Repositories.vue'

export default {
  name: 'Home',
  components: {
    Repositories
  }
}
</script>
