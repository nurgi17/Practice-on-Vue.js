export default function isSubscribed ({ next, store, nextMiddleware }) {
  if (!store.getters.auth.isSubscribed) {
    return next({
      name: 'dashboard'
    })
  }
  return nextMiddleware()
}
