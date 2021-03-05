<template>
<div ref="unsplashPhotos" class="media">
  <div class="tabRow">
    <div @click="$refs.search.value = ''; selectedTab = 'Unsplash'" :class="{active: selectedTab === 'Unsplash'}">Images</div>
    <div @click="$refs.search.value = ''; selectedTab = 'Gifs'" :class="{active: selectedTab === 'Gifs'}">GIFs</div>
    <div @click="$refs.search.value = ''; selectedTab = 'Emojis'" :class="{active: selectedTab === 'Emojis'}">Emoji</div>
  </div>

  <div class="mediaMain">
    <label class="searchBox">
      <input :placeholder="'Search ' + selectedTab" type="search" ref="search" v-on:keyup="searchMedia($event.target.value)">
    </label>
    <div id="mediaMain">
      <template v-if="selectedTab === 'Unsplash'">
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

      <template v-if="selectedTab === 'Gifs'">
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

      <template v-if="selectedTab === 'Emojis'">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap">
          <img v-for="(emoji, index) in emojis" :key="index" draggable="true" @mousedown="dragMedia($event)" :data-src="emoji" :src="emoji" height="128" width="128" :alt="emoji"/>
        </div>
      </template>
    </div>

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
      unsplashPhotoSearch: [],
      tenorGifs: [],
      emojis: [],
      tenorNextPage: '',
      selectedTab: 'Unsplash',
      unsplashPhotoPage: 1,
      searchUnsplashPhotoPage: 1,
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
            case "Unsplash": {
              if (this.unsplashPhotoSearch.length > 0) {
                this.searchUnsplashPhotos(this.$refs.search.value, false, this.searchUnsplashPhotoPage)
              } else {
                this.getUnsplashPhotos(this.unsplashPhotoPage)
              }
              break;
            }
            case 'Gifs': {
              if (this.tenorGifPage > 1) {
                this.searchTenorGifs(this.$refs.search.value, false)
              }
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

    searchMedia(query) {
      switch (this.selectedTab) {
        case "Unsplash": {
          this.searchUnsplashPhotos(query, true); break;
        }
        case 'Gifs': {
          this.searchTenorGifs(query, true)
          break;
        }
      }
    },

    getUnsplashPhotos(page = 1) {
      axios.get(`https://api.unsplash.com/photos?per_page=20&page=${page}&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b`)
          .then(res => {
            this.unsplashPhotos = [...this.unsplashPhotos, ...res.data];
            this.unsplashPhotoPage += 1
            this.searchUnsplashPhotoPage = 1
          })
      this.$parent.activeMedia = 'unsplashPhotos';
    },

    searchUnsplashPhotos(query, isNew, page = 1) {
      if (query) {
        axios.get(`https://api.unsplash.com/search/photos?per_page=20&page=${page}&query=${query}&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b`)
            .then(res => {
              if (isNew) {
                this.unsplashPhotoSearch = []
                this.unsplashPhotoSearch = res.data.results
                this.unsplashPhotos = this.unsplashPhotoSearch
                this.searchUnsplashPhotoPage = 1
              } else {
                this.unsplashPhotoSearch = [...this.unsplashPhotoSearch, ...res.data.results];
                this.unsplashPhotos = this.unsplashPhotoSearch
                this.searchUnsplashPhotoPage += 1
              }
              this.unsplashPhotoPage = 1
            })
      } else {
        this.getUnsplashPhotos();
      }
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

    searchTenorGifs(query, isNew) {
      axios.get(`https://api.tenor.com/v1/search?q=${query}&key=LIVDSRZULELA&pos=${this.tenorNextPage}`)
          .then(res => {
            let data = res.data;
            this.tenorNextPage = data.next;
            data = data.results.map(res => {
              return {
                tinygif: res.media[0].tinygif,
                mediumgif: res.media[0].mediumgif
              }
            })
            if (isNew) {
              this.tenorGifs = []
              this.tenorGifs = data
              this.tenorGifPage += 1
            } else {
              this.tenorGifs = [...this.tenorGifs, ...data]
              this.tenorGifPage += 1
            }
            // this.unsplashPhotoPage = 1
          })
    },

  }
}
</script>

<style lang="scss">
.media {
  box-sizing: border-box;
  width: 100%;
  .mediaMain {
    display: flex;
    height: calc(100% - 50px);
    width: 320px;
    flex-wrap: wrap;
    overflow-y: auto;
    justify-content: flex-start;
    box-sizing: border-box;
    background: #000000;
    align-content: flex-start;
    @media (max-height: 800px) {
      height: calc(100% - 40px);
    }

    .searchBox {
      width: inherit;
      max-height: 50px;
      margin: 10px;
      border: solid #a4a4a4 1px;
      border-radius: 10px;
      @media (max-height: 800px) {
        max-height: 40px;
        margin: 8px;
        border-radius: 8px;
      }

      input {
        width: 100%;
        padding: 10px;
        color: #a4a4a4;
        border: none;
        outline: none;
        @media (max-height: 800px) {
          padding: 8px;
        }
      }
    }

    > div {
      height: calc(100% - 68px);
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      overflow-x: hidden;
    }

    * {
      box-sizing: border-box;
      width: 100%;
    }
  }
}
</style>
