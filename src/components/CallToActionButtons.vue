<template>
  <v-expansion-panel>
  <v-expansion-panel-header color="#202125">
    Button
  </v-expansion-panel-header>
  <v-expansion-panel-content color="#202125">
    <div>
      <v-text-field
        :rules="[rules.required]"
        validate-on-blur
        label="Button Text"
        outlined
        @input="changeButtonText"
        v-model="buttonText"
      ></v-text-field>
    </div>

    <div>
      <v-text-field
        :rules="[rules.required, rules.validateUrl]"
        validate-on-blur
        label="URL"
        outlined
        type="url"
        v-model="buttonURL"
        @input="changeButtonURL"
      ></v-text-field>
    </div>

<!--    <div style="display: flex; justify-content: space-between">-->
<!--      <v-menu offset-y :close-on-content-click="false">-->
<!--        <template v-slot:activator="{ on }">-->
<!--          <v-btn-->
<!--            :color="textColour"-->
<!--            dark-->
<!--            small-->
<!--            v-on="on"-->
<!--            style="text-shadow: black 1px 1px"-->
<!--          >-->
<!--            Color-->
<!--          </v-btn>-->
<!--        </template>-->
<!--        <v-color-picker-->
<!--          dot-size="25"-->
<!--          mode="rgba"-->
<!--          v-model="textColour"-->
<!--          @input="changeTextColour"-->
<!--          swatches-max-height="250"-->
<!--        ></v-color-picker>-->
<!--      </v-menu>-->
<!--      <v-menu offset-y :close-on-content-click="false">-->
<!--        <template v-slot:activator="{ on }">-->
<!--          <v-btn-->
<!--            :color="textBackground"-->
<!--            dark-->
<!--            small-->
<!--            v-on="on"-->
<!--            style="text-shadow: black 1px 1px"-->
<!--          >-->
<!--            Background-->
<!--          </v-btn>-->
<!--        </template>-->
<!--        <v-color-picker-->
<!--          dot-size="25"-->
<!--          mode="rgba"-->
<!--          v-model="textBackground"-->
<!--          @input="changeTextBackground"-->
<!--          swatches-max-height="250"-->
<!--        ></v-color-picker>-->
<!--      </v-menu>-->

<!--    </div>-->
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
export default {
  name: "CallToActionButtons",

  data() {
    return {
      buttonText: undefined,
      buttonURL: undefined,
      textColour: undefined,
      textBackground: undefined,
      rules: {
        required(value) {
          return value ? true : 'Required';
        },
        validateUrl(value) {
          const pattern = new RegExp('^(https?:\\/\\/)' + // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
              '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
          return pattern.test(value) ? true : 'Enter a valid URL beginning with http:// or https://';
        }
      }
    }
  },
  props: {
    selectedElement: null
  },
  created() {
    this.unwatch  = this.$store.watch((state, getters) => {
      this.buttonText = getters.getSelectedButton.title
      this.buttonURL = getters.getSelectedButton.url
      this.textBackground = getters.getSelectedButton.background
      this.textColour = getters.getSelectedButton.textColour
      console.log('YYYYYYYYYYY:', this.textBackground)
    }, () => {});
  },
  methods: {
    changeButtonText() {
      this.$store.commit('setSelectedButton', {title: this.buttonText})
      const button = document.getElementById(this.selectedElement.id)
      button.innerHTML = this.buttonText
    },

    changeButtonURL() {
      if (this.rules.validateUrl) {
        const button = document.getElementById(this.selectedElement.id)
        button.target = '_blank'
        button.setAttribute('data-href', this.buttonURL)
      }
    },

    changeTextColour() {
      // this.$store.commit('setSelectedButton', {textColour: this.textColour})
      const button = document.getElementById(this.selectedElement.id)
      button.style.color = this.textColour
    },

    changeTextBackground() {
      // this.$store.commit('setSelectedButton', {background: this.textBackground})
      const button = document.getElementById(this.selectedElement.id)
      button.style.background = this.textBackground
    }
  },
  beforeDestroy() {
    this.unwatch()
  }
}
</script>

<style scoped>

</style>
