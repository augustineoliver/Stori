<template>
  <div id="mediaComponent" class="mediaComponent">
    <div class="menu">
      <div class="button">
        <label>
          <i class="fa fa-file-upload"></i> Upload Media
          <input style="display: none" type="file" @change="uploadFiles" id="fileInput" multiple accept="image/*, video/*">
        </label>
      </div>
      <div class="categories">
        <div @click="activeMedia = 'uploadedMedia'"><i class="fa fa-upload"></i> Uploaded Media</div>
        <div @click="activeMedia = 'unsplashPhotos'"><i class="fa fa-photo-video"></i> Free Photos</div>
        <div @click="activeMedia = 'pexelsVideo'"><i class="fa fa-video"></i> Free Videos</div>
        <div @click="activeMedia = 'tenorGifs'"><i class="fa fa-file"></i> Free Gifs</div>
      </div>
    </div>
    <div class="mainImageDisplay">
      <template v-if="activeMedia === 'uploadedMedia'">
        <div class="header">
          <h2 style="margin-top: 60px">Uploaded Media</h2>
        </div>
        <div class="imageDiv" id="uploadedImagesDiv">
          <img @click="selectedMedia = {thumb: 'https://' + photo.file, actual: 'https://' + photo.file, type: photo.file_type}" v-for="(photo, index) in uploadedMedia" :key="index" :src="'https://' + photo.file" :data-src="'https://' + photo.file" :alt="photo.alt_description">
        </div>
      </template>

      <template v-show="activeMedia === 'unsplashPhotos'">
        <div class="header">
          <h2>Free Photo</h2>
          <div class="searchDiv">
            <input ref="unsplashSearch" type="search" placeholder="Search free photo" @keyup.enter="searchUnsplashPhotos($event.target.value, true, 1)">
          </div>
        </div>
        <div class="imageDiv" id="unsplashImagesDiv">
          <img @click="selectedMedia = {thumb: photo.urls.thumb, actual: photo.urls.regular, type: 'image'}" v-for="(photo, index) in unsplashPhotos" :key="index" :src="photo.urls.regular" :data-src="photo.urls.regular" :alt="photo.alt_description">
        </div>
      </template>

      <template v-if="activeMedia === 'pexelsVideo'">
        <div class="header">
          <h2>Free Video</h2>
          <div class="searchDiv">
            <input type="search" placeholder="Search free videos">
          </div>
        </div>
        <div class="imageDiv" id="pexelsVideo">
          <div v-for="(video, index) in pexelsVideo" :key="index">
            <video
                @click="selectedMedia = {thumb: video.video_pictures[0].picture, actual: video.video_files[0].link, type: 'video'}"
                :id="'video' + index"
                @mouseover="showVideo($event.target, true)"
                @mouseout="showVideo($event.target, false)"
                muted
                :poster="video.video_pictures[0].picture"
            >
              <source :src="video.video_files[0].link">
            </video>
          </div>

        </div>
      </template>
      <template v-if="activeMedia === 'tenorGifs'">
        <div class="header">
          <h2>Free GIFs</h2>
          <div class="searchDiv">
            <input type="search" placeholder="Search free GIFs">
          </div>
        </div>
        <div class="imageDiv" id="tinygif">
          <img @click="selectedMedia = {thumb: gif.tinygif.url, actual: gif.tinygif.url, type: 'gif'}" v-for="(gif, index) in tenorGifs" :key="index" :src="gif.tinygif.url" :data-src="gif.mediumgif.url" alt="">
        </div>
      </template>
    </div>
    <div class="selectedImage">
      <h3>Selected Media</h3>
      <div>
        <div v-if="selectedMedia === undefined">No media selected</div>
        <div class="selectedMedia" v-if="selectedMedia">
          <img :src="selectedMedia.thumb" alt="">
        </div>

        <div class="mediaActions">
          <button @click="$parent.mediaWidgetDetails = selectedMedia; $parent.showMediaWidget = false" style="background: #0a81be;">Select</button>
          <button @click="$parent.showMediaWidget = false" style="background: #2B2D32;">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "Media",

data() {
  return {
    authToken: `Bearer ${localStorage.getItem('authToken')}`,
    baseUrl: process.env.VUE_APP_baseUrl,
    selectedMedia: undefined,
    activeMedia: 'uploadedMedia',
    uploadedMedia: [],
    unsplashPhotos: [],
    unsplashPhotoSearch: [],
    pexelsVideo: [],
    tenorGifs: [],
    tenorNextPage: '',
    unsplashPhotoPage: 1,
    searchUnsplashPhotoPage: 1,
    tenorGifPage: 1,
    uploadingCount: 0,
    badFiles: 0,
    files: []
  }
},

mounted() {
  this.getUnsplashPhotos()
  this.getTenorGifs()
  this.getUploadedMedia()
  this.getPexelsVideos()
  const main = document.getElementById('unsplashImagesDiv')
  main.addEventListener('scroll', () => {
    console.log('BBBBBBBBBBBBB')
    this.loadNextPage(main)
  });

  document.getElementById('mediaComponent').addEventListener('dragover', () => {
    console.log('SSSSSSSSSSSSSSSSSS')
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

          files.forEach((file, index) => {
            console.log('SSSSSSSSSSSS', file)
            if (file.type.includes('image') || file.type.includes('video')) {
              const payload = new FormData();
              payload.append('file', file);
              payload.append('user_id', localStorage.getItem('userId'));
              setTimeout(() => {
                axios.post(`${this.baseUrl}media/create`, payload, {headers: {Authorization: this.authToken}})
                .then(res => {
                  this.getUploadedMedia()
                  this.files.push(res.data.data.file)
                  this.uploadingCount = this.uploadingCount - 1;
                });
              }, 1000 * (index + 1))
            } else {
              this.uploadingCount = this.uploadingCount - 1;
              this.badFiles = this.badFiles + 1;
            }

            // console.log('ZZZZZZZZZZZZZZZZ', (index + 1), files.length)
            // if ((index + 1) === files.length) {
            //   setTimeout(() => {
            //     this.getUploadedMedia()
            //   }, (1000 * files.length) + 2000)
            // }
          })
          label.remove()
        }
        document.getElementById('mediaComponent').appendChild(label)
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
  loadNextPage(container) {
      if ((container.scrollTop + container.clientHeight) >= container.scrollHeight) {
        // you're at the bottom of the page
        switch (this.activeMedia) {
          case "unsplashPhotos": {
            if (this.$refs.unsplashSearch.value) {
              this.searchUnsplashPhotos(this.$refs.unsplashSearch.value, false, this.searchUnsplashPhotoPage)
            } else {
              this.getUnsplashPhotos(this.unsplashPhotoPage)
            }

            break;
          }
          case 'tenorGifs': {
            this.getTenorGifs()
            break;
          }
        }
      }
  },

  getUploadedMedia() {
    axios.post(`${this.baseUrl}media`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
        .then(res => {
          this.uploadedMedia = res.data.data;
          console.log(this.uploadedMedia)
        })
  },

  getPexelsVideos() {
    axios.get(`https://api.pexels.com/videos/popular?per_page=20&page${1}`, {headers: {Authorization: '563492ad6f91700001000001b57dca97e28e403a847090e59abecfb9'}})
        .then(res => {
          this.pexelsVideo = res.data.videos.filter(res => res.video_files.sort((a, b) => a.width - b.width).shift());
          // this.pexelsVideo = this.pexelsVideo.filter(res => res.video_files.map(res => res.width !== null));
          // this.tenorNextPage = this.tenorGifs.next;
          // this.pexelsVideo = this.pexelsVideo.hits.map(res => {
          //   return {
          //     tinygif: res.media[0].tinygif,
          //     mediumgif: res.media[0].mediumgif
          //   }
          // })
          console.log(this.pexelsVideo);
        }).catch((err) => {
      console.log('There was an err: ', err)
    })
  },

  getUnsplashPhotos(page = 1) {
    axios.get(`https://api.unsplash.com/photos?per_page=20&page=${page}&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b`)
        .then(res => {
          this.unsplashPhotos = [...this.unsplashPhotos, ...res.data];
          this.unsplashPhotoPage += 1
        })
  },
  searchUnsplashPhotos(query, isNew, page = 1) {
    axios.get(`https://api.unsplash.com/search/photos?per_page=20&page=${page}&query=${query}&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b`)
        .then(res => {
          if (res.data.results.length === 0) {
            this.getUnsplashPhotos()
          } else {
            if (isNew) {
              this.unsplashPhotoSearch = []
              this.unsplashPhotos = res.data.results
              this.searchUnsplashPhotoPage = 1
            } else {
              this.unsplashPhotoSearch = [...this.unsplashPhotoSearch, ...res.data.results];
              this.unsplashPhotos = this.unsplashPhotoSearch
            }
            this.searchUnsplashPhotoPage += 1
          }
        })
  },

  getTenorGifs() {
    axios.get(`https://api.tenor.com/v1/trending?key=LIVDSRZULELA&pos=${this.tenorNextPage}`)
        .then(res => {
          let data = res.data;
          this.tenorNextPage = data.next;
          data = data.results.map(res => {
            return {
              tinygif: res.media[0].tinygif,
              mediumgif: res.media[0].mediumgif
            }
          })

          this.tenorGifs = [...this.tenorGifs, ...data]
          this.tenorGifPage += 1
        }).catch((err) => {
      console.log(err)
    })
  },

  showVideo(video, playVideo) {
    if (playVideo === true) {
      video.play()
    } else {
      video.pause()
    }
  },

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
               this.getUploadedMedia()
               console.log(res);
               this.files.push(res.data.data.file)
               this.uploadingCount = this.uploadingCount - 1;
             });
       } else {
         this.uploadingCount = this.uploadingCount - 1
       }
     });

     setTimeout(() => {
       this.getUploadedMedia()
     }, 1000)
       // event.preventDefault();
   }
}
}
</script>

<style lang="scss">
.mediaComponent {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  z-index: 5000;

  .menu {
    width: 400px;
    background-color: #1B1C1E;

    .button {
      display: flex;
      padding: 20px 10px;
      justify-content: center;
      margin-top: 20px;

      label {
        background-color: #0a81be;
        color: white;
        padding: 15px 40px;
        border-radius: 10px;
        width: 100%;
        text-align: center;
        cursor: pointer;
      }
    }

    .categories {
      display: flex;
      flex-direction: column;
      margin-top: 50px;

      div {
        width: 100%;
        padding: 15px;
        margin: 5px auto;
        cursor: pointer;
      }
    }
  }

  .mainImageDisplay {
    flex: 1 1 100%;
    background: #181818;
    overflow-y: auto;

    .header {
      position: fixed;
      padding: 10px 50px;
      width: calc(100% - 540px);
      h2 {
        margin-top: 10px;
      }

      .searchDiv {
        width: 100%;
        flex-grow: 1;
        input {
          width: 100%;
          padding: 10px;
          font-size: 1.2em;
          outline: none;
          border: 1px solid #a5d1e7;
          border-radius: 5px;
          margin: 50px auto;
          color: #a5d1e7;
        }
      }
    }

    .imageDiv {
      margin-top: 180px;
      padding: 50px;
      height: calc(100vh - 200px);
      overflow-y: auto;
      width: 100%;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      img, video {
        border-radius: 5px;
        flex-grow: 1;
        height: 300px;
        max-width: 49%;

        &:active {
          border: 1px solid #a5d1e7;
          box-sizing: border-box;
        }
      }
      div {
        max-width: 49%;
        flex-grow: 1;
        justify-content: center;
        img, video {
          flex-grow: 1;
          max-width: 100%!important;
        }
      }
    }
  }

  .selectedImage {
    width: 400px;
    background-color: #1B1C1E;
    padding: 30px 20px;

    h3 {
      margin-bottom: 20px;
      text-align: center;
    }

    >div {
      width: 100%;
      text-align: center;

      img {
        width: 100%;
        height: auto;
        border-radius: 10px;
      }

      .mediaActions {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        width: 260px;

        button {
          color: white;
          width: 100%;
          padding: 10px 40px;
          margin: 5px auto;
          border-radius: 10px;
          outline: none;
        }
      }
    }
  }
}
</style>
