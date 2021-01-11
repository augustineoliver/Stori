<template>
<div ref="unsplashPhotos">
  <div class="tabRow">
    <div @click="selectedTab = 'images'" :class="{active: selectedTab === 'images'}">Images</div>
    <div @click="selectedTab = 'tenorGifs'" :class="{active: selectedTab === 'tenorGifs'}">GIFs</div>
    <div @click="selectedTab = 'emoji'" :class="{active: selectedTab === 'emoji'}">Emoji</div>
  </div>
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
</div>
</template>

<script>
import axios from "axios";

export default {
name: "Media",
  data() {
    return {
      unsplashPhotos: undefined,
      tenorGifs: [],
      tenorNextPage: '',
      selectedTab: 'images',
    }
  },

  mounted() {
    this.getUnsplashPhotos()
    this.getTenorGifs()
  },

  methods: {
    dragMedia(evt) {
      // console.log(evt);
      this.$parent.draggedElement = evt.target;
    },
    getUnsplashPhotos() {
      axios.get('https://api.unsplash.com/photos?per_page=20&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b')
          .then(res => {
            this.unsplashPhotos = res.data;
          })
      this.$parent.activeMedia = 'unsplashPhotos';
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
  }
}
</script>

<style scoped>

</style>
