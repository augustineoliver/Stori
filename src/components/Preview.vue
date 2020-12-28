<template>
  <div>
    <div id="leftPreview" class="leftPreview animate__animated animate__faster animate__fadeInLeft"
         @click="closePreview"></div>
    <div id="preview" class="preview animate__animated animate__faster animate__fadeInRight">
      <div class="closePreview" @click="closePreview">
        <i class="fa fa-times"></i>
      </div>
      <div class="phone">
        <div class="smartphone">
          <div class="content">
            <iframe :src="previewURL" style="width:100%;border:none;height:100%"/>
          </div>
        </div>
      </div>
      <div class="details">

        <div class="QRCode">
          <span>Scan QR Code</span>
          <div>
            <div class="code">
              <img :src="QRCode" alt="QR Code">
            </div>
          </div>
          <h4 class="QRNote">
            <i class="fab fa-apple"></i>
            <span> IPhone open you camera and point at the codeTap on the notification to view the story preview </span>
          </h4>
          <h4 class="QRNote">
            <i class="fab fa-android"></i>
            <span> Android use a QR code scanner to view the story preview</span>
          </h4>
          <a target="_blank" :href="previewURL" style="text-decoration: none; display: block; margin: 20px 0">
            <v-btn
                block
                color="white"
                elevation="1"
                large
                outlined
            >
              Preview in Browser
            </v-btn>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preview",

  props: {
    previewURL: undefined,
    QRCode: undefined,
  },

  methods: {
    closePreview() {
      const preview = document.getElementById('preview');
      preview.classList.remove('animate__fadeInRight')
      preview.classList.add('animate__fadeOutRight');
      const leftPreview = document.getElementById('leftPreview');
      leftPreview.classList.remove('animate__fadeInLeft')
      leftPreview.classList.add('animate__fadeOutLeft');

      setTimeout(() => {
        this.$emit('closePreview')
      }, 500)
    }
  }
}
</script>

<style lang="scss">
.preview {
  position: fixed;
  top: 0;
  right: 0;
  width: 50vw;
  min-width: 770px;
  height: 100vh;
  background: #121212;
  z-index: 10000;
  box-sizing: border-box;
  display: flex;

  .phone {
    padding: 50px 20px;
    width: calc(100% - 250px);

    .smartphone {
      position: relative;
      width: 453px;
      height: 822px;
      margin: auto;
      border: 16px #4e4e4e solid;
      border-top-width: 60px;
      border-bottom-width: 60px;
      border-radius: 36px;
    }

    .smartphone:before {
      content: '';
      display: block;
      width: 60px;
      height: 5px;
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #000000;
      border-radius: 10px;
    }

    .smartphone:after {
      content: '';
      display: block;
      width: 35px;
      height: 35px;
      position: absolute;
      left: 50%;
      bottom: -65px;
      transform: translate(-50%, -50%);
      background: #333;
      border-radius: 50%;
    }

    .smartphone .content {
      width: 100%;
      height: 100%;
      background: white;
    }

  }

  .details {
    width: 250px;
    background: black;
    color: white;

    .QRCode {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 250px;
      height: 500px;
      text-align: center;
      font-family: 'Yanone Kaffeesatz', sans-serif;
      letter-spacing: 1px;
      padding: 10px;
      box-sizing: border-box;

      div {
        text-align: center;
        color: white;
        display: flex;
        align-content: center;
        justify-content: center;

        .code {
          padding: 10px;
          background: white;
          border-radius: 10px;
          display: block;
          width: min-content;
          height: min-content;
          margin: 10px;

          img {
            width: 150px;
            height: 150px;
          }
        }

        .QRNote {
          color: white;
        }
      }
    }
  }

  .closePreview {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    background: white;
    border-radius: 5px;
    font-size: 1.5em;
    cursor: pointer;
  }
}

.leftPreview {
  position: fixed;
  top: 0;
  left: 0;
  width: 50vw;
  min-width: calc(100% - 770px);
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10000;
  box-sizing: border-box;
  display: flex;
}
</style>
