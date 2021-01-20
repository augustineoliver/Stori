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
            :color="interactiveBackground"
            dark
            small
            block
            v-on="on"
            style="text-shadow: black 1px 1px; padding: 20px"
          >
            Background Colour
          </v-btn>
        </template>
        <v-color-picker
          dot-size="25"
          mode="rgba"
          v-model="interactiveBackground"
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
        label="Theme"
        outlined
      ></v-select>

    </v-expansion-panel-content>
  </v-expansion-panel>

</template>

<script>
export default {
name: "InteractiveEditor",
  data() {
    return {
      interactiveBackground: 'rgb(1, 90, 239, 1)'
    }
  }
}
</script>

<style lang="scss">

</style>
