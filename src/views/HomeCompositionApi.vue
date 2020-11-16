<template>
  <div class="home-composition-api">
    <RepositoriesCompApi />
  </div>
</template>
<script>
  import RepositoriesCompApi from '@/components/RepositoriesCompApi.vue'

  export default {
    name: 'HomeCompositionApi',
    components: {
      RepositoriesCompApi
    }
  }
</script>