# VueFirebase - Firebase Plugin for Vue.js

## Installation

```
$ npm i -D vue-firebase-plugin
```

or if using Yarn:

```
$ yarn add -D vue-firebase-plugin
```

## How to use

```javascript
import Vue from 'vue'
import VueFirebase from 'vue-firebase-plugin'
Vue.use(VueFirebase)

new Vue({
  firebase: {
    '[DEFAULT]': {
      apiKey: "<API_KEY>",
      authDomain: "<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
      storageBucket: "<BUCKET>.appspot.com",
      messagingSenderId: "<SENDER_ID>",
    }
  }
})
```

```javascript
export default {
  template: '<div>{{uid}}</div>',
  computed: {
    uid() {
      return this.$firebase().$auth.user.uid
    }
  }
}
```

```javascript
import {mapBind} from 'vue-firebase-plugin'
export default {
  template: '<div>{{foo}}</div>',
  computed: {
    ...mapBind({
      foo: store => store.doc('foo/doc'),
    }),
    // or manually
    foo() {
      return this.$firebase().$store.query(
        store => store.doc('foo/doc')
      ).bind() // need bind
    },

    // using component data
    ...mapBind({
      userdoc: (store, vm) =>
        store.doc(`${vm.uid}/doc`),
    }),
  }
})
```

## Support Status

 Firebase          | Status
-------------------|-------------
 Auth              | Supported
 FireStore         | Supported
 Realtime Database | NOT Supported
 Storage           | WIP

## Optional Plugin

 Plugin       | Status | Description
--------------|--------|-----------------------------------------------------
 Vuex         | WIP    | Binding Firebase data to `vuex` Store
 Vue Router   | WIP    | Guard Firebase Auth informations for `vue-router`

## Create plugin

Plugin object need has `install` function.
