<template>
  <div class="container">
    <div class="col-md-12">
      <h1>Book listing APP With Vue.js Apollo and GraphQL</h1>
      <form>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Title"
            v-model="title"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Author"
            v-model="author"
          />
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Description"
            v-model="description"
          ></textarea>
        </div>
        <button
          type="button"
          class="btn btn-secondary btn-lg btn-block"
          @click="createBook"
        >Block level button</button>
      </form>
    </div>
    <div class="row">
      <div class="container mt-4">
        <div v-for="book in books" :key="book.id">
          <div class="col-md-12">
            <div class>
              <div class="card">
                <div class="card-body">
                  Title: {{ book.title }}
                  <hr />
                  Author: {{ book.author }}
                  <hr/>
                  Descroption: {{ book.description }}
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'mainApp',
  data () {
    return {
      books: '',
      title: '',
      author: '',
      description: ''
    }
  },
  apollo: {
    books: {
      query: gql`
        query {
          books {
            title
            author
            description
          }
        }
      `
    }
  },
  methods: {
    createBook () {
      if (this.title !== '' && this.author !== '' && this.description !== '') {
        this.$apollo.mutate({
          mutation: gql`
            mutation createBook($title:String!, $author:String!, $description:String!){
              createBook(title: $title, author: $author, description: $description){
                title,
                author,
                description
              }
            }
          `,
          variables: {
            title: this.title,
            author: this.author,
            description: this.description
          }
        })
          .then(res => {
            this.books = res.data.createBook
            location.reload()
          })
      } else {
        alert('Please fill all forms')
      }
    }
  }
}
</script>
