<template>
  <div class="container">
    SingleFiles:
    <div class="lar-12 medium-12 small-12 cell">
      <label for>
        File
        <input type="file" id="file" ref="file" @change="handleFileUpload" />
      </label>
      <button type="submit" @click.prevent="submitFile">Submit</button>
    </div>
    <br/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      file: ''
    }
  },
  methods: {
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    submitFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      axios.post('/single-file',
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
