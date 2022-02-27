import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB("jate", 1);
  const transactions = jateDb.transaction("jate", "readwrite");
  const store = transactions.objectStore("jate");
  const req = store.put({ id: 1, value: content });
  const res = await req;
  console.log("Data saved", res.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const transactions = jateDb.transaction("jate", "readwrite");
  const store = transactions.objectStore("jate");
  const req = store.get(1);
  const res = await req;
  if (res) {
    console.log("Data: ", res.value);
    return res.value;
  } else console.log("404 - Not Found");
};

initdb();
