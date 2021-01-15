<template>
<div>
<div id="mainAnimatedDiv" class="publishMain animate__animated animate__fadeInUp">
  <div class="overlay" @click="removePublish"></div>
  <div class="mainDiv">
    <div v-if="currentlyViewing === 'firstPage'">
      <div class="nextStep">
        <button @click="currentlyViewing = 'publishOptions'">Next <i class="fa fa-arrow-circle-right"></i></button>
      </div>
      <div>
        <label>
          <span>Title</span>
          <input v-model="$parent.storyTitle" type="text" placeholder="Untitled Story">
        </label>
        <label>
          <span>Author</span>
          <input v-model="$parent.authorName" type="text" placeholder="Author's Name">
        </label>
        <label>
          <span>Key Words <small>(separate each keyword with a comma)</small></span>
          <input v-model="$parent.metaKeywords" type="text">
        </label>
        <label>
          <span>SEO Description</span>
          <textarea v-model="$parent.metaDescription"></textarea>
        </label>
        <label>
          <span>Poster images sizes and format are portrait (696x928), landscape (928x696) and square (696x696)</span>
          <span v-if="!mediaWidgetDetails" @click="showMediaWidget = true" class="uploadImage">click to <br>upload/select <br>an image</span>
          <img v-if="mediaWidgetDetails" @click="showMediaWidget = true" class="uploadImage" :src="mediaWidgetDetails.thumb" alt="">
        </label>
      </div>
    </div>

    <div v-if="currentlyViewing === 'publishOptions'">
      <div class="steps">
        <div class="prevStep">
          <button @click="currentlyViewing = 'firstPage'"><i class="fa fa-arrow-circle-left"></i> Back</button>
        </div>
      </div>

      <div class="publishOptions">
        <div @click="currentlyViewing = 'urlQRCode'">URL</div>
        <div @click="currentlyViewing = 'socialMediaShare'">Share to Social Media</div>
        <div @click="currentlyViewing = 'iframeCode'">Iframe Embed</div>
        <div @click="currentlyViewing = 'widget'">Widget Embed</div>
        <div>Export to Zip</div>
        <div>Export for Social Media</div>
      </div>
    </div>

    <div v-if="currentlyViewing !== 'firstPage' && currentlyViewing !== 'publishOptions'">
      <div class="steps">
        <div class="prevStep">
          <button @click="currentlyViewing = 'publishOptions'"><i class="fa fa-arrow-circle-left"></i> Back</button>
        </div>
      </div>

      <div class="published">
        <div v-if="currentlyViewing === 'urlQRCode'" class="urls">
          <div>
            <span>Short URL</span>
            <div>
              <span id="shortUrl">http://sto.ri/ry3jg4</span>
              <button><i class="fa fa-copy"></i> Copy</button>
            </div>
          </div>
          <div>
            <span>Short URL</span>
            <div>
              <span id="longUrl">http://sto.ri/ry3jg4</span>
              <button><i class="fa fa-copy"></i> Copy</button>
            </div>
          </div>
          <div>
            <span>Use Custom URL</span>
            <label>
              <input id="customURL" style="width: auto">
            </label>
          </div>

          <div class="QRCodeDownload">
            <div>QR Code will show up here</div>
            <button>Download QR Code</button>
          </div>

        </div>

        <div v-if="currentlyViewing === 'socialMediaShare'" class="socialShare">
          <a href="#">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="#">
            <i class="fab fa-whatsapp"></i>
          </a>
          <a href="#">
            <i class="fab fa-telegram"></i>
          </a>
        </div>

        <div v-if="currentlyViewing === 'iframeCode'" class="iframe">
          <div>
            <input id="iframeCode" disabled value="http://sto.ri/ry3jg4">
            <button><i class="fa fa-copy"></i> Copy</button>
          </div>
        </div>

        <div v-if="currentlyViewing === 'widget'" class="widget">
          <div>
            <label>
              <span>Title</span>
              <input type="text">
            </label>
            <label>
              <span>Sub title</span>
              <input type="text">
            </label>
          </div>
          <div>
            <label>
              <span>Logo URL</span>
              <input v-model="logoURL" type="url">
            </label>
            <img :src="logoURL" alt="Logo" style="position: relative; width: auto; height: 70px">
          </div>

          <div style="display: block; margin-top: 20px">
            <span>Select widget position</span>
            <div class="select">
              <label>
                <input v-model="widgetPosition" type="radio" value="topLeft">
                <span>Top left</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="topRight">
                <span>Top right</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="bottomLeft">
                <span>Bottom left</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="bottomRight">
                <span>Bottom right</span>
              </label>
            </div>
          </div>

          <div style="display: block; margin-top: 20px">
            <span>Select widget type</span>
            <div class="select">
              <label>
                <input v-model="widgetPosition" type="radio" value="circle">
                <span>Circle</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="square">
                <span>Square</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="bottomBar">
                <span>Bottom bar</span>
              </label>
            </div>
          </div>

          <div style="display: block; margin-top: 20px">
            <span>Select widget size</span>
            <div class="select">
              <label>
                <input v-model="widgetPosition" type="radio" value="desktop">
                <span>Desktop</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="mobile">
                <span>Mobile</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="fullScreen">
                <span>Full screen</span>
              </label>
            </div>
          </div>

          <div style="display: block; margin-top: 20px">
            <span>Select widget animation <small>(No animation for bottom bar widget)</small></span>
            <div class="select">
              <label>
                <input v-model="widgetPosition" type="radio" value="none">
                <span>None</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="zooming">
                <span>Zooming</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="shakingY">
                <span>Shaking - Y</span>
              </label>

              <label>
                <input v-model="widgetPosition" type="radio" value="shakingX">
                <span>Shaking - X</span>
              </label>
            </div>
          </div>

          <div style="flex-wrap: wrap">
            <div style="width: 100%;">Copy widget code</div>
            <div style="width: 100%; display: flex">
              <input id="widgetCode" disabled value="http://sto.ri/ry3jg4">
              <button><i class="fa fa-copy"></i> Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div>
  <media v-if="showMediaWidget === true"></media>
</div>
</div>

</template>

<script>
import Media from '@/components/Media';

export default {
name: "Publish",
data() {
  return {
    showMediaWidget: undefined,
    mediaWidgetDetails: undefined,
    currentlyViewing: 'firstPage',
    // Widget Values
    logoURL: '',
    widgetTitle: '',
    widgetSubTitle: '',
    widgetPosition: '',
  }
},

components: {
  media: Media
},

methods: {
  removePublish() {
    const div = document.getElementById('mainAnimatedDiv')
    div.classList.remove('animate__fadeInUp')
    div.classList.add('animate__fadeOutDown')

    setTimeout(() => {
      this.$parent.isPublishing = false
    }, 600)
  }

}
}
</script>

<style lang="scss">
.publishMain {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.9);
  z-index: 3000;

  .mainDiv {
    width: 65%;
    max-width: 1050px;
    height: 80%;
    background: #1B1C1E;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 50px;
    color: #a5d1e7;
    overflow-y: auto;
    z-index: 4000;

    .steps {
      display: flex;
      justify-content: space-between;

      .prevStep {
        display: flex;
        justify-content: flex-start;

        button {
          padding: 10px;
          background: #0a81be;
          color: white;
          border-radius: 5px;
          border: none;
          width: 100px;
          outline: none;
        }
      }

    }

    .nextStep {
      display: flex;
      justify-content: flex-end;

      button {
        padding: 10px;
        background: #0a81be;
        color: white;
        border-radius: 5px;
        border: none;
        width: 100px;
        outline: none;
      }
    }

    label {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 20px auto;
      span {
        display: block;
      }
      input, textarea {
        display: block;width: 100%;
        height: 50px;
        border: solid 1px #a5d1e7;
        border-radius: 5px;
        outline: none;
        padding: 5px;
        color: #a5d1e7;
        font-size: 1.2em;

        &:focus {
          box-shadow: 0 0 5px #a5d1e7;
        }
      }
      .uploadImage {
        display: block;
        align-self: center;
        width: auto;
        height: 150px;
        border: 1px solid #a5d1e7;
        border-radius: 10px;
        margin: 20px;
        padding: 20px;
        font-size: 1.2em;
        text-align: center;
        cursor: pointer;
      }
    }

    .publishOptions {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      width: 100%;
      margin: 50px auto;

      div {
        width: 30%;
        height: 200px;
        background: #0b0b0b;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-align: center;
      }
    }

    .published {
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 0 5%;
      margin: 50px auto;

      .urls {
        align-items: center;
        width: 90%;
        height: max-content;
        border: 1px solid #a5d1e7;
        border-radius: 10px;
        padding: 50px;

        >div {
          margin-bottom: 20px;
          div {
            display: flex;
            span {
              border: 0.5px solid #a5d1e7;
              border-radius: 5px;
              padding: 5px;
              flex-grow: 1;
            }

            button {
              margin: auto 10px;
              padding: 5px 10px;
              border: none;
              border-radius: 5px;
              background: #0a81be;
              color: white;
              outline: none;

              &:focus {
                background: black;
              }
            }
          }
        }

        .QRCodeDownload {
          display: flex;
          align-items: center;
          flex-direction: column;

          button {
            margin: auto 10px;
            padding: 5px 50px;
            border: none;
            border-radius: 5px;
            background: #0a81be;
            color: white;
            outline: none;

            &:focus {
              background: black;
            }
          }
        }
      }

      .socialShare {
        align-items: center;
        width: 90%;
        height: max-content;
        border: 1px solid #a5d1e7;
        border-radius: 10px;
        padding: 50px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px 100px;
        margin-top: 80px;

        a {
          width: 100px;
          height: 100px;
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          background: #100f0f;
          &:hover {
            background: black;
            border-radius: 5%;
            transition: border-radius 200ms linear, background-color 200ms linear;
          }
        }
      }

      .iframe {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        height: max-content;
        border: 1px solid #a5d1e7;
        border-radius: 10px;
        padding: 50px;
        margin-top: 100px;

        div {
          display: flex;
          width: 100%;

          input {
            flex: 1 1 100%;
            border: 1px solid #a5d1e7;
            border-radius: 5px;
            padding: 10px;
            color: #a5d1e7;
            font-size: 1.2em;
            outline: none;
          }

          button {
            margin: auto 10px;
            padding: 10px 20px;
            width: 150px;
            border: none;
            border-radius: 5px;
            background: #0a81be;
            color: white;
            outline: none;

            &:focus {
              background: black;
            }
          }
        }
      }

      .widget {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 90%;
        height: max-content;
        border: 1px solid #a5d1e7;
        border-radius: 10px;
        padding: 50px;

        > div {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 20px;

          .select {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            label {
              display: flex;
              align-items: center;
              flex-direction: row;
              width: auto;
              input {
                flex: none;
                display: inline;
                width: auto;
                height: auto;
                border: solid 1px #a5d1e7;
                outline: none;
                color: #a5d1e7;
                margin: auto 5px;
                &:focus {
                  border-radius: 100%;
                  background-color: rgba(0,0,0,0);
                }
              }

              span {
                display: flex;
              }
            }
          }

          input {
            flex: 1 1 100%;
            border: 1px solid #a5d1e7;
            border-radius: 5px;
            padding: 10px;
            color: #a5d1e7;
            font-size: 1.2em;
            outline: none;
          }

          button {
            margin: auto 10px;
            padding: 10px 20px;
            width: 150px;
            border: none;
            border-radius: 5px;
            background: #0a81be;
            color: white;
            outline: none;

            &:focus {
              background: black;
            }
          }
        }
      }

    }
  }
}
.overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
</style>
