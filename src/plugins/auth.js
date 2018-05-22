
import Vue from 'vue'

//TODO: change functional components.
//TODO: inject hook
export class VueFirebaseAuth {
  constructor(auth) {
    const field = [
      'uid', 'displayName', 'email', 'emailVerified', 'photoURL',
      'isAnonymous', 'providerData',
    ]
    const hooks = {
      onAuthStateChanged: [],
    }
    this._field = field
    this._hooks = hooks
    this.auth = auth
    this.vm = new Vue({
      data: {
        authorized : false,
        ...field.reduce((obj, key) => {obj[key] = null; return obj}, {}),
      },
      created() {
        auth.onAuthStateChanged(this.onAuthStateChanged.bind(this))
      },
      methods: {
        onAuthStateChanged(user) {
          if(user) {
            // Sign In
            this.authorized  = true
            field.forEach(key => this.$data[key] = user[key])
          } else {
            // Sign Out
            this.authorized  = false
            field.forEach(key => this.$data[key] = null)
          }
          hooks.onAuthStateChanged.forEach(hook => hook(user))
        }
      },
    })
  }
  get user() {
    return this.vm.$data
  }
  onAuthStateChanged(callback) {
    this._hooks.onAuthStateChanged.push(callback)
  }
}

export default {
  install(firebase, app) {
    app._auth = new VueFirebaseAuth(firebase.auth())
    Object.defineProperty(app, '$auth', {
      get: () => app._auth
    })
  }
}

