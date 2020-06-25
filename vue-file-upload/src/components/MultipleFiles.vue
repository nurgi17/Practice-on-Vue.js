<template>
  <div class="container">
    MultipleFiles:
    <div class="lar-12 medium-12 small-12 cell">
      <label for>
        Files
        <input type="file" id="files" ref="files" multiple @change="handleFilesUpload" />
      </label>
      <button type="submit" @click.prevent="submitFiles">Submit</button>
    </div>
    <br/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      files: []
    }
  },
  methods: {
    handleFilesUpload () {
      this.files = this.$refs.files.files
    },
    submitFiles () {
      const formData = new FormData()
      for (var i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('files[' + i + ']', file)
      }
      axios.post('/multiple-files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(() => console.log('Success!'))
        .catch(() => console.log('Failure'))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
