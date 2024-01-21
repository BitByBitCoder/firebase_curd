<script setup>
import { db } from "../firebase.js";
import editmenu from "./components/editmenu.vue";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, onMounted } from "vue";

/////////////////////////////
//Variable
let newTask = ref("");
let tasks = ref([]);
let edittoggle = ref(false);

////////////////////////////////////////////////////////////////
onMounted(async () => {
  // fetchData();
  fetchDataFromDB();
});

// async function fetchData() {
//   const querySnapshot = await getDocs(collection(db, "tasks"));

//   console.log('this is the first index of qs :',querySnapshot.docs)
//   // Get existing ids
//   const existingIds = tasks.value.map((t) => t.id);

//   for (let doc of querySnapshot.docs) {
//     const id = doc.id;
//     const data = doc.data();

//     // console.log("data", data)
//     // Only add if task does not a  lready exist
//     if (!existingIds.includes(id)) {
//       tasks.value.push({
//         id,
//         ...data,
//       });
//     }
//   }
// }
async function fetchDataFromDB() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  const getExistingID = tasks.value.map((t) => t.id);

  for (let doc of querySnapshot.docs) {
    const id = doc.id;
    const data = doc.data();
    console.log(id);

    if (!getExistingID.includes(id)) {
      tasks.value.push({ id, ...data });
    }
  }
}

async function deleted(task, index) {
  await deleteDoc(doc(db, "tasks", task.id));

  console.log("Deleted from Firestore");

  tasks.value = tasks.value.filter((t) => t.id !== task.id);

  console.log("Removed from local array");
}
const addTask = async () => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: newTask.value.trim(),
      completed: false,
    });
    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  fetchDataFromDB();
  newTask.value = "";
};
const updateTask = async (taskId, updatedData) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, updatedData);
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }

  fetchDataFromDB(); // Assuming fetchDataFromDB is a function to fetch data from the database
};
let id = ".....";

function togglePopup(task, index) {
  edittoggle.value = !edittoggle.value;
  console.log(task.id);
  console.log(edittoggle.value);
  id = task.id;
}
function closePopup() {
  edittoggle.value = false;
}

function emmittest(n) {
  console.log("emmmmmmmm");
}
</script>





<template>
  <h1>Add task</h1>
  <input v-model="newTask" type="text" />
  <button @click="addTask">ggggggggggg</button>

  <h1></h1>

  <div v-for="task in tasks" :key="task.id">
    <br />
    <div>name:{{ task.title }}</div>
    <div>name:{{ task.id }}</div>
    <br /><button @click="deleted(task, index)">Delete</button>

    <button @click="togglePopup(task, index)">edit</button>
  </div>
  <br /><br />
  <editmenu
    :id="id"
    @updatedatasendback="closePopup"
    v-if="edittoggle"
  ></editmenu>
</template>

