const DB_NAME = "calendar";

const createEventStore = () => {
  let request = indexedDB.open(DB_NAME, 1);

  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    console.log(db)
    db.createObjectStore("events", { keyPath: "key" });
    console.log("ldfkldsm");
  };
  
  request.onerror = function () {
    console.log("erro");
  };
};
const createEvent = (newEvent) => {
  let request = indexedDB.open(DB_NAME, 1);

  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction("events", "readwrite");

    transaction.oncomplete = function () {
      console.log("Transação finalizada com sucesso.");
      var store = transaction.objectStore("events");
      var addRequest = store.add(newEvent);
      addRequest.onerror = function () {
        console.log("Ocorreu um erro ao salvar o evento.");
      };
  
      addRequest.onsuccess = function () {
        console.log("Evento salvo com sucesso.");
      };
    };

    transaction.onerror = function (event) {
      console.log("Transação finalizada com erro. Erro: " + event.target.error);
    };

   
  };
};

const updateEvent = () => {
  let request = indexedDB.open(DB_NAME, 1);

  request.onsuccess = function () {};
};

const deleteEvent = () => {
  let request = indexedDB.open(DB_NAME, 1);

  request.onsuccess = function () {};
};
const getEvents = () => {
  let request = indexedDB.open(DB_NAME, 1);

  request.onsuccess = function () {};
};

createEventStore();