<template>
<main>
  <header>
    <div>
      <img src="../../assets/images/home/logo.svg" alt="Stori">
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
          <img src="../../assets/images/home/sun.svg" alt="">
          <img src="../../assets/images/home/notification.svg" alt="">
          <img src="../../assets/images/home/user.svg" alt="">
        </div>
      </div>
  </header>
  <div class="main">
    <div class="leftPanel">
      <nav>
        <div>Menu</div>
        <div>Menu</div>
        <div>Menu</div>
        <div>Menu</div>
      </nav>
      <div class="unsplashPhotos">
        <img draggable="true" @mousedown="drag($event)" v-for="(photo, index) in unsplashPhotos" :key="index" :src="photo.urls.thumb" :data-src="photo.urls.full" :alt="photo.alt_description">
      </div>
    </div>
    <div class="editor">
      <div>
        <div>
          <div class="page" id="page" @drop="drop($event)" @dragover.prevent @dragenter.prevent></div>
        </div>
        <footer></footer>
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
      draggedElement: null,
      nextSibling: null,
      unsplashPhotos: []
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
    },

    allowDrop({ target, transform }) {
      // ev.preventDefault();
      console.log(target);
      console.log(transform);
    },

    drag(evt) {
      console.log(evt);
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
        const photo = this.draggedElement.cloneNode(true)

        console.log(evt);
        photo.addEventListener('drag', (element) => {
          this.alwaysOnTop(photo);
          console.log('page X:',(element.pageX -document.getElementById('page').offsetLeft))
          console.log('page Y:',(element.pageY - document.getElementById('page').offsetTop))
          element.target.style.top = (element.pageY - document.getElementById('page').offsetTop) + 'px';
          element.target.style.left = (element.pageX -document.getElementById('page').offsetLeft) + 'px';
        })
        photo.addEventListener('click', () => {
          this.alwaysOnTop(photo);
          console.log(photo)
        })

        photo.ondragstart = 'this.drag($event)';
        photo.classList.add('inUse');
        photo.src = photo.dataset.src;
        photo.style.filter = 'blur(8px)';
        photo.id = new Date();
        photo.style = 'width: 180px; height: auto; position: absolute';
        photo.style.top = (evt.pageY - document.getElementById('page').offsetTop) + 'px';
        photo.style.left = (evt.pageX - document.getElementById('page').offsetLeft) + 'px';

        evt.target.appendChild(photo);
        this.draggedElement = null;
      }
    },
  },

  created () {
    this.getUnsplashPhotos()
  }
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
</style>
