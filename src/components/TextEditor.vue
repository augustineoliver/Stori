<template>
<v-expansion-panel>
  <v-expansion-panel-header color="#202125">
    Text
  </v-expansion-panel-header>
  <v-expansion-panel-content color="#202125">
  <div class="textSetting">
    <div style="margin: 10px; display: flex; flex-direction: column; justify-content: center">
      <div style="display: flex; justify-content: center">
        <v-btn-toggle
        v-model="textAlign"
        @change="setTextAlignment"
        mandatory
        >
          <v-btn>
            <v-icon>mdi-format-align-left</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-center</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-right</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-format-align-justify</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>

      <div style="display: flex; justify-content: center">
        <v-btn-toggle
          v-model="textFormatting"
          @change="formatText"
          multiple
        >

          <v-btn>
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <div>
      <v-select
        :items="[
            'Arial, Helvetica, sans-serif',
            '\'Arial Black\', Gadget, sans-serif',
            '\'Comic Sans MS\', cursive, sans-serif',
            'cursive',
            'Georgia, serif',
            'Impact, Charcoal, sans-serif',
            '\'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',
            'sans-serif',
            'serif',
            'system-UI',
            'Tahoma, Geneva, sans-serif',
            '\'Trebuchet MS\', Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
        ]"
        @change="setFontFamily"
        v-model="fontFamily"
        label="Font Family"
        outlined
        dense
      ></v-select>
    </div>

    <div>
      <v-select
        :items="[
            {valueOf: 'lowercase', value: 'Lowercase'},
            {valueOf: 'capitalize', value: 'Title Case'},
            {valueOf: 'uppercase', value: 'Uppercase'},
            'capitalize',
            'uppercase',
        ]"
        item-text="value"
        item-value="valueOf"
        v-model="fontCase"
        @change="setCapitalize"
        label="Font Case"
        outlined
        dense
      ></v-select>

    </div>

    <div>
      <span>Font Size:</span>
      <v-slider
        v-model="fontSize"
        thumb-label
        min="6"
        max="144"
        @input="setFontSize"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Letter Spacing:</span>
      <v-slider
        v-model="letterSpacing"
        thumb-label
        min="0.0"
        max="10.0"
        step="0.1"
        @input="changeLetterSpacing"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div>
      <span>Line Height:</span>
      <v-slider
        v-model="lineHeight"
        thumb-label
        min="0.0"
        max="5.0"
        step="0.1"
        @input="changeLineHeight"
        track-fill-color="black"
        thumb-color="black"
      ></v-slider>
    </div>

    <div style="display: flex; justify-content: space-between">
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn
            :color="textColour"
            dark
            small
            v-on="on"
            style="text-shadow: black 1px 1px"
          >
            Color
          </v-btn>
        </template>
        <v-color-picker
          dot-size="25"
          mode="rgba"
          v-model="textColour"
          @input="changeTextColour"
          swatches-max-height="250"
        ></v-color-picker>
      </v-menu>
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn
            :color="textBackground"
            dark
            small
            v-on="on"
            style="text-shadow: black 1px 1px"
          >
            Background
          </v-btn>
        </template>
        <v-color-picker
          dot-size="25"
          mode="rgba"
          v-model="textBackground"
          @input="changeTextBackground"
          swatches-max-height="250"
        ></v-color-picker>
      </v-menu>

    </div>

  </div>
  </v-expansion-panel-content>
</v-expansion-panel>

</template>

<script>
export default {
  name: "TextEditor",

  props: {
    selectedElement: null,
    textSize: null,
  },

  data() {
    return {
      fontSize: this.textSize,
      fontCase: '',
      textAlign: 0,
      fontFamily: '',
      textColour: '#000000',
      textBackground: 'rgba(0, 0, 0, 0)',
      textFormatting: [],
      letterSpacing: 1.0,
      lineHeight: 1.4,
    }
  },

  methods: {
    setFontSize() {
      const text = document.getElementById(this.selectedElement.id)
      text.style.fontSize = this.fontSize + 'px';
    },

    formatText() {
      const text = document.getElementById(this.selectedElement.id)
      if (this.textFormatting.includes(0)) {
        text.style.fontWeight = '700';
      } else {
        text.style.fontWeight = '400';
      }

      if (this.textFormatting.includes(1)) {
        text.style.fontStyle = 'oblique';
      } else {
        text.style.fontStyle = 'normal';
      }

      if (this.textFormatting.includes(2)) {
        text.style.textDecoration = 'underline';
      } else {
        text.style.textDecoration = 'none';
      }
    },

    setCapitalize() {
      const text = document.getElementById(this.selectedElement.id)
      switch (this.fontCase) {
        case 'lowercase': text.style.textTransform = 'lowercase'; break;
        case 'capitalize': text.style.textTransform = 'capitalize'; break;
        case 'uppercase': text.style.textTransform = 'uppercase'; break;
      }
    },

    setTextAlignment() {
      const text = document.getElementById(this.selectedElement.id)
      console.log(this.textAlign)
      switch (this.textAlign) {
        case 0: text.style.textAlign = 'left'; break;
        case 1: text.style.textAlign = 'center'; break;
        case 2: text.style.textAlign = 'right'; break;
        case 3: text.style.textAlign = 'justify'; break;
      }
    },

    setFontFamily() {
      const text = document.getElementById(this.selectedElement.id)
      switch (this.fontFamily) {
        case 'Georgia, serif': text.style.fontFamily = 'Georgia, serif'; break;
        case 'sans': text.style.fontFamily = 'sans'; break;
        case 'Arial, Helvetica, sans-serif': text.style.fontFamily = 'Arial, Helvetica, sans-serif'; break;
        case "'Arial Black', Gadget, sans-serif": text.style.fontFamily = "'Arial Black', Gadget, sans-serif"; break;
        case "'Comic Sans MS', cursive, sans-serif": text.style.fontFamily = "'Comic Sans MS', cursive, sans-serif"; break;
        case 'Impact, Charcoal, sans-serif': text.style.fontFamily = 'Impact, Charcoal, sans-serif'; break;
        case "'Lucida Sans Unicode', 'Lucida Grande', sans-serif": text.style.fontFamily = "'Lucida Sans Unicode', 'Lucida Grande', sans-serif"; break;
        case 'Tahoma, Geneva, sans-serif': text.style.fontFamily = 'Tahoma, Geneva, sans-serif'; break;
        case "'Trebuchet MS', Helvetica, sans-serif": text.style.fontFamily = "'Trebuchet MS', Helvetica, sans-serif"; break;
        case 'Verdana, Geneva, sans-serif': text.style.fontFamily = 'Verdana, Geneva, sans-serif'; break;
        case 'sans-serif': text.style.fontFamily = 'sans-serif'; break;
        case 'serif': text.style.fontFamily = 'serif'; break;
        case 'cursive': text.style.fontFamily = 'cursive'; break;
        case 'system': text.style.fontFamily = 'system'; break;
      }
    },

    changeTextColour() {
      const text = document.getElementById(this.selectedElement.id)
      text.style.color = this.textColour;
    },

    changeTextBackground() {
      const text = document.getElementById(this.selectedElement.id)
      text.style.backgroundColor = this.textBackground;
    },

    changeLetterSpacing() {
      const text = document.getElementById(this.selectedElement.id)
      console.log(this.letterSpacing)
      text.style.letterSpacing = this.letterSpacing + 'px';
    },

    changeLineHeight() {
      const text = document.getElementById(this.selectedElement.id)
      console.log(this.letterSpacing)
      text.style.lineHeight = this.lineHeight + 'em';
    }

  }
}
</script>

<style lang="scss">
.textSetting {
  width: 100%;
  overflow: hidden;
  padding: 0 10px;
  box-sizing: border-box;

  .basicFormatter {
    display: flex;
    justify-content: space-around;
    padding: 10px;

    .buttonControl {
      display: inline-flex;
      width: 50px;
      height: 50px;
      box-sizing: border-box;
      background: #151518;
      color: white;
      font-weight: 700;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      cursor: pointer;
      border: solid 1px gray;
      border-radius: 5px;
      input {
        display: none;
      }
    }
  }

  .twoColumnRow {
    display: flex;
    justify-content: space-between;
    margin: 10px auto;

    label {
      width: 48%;
      select {
        width: 100%;
        height: 30px;
        font-size: 16px;
      }
    }
  }

  .sliderControl {
    width: 100%;
    margin: 10px 10px 0 0;
    box-sizing: border-box;
    span {
      font-size: 15px;
    }
    div {
      display: flex;
      > :first-child {
        width: 80%;
      }
      > :last-child {
        width: 20%;
        .numberInput {
          width: 100%;
        }
      }
    }
  }

  .setFontFamily {
    width: 100%;
    height: 30px;
    font-size: 16px;
  }

  .colourPicker {
    width: 100%;
    margin: 10px 0;

    span {
      display: block;
    }

    label {
      display: flex;
      align-items: center;
      input[type=text] {
        height: 30px;
        border: none;
        width: available;
      }
      input[type=color] {
        height: 30px;
        border: none;
        margin: 0;
      }
    }

  }
}

</style>
