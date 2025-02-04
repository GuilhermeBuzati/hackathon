import "./assets/main.scss";
import "./assets/icon-font/icon-font.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import di from "./plugins/di";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(di);

app.directive("focus", {
  mounted: (el, binding) => {
    if (binding.value) {
      el.focus();
    }
  },
});

app.mount("#app");
