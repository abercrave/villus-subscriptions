<template>
  <div>
    <h2>Posts</h2>
    <ol v-if="data">
      <li v-for="(post, index) in data.posts" v-bind:key="index">
        <em>{{ post.title }}</em> by {{ post.author }}
      </li>
    </ol>
    <p v-else>No posts to display.</p>
  </div>
</template>

<script>
import { watch } from 'vue'
import { useQuery } from 'villus'
import store from '../store'

export default {
  setup() {
    const GetPosts = `{
      posts {
        id
        author
        title
        body
      }
    }`
    const { data } = useQuery({
      query: GetPosts,
    })

    watch(
      () => store.state.posts,
      (posts, prevPosts) => {
        console.log('posts:', posts)
        console.log('prevPosts:', prevPosts)
      }
    )

    store.addPosts(data.posts)

    return { data }
  },
}
</script>
