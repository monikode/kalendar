const app = Vue.createApp({
  el: "#app",
  data() {
    return {
      vision: "month",
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      darkMode: false,
    };
  },
  watch: {
    darkMode() {
      var element = document.body;
      element.classList.toggle("dark");
      element.classList.toggle("light");
    },
  },
  computed: {
    currentDate() {
      var date =  new Date(this.year, this.month, this.day);
      this.day = date.getDate()
      this.month = date.getMonth()
      this.year = date.getFullYear()
      return date
    },
    lastMonthEnd() {
      var month = [];
      const firstMonthDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      ).getDay();
      const lastMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        -firstMonthDay + 1
      );

      for (
        var i = lastMonth.getDate();
        i < lastMonth.getDate() + firstMonthDay;
        i++
      ) {
        month.push({
          date: new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() - 1,
            i
          ),
        });
      }

      return month;
    },
    currentMonth() {
      var month = [];
      const lastMonthDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      );

      for (var i = 1; i <= lastMonthDay.getDate(); i++) {
        month.push({
          date: new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth(),
            i
          ),
        });
      }

      return month;
    },
    nextMonthStart() {
      var month = [];
      const lastMonthDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      ).getDay();
      const nextMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        6 - lastMonthDay
      );

      if (lastMonthDay == 6) {
        return [];
      } else {
        for (var i = 1; i <= nextMonth.getDate(); i++) {
          month.push({
            date: new Date(
              this.currentDate.getFullYear(),
              this.currentDate.getMonth() + 1,
              i
            ),
          });
        }
        return month;
      }
    },
    currentWeek() {
      var week = [];
      for (var i = 0; i < 7; i++) {
        week.push({
          date: new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth(),
            this.currentDate.getDate() - this.currentDate.getDay() - 1 + i
          ),
        });
      }
      console.log(week, this.currentDate)
      return week;
    },
  },
});
