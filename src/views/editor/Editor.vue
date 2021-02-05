<template>
  <main>
    <header>
      <div class="leftHeader">
        <img src="../../assets/images/home/logo.svg" alt="Stori"/>
        <label class="title">
          <input v-model="storyTitle" type="text" id="title" placeholder="Untitled Story">
        </label>
      </div>
      <div class="rightHeader">
        <div class="publish" @click="publish">PUBLISH</div>
        <div class="workspaceName">
          <img alt="" class="workIcon" src="../../assets/images/home/work-icon.svg"/>
          <div>
            <div>WORKSPACE</div>
            <div>Artculture BMC</div>
          </div>
          <img alt="" class="downIcon" src="../../assets/images/home/drop-down.svg"/>
        </div>
        <div>
          <img src="../../assets/images/home/sun.svg" alt=""/>
          <img src="../../assets/images/home/notification.svg" alt=""/>
          <img src="../../assets/images/home/user.svg" alt=""/>
        </div>
      </div>
    </header>
    <div class="main">
      <div class="leftPanel">
        <nav>
          <div :class="{active: activeMedia === 'uploadedMedia'}" @click="getUploadedMedia">
            <img src="../../assets/images/editor/upload.svg" alt="Upload">
          </div>
          <div :class="{active: activeMedia === 'text'}" @click="activeMedia = 'text'">
            <img src="../../assets/images/editor/text.svg" alt="Text">
          </div>
          <div :class="{active: activeMedia === 'unsplashPhotos'}" @click="activeMedia = 'unsplashPhotos'">
            <img src="../../assets/images/editor/image.svg" alt="Image">
          </div>
          <div :class="{active: activeMedia === 'pexelsVideo'}" @click="getPexelsVideos">
            <img src="../../assets/images/editor/video.svg" alt="Video">
          </div>
<!--          <div :class="{active: activeMedia === 'tenorGifs'}" @click="getTenorGifs">-->
<!--            <i class="fas fa-hand-sparkles"></i>-->
<!--            <span>Gifs</span>-->
<!--          </div>-->
          <div :class="{active: activeMedia === 'callToActionButtons'}" @click="activeMedia = 'callToActionButtons'">
            <img src="../../assets/images/editor/button.svg" alt="Button">
          </div>

          <div :class="{active: activeMedia === 'emojis'}" @click="getEmoji">
            <img src="../../assets/images/editor/elements.svg" alt="Elements">
          </div>

          <div :class="{active: activeMedia === 'background'}" @click="activeMedia = 'background'">
            <img src="../../assets/images/editor/background.svg" alt="Background">
          </div>

          <div :class="{active: activeMedia === 'interactivePanel'}" @click="activeMedia = 'interactivePanel'">
            <img src="../../assets/images/editor/background.svg" alt="Background">
          </div>


        </nav>
        <media-panel v-if="activeMedia === 'unsplashPhotos'"></media-panel>
        <div class="unsplashPhotos" v-if="activeMedia === 'uploadedMedia'">
          <masonry
            :cols="2"
            :gutter="5"
            >
            <div class="masonry-grid-item" v-for="(photo, index) in uploadedMedia" :key="index">
              <img draggable="true" @mousedown="drag($event)"
               :src="'https://' + photo.file" :data-src="'https://' + photo.file" alt="cool">
            </div>
          </masonry>
        </div>

        <div class="unsplashPhotos" v-if="activeMedia === 'pexelsVideo'">
          <img draggable="true" @mousedown="drag($event)" v-for="(video, index) in pexelsVideo" :key="index"
               :src="video.video_pictures[0].picture" :data-src="video.video_files[0].link" alt="">
        </div>
        <div class="unsplashPhotos" v-if="activeMedia === 'callToActionButtons'">
          <div style="display: flex; justify-content: space-around; flex-wrap: wrap">
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: yellow; color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: #0035b1; color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: #81000f; color: #f1e2e2; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: #0c6d00; color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: #ff7a00; color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: #eb06f1; color: #f1e6e6; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: #001d3b; color: #e0e4ec; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: #3fa501; color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(234,30,19), rgb(244,176,0)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(234,0,120), rgb(204,139,244)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(10,0,234), rgb(155,54,244)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(10,234,22), rgb(229,244,118)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(98, 0, 234), rgb(3, 169, 244)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(234,221,9), rgb(3, 169, 244)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(234,179,181), rgb(143,244,197)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(183,234,57), rgb(233,96,244)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(54,133,34), rgb(182,244,49)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(116,234,60), rgb(51,111,244)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(231,79,234), rgb(107,133,244)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(0,0,0), rgb(255,255,255)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(0,17,150), rgb(255,255,255)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(234,0,16), rgb(255,255,255)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(0,127,3), rgb(255,255,255)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(150,0,107), rgb(255,255,255)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(234,75,88), rgb(244,238,153)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(98, 0, 234), rgb(3, 169, 244)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(206,234,228), rgb(244,121,45)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(114,173,234), rgb(195,244,84)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(234,79,214), rgb(37,244,152)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(47,60,234), rgb(103,244,50)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(232,234,82), rgb(244,167,79)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(234,0,2), rgb(0,10,244)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(87,234,149), rgb(43,60,39)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>
            <div style="display: flex; margin: 5px; width: 145px; height: 145px; justify-content: center; align-items: center; background: rgba(0,0,0,0.1)">
              <a draggable="true" @mousedown="drag($event)" style="display: flex; justify-content: center; align-items: center; text-decoration: none; background: linear-gradient(90deg, rgb(150,137,53), rgb(93,191,111)); color: black; width: max-content; padding: 10px 20px; border-radius: 10px">
                Button
              </a>
            </div>

          </div>
        </div>
        <div class="unsplashPhotos emojiPanel" v-if="activeMedia === 'emojis'">
          <span draggable="true" @mousedown="drag($event)" style="font-size: 3em; height: 100px"
                v-for="(emoji, index) in emojis" :key="index">{{ emoji.character }}</span>
        </div>
        <div class="background" v-if="activeMedia === 'background'">
          <div class="tabRow">
            <div @click="activeBackgroundType = 'colour'" :class="{active: activeBackgroundType === 'colour'}">Colour</div>
            <div @click="activeBackgroundType = 'gradient'" :class="{active: activeBackgroundType === 'gradient'}">Gradient</div>
            <div @click="getUnsplashTexture" :class="{active: activeBackgroundType === 'texture'}">Texture</div>
          </div>
          <div>Default Colours</div>
          <div v-if="activeBackgroundType === 'colour'">
            <div class="colourBox">
              <span @click="changPageBackground" style="background: #000000"></span>
              <span @click="changPageBackground" style="background: #545454"></span>
              <span @click="changPageBackground" style="background: #737373"></span>
              <span @click="changPageBackground" style="background: #A6A6A6"></span>
              <span @click="changPageBackground" style="background: #D9D9D9"></span>
              <span @click="changPageBackground" style="background: #FFFFFF"></span>

              <span @click="changPageBackground" style="background: #ff0502"></span>
              <span @click="changPageBackground" style="background: #ff6e7c"></span>
              <span @click="changPageBackground" style="background: #ff955e"></span>
              <span @click="changPageBackground" style="background: #ff8b8b"></span>
              <span @click="changPageBackground" style="background: #ff0850"></span>
              <span @click="changPageBackground" style="background: #851f1f"></span>

              <span @click="changPageBackground" style="background: #04ff00"></span>
              <span @click="changPageBackground" style="background: #36ff83"></span>
              <span @click="changPageBackground" style="background: #4affd5"></span>
              <span @click="changPageBackground" style="background: #1d9722"></span>
              <span @click="changPageBackground" style="background: #b1ff26"></span>
              <span @click="changPageBackground" style="background: #738d03"></span>

              <span @click="changPageBackground" style="background: #fffe00"></span>
              <span @click="changPageBackground" style="background: #eaff41"></span>
              <span @click="changPageBackground" style="background: #ffd84e"></span>
              <span @click="changPageBackground" style="background: #bebe14"></span>
              <span @click="changPageBackground" style="background: #fff885"></span>
              <span @click="changPageBackground" style="background: #ffea4a"></span>

              <span @click="changPageBackground" style="background: #000eff"></span>
              <span @click="changPageBackground" style="background: #5ab6ff"></span>
              <span @click="changPageBackground" style="background: #7462ff"></span>
              <span @click="changPageBackground" style="background: #0a81be"></span>
              <span @click="changPageBackground" style="background: #61c4ff"></span>
              <span @click="changPageBackground" style="background: #7b10ff"></span>

              <span @click="changPageBackground" style="background: #ff00ad"></span>
              <span @click="changPageBackground" style="background: #ff87f8"></span>
              <span @click="changPageBackground" style="background: #ff6398"></span>
              <span @click="changPageBackground" style="background: #d483ff"></span>
              <span @click="changPageBackground" style="background: #ffbee8"></span>
              <span @click="changPageBackground" style="background: #ff0a79"></span>
            </div>
            <div class="colourPickerBox">
              <div>
                Choose a colour:
              </div>
              <div>
                <label class="colourText">
                  <input type="text" v-model="pageBackground">
                </label>
                <label class="colourPicker">
                  <input v-model="pageBackground" type="color">
                </label>
              </div>
            </div>
          </div>

          <div v-if="activeBackgroundType === 'gradient'">
            <div class="colourBox">
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,30,19), rgb(244,176,0))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,0,120), rgb(204,139,244))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(10,0,234), rgb(155,54,244))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(10,234,22), rgb(229,244,118))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(98, 0, 234), rgb(3, 169, 244))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,221,9), rgb(3, 169, 244))"></span>

              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,179,181), rgb(143,244,197))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(183,234,57), rgb(233,96,244))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(54,133,34), rgb(182,244,49))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(116,234,60), rgb(51,111,244))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(231,79,234), rgb(107,133,244))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,227,229), rgb(244,0,9))"></span>

              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(0,0,0), rgb(255,255,255))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(0,17,150), rgb(255,255,255))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,0,16), rgb(255,255,255))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(0,127,3), rgb(255,255,255))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(150,0,107), rgb(255,255,255))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(115,0,203), rgb(255,255,255))"></span>

              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,75,88), rgb(244,238,153))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(98, 0, 234), rgb(3, 169, 244))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(206,234,228), rgb(244,121,45))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(114,173,234), rgb(195,244,84))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,79,214), rgb(37,244,152))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,111,94), rgb(244,177,191))"></span>

              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(47,60,234), rgb(103,244,50))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(232,234,82), rgb(244,167,79))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,0,2), rgb(0,10,244))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(87,234,149), rgb(43,60,39))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(150,137,53), rgb(93,191,111))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(67,234,220), rgb(122,83,93))"></span>

              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(35,52,82), rgb(244,241,38))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(0,234,7), rgb(20,20,20))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(229,54,234), rgb(244,187,40))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(234,23,45), rgb(146,244,83))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(72,225,234), rgb(198,104,244))"></span>
              <span @click="changPageBackground" style="background: linear-gradient(90deg, rgb(86,234,28), rgb(19,106,244))"></span>
            </div>

            <div style="text-align: center; margin: 20px">
              <button style="cursor: pointer" @click="isCustomGradient = true"> <i class="fa fa-plus"></i>Add Gradient</button>
            </div>

            <div v-if="isCustomGradient === true">
              <div class="selectColours">
                <div class="selectColoursTitle">Select Colours</div>
                <div>
                  <div>
                    <label class="colourText">
                      <input type="text" v-model="customColour1">
                    </label>
                    <label class="colourPicker">
                      <input v-model="customColour1" type="color">
                    </label>
                  </div>
                  <label>
                    <input type="range" v-model="colourPercentage" min="" max="100">
                  </label>
                  <div>
                    <label class="colourText">
                      <input type="text" v-model="customColour2">
                    </label>
                    <label class="colourPicker">
                      <input v-model="customColour2" type="color">
                    </label>
                  </div>
                </div>
              </div>

              <div class="colourType">
                <div>
                  <label>
                    <small>Type:</small>
                    <select v-model="customGradientType">
                      <option value="linear-gradient">linear gradient</option>
                      <option value="radial-gradient">radial gradient</option>
                    </select>
                  </label>
                </div>

                <div>
                  <label v-if="customGradientType === 'radial-gradient'">
                    <small>Radia Shape:</small>
                    <select v-model="radiaShape">
                      <option value="circle">Circle</option>
                      <option value="ellipse">Ellipse</option>
                    </select>
                  </label>
                  <label v-if="customGradientType === 'linear-gradient'">
                    <small>Degree:</small>
                    <input type="number" v-model="customDegree" min="0" max="360">
                  </label>

                </div>

              </div>
            </div>
          </div>

          <div v-if="activeBackgroundType === 'texture'" class="texture">
            <div class="textureList" v-if="backgroundTexture.length > 0">
              <img @click="changPageBackground($event, true)" draggable="false" v-for="(texture, index) in backgroundTexture" :key="index"
                   :src="texture.urls.thumb" :alt="texture.alt_description">
            </div>
            <div class="backgroundSettings">
              <label>
                <input type="checkbox" @change="changPageBackground">
                <span>Repeat</span>
              </label>
            </div>
          </div>

        </div>
        <div class="unsplashPhotos" v-if="activeMedia === 'text'">
          <text-panel></text-panel>
        </div>

        <InteractivePanel  v-if="activeMedia === 'interactivePanel'"></InteractivePanel>

      </div>
      <div class="editor">
        <div>
          <div>
            <div class="pageNavigation">
              <div v-for="(index) in pages.length" :key="index" class="pageNav" :class="{active: currentPageNumber === (index - 1)}" @click="viewPage(index - 1)"></div>
            </div>
            <div class="page" ref="page" id="page" @drop="drop($event)" :style="{background: this.isCustomGradient === false ? this.pageBackground : `${this.customGradientType}(${ this.customGradientType !== 'radial-gradient' ? this.customDegree + 'deg' : radiaShape }, ${this.customColour1} ${' ' + this.colourPercentage + '%'}, ${this.customColour2} ${' ' + 100 - this.colourPercentage + '%'})`}" @dragover.prevent @dragenter.prevent>
<!--              <Moveable-->
<!--                class="moveable"-->
<!--                v-bind="moveable"-->
<!--                @drag="handleDrag"-->
<!--                @resize="handleResize"-->
<!--                @scale="handleScale"-->
<!--                @rotate="handleRotate"-->
<!--                @warp="handleWarp"-->
<!--                @pinch="handlePinch"-->
<!--              >-->
<!--                <span>Vue Moveable</span>-->
<!--              </Moveable>-->

            </div>

            <div class="pageBottomControl">
              <img style="width: 30px" @click="viewPage(currentPageNumber - 1)" src="../../assets/images/editor/arrow-left.svg" alt="">
              <span>Page {{currentPageNumber + 1}}</span>
              <img @click="addNewPage('before')" src="../../assets/images/editor/pluse.svg" alt="">
              <img @click="deleteCurrentPage()" src="../../assets/images/editor/garbage.svg" alt="">
              <img src="../../assets/images/editor/play-circle.svg" alt="">
              <img @click="copyCurrentPage" src="../../assets/images/editor/copy.svg" alt="">
<!--              <img src="../../assets/images/editor/overlayNav.svg" alt="">-->
              <img @click="addNewPage('after')" src="../../assets/images/editor/pluse.svg" alt="">
              <img style="width: 30px" @click="viewPage(currentPageNumber + 1)" src="../../assets/images/editor/arrow-right.svg" alt="">
            </div>
            <button class="previewButton" @click="preview()"><i class="fas fa-play"></i></button>
            <button class="newPageButton" @click="addNewPage"><i class="fa fa-plus"></i></button>
          </div>
<!--          <footer>-->
<!--            <button @click="preview()">Preview</button>-->
<!--            <button @click="addNewPage">Add New Page</button>-->
<!--            &lt;!&ndash;          <select name="" id="">&ndash;&gt;-->

<!--            &lt;!&ndash;          </select>&ndash;&gt;-->
<!--          </footer>-->
        </div>
        <aside>
          <v-expansion-panels>
            <animations
                v-if="selectedElement.type"
                v-bind:selectedElement="selectedElement"
            ></animations>
            <image-editor
                v-if="selectedElement.type === 'image'"
                v-bind:selectedElement="selectedElement"
                v-bind:selectedImageSrc="selectedImageSrc"
            ></image-editor>
            <InteractiveEditor
                v-if="selectedElement.type === 'interactivePanel'"
                v-bind:selectedElement="selectedElement"
            ></InteractiveEditor>
            <text-editor
                v-if="selectedElement.type === 'text'"
                v-bind:selectedElement="selectedElement"
                v-bind:textSize="fontSize"
            ></text-editor>
            <callToActionButtons
                v-if="selectedElement.type === 'callToActionButtons'"
                v-bind:selectedElement="selectedElement"
                v-bind:selectedButtonData="selectedButtonData"
            ></callToActionButtons>
          </v-expansion-panels>

        </aside>
      </div>
    </div>

  <stori-preview @closePreview="() => {this.previewURL = undefined}" v-if="previewURL" :previewURL="previewURL" :QRCode="QRCode"></stori-preview>
  <publish v-if="isPublishing === true"></publish>
  </main>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import VueMasonry from 'vue-masonry-css'
// import Moveable from 'vue-moveable';
import Text from '@/components/Text';
import MediaPanel from '@/components/MediaPanel';
import TextEditor from '@/components/TextEditor';
import ImageEditor from "@/components/ImageEditor";
import Preview from "@/components/Preview";
import Animations from "@/components/Animations";
import CallToActionButtons from "@/components/CallToActionButtons";
import InteractivePanel from "@/components/InteractivePanel";
import InteractiveEditor from "@/components/InteractiveEditor";
import Publish from "@/components/Publish";


export default {
  name: "Editor",

  data() {
    return {
      pages: [],
      currentPageNumber: undefined,
      isPublishing: false,
      moveable: {
        draggable: true,
        throttleDrag: 0,
        resizable: false,
        throttleResize: 1,
        keepRatio: false,
        scalable: true,
        throttleScale: 0,
        rotatable: true,
        throttleRotate: 0,
        pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
        origin: false,
      },
      // Meta Data Start
      storyTitle: '',
      metaKeywords: '',
      authorName: '',
      metaDescription: '',
      // Meta Data Ends
      authToken: `Bearer ${localStorage.getItem('authToken')}`,
      baseUrl: process.env.VUE_APP_baseUrl,
      activeMedia: 'unsplashPhotos',
      dataState: {},
      draggedElement: null,
      nextSibling: null,
      uploadedMedia: [],
      pexelsVideo: [],
      emojis: [],
      clipboard: null,
      selectedElement: {type: undefined, id: undefined},
      selectedButtonData: {title: undefined, url: undefined},
      pageBackground: '#ffffff',
      activeBackgroundType: 'colour',
      backgroundTexture: [],
      isCustomGradient: false,
      customColour1: '#ffffff',
      customColour2: '#ffffff',
      colourPercentage: '0',
      customDegree: 90,
      customGradientType: 'linear-gradient',
      radiaShape: 'circle',
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
      previewURL: undefined,
      QRCode: undefined,

      // Font Variables
      fontSize: undefined,

      // Image Variables
      selectedImageSrc: undefined
    }
  },

  beforeCreate() {
    console.log('RRRRRRRRRRRRRRR: ', this.$route.params.id)
  },

  mounted() {
    if (this.$route.params.id) {
      axios.get(`${this.baseUrl}stories/${this.$route.params.id}`).then(res => {
        const htmlCode =  res.data.data.file;
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = htmlCode.replaceAll('\\', '')
        const allPages = tempDiv.getElementsByTagName("section")
        allPages.forEach((page, index) => {
          const mainPage = document.getElementById('page')
          mainPage.style.background = page.style.background;
          mainPage.innerHTML = page.innerHTML;
          const pageElements = mainPage.children
          pageElements.forEach(element => {
            console.log('RRRRRRRRRRRRRRRR: ', element.constructor.name)
            element.addEventListener('click', () => {
              switch (element.constructor.name) {
                case 'HTMLImageElement': this.selectElement('image', element.id); break;
                case 'HTMLDivElement': this.selectElement('text', element.id); break;
                case 'HTMLButtonElement': {
                  this.$store.commit('setSelectedButton', {
                    title: element.innerHTML.trim(),
                    url: element.getAttribute('data-href').trim(),
                    background: element.style.background.trim(),
                    textColour: element.style.color.trim(),
                  });
                  this.selectElement('callToActionButtons', element.id);
                  this.selectedButtonData = {title: element.innerHTML, url: element.getAttribute('data-href')}
                  break;
                }
                case 'HTMLVideoElement': this.selectElement('video', element.id); break;
              }
            })
          })
          if (index !== (allPages.length - 1)) {
            this.addNewPage();
          }
          this.updatePageStructure()
        })
        this.viewPage(0)
      })
    }

    this.currentPageNumber = 0;
    this.updatePageStructure();

    Vue.use(VueMasonry);

    let position = {x: 0, y: 0}
    // eslint-disable-next-line no-undef
    interact('.resize-drag')
        .resizable({
          // resize from all edges and corners
          edges: {left: true, right: true, bottom: true, top: true},
          margin: 10,

          listeners: {
            move(event) {
              var target = event.target
              var x = (parseFloat(target.getAttribute('data-x')) || 0)
              var y = (parseFloat(target.getAttribute('data-y')) || 0)

              // update the element's style
              // (event.dx / 421.641) * 100
              target.style.width = ((event.rect.width / 421.641) * 100) + '%'
              target.style.height = ((event.rect.height / 702.75) * 100) + '%'

              // translate when resizing from top or left edges
              x += event.deltaRect.left
              y += event.deltaRect.top

              target.style.webkitTransform = target.style.transform =
                  'translate(' + x + 'px,' + y + 'px)'

              target.setAttribute('data-x', x)
              target.setAttribute('data-y', y)
              target.width = target.getBoundingClientRect().width
              target.height = target.getBoundingClientRect().height


              // position.x += (event.dx / 421.641) * 100
              // position.y += (event.dy / 702.75) * 100

              // event.target.dataset.x = position.x
              // event.target.dataset.y = position.y

              // event.target.style.left = position.x + '%';
              // event.target.style.top = position.y + '%';
              // target.translationX('-50%')
              // target.translationY('-50%')
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
              min: {width: 100, height: 50}
            })
          ],

          inertia: true
        })
        .draggable({
          listeners: {
            start(event) {
              if (event.target.getAttribute('data-x')) {
                console.log('WWWWWWWWWWW', event.target.getAttribute('data-x'));
                position = {
                  x: Number(event.target.getAttribute('data-x')),
                  y: Number(event.target.getAttribute('data-y'))
                }
              }
            },
            end(event) {
              console.log('QQQQQQQQQQQQQQQQ', event);
              // position = { x: 0, y: 0 }
            },
            move(event) {
              position.x += (event.dx / 421.641) * 100
              position.y += (event.dy / 702.75) * 100

              event.target.dataset.x = position.x
              event.target.dataset.y = position.y

              event.target.style.left = position.x + '%';
              event.target.style.top = position.y + '%';
            },
          }
        })

    document.getElementById('page').addEventListener('contextmenu', e => {
      e.preventDefault()
      if (document.getElementById('contextmenu')) {
        document.getElementById('contextmenu').remove()
      }
      window.addEventListener('click', (event) => {
        document.getElementById('contextmenu').remove()
        event.stopImmediatePropagation()
      })

      const menu = document.createElement('div');
      const menuHTMLCode = `<div>
                                <div>Copy</div>
                                <div>Past</div>
                                <div>Delete</div>
                                <div>Send to Back</div>
                                <div>Send Backward</div>
                                <div>Bring Farword</div>
                                <div>Bring to Front</div>
                            </div>`
      menu.classList.add('contextmenu')
      menu.id = 'contextmenu';
      menu.style.left = e.offsetX + 'px';
      menu.style.top = e.offsetY + 'px';
      menu.innerHTML = menuHTMLCode;

      document.getElementById('page').appendChild(menu);

      console.log('QQQQQQQQQQQQ: ', e)

    })

    this.save()
  },

  methods: {
    handleDrag({ target, transform }) {
      console.log('onDrag left, top', transform);
      target.style.transform = transform;
    },
    handleResize({
      target, width, height, delta,
    }) {
      console.log('onResize', width, height);
      delta[0] && (target.style.width = `${width}px`);
      delta[1] && (target.style.height = `${height}px`);
    },
    handleScale({ target, transform, scale }) {
      console.log('onScale scale', scale);
      target.style.transform = transform;
    },
    handleRotate({ target, dist, transform }) {
      console.log('onRotate', dist);
      target.style.transform = transform;
    },
    handleWarp({ target, transform }) {
      console.log('onWarp', transform);
      target.style.transform = transform;
    },
    handlePinch({ target }) {
      console.log('onPinch', target);
    },


    getUnsplashTexture() {
      this.activeBackgroundType = 'texture'
      axios.get('https://api.unsplash.com/search/photos?per_page=20&client_id=e72d3972ba3ff93da57a4c0be4f0b7323346c136b73794e2a01226216076655b&query=texture')
        .then(res => {
          this.backgroundTexture = res.data.results;
          console.log(this.backgroundTexture)
        })

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

    allowDrop({target, transform}) {
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
        element.parentNode.parentNode.parentNode.style.zIndex = highestIndex + 1;
      })
    },

    selectElement(type, id) {
      this.selectedElement = {type, id}
    },

    drop(evt) {
      // evt.preventDefault();
      console.log(evt)

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

        if (this.activeMedia === 'text') {
          console.log('I am here');
          console.log('I am here', this.draggedElement);
          const text = this.draggedElement.cloneNode(true);
          text.style = 'color: #202125; position: absolute; min-width: 100px; min-height: 50px';
          text.style.top = (evt.pageY - document.getElementById('page').offsetTop) + 'px';
          text.style.left = (evt.pageX - document.getElementById('page').offsetLeft) + 'px';
          text.classList.add('resize-drag')
          text.classList.add('animate__animated')
          text.classList.add('textEdit')
          text.id = new Date().toISOString();
          text.ref = new Date().toISOString();
          setTimeout(() => {
            text.dataset.x = ((evt.pageX - document.getElementById('page').offsetLeft) / 421.641) * 100
            text.dataset.y = ((evt.pageY - document.getElementById('page').offsetTop) / 702.75) * 100
          }, 500)
          text.addEventListener('click', () => {
            this.selectElement('text', text.id)
          })
          text.ondblclick = () => {
            text.contentEditable = true
          }
          text.onblur = () => {
            text.contentEditable = false
          }

          console.log('QQQQQQQQQQQQQQ:', text.getAttribute('data-type'))

          switch (text.getAttribute('data-type')) {
            case 'heading': {
              text.style.fontWeight = '600'
              text.style.fontSize = '35px'
              text.style.lineHeight = '1.4'
            } break;
            case 'subheading': {
              text.style.fontWeight = '500'
              text.style.fontSize = '23px'
              text.style.lineHeight = '1.4'
            } break;
            case 'normal': {
              text.style.fontSize = '11px'
              text.style.lineHeight = '1.4'
            } break;

          }

          setTimeout(() => {
            text.width = text.getBoundingClientRect().width
            text.height = text.getBoundingClientRect().height
          }, 100)
          text.classList.add('resize-drag')

          // Update Editing Values
          this.fontSize = text.style.fontSize.replace('px', '')
          console.log('QQQQQQQQQQQQQQQ: ', text.style.fontSize.replace('px', ''))
          div = text;
        }
        else if (this.activeMedia === 'unsplashPhotos' || this.activeMedia === 'uploadedMedia') {
          console.log('QQQQQQQQQQQQQ', this.draggedElement)
          const photo = this.draggedElement.cloneNode(true)
          photo.id = new Date().toISOString();

          photo.style = 'width: 180px; height: auto; position: absolute';
          photo.style.top = (((evt.pageY - document.getElementById('page').offsetTop) / 702.75) * 100) + '%';
          photo.style.left = (((evt.pageX - document.getElementById('page').offsetLeft) / 421.641) * 100 )+ '%';
          const thumbnail = photo.src;
          photo.src = photo.dataset.src;
          photo.dataset.src = thumbnail;
          photo.addEventListener('click', () => {
            this.selectElement('image', photo.id)
            this.selectedImageSrc = photo.src
            this.alwaysOnTop(photo);
            console.log(photo)
          })
          photo.classList.add('resize-drag')
          photo.classList.add('animate__animated')
          setTimeout(() => {
            photo.style.width = ((photo.getBoundingClientRect().width / 421.641) * 100 )+ '%';
            photo.style.height = ((photo.getBoundingClientRect().height / 702.75) * 100 )+ '%';
            photo.dataset.x = ((evt.pageX - document.getElementById('page').offsetLeft) / 421.641) * 100
            photo.dataset.y = ((evt.pageY - document.getElementById('page').offsetTop) / 702.75) * 100
            photo.removeAttribute('data-src');
          }, 500)

          photo.setAttribute('data-x', '');
          photo.setAttribute('data-y', '');

          // photo.onclick = this.resizeElement(div.children[0].id, '.resizers')
          div = photo
        }
        else if (this.activeMedia === 'callToActionButtons') {
          // console.log('I am here', evt.pageX);
          // console.log('I am here', document.getElementById('page').offsetLeft);
          // console.log('I am here', (evt.pageX - document.getElementById('page').offsetLeft));
          // console.log('I am here', (((evt.pageX - document.getElementById('page').offsetLeft) / 421.641) * 100) + '%');
          const button = this.draggedElement.cloneNode(true);
          button.style.position = 'absolute';
          button.style.overflow = 'hidden';
          button.style.top = (((evt.pageY - document.getElementById('page').offsetTop) / 702.75) * 100) + '%';
          button.style.left = (((evt.pageX - document.getElementById('page').offsetLeft) / 421.641) * 100 )+ '%';
          button.classList.add('resize-drag')
          button.width = 100;
          button.height = 50;
          button.removeAttribute('draggable')
          button.id = new Date().toISOString();
          button.setAttribute('data-href', 'http://example.com')
          button.addEventListener('click', () => {
            console.log(button.style.backgroundColor.trim())
            this.$store.commit('setSelectedButton', {
              title: button.innerHTML.trim(),
              url: button.getAttribute('data-href').trim(),
              background: button.style.background.trim(),
              textColour: button.style.color.trim(),
            });
            this.selectElement('callToActionButtons', button.id);
            this.selectedButtonData = {title: button.innerHTML, url: button.getAttribute('data-href')}
          })
          setTimeout(() => {
            button.style.width = ((button.getBoundingClientRect().width / 421.641) * 100 )+ '%';
            button.style.height = ((button.getBoundingClientRect().height / 702.75) * 100 )+ '%';
            button.dataset.x = ((evt.pageX - document.getElementById('page').offsetLeft) / 421.641) * 100
            button.dataset.y = ((evt.pageY - document.getElementById('page').offsetTop) / 702.75) * 100
          }, 500)
          div = button;
        }
        else if (this.activeMedia === 'interactivePanel') {
          const interactive = this.draggedElement.cloneNode(true);
          interactive.style.position = 'absolute';
          interactive.style.top = (((evt.pageY - document.getElementById('page').offsetTop) / 702.75) * 100) + '%';
          interactive.style.left = (((evt.pageX - document.getElementById('page').offsetLeft) / 421.641) * 100 )+ '%';
          interactive.classList.add('resize-drag')
          // interactive.width = 100;
          // interactive.height = 50;
          interactive.removeAttribute('draggable')
          interactive.id = new Date().toISOString();
          // interactive.setAttribute('data-href', 'http://example.com')
          interactive.addEventListener('click', () => {
            // console.log(interactive.style.backgroundColor.trim())
            // this.$store.commit('setSelectedButton', {
            //   title: interactive.innerHTML.trim(),
            //   url: interactive.getAttribute('data-href').trim(),
            //   background: interactive.style.background.trim(),
            //   textColour: interactive.style.color.trim(),
            // });
            this.selectElement('interactivePanel', interactive.id);
            // this.selectedButtonData = {title: interactive.innerHTML, url: interactive.getAttribute('data-href')}
          })
          setTimeout(() => {
            interactive.style.width = ((interactive.getBoundingClientRect().width / 421.641) * 100 )+ '%';
            interactive.style.height = ((interactive.getBoundingClientRect().height / 702.75) * 100 )+ '%';
            interactive.dataset.x = ((evt.pageX - document.getElementById('page').offsetLeft) / 421.641) * 100
            interactive.dataset.y = ((evt.pageY - document.getElementById('page').offsetTop) / 702.75) * 100
          }, 500)
          div = interactive;
        }
        else {
          const video = document.createElement('video')
          // video.addEventListener('click', () => {
          //   this.alwaysOnTop(video);
          //   // console.log(video)
          // })
          // let width = 0;
          // let height = 0;

          setTimeout(() => {
            video.style.width = ((video.getBoundingClientRect().width / 421.641) * 100 )+ '%';
            video.style.height = ((video.getBoundingClientRect().height / 702.75) * 100 )+ '%';
            video.dataset.x = ((evt.pageX - document.getElementById('page').offsetLeft) / 421.641) * 100
            video.dataset.y = ((evt.pageY - document.getElementById('page').offsetTop) / 702.75) * 100
            // photo.removeAttribute('data-src');
          }, 200)
          video.classList.add('resize-drag')
          // video.addEventListener("resize", (resize) => {
          //   console.log('WWWWWWWWWWWW', resize);
          //   // width = getComputedStyle(video, null).getPropertyValue('width').replace('px', '');
          //   // height = getComputedStyle(video, null).getPropertyValue('height').replace('px', '');
          // })
          // div.innerHTML = `
          // <div class='resizers' id="resizers-${new Date().toTimeString()}" >
          //   <div class='resizer top-left'></div>
          //   <div class='resizer top-right'></div>
          //   <div class='resizer bottom-left'></div>
          //   <div class='resizer bottom-right'></div>
          //   <amp-video autoplay layout="responsive" width="1" height="1" style="width: 100%; height: auto" poster="${this.draggedElement.src}">
          //       <source src="${this.draggedElement.dataset.src}" type="video/mp4" />
          //   </amp-video>
          // </div>`;
          // video.style = 'width: 100%'
          // video.ondragstart = 'this.drag($event)';
          // video.draggable = true;
          video.controls = true;
          // video.onclick = this.resizeElement(div.children[0].id, '.resizers')
          const source = document.createElement('source');
          source.src = this.draggedElement.dataset.src
          video.appendChild(source);
          div = video
          // div.children[0].appendChild(video);
        }

        evt.target.appendChild(div);
        this.draggedElement = null;
        this.updatePageStructure();
      }
    },

    // resizeElement(divElement, className) {
    //   // document.getElementById('topLeft').addEventListener('drag', (moveEvent) => {
    //   //   console.log(document.getElementById(id).offsetTop + (document.getElementById(id).getBoundingClientRect().top - moveEvent.pageY));
    //   //   // console.log(document.getElementById(id).offsetLeft);
    //   //   // console.log(moveEvent.pageX);
    //   //   // console.log(document.getElementById(id).getBoundingClientRect().left);
    //   //   console.log('QQQQQQQQQQQQQQ: ', moveEvent);
    //   //   document.getElementById(id).style.width = document.getElementById(id).clientWidth + (document.getElementById(id).getBoundingClientRect().left - moveEvent.pageX)  + 'px';
    //   //   document.getElementById(id).style.left = document.getElementById(id).offsetLeft + (document.getElementById(id).getBoundingClientRect().left - moveEvent.pageX)  + 'px';
    //   //   document.getElementById(id).style.top = document.getElementById(id).offsetTop + (document.getElementById(id).getBoundingClientRect().top - moveEvent.pageY)  + 'px';
    //   //   // document.getElementById(id).style.width = document.getElementById(id).clientWidth + (moveEvent.pageX - document.getElementById(id).getBoundingClientRect().left)  + 'px';
    //   // })
    //
    //
    //   setTimeout(() => {
    //     this.element = document.getElementById(divElement);
    //     console.log('Chyke is here: ', this.element);
    //     this.resizers = document.querySelectorAll(className + ' .resizer')
    //     // console.log('Chyke is here: ', this.resizers);
    //     this.minimum_size = 20;
    //     this.original_width = 0;
    //     this.original_height = 0;
    //     this.original_x = 0;
    //     this.original_y = 0;
    //     this.original_mouse_x = 0;
    //     this.original_mouse_y = 0;
    //     console.log('AAAAAAAAAAAAAA: ', this.element)
    //     for (let i = 0; i < this.resizers.length; i++) {
    //       this.currentResizer = this.resizers[i];
    //       const element = this.element;
    //       let original_width = this.original_width;
    //       let original_height = this.original_height;
    //       let original_x = this.original_x;
    //       let original_y = this.original_y;
    //       let original_mouse_x = this.original_mouse_x;
    //       let original_mouse_y = this.original_mouse_y;
    //       let minimum_size = this.minimum_size;
    //       let currentResizer = this.currentResizer;
    //       this.currentResizer.addEventListener('mousedown', function (e) {
    //         e.preventDefault()
    //         original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
    //         original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
    //         original_x = element.getBoundingClientRect().left;
    //         original_y = element.getBoundingClientRect().top;
    //         original_mouse_x = e.pageX;
    //         original_mouse_y = e.pageY;
    //         const resize = (e) => {
    //           if (currentResizer.classList.contains('bottom-right')) {
    //             const width = original_width + (e.pageX - original_mouse_x);
    //             const height = original_height + (e.pageY - original_mouse_y)
    //             if (width > minimum_size) {
    //               element.parentNode.style.width = width + 'px'
    //             }
    //             if (height > minimum_size) {
    //               element.parentNode.style.height = height + 'px'
    //             }
    //           } else if (currentResizer.classList.contains('bottom-left')) {
    //             const height = original_height - (e.pageY + original_mouse_y)
    //             const width = original_width - (e.pageX - original_mouse_x)
    //             if (height > minimum_size) {
    //               element.style.height = height + 'px'
    //             }
    //             if (width > minimum_size) {
    //               element.style.width = width + 'px'
    //               element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
    //             }
    //           } else if (currentResizer.classList.contains('top-right')) {
    //             const width = original_width + (e.pageX - original_mouse_x)
    //             const height = original_height - (e.pageY + original_mouse_y)
    //             if (width > minimum_size) {
    //               element.style.width = width + 'px'
    //             }
    //             if (height > minimum_size) {
    //               element.style.height = height + 'px'
    //               element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
    //             }
    //           } else {
    //             const width = original_width - (e.pageX - original_mouse_x)
    //             const height = original_height - (e.pageY + original_mouse_y)
    //             if (width > minimum_size) {
    //               element.style.width = width + 'px'
    //               element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
    //             }
    //             if (height > minimum_size) {
    //               element.style.height = height + 'px'
    //               element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
    //             }
    //           }
    //         }
    //
    //         window.addEventListener('mousemove', resize)
    //
    //         window.addEventListener('mouseup', () => {
    //           window.removeEventListener('mousemove', resize)
    //           // element: undefined,
    //           // resizers: undefined,
    //           // currentResizer: undefined,
    //           // minimum_size: 20,
    //           // original_width: 0,
    //           // original_height: 0,
    //           // original_x: 0,
    //           // original_y: 0,
    //           // original_mouse_x: 0,
    //           // original_mouse_y: 0,
    //         })
    //       })
    //     }
    //   }, 1000)
    // },

    addNewPage(position = '') {
      this.updatePageStructure()
      document.getElementById('page').innerHTML = ''
      if (position === 'before') {
        const part1 = this.pages.slice(0, this.currentPageNumber)
        const part2 = this.pages.slice(this.currentPageNumber, this.pages.length)
        this.pages = part1.concat({background: "rgb(255,255,255)", elements: []}, part2)
        this.viewPage(this.currentPageNumber)
      } else if (position === 'after') {
        const part1 = this.pages.slice(0, this.currentPageNumber + 1)
        const part2 = this.pages.slice(this.currentPageNumber + 1, this.pages.length)
        this.pages = part1.concat({background: "rgb(255,255,255)", elements: []}, part2)
        this.currentPageNumber += 1
        this.viewPage(this.currentPageNumber)
      } else {
        this.currentPageNumber = this.pages.length
        this.pages.push([])
      }


      this.pages[this.currentPageNumber].background = '#ffffff'
      document.getElementById('page').style.background = '#ffffff'
    },

    deleteCurrentPage() {
      if (this.pages.length > 1) {
        this.pages.splice(this.currentPageNumber, 1)
        this.currentPageNumber -= 1
        if (this.currentPageNumber < 0) {
          this.currentPageNumber = 0
        }
        this.viewPage(this.currentPageNumber)
      }
    },

    copyCurrentPage() {
      const currentPage = this.pages[this.currentPageNumber]
      const part1 = this.pages.slice(0, this.currentPageNumber + 1)
      const part2 = this.pages.slice(this.currentPageNumber + 1, this.pages.length)
      this.pages = part1.concat(currentPage, part2)
      this.currentPageNumber += 1
      this.viewPage(this.currentPageNumber)
    },

    updatePageStructure() {
      this.pages[this.currentPageNumber] = {elements: [...document.getElementById('page').children]}
      this.pages[this.currentPageNumber].background = document.getElementById('page').style.background
      console.log('Page Structure', this.currentPageNumber)
      console.log('Page Structure', this.pages)
    },

    viewPage(pageIndex) {
      if ((pageIndex >= 0) && (pageIndex < this.pages.length)) {
        this.currentPageNumber = pageIndex
        const pageContent = this.pages[pageIndex]
        const page = document.getElementById('page');
        page.innerHTML = ''
        page.style.background = pageContent.background
        pageContent.elements?.forEach(element => {
          page.appendChild(element)
        })
      }
    },

    generateAMPCode(HTMLCode) {
      const tempPage = document.createElement('div')
      HTMLCode.elements?.forEach(element => {
        tempPage.appendChild(element.cloneNode(true))
      })
      let htmlCode = tempPage.innerHTML;
      // const postHTMLCode = htmlCode;
      // htmlCode = htmlCode.replaceAll(/<video.+<\/video>/gi, '');
      htmlCode = htmlCode.replaceAll(/<video/gi, '<amp-video');
      htmlCode = htmlCode.replaceAll(/<\/video>/gi, '</amp-video>');
      // htmlCode = htmlCode.replaceAll(/<img.+\/>/gi, '');
      // htmlCode = htmlCode.replaceAll(/data-src=".+"/gi, ' width="1" height="1" ');
      htmlCode = htmlCode.replaceAll(/<div class="resizer .+"><\/div>/gi, '')
      // htmlCode = htmlCode.replaceAll(new RegExp('height: ([0-9]|\\.)+px;">'), 'height: fit-content;">') // remove height from main div because of video
      htmlCode = htmlCode.replace('draggable="true"', '');
      htmlCode = htmlCode.replace('data-href', 'href');
      // htmlCode = htmlCode.replace('<img', `<amp-img`);
      // htmlCode = htmlCode.replace('data-img="">', `  width="1" height="1"></amp-img>`);

      const ampStoryPageCode =`<amp-story-page id='page-cover' class='amp-story-page amp-story-page__full' style='background: ${HTMLCode.background}'>` +
          "<amp-story-grid-layer template='vertical' class='layer-background align-center justify-center'>";
      const endAmpStoryPageCode = `</amp-story-grid-layer>   </amp-story-page>`
      console.log('WWWWWWWWWWWWWW: ', ampStoryPageCode + htmlCode + endAmpStoryPageCode)
      return ampStoryPageCode + htmlCode + endAmpStoryPageCode;
    },

    preview() {
      // eslint-disable-next-line
      const startAmpCode = "<!DOCTYPE html><html amp='' lang='en'><head>  <meta charset='utf-8'> <script async=\"\" custom-element=\"amp-video\" src=\"https://cdn.ampproject.org/v0/amp-video-0.1.js\"><\/script> <link href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' rel='stylesheet' /> <style amp-custom>.inUse {overflow: hidden;} amp-video > :first-child {padding-top: 56%!important;}</style>  <script async='' src='https://cdn.ampproject.org/v0.js'><\/script>  <script async='' src='https://cdn.ampproject.org/v0/amp-story-1.0.js' custom-element='amp-story'><\/script>  <script async='' src='https://cdn.ampproject.org/v0/amp-analytics-0.1.js' custom-element='amp-analytics'><\/script>  <title>" + (title ? title : 'Untitled Story') + "</title>  <link rel='canonical' href='/'>    <style amp-boilerplate=''>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>    <noscript>        <style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>    </noscript>  <meta name='viewport' content='width=device-width,minimum-scale=1,initial-scale=1'></head><body>  <amp-story poster-portrait-src='https://dynaimage.cdn.cnn.com/cnn/w_768,h_1024,c_scale/https%3A%2F%2Fdynaimage.cdn.cnn.com%2Fcnn%2Fx_572%2Cy_0%2Cw_868%2Ch_1158%2Cc_crop%2Fhttps%253A%252F%252Fstamp.static.cnn.io%252F5f46fd46e2547600227c1cd5%252F200826190320-03-labor-day-stamp.jpg' title='Labor Day: Its history and meaning' standalone='' publisher='Stori' publisher-logo-src='https://stori-73bd3.web.app/img/logo.389c58bb.svg'>"
      const title = document.getElementById('title').value;
      let generatedAMPCode =  ''
      this.pages.forEach((page, index) => {
        generatedAMPCode += this.generateAMPCode(this.pages[index])
      })
      let ampString = startAmpCode + generatedAMPCode + `</amp-story></body></html>`
      // const pagesObject = {}
      // this.pages.forEach((page) => {
      //   console.log(JSON.stringify(page))
      //   // pagesObject[`page${index}`] = page.stringify()
      //
      //   var binary = '';
      //   var bytes = [].slice.call(new Uint8Array(buffer));
      //   bytes.forEach((b) => binary += String.fromCharCode(b));
      //   return window.btoa(binary);
      // })
      let htmlFile = document.createElement("div")

      this.pages.forEach(page => {
        const section = document.createElement('section')
        section.style.background = page.background;
        // const pageElement =
        if (page.elements) {
          page.elements.forEach(element => {
            section.appendChild(element)
          })
        }
        htmlFile.appendChild(section)
        // const hr = document.createElement('hr')
        // root.appendChild(hr)
      })

      const payload = {
        user_id: localStorage.getItem('userId'),
        name: title ? title : 'Untitled Story',
        file: htmlFile.innerHTML,
        amp_file: ampString
      }

      let config = {
        onUploadProgress: progressEvent => {
          let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
          console.log('QQQQQQQQQQQQQQQQQ: ', percentCompleted)
          // do whatever you like with the percentage complete
          // maybe dispatch an action that will update a progress bar or something
        }
      }

      if (this.$route.params.id) {
        axios.put(`${this.baseUrl}stories/${this.$route.params.id}/update`, payload, {headers: {Authorization: this.authToken}, config})
          .then(res => {
            console.log(res)
            this.previewURL = res.data.data.amp_file;
            this.QRCode = res.data.data.qrcode;
            // window.open('https://' + res.data.data.amp_file, '_blank')
          })
      } else {
        axios.post(`${this.baseUrl}stories/create`, payload, {headers: {Authorization: this.authToken}, config})
          .then(res => {
            console.log(res)
            this.previewURL = res.data.data.amp_file;
            this.QRCode = res.data.data.qrcode;
            // window.open('https://' + res.data.data.amp_file, '_blank')
          })
      }

      // var a = document.createElement("a");
      // a.id = 'a';
      // a.href = URL.createObjectURL(file);
      // a.download = 'AMP.html';
      // a.click();
    },

    save() {
      console.log('YYYYYYYYYYYYYYYY')
      // eslint-disable-next-line
      const startAmpCode = "<!DOCTYPE html><html amp='' lang='en'><head> <meta name=\"keywords\" content=\"" + this.metaKeywords + "\"> <meta name=\"author\" content=\"" + this.authorName + "\">  <meta name=\"description\" content=\"" + this.metaDescription + "\">  <meta charset='utf-8'> <script async=\"\" custom-element=\"amp-video\" src=\"https://cdn.ampproject.org/v0/amp-video-0.1.js\"><\/script> <link href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' rel='stylesheet' /> <style amp-custom>.inUse {overflow: hidden;} amp-video > :first-child {padding-top: 56%!important;}</style>  <script async='' src='https://cdn.ampproject.org/v0.js'><\/script>  <script async='' src='https://cdn.ampproject.org/v0/amp-story-1.0.js' custom-element='amp-story'><\/script>  <script async='' src='https://cdn.ampproject.org/v0/amp-analytics-0.1.js' custom-element='amp-analytics'><\/script>  <title>" + (title ? title : 'Untitled Story') + "</title>  <link rel='canonical' href='/'>    <style amp-boilerplate=''>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>    <noscript>        <style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>    </noscript>  <meta name='viewport' content='width=device-width,minimum-scale=1,initial-scale=1'></head><body>  <amp-story poster-portrait-src='https://dynaimage.cdn.cnn.com/cnn/w_768,h_1024,c_scale/https%3A%2F%2Fdynaimage.cdn.cnn.com%2Fcnn%2Fx_572%2Cy_0%2Cw_868%2Ch_1158%2Cc_crop%2Fhttps%253A%252F%252Fstamp.static.cnn.io%252F5f46fd46e2547600227c1cd5%252F200826190320-03-labor-day-stamp.jpg' title='Labor Day: Its history and meaning' standalone='' publisher='Stori' publisher-logo-src='https://stori-73bd3.web.app/img/logo.389c58bb.svg'>"
      const title = document.getElementById('title').value;
      let generatedAMPCode =  ''
      this.pages.forEach((page, index) => {
        generatedAMPCode += this.generateAMPCode(this.pages[index])
      })
      let ampString = startAmpCode + generatedAMPCode + `</amp-story></body></html>`
      let htmlFile = document.createElement("div")

      this.pages.forEach(page => {
        const section = document.createElement('section')
        section.style.background = page.background;
        if (page.elements) {
          page.elements.forEach(element => {
            section.appendChild(element)
          })
        }
        htmlFile.appendChild(section)
      })

      const payload = {
        user_id: localStorage.getItem('userId'),
        name: title ? title : 'Untitled Story',
        file: htmlFile.innerHTML,
        amp_file: ampString
      }

      if (this.$route.params.id) {
        axios.put(`${this.baseUrl}stories/${this.$route.params.id}/update`, payload, {headers: {Authorization: this.authToken}})
          .then(res => {
            console.log('Saved and Updated', res)
          })
      } else {
        axios.post(`${this.baseUrl}stories/create`, payload, {headers: {Authorization: this.authToken}})
          .then(res => {
            this.$router.push({name: 'Story', params: { id: res.data.data.unique_id }})
          })
      }

      // var a = document.createElement("a");
      // a.id = 'a';
      // a.href = URL.createObjectURL(file);
      // a.download = 'AMP.html';
      // a.click();
    },

    publish() {
      this.isPublishing = true
      // axios.put(`${this.baseUrl}stories/${this.$route.params.id}/publish`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
      //   .then(res => {
      //     console.log(res)
      //   })
    },

    changPageBackground(event, image) {
      console.log(event.target)
      this.isCustomGradient = false;
      if (image) {
        this.pageBackground = 'url(' + event.target.src + ')'
      } else {
        this.pageBackground = event.target.style.background;
      }
      this.pages[this.currentPageNumber].background = this.pageBackground
    },
    getUploadedMedia() {
      axios.post(`${this.baseUrl}media`, {user_id: localStorage.getItem('userId')}, {headers: {Authorization: this.authToken}})
          .then(res => {
            this.uploadedMedia = res.data.data;
            console.log(this.uploadedMedia)
            this.activeMedia = 'uploadedMedia';
          })
    }
  },

  created() {
    // this.getUnsplashPhotos()
  },

  components: {
    'text-editor': TextEditor,
    'image-editor': ImageEditor,
    // 'vue-guides': Guides,
    // Moveable,
    'text-panel': Text,
    'media-panel': MediaPanel,
    'stori-preview': Preview,
    'animations': Animations,
    'callToActionButtons': CallToActionButtons,
    'publish': Publish,
    InteractivePanel,
    InteractiveEditor
  }
}
</script>

<style lang="scss">
  @import 'Editor';
  @import '~animate.css/animate.min.css';
</style>
