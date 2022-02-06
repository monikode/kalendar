const app = Vue.createApp({
  el: "#app",
  data() {
    return {
      vision: "month",
      day: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      hour: new Date().getHours(),
      minute: new Date().getMinutes(),
      darkMode: false,
      interval: null,
      time: null,
      events: [],
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
      var date = new Date(
        this.year,
        this.month,
        this.day,
        this.hour,
        this.minute
      );
      this.day = date.getDate();
      this.month = date.getMonth();
      this.year = date.getFullYear();
      this.hour = date.getHours();
      this.minute = date.getMinutes();
      return date;
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
      console.log(week, this.currentDate);
      return week;
    },
  },
  methods: {
    createEvent() {
      var event = {
        key: new Date().toString(),
        title: "",
        startDate: {},
        endDate: {},
        startTime: {},
        endTime: {},
        description: "",
      };
      this.events = [event, ...this.events];
      createEvent(event)
    },
    updateEvent(key, event) {
      this.events = this.events.map((ev) => {
        if (this.ev.key == key) return event;
        else return ev;
      });
    },
    deleteEvent(key) {
      this.events = this.events.filter((ev) => ev.key !== key);
    },
    today() {
      this.day = new Date().getDate();
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear();
      this.hour = new Date().getHours();
      this.minute = new Date().getMinutes();
    },
    notifyMe() {
      console.log({ notification: Notification }, window.indexedDB);
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        var notification = new Notification("Hi there!");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            var notification = new Notification("Hi there!");
          }
        });
      }
    },
  },
  beforeUnmount() {
    localStorage.setItem("events", JSON.stringify(this.events));
    clearInterval(this.interval);
  },
  async mounted() {
    
    var prevEvents = localStorage.getItem("events");
    if (prevEvents) {
      this.events = prevEvents;
    }
    this.interval = setInterval(() => {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",

        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format();
    }, 1000);
  },
});
