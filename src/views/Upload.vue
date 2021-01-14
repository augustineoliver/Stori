<template>
<div class="uploadMain">
<Header></Header>

<label class="uploadDiv" id="uploadArea">
  <input type="file" @change="uploadFiles" id="fileInput" multiple accept="image/*, video/*">
  <img v-if="uploadingCount === 0" class="upload" src="../assets/images/upload/upload.svg" alt="You have not added any file yet Click to add +">
  <div style="color: white">
    <div v-if="badFiles > 0" style="color: red">Can't upload {{badFiles}} files <br> <strong>Reason: file isn't a media file or more than 2mb</strong></div>
    <span v-if="uploadingCount > 0">Currently uploading {{uploadingCount}} files</span>
    <div style="display: flex; justify-content: flex-start">
<!--      <div v-for="(image, index) in files" :key="index">{{image}}</div>-->
      <img v-for="(image, index) in files" :key="index"  alt="" :src="'http://' + image" style="height: 150px; width: auto; padding: 50px" />
    </div>
<!--    <span v-for="(file, index) in files" :key="index">-->
<!--      {{ file }}-->
<!--    </span>-->
  </div>
</label>
</div>
</template>

<script>
import Header from "@/components/Header";
import axios from "axios";

export default {
name: "Upload",
  data () {
    return {
      authToken: `Bearer ${localStorage.getItem('authToken')}`,
      baseUrl: process.env.VUE_APP_baseUrl,
      uploadingCount: 0,
      badFiles: 0,
      files: []
    }
  },

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
        label.addEventListener('dragover',function(e){
            e.preventDefault();
        });
        label.ondrop = (event) => {
          event.preventDefault();
          const dt = event.dataTransfer;
          let files = dt.files;
          this.uploadingCount = this.uploadingCount + files.length;

          files.forEach(file => {
            if (file.type.includes('image') || file.type.includes('video')) {
              const payload = new FormData();
              payload.append('file', file);
              payload.append('user_id', localStorage.getItem('userId'));
              axios.post(`${this.baseUrl}media/create`, payload, {headers: {Authorization: this.authToken}})
              .then(res => {
                console.log(res);
                this.files.push(res.data.data.file)
                this.uploadingCount = this.uploadingCount - 1;
              });
            } else {
              this.uploadingCount = this.uploadingCount - 1;
              this.badFiles = this.badFiles + 1;
            }
          })

          console.log(files)
          label.remove()
        }
        document.getElementById('uploadArea').appendChild(label)
      }
      // else {
      //   document.getElementById('uploadDiv').style.backgroundColor = 'rgba(58,160,255,0.8)';
      // }

      document.getElementById('uploadDiv').addEventListener('dragleave', () => {
        document.getElementById('uploadDiv').classNamer = 'animate__backInDown';
        setTimeout(() => {
          document.getElementById('uploadDiv').remove()
        }, 1000)
      })
    })
  },

  methods: {
   uploadFiles(event) {
     this.uploadingCount = this.uploadingCount + event.target.files.length
     console.log('I am in', event.target.files);

     event.target.files.forEach(file => {
       if (file.type.includes('image') || file.type.includes('video')) {
         const payload = new FormData();
         payload.append('file', file);
         payload.append('user_id', localStorage.getItem('userId'));
         axios.post(`${this.baseUrl}media/create`, payload, {headers: {Authorization: this.authToken}})
             .then(res => {
               console.log(res);
               this.files.push(res.data.data.file)
               this.uploadingCount = this.uploadingCount - 1;
             });
       } else {
         this.uploadingCount = this.uploadingCount - 1
       }
     });
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
    display: block;
    width: 100%;
    height: calc(100vh - 100px);
    input {
      display: none;
    }
    .upload {
      margin-top: 10%;
      max-width: 50%;
      height: auto;
    }
  }
}
</style>
