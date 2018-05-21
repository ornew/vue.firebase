<template>
  <main>
    <p>Authorized: {{authorized}}</p>
    <p>{{user.uid}}</p>
    <p>{{dat}}</p>
    <button @click="signIn">Sign In</button>
    <button @click="signOut">Sign Out</button>
  </main>
</template>

<script>
  export default {
    data: vm => ({
    }),
    methods: {
      async signIn() {
        const provider = new firebase.auth.GoogleAuthProvider()
        try {
          const result = await firebase.auth().signInWithPopup(provider)
          console.log(result)
        }
        catch(err) {
          console.error('Failed authentication:', err.message, err)
        }
      },
      async signOut() {
        try {
          const result = await firebase.auth().signOut()
          console.log(result)
        }
        catch(err) {
          console.error(err)
        }
      },
    },
    computed: {
      dat() {
        return this.$firebase().$store.query(ref =>
          ref.doc('users/so7NALcHC6UJmeusHHzXn83yU3i1')).bind()
      },
      authorized() {
        return this.$firebase().$auth.authorized
      },
      user() {
        return this.$firebase().$auth.user
      },
    }
  }
</script>
