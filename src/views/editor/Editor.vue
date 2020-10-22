<template>
<main>
  <header>
    <div>
      <img src="../../assets/images/home/logo.svg" alt="Stori" />
    </div>
    <div class="rightHeader">
        <div class="workspaceName">
          <img alt="" class="workIcon" src="../../assets/images/home/work-icon.svg"/>
          <div>
            <div>WORKSPACE</div>
            <div>Artculture BMC</div>
          </div>
          <img alt="" class="downIcon" src="../../assets/images/home/drop-down.svg"/>
        </div>
        <div>
          <img src="../../assets/images/home/sun.svg" alt="" />
          <img src="../../assets/images/home/notification.svg" alt="" />
          <img src="../../assets/images/home/user.svg" alt="" />
        </div>
      </div>
  </header>
  <div class="main">
    <div class="leftPanel">
      <nav>
        <div @click="getUnsplashPhotos">Photos</div>
        <div @click="getUploadedMedia">Upload</div>
        <div>Menu</div>
        <div>Menu</div>
      </nav>
      <div class="unsplashPhotos" v-if="activeMedia === 'unsplashPhotos'">
        <img draggable="true" @mousedown="drag($event)" v-for="(photo, index) in unsplashPhotos" :key="index" :src="photo.urls.thumb" :data-src="photo.urls.full" :alt="photo.alt_description">
      </div>
      <div class="unsplashPhotos" v-if="activeMedia === 'uploadedMedia'">
        <img draggable="true" @mousedown="drag($event)" v-for="(photo, index) in uploadedMedia" :key="index" :src="photo.file" :data-src="photo.file" alt="">
      </div>
    </div>
    <div class="editor">
      <div>
        <div>
          <div class="page" id="page" @drop="drop($event)" @dragover.prevent @dragenter.prevent></div>
        </div>
        <footer>
          <button @click="preview()">Preview</button>
        </footer>
      </div>
      <aside>Options</aside>
    </div>
  </div>
</main>
</template>

<script>
import axios from "axios";

export default {
  name: "Editor",

  data () {
    return {
      baseUrl: process.env.VUE_APP_baseUrl,
      activeMedia: 'unsplashPhotos',
      dataState: {},
      draggedElement: null,
      nextSibling: null,
      unsplashPhotos: [],
      uploadedMedia: [],
    //  data for resizing
      element: undefined,
      resizers: undefined,
      currentResizer: undefined,
      minimum_size: 20,
      original_width: 0,
      original_height: 0,
      original_x: 0,
      original_y: 0,
      original_mouse_x: 0,
      original_mouse_y: 0,
    }
  },

  mounted() {
  },

  methods: {
    getUnsplashPhotos() {
      axios.get('https://api.unsplash.com/photos?per_page=20&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b')
      .then(res => {
        this.unsplashPhotos = res.data;
      })
      this.activeMedia = 'unsplashPhotos';
    },

    allowDrop({ target, transform }) {
      // ev.preventDefault();
      console.log(target);
      console.log(transform);
    },

    drag(evt) {
      // console.log(evt);
      this.draggedElement = evt.target;
    },

    alwaysOnTop(element) {
      const allElement = document.getElementById('page').children;
      let highestIndex = 0
      allElement.forEach(ele => {
        if (Number(ele.style.zIndex) > highestIndex) {
          highestIndex = Number(ele.style.zIndex);
        }
        element.style.zIndex  = highestIndex + 1;
      })
    },

    drop( evt ) {
      evt.preventDefault();
      if (this.draggedElement) {
        const div = document.createElement('div')
        const photo = this.draggedElement.cloneNode(true)

        console.log(evt);
        photo.addEventListener('drag', (element) => {
          this.alwaysOnTop(photo);
          console.log(element)
          // console.log('page X:',(element.pageX -document.getElementById('page').offsetLeft))
          // console.log('page Y:',(element.pageY - document.getElementById('page').offsetTop))
          element.target.parentNode.style.top = (element.pageY - document.getElementById('page').offsetTop) + 'px';
          element.target.parentNode.style.left = (element.pageX -document.getElementById('page').offsetLeft) + 'px';
        })
        div.addEventListener('click', () => {
          this.alwaysOnTop(photo);
          console.log(photo)
        })

        div.classList.add('inUse');
        div.classList.add('resizable');
        div.id = new Date().toISOString();
        div.draggable = 'true';
        div.style = 'width: 180px; height: content-box; position: absolute';
        div.style.top = (evt.pageY - document.getElementById('page').offsetTop) + 'px';
        div.style.left = (evt.pageX - document.getElementById('page').offsetLeft) + 'px';
        div.innerHTML = `
        <div class='resizers' id="resizers-${new Date().toTimeString()}" >
          <div class='resizer top-left'></div>
          <div class='resizer top-right'></div>
          <div class='resizer bottom-left'></div>
          <div class='resizer bottom-right'></div>
          <amp-img layout="responsive" content="undefined" src="${photo.dataset.src}"></amp-img>
        </div>`;
        photo.style = 'width: 100%; height: auto'
        // photo.style.filter = 'blur(8px)';
        photo.ondragstart = 'this.drag($event)';
        // photo.classList.add('inUse');
        photo.src = photo.dataset.src;
        photo.onclick = this.resizeElement(div.children[0].id, '.resizers')

        // setTimeout(() => {
        //   document.getElementById('topLeft').addEventListener('mousedown', (element) => {
        //     this.resizeElement(element, div.id);
        //   })
        // }, 500)
        div.children[0].children[4].appendChild(photo);
        evt.target.appendChild(div);
        this.draggedElement = null;
      }
    },

    resizeElement(divElement, className) {
      // document.getElementById('topLeft').addEventListener('drag', (moveEvent) => {
      //   console.log(document.getElementById(id).offsetTop + (document.getElementById(id).getBoundingClientRect().top - moveEvent.pageY));
      //   // console.log(document.getElementById(id).offsetLeft);
      //   // console.log(moveEvent.pageX);
      //   // console.log(document.getElementById(id).getBoundingClientRect().left);
      //   console.log('QQQQQQQQQQQQQQ: ', moveEvent);
      //   document.getElementById(id).style.width = document.getElementById(id).clientWidth + (document.getElementById(id).getBoundingClientRect().left - moveEvent.pageX)  + 'px';
      //   document.getElementById(id).style.left = document.getElementById(id).offsetLeft + (document.getElementById(id).getBoundingClientRect().left - moveEvent.pageX)  + 'px';
      //   document.getElementById(id).style.top = document.getElementById(id).offsetTop + (document.getElementById(id).getBoundingClientRect().top - moveEvent.pageY)  + 'px';
      //   // document.getElementById(id).style.width = document.getElementById(id).clientWidth + (moveEvent.pageX - document.getElementById(id).getBoundingClientRect().left)  + 'px';
      // })


      setTimeout(() => {
        this.element = document.getElementById(divElement);
        console.log('Chyke is here: ', this.element);
        this.resizers = document.querySelectorAll(className + ' .resizer')
        // console.log('Chyke is here: ', this.resizers);
        this.minimum_size = 20;
        this.original_width = 0;
        this.original_height = 0;
        this.original_x = 0;
        this.original_y = 0;
        this.original_mouse_x = 0;
        this.original_mouse_y = 0;
        console.log('AAAAAAAAAAAAAA: ', this.element)
        for (let i = 0;i < this.resizers.length; i++) {
          this.currentResizer = this.resizers[i];
          const element = this.element;
          let original_width = this.original_width;
          let original_height = this.original_height;
          let original_x = this.original_x;
          let original_y = this.original_y;
          let original_mouse_x = this.original_mouse_x;
          let original_mouse_y = this.original_mouse_y;
          let minimum_size = this.minimum_size;
          let currentResizer = this.currentResizer;
          this.currentResizer.addEventListener('mousedown', function(e) {
            e.preventDefault()
            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            const resize = (e) => {
              if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const height = original_height + (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                  element.parentNode.style.width = width + 'px'
                }
                if (height > minimum_size) {
                  element.parentNode.style.height = height + 'px'
                }
              }
              else if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height + (e.pageY - original_mouse_y)
                const width = original_width - (e.pageX - original_mouse_x)
                if (height > minimum_size) {
                  element.style.height = height + 'px'
                }
                if (width > minimum_size) {
                  element.style.width = width + 'px'
                  element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                }
              }
              else if (currentResizer.classList.contains('top-right')) {
                const width = original_width + (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                  element.style.width = width + 'px'
                }
                if (height > minimum_size) {
                  element.style.height = height + 'px'
                  element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                }
              }
              else {
                const width = original_width - (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                  element.style.width = width + 'px'
                  element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                }
                if (height > minimum_size) {
                  element.style.height = height + 'px'
                  element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                }
              }
            }

            window.addEventListener('mousemove', resize)

            window.addEventListener('mouseup', () => {
              window.removeEventListener('mousemove', resize)
              // element: undefined,
              // resizers: undefined,
              // currentResizer: undefined,
              // minimum_size: 20,
              // original_width: 0,
              // original_height: 0,
              // original_x: 0,
              // original_y: 0,
              // original_mouse_x: 0,
              // original_mouse_y: 0,
            })
          })
        }
      }, 1000)
    },

    preview() {
      let htmlCode = document.getElementById('page').innerHTML;
      // htmlCode = htmlCode.replace('img', `amp-img`);

      //eslint-disable-next-line
      const startAmpCode = "<!DOCTYPE html><html amp='' lang='en'><head>  <meta charset='utf-8'> <style amp-custom>.inUse {overflow: hidden;}</style>  <script async='' src='https://cdn.ampproject.org/v0.js'> <\/script>  <script async='' src='https://cdn.ampproject.org/v0/amp-story-1.0.js' custom-element='amp-story'><\/script>  <script async='' src='https://cdn.ampproject.org/v0/amp-analytics-0.1.js' custom-element='amp-analytics'><\/script>  <title>Stori App</title>  <link rel='canonical' href='https://www.cnn.com/ampstories/us/labor-day-its-history-and-meaning'>    <style amp-boilerplate=''>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>    <noscript>        <style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>    </noscript>  <meta name='viewport' content='width=device-width,minimum-scale=1,initial-scale=1'></head><body>  <amp-story poster-portrait-src='https://dynaimage.cdn.cnn.com/cnn/w_768,h_1024,c_scale/https%3A%2F%2Fdynaimage.cdn.cnn.com%2Fcnn%2Fx_572%2Cy_0%2Cw_868%2Ch_1158%2Cc_crop%2Fhttps%253A%252F%252Fstamp.static.cnn.io%252F5f46fd46e2547600227c1cd5%252F200826190320-03-labor-day-stamp.jpg' title='Labor Day: Its history and meaning' standalone='' publisher='CNN' publisher-logo-src='https://stamp.static.cnn.io/assets/images/badge.png'>    <amp-story-page id='page-cover' class='amp-story-page amp-story-page__full'>      <amp-story-grid-layer template='vertical' class='layer-background align-center justify-center'>";
      const endAmpCode = `</amp-story-grid-layer>    </amp-story-page>  </amp-story></body></html>`

      // var a = document.createElement("a");
      // var file = new Blob([startAmpCode + htmlCode + endAmpCode], {type: 'html'});
      const ampString = startAmpCode + htmlCode + endAmpCode

      const payload = {
          user_id : "1",
          name : "great story",
          file : "hbubibiobgiobgiovbiovbrio3biorbviorviorv",
          amp_file : ampString
      }
      axios.post(`${this.baseUrl}stories/add`, payload)
      .then(res => {
        console.log(res)
        window.open('http://' + res.data.data.amp_file, '_blank')
      })
      // var a = document.createElement("a");
      // a.id = 'a';
      // a.href = URL.createObjectURL(file);
      // a.download = 'AMP.html';
      // a.click();
    },

    getUploadedMedia() {
      axios.get(`${this.baseUrl}media`)
      .then(res => {
        this.uploadedMedia = res.data.data;
        this.activeMedia = 'uploadedMedia';
      })
    }
  },

  created () {
    this.getUnsplashPhotos()
  },
}
</script>

<style lang="scss">
main {
  display: block;
  width: 100%;
  height: 100vh;
  background: #000000;
  box-sizing: border-box;
  color: white;

  header {
    padding: 10px 20px;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //border-bottom: 1px solid #CBDBEC;
    box-sizing: border-box;

    .rightHeader {
      display: flex;
      align-items: center;
      .workspaceName {
          display: flex;
          justify-content: space-evenly;
          background: #373E48;
          border: #707070;
          color: #FFFFFF;
          width: 212px;
          height: 27px;
          border-radius: 35px;
          font-family: 'Apple SD Gothic Neo', sans-serif;
          font-size: 18px;
          font-weight: 500;
          padding: 15px 15px;
          cursor: pointer;

          .workIcon {
            width: 17px;
            height: 17px;
            margin: 5px;
          }

        div {
          font-family: Rubik, sans-serif;
          font-weight: lighter;
          &:first-child {
            font-size: 10px;
          }

          &:last-child {
            font-size: 15px;
          }
        }

        .downIcon {
          width: 24px;
          height: 24px;
          margin: 3px;
        }
      }

      img {
        height: 30px;
        width: auto;
        padding: 5px;
        margin: 5px;
      }
    }
  }

  .main {
    display: flex;
    height: calc(100vh - 70px);
    box-sizing: border-box;
    width: 100%;

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: #F5F5F5;
    }
    ::-webkit-scrollbar {
      width: 6px;
      background-color: #F5F5F5;
    }
    ::-webkit-scrollbar:horizontal {
      height: 6px;
      background-color: #F5F5F5;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #000000;
    }

    .leftPanel {
      display: flex;
      width: 400px;
      background: #20262d;

      nav {
        background: #000000;
        width: 80px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      div {
        display: flex;
        height: 100%;
        width: 320px;
        flex-wrap: wrap;
        overflow-y: auto;
        justify-content: flex-start;
        box-sizing: border-box;

        img {
          max-width: 95px;
          width: auto;
          height: auto;
          margin: 3px;
          box-sizing: border-box;
        }
      }
    }

    .editor {
      background: #202125;
      width: calc(100% - 400px);
      display: flex;

      > div {
        display: flex;
        width: calc(100% - 250px);

        > div {
          display: flex;
          justify-content: center;
          padding: 50px;
          width: 100%;
          box-sizing: border-box;
          height: calc(100% - 50px);
          overflow: auto;

          .page {
            width: 360px;
            height: 600px;
            background: #eeeeee;
            display: block;
            margin: 100px;
            transform: scale(1.25, 1.25);
          }
        }

        footer {
          width: calc(100% - 650px);
          height: 50px;
          background: black;
          position: fixed;
          bottom: 0;
          border-top: 2px solid #2B2D32;
        }
      }

      aside {
        width: 250px;
        background: #2b2d32;
      }
    }
  }

}

.resizable {
  background: white;
  width: auto;
  height: auto;
  position: absolute;
  top: 100px;
  left: 100px;
}

.resizable .resizers{
  width: 100%;
  height: content-box;
  border: 3px solid #4286f4;
  box-sizing: border-box;
}

.resizable .resizers .resizer{
  width: 10px;
  height: 10px;
  border-radius: 50%; /*magic to turn square into circle*/
  background: white;
  border: 3px solid #4286f4;
  position: absolute;
}

.resizable .resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize; /*resizer cursor*/
}
.resizable .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}
.resizable .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}
.resizable .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}

//.resizerFrame {
//  position: absolute;
//  width: 100%;
//  height: 100%;
//
//  .resizer {
//    width: 10px;
//    height: 10px;
//    background: #f2f2f2;
//    border: 1px solid #d0d0d0;
//    border-radius: 100%;
//    z-index: 2000;
//  }
//
//  .leftResizer {
//    position: absolute;
//    left: 0;
//    border: solid 1px dodgerblue;
//    height: 100%;
//    width: 0;
//    display: flex;
//    flex-direction: column;
//    justify-content: space-between;
//
//    .topLeftResizer {
//      margin-left: -7px;
//      margin-top: -5px;
//      cursor: nw-resize;
//    }
//
//    .bottomLeftResizer {
//      margin-left: -7px;
//      margin-bottom: -5px;
//      cursor: sw-resize;
//    }
//  }
//
//  .rightResizer {
//    position: absolute;
//    right: 0;
//    border: solid 1px dodgerblue;
//    height: 100%;
//    width: 0;
//    display: flex;
//    flex-direction: column;
//    justify-content: space-between;
//
//    .topRightResizer {
//      margin-left: -6px;
//      margin-top: -5px;
//      cursor: ne-resize;
//    }
//
//    .bottomRightResizer {
//      margin-left: -6px;
//      margin-bottom: -5px;
//      cursor: se-resize;
//    }
//  }
//}

.inUse {overflow: hidden;}
</style>
