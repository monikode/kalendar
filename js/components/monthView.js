app.component("month-day", {
  props: {
    date: Date,
  },
  computed: {
    events() {
      let events = [];
      this.$root.events.forEach((element) => {
        let start = new Date(element.startDate + "T" + element.startTime);
        let end = new Date(element.endDate + "T" + element.endTime);
        if (this.date >= start && this.date <= end) {
          events.push(element);
        }
      });
      return events;
    },
  },
  methods: {
    get12HoursTime(date) {},
    isCurrentDate() {
      const isCurrent =
        this.date.toString() ==
        new Date(this.$root.year, this.$root.month, this.$root.day).toString();
        console.log(
            isCurrent,
            this.date,
            new Date(this.$root.year, this.$root.month, this.$root.day)
          );
        return isCurrent;
    },
  },
  template: `
  <div class="month-day">
  <div class="wrapper" :class="{current: isCurrentDate(), 'secondary-month': date.getMonth() != $root.currentDate.getMonth()}">
  <div class="line"></div>
  <div class="day">{{date.getDate()}}</div>
  <div class="events">
  <ul>
    <li class="event" v-for="event in events.slice(0, events.length > 4?3:4)">
    {{event.startTime}} <span class="is-weight-600">{{event.title}}</span>
    </li>
    <li class="more is-weight-600" v-show="events.length > 4">
    Mais {{events.length-3}}
    </li>
  </ul>
</div>
  </div>
 
</div>
    `,
});

app.component("month-view", {
  data() {
    return {};
  },
  computed: {
    lastMonthEnd() {
      var month = [];
      const firstMonthDay = new Date(
        this.$root.currentDate.getFullYear(),
        this.$root.currentDate.getMonth(),
        1
      ).getDay();
      const lastMonth = new Date(
        this.$root.currentDate.getFullYear(),
        this.$root.currentDate.getMonth(),
        -firstMonthDay + 1
      );

      for (
        var i = lastMonth.getDate();
        i < lastMonth.getDate() + firstMonthDay;
        i++
      ) {
        month.push(
          new Date(
            this.$root.currentDate.getFullYear(),
            this.$root.currentDate.getMonth() - 1,
            i
          )
        );
      }

      return month;
    },
    currentMonth() {
      var month = [];
      const lastMonthDay = new Date(
        this.$root.currentDate.getFullYear(),
        this.$root.currentDate.getMonth() + 1,
        0
      );

      for (var i = 1; i <= lastMonthDay.getDate(); i++) {
        month.push(
          new Date(
            this.$root.currentDate.getFullYear(),
            this.$root.currentDate.getMonth(),
            i
          )
        );
      }

      return month;
    },
    nextMonthStart() {
      var month = [];
      const lastMonthDay = new Date(
        this.$root.currentDate.getFullYear(),
        this.$root.currentDate.getMonth() + 1,
        0
      ).getDay();
      const nextMonth = new Date(
        this.$root.currentDate.getFullYear(),
        this.$root.currentDate.getMonth(),
        6 - lastMonthDay
      );

      if (lastMonthDay == 6) {
        return [];
      } else {
        for (var i = 1; i <= nextMonth.getDate(); i++) {
          month.push(
            new Date(
              this.$root.currentDate.getFullYear(),
              this.$root.currentDate.getMonth() + 1,
              i
            )
          );
        }
        return month;
      }
    },
  },
  template: `
  <div class="month-container">
  <div class="week-day is-weight-600" v-for="num in 7">
    <div>{{$root.getWeekDay(num-1).substring(0, 3)}}.</div>
  </div>

  <template
    v-for="day in [...lastMonthEnd, ...currentMonth, ...nextMonthStart]"
    :key="day.toString()"
    >
    <month-day :date="day"  />
  </template>
</div>
    `,
});
