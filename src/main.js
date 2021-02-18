import { createApp } from 'vue'
import { useClient, handleSubscriptions, defaultPlugins } from 'villus'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import App from './App.vue'

const app = createApp(App)

const subscriptionClient = new SubscriptionClient('ws://localhost:3000/subscriptions', {})
const subscriptionForwarder = operation => subscriptionClient.request(operation)

const client = useClient({
  url: 'http://localhost:3000/graphql',
  use: [handleSubscriptions(subscriptionForwarder), ...defaultPlugins()],
})

app.use(client)

app.mount('#app')
