app.component("sidebar", {
  data() {
    return {
      visions: [
        { icon: "ic-sharp-calendar-view-month", name: "Mês", value: "month" },
        { icon: "ic-sharp-calendar-view-week", name: "Semana", value: "week" },
        { icon: "ic-sharp-calendar-view-day", name: "Dia", value: "day" },
      ],
    };
  },
  methods: {
    setVision(vision) {
      this.$root.vision = vision;
    },
  },
  template: `
  <div id="sidebar">
  <button class="create">
  <span class="iconify" data-icon="ic:sharp-add"></span>
  <span>CRIAR EVENTO</span>
  </button>
    <div class="vision-group">
        <div
        v-for="vision in visions"
        @click="setVision(vision.value)"
        :class="{selected:$root.vision == vision.value}"
        >
        <span class="iconify" :data-icon="vision.icon"></span>
        <div>{{vision.name}}</div>
        </div>
    </div>
    </div>

    `,
});
