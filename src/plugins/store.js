
import Vue from 'vue'

class FirebaseStoreRef {
  constructor(store, ref) {
    this._store = store
    this._ref = ref
  }
  query(query) {
    return new FirebaseStoreRef(this._store, query(this._ref))
  }
  bind() {
    return this._store.bind(this._ref)
  }
  get ref() {
    return this._ref
  }
}

export class VueFirebaseStore {
  constructor(store) {
    this._store = store
    this.vm = new Vue({data: {refs: {}}})
    this._unsubscribe = {}
  }
  bind(ref) {
    //TODO: watch metadata-changed event
    const refs = this.vm.refs
    let id
    if('_query' in ref && ref._query !== null) {
      id = ref._query.memoizedCanonicalId
      if(!(id in refs)) {
        Vue.set(refs, id, undefined)
        this._unsubscribe[id] = ref.onSnapshot(collection => {
          let docs = []
          collection.forEach(doc => docs.push(doc.data()))
          refs[id] = docs
        })
      }
    } else {
      id = ref.path
      if(!(id in refs)) {
        Vue.set(refs, id, undefined)
        this._unsubscribe[id] = ref.onSnapshot(doc => {
          refs[id] = doc.data()
        })
      }
    }
    return refs[id]
  }
  query(query) {
    return new FirebaseStoreRef(this, query(this._store))
  }
}

export function mapBind(refs, appName = null) {
  let map = {}
  Object.keys(refs).forEach(key => {
    map[key] = function() {
      const store = this.$firebase(appName).$store
      return store.query(store => refs[key](store, {vm: this})).bind()
    }
  })
  return map
}

export default {
  install(firebase, app) {
    app._store = new VueFirebaseStore(firebase.firestore())
    Object.defineProperty(app, '$store', {
      get: () => app._store
    })
  }
}

