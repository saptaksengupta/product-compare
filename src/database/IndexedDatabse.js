import DbConfig from "./DbConfig";

class IndexedDatabase {
  static instance = null;
  static db = null;
  static count = 0;
  constructor() {
    this.count = 1;
    this.instance = this;
  }

  initDatabase() {
    const req = indexedDB.open(DbConfig.DB_NAME);

    req.onerror = (event) => {
      console.log("Databse creation error.. ");
    };

    req.onupgradeneeded = (event) => {
      const db = event.target.result;
      const store = db.createObjectStore(DbConfig.DB_STORE_NAME, {
        keyPath: "id",
      });
      store.createIndex("id", "id", { unique: true });
      store.createIndex("details", "details", { unique: false });
    };

    req.onsuccess = (event) => {
      console.log("Database created...");
      this.db = req.result;
    };

    return req;
  }

  insertRow(storeName, data) {
    const transaction = this.db.transaction([storeName], "readwrite");
    const objStore = transaction.objectStore(storeName);
    return objStore.add(data);
  }

  getAll(storeName) {
    const transaction = this.db.transaction([storeName], "readonly");
    const objStore = transaction.objectStore(storeName);
    return objStore.getAll();
  }

  deleteRow(storeName, productId) {
    const transaction = this.db.transaction([storeName], "readwrite");
    const objStore = transaction.objectStore(storeName);
    return objStore.delete(productId);
  }

  getCount() {
    this.count += 1;
    console.log(this.count);
  }
}

const getInstance = () => {
  if (IndexedDatabase.instance) {
    return IndexedDatabase;
  }
  return new IndexedDatabase();
};

const indexedDbService = getInstance();

export default indexedDbService;
