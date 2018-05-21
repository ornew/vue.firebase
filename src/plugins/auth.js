
import Vue from 'vue'

//TODO: change functional components.
//TODO: inject hook
export class VueFirebaseAuth {
  constructor(auth) {
    this.auth = auth
    this.vm = new Vue({
      data: {
        authorized : false,
        user: {
          uid         : null,
          photoURL    : null,
          displayName : null,
          email       : null,
        },
      },
      created() {
        this._hooks = {
          onAuthStateChanged: [],
        }
        auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
      },
      methods: {
        onAuthStateChanged(user) {
          if(user) {
            // Sign In
            this.authorized  = true
            this.user.uid         = user.uid
            this.user.photoURL    = user.photoURL
            this.user.displayName = user.displayName
            this.user.email       = user.email
          } else {
            // Sign Out
            this.authorized  = false
            this.user.uid         = null
            this.user.photoURL    = null
            this.user.displayName = null
            this.user.email       = null
          }
          this._hooks.onAuthStateChanged.forEach(hook => hook(user))
        }
      },
    })
  }
  get authorized() {return this.vm.authorized}
  get user() {return this.vm.user}
}

export default {
  install(firebase, app) {
    app._auth = new VueFirebaseAuth(firebase.auth())
    Object.defineProperty(app, '$auth', {
      get: () => app._auth
    })
  }
}

