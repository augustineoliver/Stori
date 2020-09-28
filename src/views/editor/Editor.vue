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
        <img draggable="true" v-for="(photo, index) in unsplashPhotos" :key="index" :src="photo.urls.thumb" :alt="photo.alt_description">
      </div>
    </div>
    <div class="editor"><h1>This is the Work Area</h1></div>
  </div>
</main>
</template>

<script>
export default {
  name: "Editor",

  data () {
    return {
      unsplashPhotos: []
    }
  },

  methods: {
    getUnsplashPhotos() {
      fetch('https://api.unsplash.com/photos?per_page=20&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b')
        .then(response => response.json())
        .then(res => {
          this.unsplashPhotos = res;
        })
    }
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
    border-bottom: 1px solid #CBDBEC;
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
      background: #F2F2F2;
      width: calc(100% - 400px);
    }
  }

}
</style>
