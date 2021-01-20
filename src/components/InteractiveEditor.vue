<template>
  <v-expansion-panel>
    <v-expansion-panel-header color="#202125">
      Binary Poll
    </v-expansion-panel-header>
    <v-expansion-panel-content color="#202125">

      <v-select
        :items="[
            {text: 'Light', value: 'light'},
            {text: 'Dark', value: 'dark'},
        ]"
        label="Theme"
        outlined
      ></v-select>

      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn
            :color="backgroundColour"
            dark
            small
            block
            v-on="on"
            style="text-shadow: black 1px 1px; padding: 20px; margin-bottom: 30px"
          >
            Background Colour
          </v-btn>
        </template>
        <v-color-picker
          dot-size="25"
          mode="rgba"
          v-model="backgroundColour"
          @input="changeTextBackground"
          swatches-max-height="250"
        ></v-color-picker>
      </v-menu>

      <v-select
        :items="[
            {text: 'Large', value: 'light'},
            {text: 'Medium', value: 'medium'},
            {text: 'Small', value: 'small'},
        ]"
        label="Prompt Size"
        outlined
      ></v-select>

      <v-select
        :items="[
            {text: 'Left', value: 'left'},
            {text: 'Centre', value: 'centre'},
            {text: 'Right', value: 'right'},
            {text: 'Justified', value: 'justified'},
        ]"
        label="Prompt Alignment"
        outlined
      ></v-select>

      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn
            :color="promptColour"
            dark
            small
            block
            v-on="on"
            style="color: #363636; text-shadow: #f9f9f9 1px 1px; padding: 20px; margin-bottom: 30px"
          >
            Prompt Colour
          </v-btn>
        </template>
        <v-color-picker
          dot-size="25"
          mode="rgba"
          v-model="promptColour"
          @input="changeTextBackground"
          swatches-max-height="250"
        ></v-color-picker>
      </v-menu>

      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn
            :color="optionColour"
            dark
            small
            block
            v-on="on"
            style="text-shadow: black 1px 1px; padding: 20px; margin-bottom: 30px"
          >
            Option Colour
          </v-btn>
        </template>
        <v-color-picker
          dot-size="25"
          mode="rgba"
          v-model="optionColour"
          @input="changeTextBackground"
          swatches-max-height="250"
        ></v-color-picker>
      </v-menu>

      <v-text-field
        label="Prompt Text"
        outlined
      ></v-text-field>

      <v-text-field
        label="Option 1"
        outlined
      ></v-text-field>

      <v-text-field
        label="Option 2"
        outlined
      ></v-text-field>

    </v-expansion-panel-content>
  </v-expansion-panel>

</template>

<script>
export default {
name: "InteractiveEditor",
  data() {
    return {
      backgroundColour: 'rgb(1, 90, 239, 1)',
      promptColour: 'rgb(255, 255, 255, 1)',
      optionColour: 'rgb(0, 0, 0, 1)',
    }
  }
}
</script>

<style lang="scss">

</style>
