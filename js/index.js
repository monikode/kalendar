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
      event: {
        type: "event",
        title: "",
        startDate: new Date().toISOString().substring(0, 10),
        endDate: new Date().toISOString().substring(0, 10),
        startTime: "00:00",
        endTime: "23:59",
        description: "",
      },
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
        const date = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          i
        );

        month.push({
          date,
          events: this.getDayEvents(date),
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
        const date = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          this.currentDate.getDate() - this.currentDate.getDay() + i
        );

        week.push({
          date,
          events: this.getDayEvents(date),
        });
      }
      return week;
    },
  },
  methods: {
    getWeekDay(num) {
      switch (num) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
      }
    },

    getDayEvents(date) {
      let events = [];
      this.events.forEach((element) => {
        let start = new Date(element.startDate + "T" + element.startTime);
        let end = new Date(element.endDate + "T" + element.endTime);
        if (date >= start && date <= end) {
          events.push(element);
        }
      });
      return events;
    },
    createEvent() {
      var event = {
        key: new Date().toISOString(),
        ...this.event,
      };
      createEvent(event, () => {
        this.events = [...this.events, event];
      });
    },
    updateEvent(key, event) {
      this.events = this.events.map((ev) => {
        if (this.ev.key == key) return event;
        else return ev;
      });
    },
    deleteEvent(key) {
      deleteEvent(key, () => {
      this.events = this.events.filter((ev) => ev.key !== key);
        
      });
    },
    today() {
      this.day = new Date().getDate();
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear();
      this.hour = new Date().getHours();
      this.minute = new Date().getMinutes();
    },
    notifyMe() {
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
    confirmDeleteEvent(key){
      const result = confirm("Deseja deletar esse evento?")
      if(result){
        this.deleteEvent(key)
      }
    }
  },
  beforeUnmount() {
    localStorage.setItem("events", JSON.stringify(this.events));
    clearInterval(this.interval);
  },
  async mounted() {
    getEvents((res) => {
      this.events = res;
      console.log(this.events);
    });
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
