<template>
<main>
  <header>
    <div class="leftHeader">
      <img src="../../assets/images/home/logo.svg" alt="Stori" />
      <label class="title">
        <input type="text" id="title" placeholder="Untitled Story">
      </label>
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
        <div :class="{active: activeMedia === 'uploadedMedia'}" @click="getUploadedMedia">
          <i class="fas fa-cloud-upload-alt"></i>
          <span>Uploads</span>
        </div>
        <div :class="{active: activeMedia === 'unsplashPhotos'}" @click="getUnsplashPhotos">
          <i class="far fa-image"></i>
          <span>Photos</span>
        </div>
        <div :class="{active: activeMedia === 'tenorGifs'}" @click="getTenorGifs">
          <i class="fas fa-hand-sparkles"></i>
          <span>Gifs</span>
        </div>
        <div :class="{active: activeMedia === 'emojis'}" @click="getEmoji">
          <i class="far fa-smile-beam"></i>
          <span>Emojis</span>
        </div>
        <div :class="{active: activeMedia === 'pexelsVideo'}" @click="getPexelsVideos">
          <i class="fas fa-film"></i>
          <span>Video</span>
        </div>
        <div :class="{active: activeMedia === 'pexelsVideo'}" @click="getPexelsVideos">
          <i class="fas fa-film"></i>
          <span>Video</span>
        </div>
        <div :class="{active: activeMedia === 'background'}" @click="activeMedia = 'background'">
          <i class="fas fa-film"></i>
          <span>Background</span>
        </div>

<!--        <div>Stickers</div>-->
        <div>Text</div>
        <div>Menu</div>
      </nav>
      <div class="unsplashPhotos" v-if="activeMedia === 'unsplashPhotos'">
        <img draggable="true" @mousedown="drag($event)" v-for="(photo, index) in unsplashPhotos" :key="index" :src="photo.urls.thumb" :data-src="photo.urls.full" :alt="photo.alt_description">
      </div>
      <div class="unsplashPhotos" v-if="activeMedia === 'uploadedMedia'">
        <img draggable="true" @mousedown="drag($event)" v-for="(photo, index) in uploadedMedia" :key="index" :src="'https://' + photo.file" :data-src="'https://' + photo.file" alt="cool">
      </div>
      <div class="unsplashPhotos" v-if="activeMedia === 'tenorGifs'">
        <img draggable="true" @mousedown="drag($event)" v-for="(gif, index) in tenorGifs" :key="index" :src="gif.tinygif.url" :data-src="gif.mediumgif.url" alt="">
      </div>
      <div class="unsplashPhotos" v-if="activeMedia === 'pexelsVideo'">
        <img draggable="true" @mousedown="drag($event)" v-for="(video, index) in pexelsVideo" :key="index" :src="video.video_pictures[0].picture" :data-src="video.video_files[0].link" alt="">
      </div>
      <div class="unsplashPhotos emojiPanel" v-if="activeMedia === 'emojis'">
        <span draggable="true" @mousedown="drag($event)"  style="font-size: 3em; height: 100px" v-for="(emoji, index) in emojis" :key="index">{{ emoji.character }}</span>
      </div>
      <div class="background" v-if="activeMedia === 'background'">
        <div>Colour</div>
        <div>Default Colours</div>
        <div class="colourBox">
            <span style="background: #000000"></span>
            <span style="background: #545454"></span>
            <span style="background: #737373"></span>
            <span style="background: #A6A6A6"></span>
            <span style="background: #D9D9D9"></span>
            <span style="background: #FFFFFF"></span>

            <span style="background: red"></span>
            <span style="background: red"></span>
            <span style="background: red"></span>
            <span style="background: red"></span>
            <span style="background: red"></span>
            <span style="background: red"></span>
            <span style="background: red"></span>
            <span style="background: red"></span>
      </div>
      </div>

    </div>
    <div class="editor">
      <div>
        <div>
          <div class="page" id="page" @drop="drop($event)" @dragover.prevent @dragenter.prevent></div>
        </div>
        <footer>
          <button @click="preview()">Preview</button>
<!--          <select name="" id="">-->

<!--          </select>-->
        </footer>
      </div>
      <aside>Options</aside>
    </div>
  </div>
<!--  <script src="https://cdnjs.cloudflare.com/ajax/libs/interact.js/1.10.0/interact.min.js"></script>-->
</main>
</template>

<script>
import axios from "axios";
// import * as interact from 'https://cdnjs.cloudflare.com/ajax/libs/interact.js/1.10.0/interact.min.js'
// import interact from '@interactjs/interact'
// require('https://cdnjs.cloudflare.com/ajax/libs/interact.js/1.10.0/interact.min.js')()
// import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js'

export default {
  name: "Editor",

  data () {
    return {
      authToken: `Bearer ${localStorage.getItem('authToken')}`,
      baseUrl: process.env.VUE_APP_baseUrl,
      activeMedia: 'unsplashPhotos',
      dataState: {},
      draggedElement: null,
      nextSibling: null,
      unsplashPhotos: [],
      uploadedMedia: [],
      tenorGifs: [],
      tenorNextPage: '',
      pexelsVideo: [],
      emojis: [],
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
    let position = { x: 0, y: 0 }

    // eslint-disable-next-line no-undef
    interact('.resize-drag')
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move (event) {
          var target = event.target
          var x = (parseFloat(target.getAttribute('data-x')) || 0)
          var y = (parseFloat(target.getAttribute('data-y')) || 0)

          // update the element's style
          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          // translate when resizing from top or left edges
          x += event.deltaRect.left
          y += event.deltaRect.top

          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)'

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
          target.width = target.getBoundingClientRect().width
          target.height = target.getBoundingClientRect().height
          // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
        }
      },
      modifiers: [
        // keep the edges inside the parent
        // eslint-disable-next-line no-undef
        interact.modifiers.restrictEdges({
          outer: 'parent'
        }),

        // minimum size
        // eslint-disable-next-line no-undef
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 }
        })
      ],

      inertia: true
    })
    .draggable({
      listeners: {
        start (event) {
          if (event.target.getAttribute('data-x')) {
            console.log('WWWWWWWWWWW', event.target.getAttribute('data-x'));
            position = {x: Number(event.target.getAttribute('data-x')), y: Number(event.target.getAttribute('data-y'))}
          }
        },
        end (event) {
          console.log('QQQQQQQQQQQQQQQQ', event);
          // position = { x: 0, y: 0 }
        },
        move (event) {
          position.x += event.dx
          position.y += event.dy

          event.target.dataset.x = position.x
          event.target.dataset.y = position.y

          event.target.style.transform =
          `translate(${position.x}px, ${position.y}px)`

        },
      }
    })
  },

  methods: {
    getUnsplashPhotos() {
      axios.get('https://api.unsplash.com/photos?per_page=20&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b')
      .then(res => {
        this.unsplashPhotos = res.data;
      })
      this.activeMedia = 'unsplashPhotos';
    },

    getTenorGifs() {
      axios.get(`https://api.tenor.com/v1/trending?key=LIVDSRZULELA&pos=${this.tenorNextPage}`)
      .then(res => {
        this.tenorGifs = res.data;
        this.tenorNextPage = this.tenorGifs.next;
        this.tenorGifs = this.tenorGifs.results.map(res => {
          return {
            tinygif: res.media[0].tinygif,
            mediumgif: res.media[0].mediumgif
          }
        })
        console.log(this.tenorGifs);
      }).catch((err) => {
        console.log(err)
      })
      this.activeMedia = 'tenorGifs';
    },

    getPexelsVideos() {
      console.log('WWWWWWWWWWWWWWWWWWWWW')
      axios.get(`https://api.pexels.com/videos/popular?per_page=20&page${1}`, {headers: {Authorization: '563492ad6f91700001000001b57dca97e28e403a847090e59abecfb9'}})
      .then(res => {
        console.log('FFFFFFFFFFFFFFFFFFFFFFFFF')
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
      this.activeMedia = 'pexelsVideo';
    },

    getEmoji() {
      console.log('WWWWWWWWWWWWWWWWWWWWW')
      axios.get(`https://emoji-api.com/emojis?access_key=be35c1e42b1b97499a7c1897042c9230c7ceb03d`)
      .then(res => {
        console.log('FFFFFFFFFFFFFFFFFFFFFFFFF', res.data)
        this.emojis = res.data;
      }).catch((err) => {
        console.log('There was an err: ', err)
      })
      this.activeMedia = 'emojis';
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
        element.parentNode.parentNode.parentNode.style.zIndex  = highestIndex + 1;
      })
    },

    drop( evt ) {
      evt.preventDefault();
      if (this.draggedElement) {
        let div = document.createElement('div')
        console.log(evt);
        div.classList.add('resize-drag');
        div.classList.add('resizable');
        // div.id = new Date().toISOString();
        // div.draggable = 'true';
        // div.style = 'width: 180px; height: content-box; position: absolute';
        // div.style.top = (evt.pageY - document.getElementById('page').offsetTop) + 'px';
        // div.style.left = (evt.pageX - document.getElementById('page').offsetLeft) + 'px';

        // div.addEventListener('drag', (element) => {
        //     this.alwaysOnTop(div);
        //     console.log(element)
        //     // console.log('page X:',(element.pageX -document.getElementById('page').offsetLeft))
        //     // console.log('page Y:',(element.pageY - document.getElementById('page').offsetTop))
        //     element.target.parentNode.parentNode.parentNode.style.top = (element.pageY - document.getElementById('page').offsetTop) + 'px';
        //     element.target.parentNode.parentNode.parentNode.style.left = (element.pageX -document.getElementById('page').offsetLeft) + 'px';
        //   })

        if (this.activeMedia !== 'pexelsVideo') {
          const photo = this.draggedElement.cloneNode(true)
          // photo.addEventListener('drag', (element) => {
          //   this.alwaysOnTop(photo);
          //   console.log(element)
          //   // console.log('page X:',(element.pageX -document.getElementById('page').offsetLeft))
          //   // console.log('page Y:',(element.pageY - document.getElementById('page').offsetTop))
          //   element.target.parentNode.parentNode.parentNode.style.top = (element.pageY - document.getElementById('page').offsetTop) + 'px';
          //   element.target.parentNode.parentNode.parentNode.style.left = (element.pageX -document.getElementById('page').offsetLeft) + 'px';
          // })
          photo.addEventListener('click', () => {
            this.alwaysOnTop(photo);
            console.log(photo)
          })
          div.innerHTML = `
          <div class='resizers' id="resizers-${new Date().toTimeString()}" >
            <div class='resizer top-left'></div>
            <div class='resizer top-right'></div>
            <div class='resizer bottom-left'></div>
            <div class='resizer bottom-right'></div>
            <amp-img layout="responsive" content="undefined" width="1" height="1" style="width: 100%; height: auto" src="${photo.dataset.src}"></amp-img>
          </div>`;
          // photo.style = 'width: 100%; height: auto'
          // photo.style.filter = 'blur(8px)';
          // photo.ondragstart = 'this.drag($event)';
          // photo.classList.add('inUse');
          photo.style = 'width: 180px; height: auto; position: absolute';
          photo.style.top = (evt.pageY - document.getElementById('page').offsetTop) + 'px';
          photo.style.left = (evt.pageX - document.getElementById('page').offsetLeft) + 'px';
          photo.src = photo.dataset.src;
          photo.classList.add('resize-drag')
          setTimeout(()=> {
            photo.width = photo.getBoundingClientRect().width
            photo.height = photo.getBoundingClientRect().height
            photo.setAttribute('data-img', '');
          }, 100)

          photo.setAttribute('data-x', '');
          photo.setAttribute('data-y', '');

          // photo.onclick = this.resizeElement(div.children[0].id, '.resizers')
          div = photo
        } else {
          const video = document.createElement('video')
          video.addEventListener('click', () => {
            this.alwaysOnTop(video);
            console.log(video)
          })
          let width = 0;
          let height = 0;

          setTimeout(() => {
            width = getComputedStyle(video, null).getPropertyValue('width').replace('px', '');
            height = getComputedStyle(video, null).getPropertyValue('height').replace('px', '');
            console.log('+++++++++++++++++++++', width)
            console.log('+++++++++++++++++++++', height)
          }, 200)
          video.addEventListener("resize", (resize) => {
            console.log('WWWWWWWWWWWW', resize);
            // width = getComputedStyle(video, null).getPropertyValue('width').replace('px', '');
            // height = getComputedStyle(video, null).getPropertyValue('height').replace('px', '');
          })
          div.innerHTML = `
          <div class='resizers' id="resizers-${new Date().toTimeString()}" >
            <div class='resizer top-left'></div>
            <div class='resizer top-right'></div>
            <div class='resizer bottom-left'></div>
            <div class='resizer bottom-right'></div>
            <amp-video autoplay layout="responsive" width="1" height="1" style="width: 100%; height: auto" poster="${this.draggedElement.src}">
                <source src="${this.draggedElement.dataset.src}" type="video/mp4" />
            </amp-video>
          </div>`;
          video.style = 'width: 100%'
          video.ondragstart = 'this.drag($event)';
          video.draggable = true;
          video.controls = true;
          video.onclick = this.resizeElement(div.children[0].id, '.resizers')
          const source = document.createElement('source');
          source.src = this.draggedElement.dataset.src
          video.appendChild(source);
          div.children[0].appendChild(video);
        }

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
                const height = original_height - (e.pageY + original_mouse_y)
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
                const height = original_height - (e.pageY + original_mouse_y)
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
                const height = original_height - (e.pageY + original_mouse_y)
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
      // const postHTMLCode = htmlCode;
      htmlCode = htmlCode.replaceAll(/<video.+<\/video>/gi, '');
      // htmlCode = htmlCode.replaceAll(/<img.+\/>/gi, '');
      // htmlCode = htmlCode.replaceAll(/data-src=".+"/gi, ' width="1" height="1" ');
      htmlCode = htmlCode.replaceAll(/<div class="resizer .+"><\/div>/gi, '')
      // htmlCode = htmlCode.replaceAll(new RegExp('height: ([0-9]|\\.)+px;">'), 'height: fit-content;">') // remove height from main div because of video
      htmlCode = htmlCode.replace('draggable="true"', '');
      htmlCode = htmlCode.replace('<img', `<amp-img`);
      htmlCode = htmlCode.replace('data-img="">', `  width="1" height="1"></amp-img>`);
      console.log(htmlCode)

      const title = document.getElementById('title').value;

      //eslint-disable-next-line
      const startAmpCode = "<!DOCTYPE html><html amp='' lang='en'><head>  <meta charset='utf-8'> <script async=\"\" custom-element=\"amp-video\" src=\"https://cdn.ampproject.org/v0/amp-video-0.1.js\"><\/script> <style amp-custom>.inUse {overflow: hidden;} amp-video > :first-child {padding-top: 56%!important;}</style>  <script async='' src='https://cdn.ampproject.org/v0.js'><\/script>  <script async='' src='https://cdn.ampproject.org/v0/amp-story-1.0.js' custom-element='amp-story'><\/script>  <script async='' src='https://cdn.ampproject.org/v0/amp-analytics-0.1.js' custom-element='amp-analytics'><\/script>  <title>" + (title ? title : 'Untitled Story') + "</title>  <link rel='canonical' href='https://www.cnn.com/ampstories/us/labor-day-its-history-and-meaning'>    <style amp-boilerplate=''>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>    <noscript>        <style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>    </noscript>  <meta name='viewport' content='width=device-width,minimum-scale=1,initial-scale=1'></head><body>  <amp-story poster-portrait-src='https://dynaimage.cdn.cnn.com/cnn/w_768,h_1024,c_scale/https%3A%2F%2Fdynaimage.cdn.cnn.com%2Fcnn%2Fx_572%2Cy_0%2Cw_868%2Ch_1158%2Cc_crop%2Fhttps%253A%252F%252Fstamp.static.cnn.io%252F5f46fd46e2547600227c1cd5%252F200826190320-03-labor-day-stamp.jpg' title='Labor Day: Its history and meaning' standalone='' publisher='CNN' publisher-logo-src='https://stamp.static.cnn.io/assets/images/badge.png'>    <amp-story-page id='page-cover' class='amp-story-page amp-story-page__full'>      <amp-story-grid-layer template='vertical' class='layer-background align-center justify-center'>";
      const endAmpCode = `</amp-story-grid-layer>    </amp-story-page>  </amp-story></body></html>`

      // var a = document.createElement("a");
      // var file = new Blob([startAmpCode + htmlCode + endAmpCode], {type: 'html'});
      const ampString = startAmpCode + htmlCode + endAmpCode

      const payload = {
          user_id : "1",
          name : title ? title : 'Untitled Story',
          file : 'postHTMLCode',
          amp_file : ampString
      }

      let config = {
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          console.log('QQQQQQQQQQQQQQQQQ: ', percentCompleted)
          // do whatever you like with the percentage complete
          // maybe dispatch an action that will update a progress bar or something
        }
      }
      axios.post(`${this.baseUrl}stories/add`, payload, {headers: {Authorization: this.authToken}, config})
      .then(res => {
        console.log(res)
        window.open('https://' + res.data.data.amp_file, '_blank')
      })
      // var a = document.createElement("a");
      // a.id = 'a';
      // a.href = URL.createObjectURL(file);
      // a.download = 'AMP.html';
      // a.click();
    },

    getUploadedMedia() {
      axios.post(`${this.baseUrl}media/get`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
      .then(res => {
        this.uploadedMedia = res.data.data;
        console.log(this.uploadedMedia)
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

  * {
    touch-action: none;
    user-select: none;
  }

  header {
    padding: 10px 20px;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //border-bottom: 1px solid #CBDBEC;
    box-sizing: border-box;

    .leftHeader {
      display: flex;
      align-items: center;

      .title {
        border: #20262D 1px solid;
        border-radius: 5px;
        height: 40px;
        width: 200px;
        margin-left: 50px;
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;

        input {
          border: none;
          background: rgba(0, 0, 0, 0);
          color: #5b6d81;
          width: 100%;
          font-size: 20px;

          &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active, &:focus, :focus {
              border: none !important;
              transition: background-color 5000s ease-in-out 0s;
              outline: none;
            }
        }
      }
    }

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
        justify-content: flex-start;

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          //margin: 10px 0;
          flex-direction: column;
          cursor: pointer;
          box-sizing: border-box;

          &:hover {
            color: #a9a9a9;

            i {
              color: #a9a9a9;
            }
          }

          &.active {
            background: #20262D;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;

            &:first-child {
              &::before {
                display: none;
              }
            }

            &::before {
              content: '';
              background: black;
              width: 10px;
              height: 10px;
              position: absolute;
              margin-top: -90px;
              margin-left: 70px;
              border-bottom-right-radius: 100%;
              box-shadow: 3px 3px 0 0 #20262D;
              z-index: 0;
            }

            &::after {
              content: '';
              background: black;
              width: 10px;
              height: 10px;
              position: absolute;
              margin-top: 90px;
              margin-left: 70px;
              border-top-right-radius: 100%;
              box-shadow: 3px -3px 0 0 #20262D;
              z-index: 0;
            }

          }

          i {
            font-size: 25px;
            color: #eeeeee;
            display: block;
            margin: 5px;
          }
        }
      }

      > div {
        display: flex;
        height: 100%;
        width: 320px;
        flex-wrap: wrap;
        overflow-y: auto;
        justify-content: flex-start;
        box-sizing: border-box;

        &.emojiPanel {
          flex-direction: row;
          justify-content: space-between;

          span {
            justify-content: center;
            display: flex;
            align-items: center;

            &:hover {
              background: black;
            }
          }
        }
        img {
          max-width: 95px;
          width: auto;
          height: auto;
          margin: 3px;
          box-sizing: border-box;
        }

        &.background {
          background: green;
          .colourBox {
            display: flex;
            span {
              width: 50px;
              height: 60px;
            }
          }
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
