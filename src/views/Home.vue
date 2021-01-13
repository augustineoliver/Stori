<template>
  <section>
    <header>
      <img src="../assets/images/home/logo.svg" alt="Stori">
      <nav>
        <div>
          <img src="../assets/images/home/new-story.svg" alt="">
          <router-link :to="{name: 'Editor'}">New Story</router-link>
        </div>
        <div>
          <img src="../assets/images/home/templates.svg" alt="">
          <router-link :to="{name: 'Home'}">Templates</router-link>
        </div>
        <div>
          <img src="../assets/images/home/uploads.svg" alt="">
          <router-link :to="{name: 'Home'}">Uploads</router-link>
        </div>
        <div>
          <img src="../assets/images/home/shared.svg" alt="">
          <router-link :to="{name: 'Home'}">Shared</router-link>
        </div>
        <div>
          <img src="../assets/images/home/folder.svg" alt="">
          <router-link :to="{name: 'Home'}">Folder</router-link>
        </div>
        <div>
          <img src="../assets/images/home/settings.svg" alt="">
          <router-link :to="{name: 'Home'}">Settings</router-link>
        </div>
      </nav>

      <div class="rightHeader">
        <div class="workspaceName">
          <img alt="" class="workIcon" src="../assets/images/home/work-icon.svg"/>
          <div>
            <div>WORKSPACE</div>
            <div>Artculture BMC</div>
          </div>
          <img alt="" class="downIcon" src="../assets/images/home/drop-down.svg"/>
        </div>
        <div>
          <img src="../assets/images/home/sun.svg" alt="">
          <img src="../assets/images/home/notification.svg" alt="">
          <img src="../assets/images/home/user.svg" alt="">
        </div>
      </div>
    </header>

    <main id="main">
      <div class="searchAndStoryTypes">
        <div>
          <a @click="getAllStories()" :class="{active: activeTab === 'home'}">All Stories</a>
          <a @click="getUserStories()" :class="{active: activeTab === 'myStory'}">My Stories</a>
          <a @click="getDraftedStories()" :class="{active: activeTab === 'draft'}">Draft</a>
          <a @click="getPublishedStories()" :class="{active: activeTab === 'published'}">Published</a>
        </div>
        <div>
          <label>
            <input type="search" @keyup="searchStories($event.target.value)">
            <i class="fas fa-search"></i>
          </label>
        </div>
      </div>

      <div class="templateList">

        <template v-if="activeTab === 'home'">
          <div class="template" v-for="(stori, index) in allStories" :key="index">
            <div>
              <div class="ampPreview">
                <div class="viewOverlay">
                  <router-link :to="{name: 'Story', params: {id: stori.id}}">
                    <button>Open</button>
                  </router-link>
                </div>
                <div class="page" :style="{background: stori.htmlCode.background}" v-html="stori.htmlCode.elements"></div>
              </div>
              <div class="details">
                <div>
                  <div>{{ stori.name }}</div>
                  <div>Created on {{ new Date(stori.updated_at).toLocaleString() }}</div>
                </div>
                <div>
                  <!--              <div>-->
                  <!--                <i class="fas fa-eye"></i>-->
                  <!--              </div>-->
                  <div>
                    <i class="fas fa-ellipsis-v"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="allStories.length === 0 && loadingMoreData === false" class="noStoryFound">
            <div>No story found</div>
          </div>
        </template>

        <template v-if="activeTab === 'myStory'">
          <div class="template" v-for="(stori, index) in allUserStori" :key="index">
            <div>
              <div class="ampPreview">
                <div class="viewOverlay">
                  <router-link :to="{name: 'Story', params: {id: stori.id}}">
                    <button>Open</button>
                  </router-link>
                  <button>Preview</button>
                  <button>Copy</button>
                  <button @click="deleteStori(stori.id)">Delete</button>
                  <button>Move</button>
                </div>
                <div class="page" :style="{background: stori.htmlCode.background}" v-html="stori.htmlCode.elements"></div>
              </div>
              <div class="details">
                <div>
                  <div>{{ stori.name }}</div>
                  <div>Created on {{ new Date(stori.updated_at).toLocaleString() }}</div>
                </div>
                <div>
                  <!--              <div>-->
                  <!--                <i class="fas fa-eye"></i>-->
                  <!--              </div>-->
<!--                  <div>-->
<!--                    <i class="fas fa-ellipsis-v"></i>-->
<!--                  </div>-->
                </div>
              </div>
            </div>
          </div>
          <div v-if="allUserStori.length === 0 && loadingMoreData === false" class="noStoryFound">
            <div>No story found</div>
          </div>
        </template>

        <template v-if="activeTab === 'draft'">
          <div class="template" v-for="(stori, index) in draftedStories" :key="index">
            <div>
              <div class="ampPreview">
                <div class="viewOverlay">
                  <router-link :to="{name: 'Story', params: {id: stori.id}}">
                    <button>Open</button>
                  </router-link>
                </div>
                <div class="page" :style="{background: stori.htmlCode.background}" v-html="stori.htmlCode.elements"></div>
              </div>
              <div class="details">
                <div>
                  <div>{{ stori.name }}</div>
                  <div>Created on {{ new Date(stori.updated_at).toLocaleString() }}</div>
                </div>
                <div>
                  <!--              <div>-->
                  <!--                <i class="fas fa-eye"></i>-->
                  <!--              </div>-->
                  <div>
                    <i class="fas fa-ellipsis-v"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="draftedStories.length === 0 && loadingMoreData === false" class="noStoryFound">
            <div>No story found</div>
          </div>
        </template>

        <template v-if="activeTab === 'published'">
          <div class="template" v-for="(stori, index) in publishedStories" :key="index">
            <div>
              <div class="ampPreview">
                <div class="viewOverlay">
                  <router-link :to="{name: 'Story', params: {id: stori.id}}">
                    <button>Open</button>
                  </router-link>
                </div>
                <div class="page" :style="{background: stori.htmlCode.background}" v-html="stori.htmlCode.elements"></div>
              </div>
              <div class="details">
                <div>
                  <div>{{ stori.name }}</div>
                  <div>Created on {{ new Date(stori.updated_at).toLocaleString() }}</div>
                </div>
                <div>
                  <!--              <div>-->
                  <!--                <i class="fas fa-eye"></i>-->
                  <!--              </div>-->
                  <div>
                    <i class="fas fa-ellipsis-v"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="publishedStories.length === 0 && loadingMoreData === false" class="noStoryFound">
            <div>No story found</div>
          </div>
        </template>

        <template v-if="loadingMoreData">
            <div class="template loading" v-for="i in 10" :key="'a' + i">
              <div>
                <div class="ampPreview">
                  <div class="viewOverlay">
                  </div>
                  <div class="page"></div>
                </div>
                <div class="details">
                  <div>
                    <div style="padding: 5px; width: 100px; background: #34373c"></div>
                    <div style="padding: 5px; width: 150px; background: #34373c"></div>
                  </div>
                  <div>
                    <div>
                      <i class="fas fa-ellipsis-v" style="color: #34373c"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

      </div>
    </main>
  </section>
</template>

<script>
// @ is an alias to /src

import axios from "axios";


export default {
  name: 'Home',
  data() {
    return {
      authToken: `Bearer ${localStorage.getItem('authToken')}`,
      baseUrl: process.env.VUE_APP_baseUrl,
      activeTab: 'myStory',
      allUserStori: [],
      allUserStoriCurrentPageNumber: undefined,
      allUserStoriNextPageNumber: undefined,
      allStories: [],
      allStoriesCurrentPageNumber: undefined,
      allStoriesNextPageNumber: undefined,
      draftedStories: [],
      draftedStoriesCurrentPageNumber: undefined,
      draftedStoriesNextPageNumber: undefined,
      publishedStories: [],
      publishedStoriesCurrentPageNumber: undefined,
      publishedStoriesNextPageNumber: undefined,
      loadingMoreData: undefined,
    }
  },

  created() {
    this.getUserStories()
  },

  mounted() {
    this.loadingMoreData = true
    const main = document.getElementById('main')
    main.addEventListener('scroll', () => {
        if ((main.scrollTop + main.clientHeight) >= main.scrollHeight) {
            // you're at the bottom of the page
          console.log('🥰🥰🥰🥰🥰🥰🥰')
          switch (this.activeTab) {
            case 'home': {
              if (this.allStoriesCurrentPageNumber !== this.allStoriesNextPageNumber) {
                this.getAllStories(this.allStoriesNextPageNumber)
              }
              break;
            }

            case 'myStory': {
              if (this.allUserStoriCurrentPageNumber !== this.allUserStoriNextPageNumber) {
                this.getUserStories(this.allUserStoriNextPageNumber)
              }
              break;
            }

            case 'draft': {
              if (this.draftedStoriesCurrentPageNumber !== this.draftedStoriesNextPageNumber) {
                this.getDraftedStories(this.draftedStoriesNextPageNumber)
              }
              break;
            }

            case 'published': {
              if (this.publishedStoriesCurrentPageNumber !== this.publishedStoriesNextPageNumber) {
                this.getDraftedStories(this.publishedStoriesNextPageNumber)
              }
              break;
            }
          }
        }
    });
  },

  methods: {
    searchStories(keyword) {
      switch (this.activeTab) {
        case "myStory": {
          console.log(keyword)
          this.searchUserStories(keyword)
          break;
        }
        // case 'home': {
        //
        // }
      }
    },

    getUserStories(page = 1) {
      this.loadingMoreData = true
      axios.post(`${this.baseUrl}stories?page=${page}`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
          .then(res => {
            this.allUserStoriCurrentPageNumber = res.data.data.current_page
            this.allUserStoriNextPageNumber = res.data.data.next_page_url ? res.data.data.current_page + 1 : res.data.data.current_page
            this.allUserStori.push(...res.data.data.data.filter(r => {
              const htmlCode = r.file;
              const tempDiv = document.createElement('div')
              tempDiv.innerHTML = htmlCode.replaceAll('\\', '')
              const allPages = tempDiv.getElementsByTagName("section")
              const firstPage = allPages[0]
              const pageObject = {
                background: firstPage.style.background,
                elements: firstPage.innerHTML.replaceAll(/class="([a-z] |[A-z]|[0-9]|-|_)+"/ig, '')
              }
              return r.htmlCode = pageObject
            }));
            this.activeTab = 'myStory'
            this.loadingMoreData = false
          })
    },

    searchUserStories(searchQuery, page = 1) {
      this.allUserStori = []
      this.loadingMoreData = true

      if (searchQuery === '') {
        this.getUserStories()
      } else {
        axios.post(`${this.baseUrl}stories/${searchQuery}?page=${page}`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
          .then(res => {
            this.allUserStoriCurrentPageNumber = res.data.data.current_page
            this.allUserStoriNextPageNumber = res.data.data.next_page_url ? res.data.data.current_page + 1 : res.data.data.current_page
            this.allUserStori.push(...res.data.data.data.filter(r => {
              const htmlCode = r.file;
              const tempDiv = document.createElement('div')
              tempDiv.innerHTML = htmlCode.replaceAll('\\', '')
              const allPages = tempDiv.getElementsByTagName("section")
              const firstPage = allPages[0]
              const pageObject = {
                background: firstPage.style.background,
                elements: firstPage.innerHTML.replaceAll(/class="([a-z] |[A-z]|[0-9]|-|_)+"/ig, '')
              }
              return r.htmlCode = pageObject
            }));
            this.activeTab = 'myStory'
            this.loadingMoreData = false
          })
      }
    },



    getAllStories(page = 1) {
      this.loadingMoreData = true
      axios.post(`${this.baseUrl}stories?page=${page}`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
          .then(res => {
            this.allStoriesCurrentPageNumber = res.data.data.current_page
            this.allStoriesNextPageNumber = res.data.data.next_page_url ? res.data.data.current_page + 1 : res.data.data.current_page
            this.allStories.push(...res.data.data.data.filter(r => {
              const htmlCode = r.file;
              const tempDiv = document.createElement('div')
              tempDiv.innerHTML = htmlCode.replaceAll('\\', '')
              const allPages = tempDiv.getElementsByTagName("section")
              const firstPage = allPages[0]
              const pageObject = {
                background: firstPage.style.background,
                elements: firstPage.innerHTML.replaceAll(/class="([a-z] |[A-z]|[0-9]|-|_)+"/ig, '')
              }
              return r.htmlCode = pageObject
            }));
            this.activeTab = 'home'
            this.loadingMoreData = false
          })
    },

    getDraftedStories(page = 1) {
      this.loadingMoreData = true
      axios.post(`${this.baseUrl}stories/drafted?page=${page}`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
          .then(res => {
            this.draftedStoriesCurrentPageNumber = res.data.data.current_page
            this.draftedStoriesNextPageNumber = res.data.data.next_page_url ? res.data.data.current_page + 1 : res.data.data.current_page
            this.draftedStories.push(...res.data.data.data.filter(r => {
              const htmlCode = r.file;
              const tempDiv = document.createElement('div')
              tempDiv.innerHTML = htmlCode.replaceAll('\\', '')
              const allPages = tempDiv.getElementsByTagName("section")
              const firstPage = allPages[0]
              const pageObject = {
                background: firstPage.style.background,
                elements: firstPage.innerHTML.replaceAll(/class="([a-z] |[A-z]|[0-9]|-|_)+"/ig, '')
              }
              return r.htmlCode = pageObject
            }));
            this.activeTab = 'draft'
            this.loadingMoreData = false
          })
    },


    getPublishedStories(page = 1) {
      this.loadingMoreData = true
      axios.post(`${this.baseUrl}stories/published?page=${page}`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
          .then(res => {
            this.publishedStoriesCurrentPageNumber = res.data.data.current_page
            this.publishedStoriesNextPageNumber = res.data.data.next_page_url ? res.data.data.current_page + 1 : res.data.data.current_page
            this.publishedStories.push(...res.data.data.data.filter(r => {
              const htmlCode = r.file;
              const tempDiv = document.createElement('div')
              tempDiv.innerHTML = htmlCode.replaceAll('\\', '')
              const allPages = tempDiv.getElementsByTagName("section")
              const firstPage = allPages[0]
              const pageObject = {
                background: firstPage.style.background,
                elements: firstPage.innerHTML.replaceAll(/class="([a-z] |[A-z]|[0-9]|-|_)+"/ig, '')
              }
              return r.htmlCode = pageObject
            }));
            this.activeTab = 'published'
            this.loadingMoreData = false
          })
    },

    deleteStori(storyId) {
      axios.delete(`${this.baseUrl}stories/${storyId}`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
        .then(res => {
          console.log('Deleted', res)
        })
    },

    copyStori(storyId) {
      axios.delete(`${this.baseUrl}stories/${storyId}`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
        .then(res => {
          console.log('Deleted', res)
        })
    }


  },
}
</script>

<style lang="scss">
section {
  background: #000000;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  color: white;

  header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;

    nav {
      display: flex;

      div {
        padding: 10px;
        margin: 10px;
        max-width: 132px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        img {
          margin-right: 10px;
        }

        a {
          color: #FFFFFF;
          font-size: 18px;
          line-height: 20px;
          text-decoration: none;

          :visited {
            color: #FFFFFF;
            font-size: 18px;
            line-height: 20px;
            text-decoration: none;
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
        align-items: center;
        background: #373E48;
        border: #707070;
        color: #FFFFFF;
        width: 165px;
        height: 40px;
        border-radius: 35px;
        font-family: 'Apple SD Gothic Neo', sans-serif;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;

        .workIcon {
          width: 23px;
          height: 23px;
          margin: 5px;
        }

        div {
          font-family: Rubik, sans-serif;
          font-weight: lighter;

          &:first-child {
            font-size: 8px;
          }

          &:last-child {
            font-size: 11px;
          }
        }

        .downIcon {
          width: 28px;
          height: 28px;
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

  main {
    display: block;
    width: 100%;
    height: calc(100vh - 102px);
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 12px;
      background-color: rgba(0, 0, 0, 0);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
      background-color: #555;
    }

    .searchAndStoryTypes {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      margin: 20px 0;
      box-sizing: border-box;
      height: 80px;
      align-items: center;

      > :first-child {
        display: flex;
        align-items: center;

        a {
          font-size: 22px;
          line-height: 27px;
          margin: 5px 30px;
          height: 70px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          text-decoration: none;
          color: white;

          &.active, &:hover {
            border-bottom: solid 5px #519EF4;
            margin-bottom: 0;
          }
        }
      }

      > :last-child {
        label {
          width: 302px;
          height: 47px;
          background: #212325;
          padding: 0 0 0 20px;
          box-sizing: border-box;
          border-radius: 50px;
          display: flex;
          align-items: center;

          input {
            font-size: 18px;
            width: 240px;
            background: rgba(0, 0, 0, 0);
            color: white;
            border: none;
            height: 41px;

            &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active, &:focus, :focus {
              border: none !important;
              transition: background-color 5000s ease-in-out 0s;
              outline: none;
            }
          }

          i {
            color: #3494FF;
            font-size: 22px;
            padding: 5px;
          }
        }
      }
    }

    .templateList {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      width: 100%;
      padding: 20px 50px;
      box-sizing: border-box;
      align-items: center;

      .template {
        width: 308px;
        height: 540px;
        background: #1A1A1A;
        border-radius: 13px;
        //padding: 30px;
        box-sizing: border-box;
        margin: 20px;
        display: block;
        overflow: hidden;
        position: relative;
        //
        ////&:hover {
        //  &::before {
        //    content: '';
        //    display: block;
        //    width: 100%;
        //    height: 100%;
        //    background: red;
        //  }
        ////}


          > div {
            width: 100%;
            padding: 30px;

            .ampPreview {
              background: #212326;
              border-radius: 13px;
              width: 248.024px;
              height: 413.382px;
              display: flex;
              justify-content: center;
              align-items: center;

              &:hover {
                .viewOverlay {
                  opacity: 1;
                  transition: opacity 200ms linear;
                }
              }

              .viewOverlay {
                display: flex;
                flex-direction: column;
                gap: 20px;
                justify-content: center;
                align-items: center;
                background: rgba(26, 26, 26, 0.8);
                width: 100%;
                height: calc(100% - 90px);
                position: absolute;
                z-index: 10;
                top: 0;
                left: 0;
                opacity: 0;

                button {
                  background: #53a5fe;
                  color: black;
                  padding: 5px 10px;
                  border-radius: 10px;
                  width: 100px;
                  outline: none;

                  &:nth-child(2) {
                    background: green;
                    color: #d5ffd1;
                  }
                  &:nth-child(3) {
                    background: #ffae50;
                    color: #2f2d28;
                  }
                  &:nth-child(4) {
                    background: darkred;
                    color: #ffd3d3;
                  }
                  &:nth-child(5) {
                    background: darkblue;
                    color: #bfc4ff;
                  }
                }
              }

              .page {
                border: 0;
                width: 421.641px;
                height: 702.750px;
                display: block;
                transform: scale(1, 0.59);
                overflow: hidden;

                div {
                  position: absolute;

                  &:hover {
                    text-decoration: none;
                    border: none;
                    box-shadow: none;
                  }
                }
              }
            }

            .details {
              display: flex;
              justify-content: space-between;
              margin-top: 30px;

              > :first-child {
                display: block;

                > :first-child {
                  font-size: 20px;
                  line-height: 14px;
                  color: #CBDBEC;
                  margin-bottom: 20px;
                }

                > :last-child {
                  font-size: 14px;
                  line-height: 9px;
                  color: #CBDBEC;
                }
              }

              > :last-child {
                display: flex;
                align-items: center;
                justify-content: space-around;

                > :first-child {
                  width: 52px;
                  height: 28px;
                  border-radius: 6px;
                  background: #212326;
                  color: #CBDBEC;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                }

                > :last-child {
                  color: #CBDBEC;
                  padding: 0 5px;
                  margin: 0 5px;
                  cursor: pointer;
                }
              }
            }
          }
      }
    }
  }
}

.loading {
  @keyframes skeleton {
      from {left: 0}
      to {left: 100%;}
    }
  &::before {
    display: block;
    content: '';
    background: linear-gradient(0.25turn, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
    width: 200px;
    height: 500px;
    position: absolute;
    animation: skeleton 700ms linear infinite;
  }
}

.noStoryFound {
  font-size: 2em;
  text-align: center;
  flex-grow: 1;
}
</style>
