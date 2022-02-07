app.component("navbar", {
  computed: {
    titleText() {
      switch (this.$root.vision) {
        case "week":
        case "month":
          return Intl.DateTimeFormat(navigator.language, {
            year: "numeric",
            month: "long",
          }).format(this.$root.currentDate);
       
        case "day":
          return Intl.DateTimeFormat(navigator.language, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(this.$root.currentDate);
      }
    },
  },
  template: `
  <div id="navbar">
        <div class="title">{{titleText}}</div>
    </div>
    `,
});
