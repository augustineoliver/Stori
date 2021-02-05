<template>
<div ref="unsplashPhotos" class="media">
  <div class="tabRow">
    <div @click="selectedTab = 'images'" :class="{active: selectedTab === 'images'}">Images</div>
    <div @click="selectedTab = 'tenorGifs'" :class="{active: selectedTab === 'tenorGifs'}">GIFs</div>
    <div @click="selectedTab = 'emojis'" :class="{active: selectedTab === 'emojis'}">Emoji</div>
  </div>

  <div class="mediaMain" id="mediaMain">
      <template v-if="selectedTab === 'images'">
        <masonry
          :cols="2"
          :gutter="5"
          >
          <div class="masonry-grid-item" v-for="(photo, index) in unsplashPhotos" :key="index">
            <img draggable="true" @mousedown="dragMedia($event)"
               :src="photo.urls.thumb" :data-src="photo.urls.regular" :alt="photo.alt_description">
          </div>
        </masonry>
      </template>

      <template v-if="selectedTab === 'tenorGifs'">
        <masonry
          :cols="2"
          :gutter="5"
          >
          <div class="masonry-grid-item" v-for="(gif, index) in tenorGifs" :key="index">
            <img draggable="true" @mousedown="dragMedia($event)"
                 :src="gif.tinygif.url" :data-src="gif.mediumgif.url" alt="">
          </div>
        </masonry>
      </template>

      <template v-if="selectedTab === 'emojis'">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap">
          <img v-for="(emoji, index) in emojis" :key="index" draggable="true" @mousedown="dragMedia($event)" :data-src="emoji" :src="emoji" height="128" width="128" :alt="emoji"/>
        </div>
      </template>
  </div>

</div>
</template>

<script>
import axios from "axios";

export default {
name: "MediaPanel",
  data() {
    return {
      baseUrl: process.env.VUE_APP_baseUrl,
      unsplashPhotos: [],
      tenorGifs: [],
      emojis: [],
      tenorNextPage: '',
      selectedTab: 'images',
      unsplashPhotoPage: 1,
      tenorGifPage: 1,
    }
  },

  mounted() {
    this.getUnsplashPhotos()
    this.getTenorGifs()
    this.getEmoji()

    const main = document.getElementById('mediaMain')
    main.addEventListener('scroll', () => {
        if ((main.scrollTop + main.clientHeight) >= main.scrollHeight) {
          // you're at the bottom of the page
          switch (this.selectedTab) {
            case "images": {
              this.getUnsplashPhotos(this.unsplashPhotoPage)
              break;
            }
            case 'tenorGifs': {
              this.getTenorGifs()
              break;
            }
          }
        }
    });
  },

  methods: {
    dragMedia(evt) {
      this.$parent.draggedElement = evt.target;
    },

    getEmoji() {
      axios.get(`${this.baseUrl}emoji`)
          .then(res => {
            this.emojis = res.data.data.splice(2)
            console.log('Emojis: ', this.emojis)
          })
      this.$parent.activeMedia = 'unsplashPhotos';
    },

    getUnsplashPhotos(page = 1) {
      axios.get(`https://api.unsplash.com/photos?per_page=20&page=${page}&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b`)
          .then(res => {
            this.unsplashPhotos = [...this.unsplashPhotos, ...res.data];
            this.unsplashPhotoPage += 1
          })
      this.$parent.activeMedia = 'unsplashPhotos';
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
      this.activeMedia = 'tenorGifs';
    },
  }
}
</script>

<style lang="scss">
.media {
  box-sizing: border-box;
  width: 100%;
  .mediaMain {
    height: calc(100% - 50px);
    width: 100%;
    overflow-y: auto;

    * {
      box-sizing: border-box;
      width: 100%;
    }
  }
}
</style>
