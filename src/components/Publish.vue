<template>
<div class="publishMain animate__animated animate__fadeInUp">
  <div class="mainDiv">
    <div>
      <div class="nextStep">
        <button>Next <i class="fa fa-arrow-circle-right"></i></button>
      </div>
      <div>
        <label>
          <span>Title</span>
          <input type="text">
        </label>
        <label>
          <span>Key Words <small>(separate each keyword with a comma)</small></span>
          <input type="text">
        </label>
        <label>
          <span>SEO Description</span>
          <textarea></textarea>
        </label>
        <label>
          <span>Poster images sizes and format are portrait (696x928), landscape (928x696) and square (696x696)</span>
          <span class="uploadImage">click to upload/select an image</span>
        </label>
      </div>
    </div>

    <div>
      <div class="steps">
        <div class="prevStep">
          <button><i class="fa fa-arrow-circle-left"></i> Back</button>
        </div>
        <div class="nextStep">
          <button>Next <i class="fa fa-arrow-circle-right"></i></button>
        </div>
      </div>

      <div class="publishOptions">
        <div>URL</div>
        <div>Share to Social Media</div>
        <div>Iframe Embed</div>
        <div>Widget Embed</div>
        <div>Export to Zip</div>
        <div>Export for Social Media</div>
      </div>
    </div>

    <div>
      <div class="steps">
        <div class="prevStep">
          <button><i class="fa fa-arrow-circle-left"></i> Back</button>
        </div>
      </div>

      <div class="published">
        <div class="urls">
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

        <div class="socialShare">
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

        <div class="iframe">
          <input type="url" disabled="disabled">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "Publish"
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
        width: 200px;
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
        background: black;
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
    }
  }
}
</style>
