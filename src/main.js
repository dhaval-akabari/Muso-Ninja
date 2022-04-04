import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// global styles
import "./assets/main.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
