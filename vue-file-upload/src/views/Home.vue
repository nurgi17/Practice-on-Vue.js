<template>
  <div>
    <single-file />
    <multiple-files />
    <select-files />
  </div>
</template>

<script>
import SingleFile from '@/components/SingleFile.vue'
import MultipleFiles from '@/components/MultipleFiles.vue'
import SelectFiles from '@/components/SelectFiles.vue'
export default {
  name: 'Home',
  components: {
    SingleFile,
    MultipleFiles,
    SelectFiles
  }
}
</script>
