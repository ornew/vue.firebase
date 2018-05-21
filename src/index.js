
// builtin plugins.
import VueFirebaseAuth from './plugins/auth.js'
import VueFirebaseStore from './plugins/store.js'

// TODO: condigurable this?
export const DEFAULT_APP_NAME = '[DEFAULT]'

class VueFirebaseApp {
  constructor(firebase, plugins){
    this.name = firebase.name
    this.firebase = firebase
    plugins.forEach(plugin => plugin.install(this.firebase, this))
  }
}

export default class VueFirebase {
  // TODO: accept other options.
  constructor(apps) {
    this.apps = {}
    this.plugins = [
      VueFirebaseAuth,
      VueFirebaseStore,
    ]
    Object.keys(apps).forEach(name => {
      const app = firebase.initializeApp(apps[name], name)
      this.apps[app.name] = new VueFirebaseApp(app, this.plugins)
    })
  }
  app(name = DEFAULT_APP_NAME) {
    return this.apps[name]
  }
}

VueFirebase.install = Vue => {
  if(VueFirebase._installed) {return}
  VueFirebase._installed = true
  Object.defineProperties(Vue.prototype, {
    $firebase: {
      get: function () {
        return (name = DEFAULT_APP_NAME) => this.$root._firebase.app(name)
      }
    },
  })
  Vue.mixin({
    beforeCreate () {
      if(this.$options.firebase) {
        this._firebase = new VueFirebase(this.$options.firebase)
      }
    }
  })
}

