<template>
  <div class="container">
    SelectFiles:
    <div class="large-12 medium-12 small-12 cell">
      <label for>
        Files
        <input type="file" id="files" ref="files" multiple @change="handleFilesUpload" />
      </label>
    </div>
    <div class="large-12 medium-12 small-12 cell">
      <div v-for="(file, key) in files" :key="key" class="file-listening">
        {{ file.name }}
        <span class="remove-file" @click="removeFile(key)">Remove</span>
      </div>
    </div>
    <br/>
    <div class="large-12 medium-12 small-12 cell">
      <button @click.prevent="addFiles">Add Files</button>
    </div>
    <br/>
    <div class="large-12 medium-12 small-12 cell">
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
    addFiles () {
      this.$refs.files.click()
    },
    removeFile (key) {
      this.files.splice(key, 1)
    },
    handleFilesUpload () {
      const uploadedFiles = this.$refs.files.files
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i])
      }
    },
    submitFiles () {
      const formData = new FormData()
      for (var i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('files[' + i + ']', file)
      }
      axios.post('/select-files',
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

<style>
input[type="file"] {
  position: absolute;
  top: -500px;
}
div.file-listing {
  width: 200px;
}
span.remove-file {
  color: red;
  cursor: pointer;
  float: right;
}
</style>
