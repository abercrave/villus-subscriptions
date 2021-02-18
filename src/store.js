import { reactive } from 'vue'

const store = {
  state: reactive({
    posts: []
  }),

  addPost(post) {
    this.state.posts.push(post)
  },

  addPosts(posts = []) {
    posts.forEach(post => this.state.posts.push(post))
  },

  findPostIndex(id) {
    const postId = parseInt(id, 10)
    return this.state.posts.findIndex(post => post.id === postId)
  },

  removePost(id) {
    const postIndex = this.findPostIndex(id)
    this.state.posts.splice(postIndex, 1)
  },

  updatePost(input) {
    const id = parseInt(input.id, 10)
    const postIndex = this.findPostIndex(id)

    if (postIndex !== -1) {
      const post = this.state.posts[postIndex]
      const updatedPost = {
        ...post,
        ...input,
        id,
      }

      this.state.posts.splice(postIndex, 1, updatedPost)
    }
  }
}

export default store
