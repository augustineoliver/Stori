<template>
<div class="uploadMain">
<Header></Header>

<div class="uploadDiv">
  <img class="upload" src="../assets/images/upload/upload.svg" alt="You have not added any file yet Click to add +">
</div>
</div>
</template>

<script>
import Header from "@/components/Header";

export default {
name: "Upload",
  components: {
    Header
  }
}
</script>

<style lang="scss">
.uploadMain {
  display: block;
  background: black;
  height: 100vh;

  .uploadDiv {
    text-align: center;
    margin-top: 100px;
    .upload {
      max-width: 50%;
      height: auto;
    }
  }
}
</style>
