<template>
  <div class="activity-log">
    <h2>Activity</h2>
    <ol v-if="data">
      <li v-for="(message, index) in data" v-bind:key="index">
        Post <em>{{ message.data.title }}</em> by {{ message.data.author }} was {{ message.mutation.toLowerCase() }}
      </li>
    </ol>
    <p v-else>No activity to display.</p>
  </div>
</template>

<script>
import { useSubscription } from 'villus'
import store from '../store'

export default {
  setup() {
    function messagesReducer(oldValue, { data, errors }) {
      oldValue = oldValue || []

      if (!data || errors) {
        return oldValue
      }

      const {
        data: post,
        mutation,
      } = data.post

      switch (mutation) {
        case 'CREATED':
          store.addPost(post)
          break

        case 'DELETED':
          store.removePost(post)
          break

        case 'UPDATED':
          store.updatePost(post)
          break
      }

      return [...oldValue, data.post]
    }

    const NewMessages = `
      subscription {
        post {
          mutation
          data {
            id
            author
            title
            body
            commentCount
            downvotes
            upvotes
          }
        }
      }
    `

    const { data } = useSubscription(
      {
        query: NewMessages,
      },
      messagesReducer
    )

    return { data }
  },
}
</script>

<style>
.activity-log {
  background-color: #f7f7f7;
  border: 1px solid #d3d3d3;
  margin: 2rem 1rem;
  padding: 20px;
}
</style>
