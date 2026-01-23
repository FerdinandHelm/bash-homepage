import defaultFiles from './defaultFiles.js';
let DB = null;

async function createFile(store, file, parentId=null) {
  return new Promise((resolve, reject) => {
    const isDir = file.type === 'dir';

    let request;
    const fileData = {
      name: file.name,
      type: file.type,
      parent: parentId,
      owner: file.owner || 'root@root',
      permission: file.permission || 'rwxrw-r--',
      size: file.size || file.content?.length || 0,
      content: isDir ? null : file.content,
    };
    request = store.add(fileData);

    request.onsuccess = event => {
      if(!isDir || !file.content?.length) return resolve(request.result);
      const dirId = event.target.result;

      file.content.forEach(subFile => {
        createFile(store, subFile, dirId);
      });

      resolve(dirId);
    };
    request.onerror = () => reject(request.error);
  });
}

const initFiles = async function() {
  const DBOpenRequest = window.indexedDB.open("filesystem");
  
  DBOpenRequest.onerror = (event) => {
    console.error("Error loading filesystem.");
  };

  DBOpenRequest.onupgradeneeded = function() {
    const db = DBOpenRequest.result;
    const store = db.createObjectStore("files", {keyPath: "id", autoIncrement: true});
    const titleIndex = store.createIndex("by_name", "name");
    const authorIndex = store.createIndex("by_type", "type");
    const parentIndex = store.createIndex("by_parent", "parent");
    store.createIndex("file_in_folder", ["name", "parent"], { unique: true });

    // needs to be the first one to have id 1
    // store.put({name: "/", type: "dir", parent: null});
    createFile(store, defaultFiles);
  };

  DBOpenRequest.onsuccess = (event) => {
    console.info("Filesystem initialized.");
    DB = DBOpenRequest.result;
  };
}

const getFile = async function(path) {
  if(!DB) throw new Error("Database not initialized");
  if(!path.startsWith("/")) throw new Error("Path must be absolute");

  const store = DB.transaction("files", "readonly").objectStore("files");
  const pathParts = path.split("/").filter(p => p.length > 0);

  if(path === "/") {
    const request = store.get(1);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  let file = null;

  for(const part of pathParts) {
    const request = await store.index("by_parent").getAll(IDBKeyRange.only(file?.id || 1));

    const filesInDir = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    file = filesInDir.find(f => f.name === part && f.parent === (file?.id || 1));
    if(!file) return null;
  }

  return file;
}

// --- AI GENERATED, NOT TESTED YET ---
// const createFile = async function(name, type, parent) {
//   if(!DB) throw new Error("Database not initialized");

//   let parentId;
//   if(typeof parentId === 'number') {
//     parentId = parent;
//   } else if(typeof parent !== 'string') {
//     throw new Error("Parent path must be a string");
//   } else {
//     const parentFile = await getFile(parent);
//     parentId = parentFile ? parentFile.id : null;
//   }

//   const transaction = DB.transaction("files", "readwrite");
//   const store = transaction.objectStore("files");

//   return new Promise((resolve, reject) => {
//     const request = store.add({name, type, parent: parentId});
//     request.onsuccess = () => resolve(request.result);
//     request.onerror = () => reject(request.error);
//   });
// }

const getDirectory = async function(path) {
  if(!DB) throw new Error("Database not initialized");

  let dirId;
  if(typeof path === 'number') {
    dirId = path; // path is a pre-saved id
  } else if(typeof path !== 'string') {
    throw new Error("Path must be a string");
  } else {
    const dirFile = await getFile(path);
    if(!dirFile || dirFile.type !== 'dir') throw new Error("Directory not found");
    dirId = dirFile.id;
  }

  const store = DB.transaction("files", "readonly").objectStore("files");
  const request = store.index("by_parent").getAll(IDBKeyRange.only(dirId));

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export default { initFiles, getFile, createFile, getDirectory };