const DB_NAME = "calendar";

const createEventStore = () => {
  let request = indexedDB.open(DB_NAME, 1);

  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    db.createObjectStore("events", { keyPath: "key" });
  };
  
  request.onerror = function () {
    console.log("erro");
  };
};
const createEvent = (newEvent, onSuccess) => {
  let request = indexedDB.open(DB_NAME, 1);

  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction("events", "readwrite");

    transaction.oncomplete = function () {
      console.log("Transação finalizada com sucesso.");
     
    };

    transaction.onerror = function (event) {
      console.log("Transação finalizada com erro. Erro: " + event.target.error);
    };

    var store = transaction.objectStore("events");
    var addRequest = store.add(newEvent);
    addRequest.onerror = function () {
      console.log("Ocorreu um erro ao salvar o evento.");
    };

    addRequest.onsuccess = function () {
      console.log("Evento salvo com sucesso.");
      onSuccess()
    }; 
  };
};

const updateEvent = () => {
  let request = indexedDB.open(DB_NAME, 1);

  request.onsuccess = function () {};
};

const deleteEvent = (key, onSuccess) => {
    let request = indexedDB.open(DB_NAME, 1);

    request.onsuccess = function (event) {
      var db = event.target.result;
      var transaction = db.transaction("events", "readwrite");
  
      transaction.oncomplete = function () {
        console.log("Transação finalizada com sucesso.");
       
      };
  
      transaction.onerror = function (event) {
        console.log("Transação finalizada com erro. Erro: " + event.target.error);
      };
  
      var store = transaction.objectStore("events");
      var deleteRequest = store.delete(key)
      deleteRequest.onsuccess = function () {
          onSuccess(deleteRequest.result)
      }
     
    };
};
const getEvents = (onSuccess) => {
    let request = indexedDB.open(DB_NAME, 1);

    request.onsuccess = function (event) {
      var db = event.target.result;
      var transaction = db.transaction("events", "readwrite");
  
      transaction.oncomplete = function () {
        console.log("Transação finalizada com sucesso.");
       
      };
  
      transaction.onerror = function (event) {
        console.log("Transação finalizada com erro. Erro: " + event.target.error);
      };
  
      var store = transaction.objectStore("events");
      var listRequest = store.getAll()
      listRequest.onsuccess = function () {
          onSuccess(listRequest.result)
      }
  
     
    };
};

createEventStore();