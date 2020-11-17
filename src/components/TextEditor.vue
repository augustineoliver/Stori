<template>
<div class="textSetting">
  <div class="basicFormatter">
    <label class="buttonControl" :style="{background: bold ? '#202125' : 'none'}">
      <i class="fa fa-bold"></i>
      <input type="checkbox" @change="setBold" id="bold" v-model="bold">
    </label>
    <label class="buttonControl" :style="{background: italic ? '#202125' : 'none'}">
      <i class="fa fa-italic"></i>
      <input type="checkbox" @change="setItalic" id="italic" v-model="italic">
    </label>
    <label class="buttonControl" :style="{background: underline ? '#202125' : 'none'}">
      <i class="fa fa-underline"></i>
      <input type="checkbox" @change="setUnderline" id="underline" v-model="underline">
    </label>

  </div>

  <div>
    <label>
      <select class="setFontFamily" @change="setFontFamily" v-model="fontFamily">
        <option value="">Select a Font</option>
        <option value="Arial, Helvetica, sans-serif">Arial, Helvetica, sans-serif</option>
        <option value="'Arial Black', Gadget, sans-serif">"Arial Black", Gadget, sans-serif</option>
        <option value="'Comic Sans MS', cursive, sans-serif">"Comic Sans MS", cursive, sans-serif</option>
        <option value="cursive">cursive</option>
        <option value="Georgia, serif">Georgia, serif</option>
        <option value="Impact, Charcoal, sans-serif">Impact, Charcoal, sans-serif</option>
        <option value="'Lucida Sans Unicode', 'Lucida Grande', sans-serif">"Lucida Sans Unicode", "Lucida Grande", sans-serif</option>
        <option value="sans-serif">sans-serif</option>
        <option value="serif">serif</option>
        <option value="system-ui">system-ui</option>
        <option value="Tahoma, Geneva, sans-serif">Tahoma, Geneva, sans-serif</option>
        <option value="'Trebuchet MS', Helvetica, sans-serif">"Trebuchet MS", Helvetica, sans-serif</option>
        <option value="Verdana, Geneva, sans-serif">Verdana, Geneva, sans-serif</option>
      </select>
    </label>
  </div>
  <div class="twoColumnRow">
    <label>
      <span>Text Case</span>
      <select @change="setCapitalize" v-model="fontCase">
        <option value="">Select</option>
        <option value="lowercase">Lowercase</option>
        <option value="capitalize">Title Case</option>
        <option value="uppercase">Uppercase</option>
      </select>
    </label>
    <label>
      <span>Text Align</span>
      <select @change="setTextAlignment" v-model="textAlign">
        <option value="">Select</option>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </label>

  </div>

  <div class="sliderControl">
    <span>Font Size:</span>
    <div>
      <label>
        <input @input="setFontSize" type="range" min="6" max="144" v-model="fontSize">
      </label>
      <label>
        <input class="numberInput" @input="setFontSize" type="number" v-model="fontSize">
      </label>
    </div>
  </div>

  <div class="colourPicker">
    <span>Colour</span>
    <label>
      <input @input="changeTextColour" type="text" v-model="textColour">
      <input @input="changeTextColour" type="color" v-model="textColour">
    </label>
  </div>
</div>
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
      bold: undefined,
      italic: undefined,
      underline: undefined,
      fontCase: '',
      textAlign: '',
      fontFamily: '',
      textColour: ''
    }
  },

  methods: {
    setFontSize() {
      const text = document.getElementById(this.selectedElement.id)
      text.style.fontSize = this.fontSize + 'px';
    },
    setBold() {
      // console.log(this.$refs[this.selectedElement.id])
      const text = document.getElementById(this.selectedElement.id)
      if (this.bold) {
        text.style.fontWeight = '700';
      } else {
        text.style.fontWeight = '400';
      }
    },
    setItalic() {
      const text = document.getElementById(this.selectedElement.id)
      if (this.italic) {
        text.style.fontStyle = 'oblique';
      } else {
        text.style.fontStyle = 'normal';
      }
    },

    setUnderline() {
      const text = document.getElementById(this.selectedElement.id)
      if (this.underline) {
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
      switch (this.textAlign) {
        case 'left': text.style.textAlign = 'left'; break;
        case 'center': text.style.textAlign = 'center'; break;
        case 'right': text.style.textAlign = 'right'; break;
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
        case 'system-ui': text.style.fontFamily = 'system-ui'; break;
      }
    },

    changeTextColour() {
      const text = document.getElementById(this.selectedElement.id)
      text.style.color = this.textColour;
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
