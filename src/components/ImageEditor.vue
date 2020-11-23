<template>
<v-expansion-panel>
  <v-expansion-panel-header color="#202125">
    Image Editor
  </v-expansion-panel-header>
  <v-expansion-panel-content color="#202125">
    <div class="filterSample" v-if="selectedImageSrc !== undefined">
      <div id="normal" @click="changeFilterTemplate('normal')">
        <img :src="selectedImageSrc" alt="normal" style="filter: brightness(100%) contrast(100%) saturate(100%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>normal</span>
      </div>
      <div id="grayscale" @click="changeFilterTemplate('grayscale')">
        <img :src="selectedImageSrc" alt="grayscale" style="filter: blur(0px) grayscale(100%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>grayscale</span>
      </div>
      <div id="edge" @click="changeFilterTemplate('edge')">
        <img :src="selectedImageSrc" alt="edge" style="filter: brightness(110%) contrast(76%) saturate(126%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>edge</span>
      </div>
      <div id="festive" @click="changeFilterTemplate('festive')">
        <img :src="selectedImageSrc" alt="festive" style="filter: brightness(110%) contrast(121%) saturate(124%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>festive</span>
      </div>
      <div id="retro" @click="changeFilterTemplate('retro')">
        <img :src="selectedImageSrc" alt="retro" style="filter: contrast(200%) saturate(200%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>retro</span>
      </div>
      <div id="selfie" @click="changeFilterTemplate('selfie')">
        <img :src="selectedImageSrc" alt="selfie" style="filter: brightness(110%) contrast(88%) saturate(88%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>selfie</span>
      </div>
      <div id="summer" @click="changeFilterTemplate('summer')">
        <img :src="selectedImageSrc" alt="summer" style="filter: brightness(110%) contrast(114%) saturate(118%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>summer</span>
      </div>
      <div id="whimsical" @click="changeFilterTemplate('whimsical')">
        <img :src="selectedImageSrc" alt="whimsical" style="filter: brightness(143%) contrast(85%) saturate(47%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>whimsical</span>
      </div>
      <div id="dark" @click="changeFilterTemplate('dark')">
        <img :src="selectedImageSrc" alt="dark" style="filter: brightness(50%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>dark</span>
      </div>
      <div id="light" @click="changeFilterTemplate('light')">
        <img :src="selectedImageSrc" alt="light" style="filter: brightness(150%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>light</span>
      </div>
      <div id="blues" @click="changeFilterTemplate('blues')">
        <img :src="selectedImageSrc" alt="blues" style="filter: brightness(163%) contrast(63%) saturate(74%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>blues</span>
      </div>
      <div id="street" @click="changeFilterTemplate('street')">
        <img :src="selectedImageSrc" alt="street" style="filter: brightness(93%) contrast(121%) saturate(5%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>street</span>
      </div>
      <div id="rosie" @click="changeFilterTemplate('rosie')">
        <img :src="selectedImageSrc" alt="rosie" style="filter: contrast(155%) saturate(72%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>rosie</span>
      </div>
      <div id="nordic" @click="changeFilterTemplate('nordic')">
        <img :src="selectedImageSrc" alt="nordic" style="filter: brightness(115%) contrast(84%) saturate(50%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>nordic</span>
      </div>
      <div id="epic" @click="changeFilterTemplate('epic')">
        <img :src="selectedImageSrc" alt="epic" style="filter: brightness(106%) contrast(120%) saturate(86%) blur(0.25px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>epic</span>
      </div>
      <div id="drama" @click="changeFilterTemplate('drama')">
        <img :src="selectedImageSrc" alt="drama" style="filter: brightness(90%) contrast(121%) saturate(134%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>drama</span>
      </div>
      <div id="cali" @click="changeFilterTemplate('cali')">
        <img :src="selectedImageSrc" alt="cali" style="filter: brightness(122%) contrast(54%) saturate(138%) blur(0px) grayscale(0%) sepia(0%) invert(0%) hue-rotate(0deg);">
        <span>cali</span>
      </div>
    </div>
    <div>
      <span>Grayscale:</span>
      <v-slider
        v-model="grayscale"
        thumb-label
        min="0"
        max="100"
        @input="editImage"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Blur:</span>
      <v-slider
        v-model="blur"
        thumb-label
        min="0"
        max="30"
        @input="editImage"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Brightness:</span>
      <v-slider
        v-model="brightness"
        thumb-label
        min="0"
        max="200"
        @input="editImage"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Contrast:</span>
      <v-slider
        v-model="contrast"
        thumb-label
        min="0"
        max="200"
        @input="editImage"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Hue Rotate:</span>
      <v-slider
        v-model="hueRotate"
        thumb-label
        min="0"
        max="100"
        @input="editImage"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Opacity:</span>
      <v-slider
        v-model="opacity"
        thumb-label
        min="0"
        max="1"
        step="0.01"
        @input="editImage"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Invert:</span>
      <v-slider
        v-model="invert"
        thumb-label
        min="0"
        max="100"
        @input="editImage"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Saturate:</span>
      <v-slider
        v-model="saturate"
        thumb-label
        min="0"
        max="200"
        @input="editImage"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Sepia:</span>
      <v-slider
        v-model="sepia"
        thumb-label
        min="0"
        max="100"
        @input="editImage"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>


  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
export default {
  name: "ImageEditor",

  props: {
    selectedElement: null,
    selectedImageSrc: null,
  },

  data() {
    return {
      grayscale: 0,
      blur: 0,
      brightness: 100,
      contrast: 100,
      hueRotate: 0,
      opacity: 1,
      invert: 0,
      saturate: 100,
      sepia: 0,
    }
  },

  methods: {
    editImage() {
      console.log(this.selectedElement)
      const image = document.getElementById(this.selectedElement.id)
      image.style.filter = `grayscale(${this.grayscale}%)
          blur(${this.blur}px)
          brightness(${this.brightness}%)
          contrast(${this.contrast}%)
          hue-rotate(${this.hueRotate}deg)
          opacity(${this.opacity})
          invert(${this.invert}%)
          saturate(${this.saturate}%)
          sepia(${this.sepia}%)`
    },

    changeFilterTemplate(name) {
      switch (name) {
        case 'normal': {
          this.grayscale = 0;
          this.brightness = 100;
          this.contrast = 100;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 100;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'grayscale': {
          this.grayscale = 100;
          this.hueRotate = 0;
          this.invert = 0;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'edge': {
          this.grayscale = 0;
          this.brightness = 110;
          this.contrast = 76;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 126;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'festive': {
          this.grayscale = 0;
          this.brightness = 110;
          this.contrast = 121;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 124;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'retro': {
          this.grayscale = 0;
          this.contrast = 200;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 200;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'selfie': {
          this.grayscale = 0;
          this.brightness = 110;
          this.contrast = 88;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 88;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'summer': {
          this.grayscale = 0;
          this.brightness = 110;
          this.contrast = 114;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 118;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'whimsical': {
          this.grayscale = 0;
          this.brightness = 143;
          this.contrast = 85;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 47;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'dark': {
          this.grayscale = 0;
          this.brightness = 50;
          this.hueRotate = 0;
          this.invert = 0;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'light': {
          this.grayscale = 0;
          this.brightness = 150;
          this.hueRotate = 0;
          this.invert = 0;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'blues': {
          this.grayscale = 0;
          this.brightness = 163;
          this.contrast = 63;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 74;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'street': {
          this.grayscale = 0;
          this.brightness = 93;
          this.contrast = 121;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 5;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'rosie': {
          this.grayscale = 0;
          this.contrast = 155;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 72;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'nordic': {
          this.grayscale = 0;
          this.brightness = 115;
          this.contrast = 84;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 50;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'epic': {
          this.grayscale = 0;
          this.brightness = 106;
          this.contrast = 86;
          this.blur = 0.25;
          this.hueRotate = 0;
          this.invert = 0;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'drama': {
          this.grayscale = 0;
          this.brightness = 90;
          this.contrast = 121;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 134;
          this.sepia = 0;

          this.editImage();
          break;
        }

        case 'cali': {
          this.grayscale = 0;
          this.brightness = 122;
          this.contrast = 54;
          this.hueRotate = 0;
          this.invert = 0;
          this.saturate = 138;
          this.sepia = 0;

          this.editImage();
          break;
        }

      }
    }
  }
}
</script>

<style lang="scss">
.filterSample {
  display: flex;
  width: 100%;
  overflow-x: auto;


  div {
    margin: 5px;
    min-width: 100px;
    height: 100px;
    overflow: hidden;
    display: block;
    cursor: pointer;

    img {
      width: 100%;
      min-height: calc(100% - 40px);
      height: auto;
    }

    span {
      display: block;
      text-align: center;
      text-transform: capitalize;
    }
  }
}
</style>
