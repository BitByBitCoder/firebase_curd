<template>
  <div class="jj">
    <div class="popup">
      <h1>Edit your Task</h1>
      <h1>props: {{ props.id }}</h1>
      <button @click="$emit('updatedatasendback')">close</button>
    </div>
  </div>
</template>


<script setup>
const props = defineProps(["id"]);
</script>

<style  scoped>
.jj {
  margin: 0px;
  padding: 0px;
  position: absolute;
  top: 10px;
  height: 100%;
  width: 100%;
  background-color: rgb(28, 49, 61);
  display: flex;
  justify-content: center;
  opacity: 90%;
}
.popup {
  padding: 10px;
  margin: 100px;
  position: absolute;

  background-color: rgb(0, 0, 0);
  height: 500px;
  width: 500px;
}
</style>