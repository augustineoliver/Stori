<template>
<div class="uploadMain">
<Header></Header>

<label class="uploadDiv" id="uploadArea">
  <input type="file" :change="uploadFiles" id="fileInput">
  <img class="upload" src="../assets/images/upload/upload.svg" alt="You have not added any file yet Click to add +">
</label>
</div>
</template>

<script>
import Header from "@/components/Header";

export default {
name: "Upload",
  components: {
    Header
  },
  mounted() {
    document.getElementById('uploadArea').addEventListener('dragover', () => {
      if (!document.getElementById('uploadDiv')) {
        const label = document.createElement('div')
        label.style.width = '100vw';
        label.style.height = '100vh';
        label.style.backgroundColor = 'rgba(58,160,255,0.8)';
        label.style.position = 'absolute';
        label.style.top = '0';
        label.style.left = '0';
        label.style.display = 'block';
        label.style.zIndex = '90000';
        label.for = 'fileInput';
        label.className = 'animate__backInUp'
        // div.ondragend = this.drop($event);
        label.id = 'uploadDiv';
        document.getElementById('uploadArea').appendChild(label)
      } else {
        document.getElementById('uploadDiv').style.backgroundColor = 'rgba(58,160,255,0.8)';
      }

      document.getElementById('uploadDiv').addEventListener('dragleave', () => {
        document.getElementById('uploadDiv').classNamer = 'animate__backInDown';
        setTimeout(() => {
          document.getElementById('uploadDiv').remove()
        }, 1000)
      })
    })
  },

  methods: {
   uploadFiles() {
     console.log('I am in')
     // event.preventDefault();
   }
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
    display: block;
    input {
      display: none;
    }
    .upload {
      max-width: 50%;
      height: auto;
    }
  }
}
</style>
