import type { Plugin } from "vue";

export default <Plugin>{
  install(app) {
    app.directive("focus", {
      mounted: (el, binding) => {
        if (binding.value) {
          el.focus();
        }
      },
    });
  },
};
