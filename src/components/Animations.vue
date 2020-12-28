<template>
<v-expansion-panel>
  <v-expansion-panel-header color="#202125">
    Animations
  </v-expansion-panel-header>
  <v-expansion-panel-content color="#202125">

    <div>
      <v-select
        :items="[
            {text: 'Awareness', disable: true},
            {text: 'Bounce', value: 'animate__bounce'},
            {text: 'Flash', value: 'animate__flash'},
            {text: 'Pulse', value: 'animate__pulse'},
            {text: 'Rubber Band', value: 'animate__rubberBand'},
            {text: 'ShakeX', value: 'animate__shakeX'},
            {text: 'ShakeY', value: 'animate__shakeY'},
            {text: 'Head Shake', value: 'animate__headShake'},
            {text: 'Swing', value: 'animate__swing'},
            {text: 'Tada', value: 'animate__tada'},
            {text: 'Wobble', value: 'animate__wobble'},
            {text: 'Jello', value: 'animate__jello'},
            {text: 'Heart Beat', value: 'animate__heartBeat'},
        //    ************************************************ Back entrances
            {text: 'Back entrances', disable: true},
            {text: 'Back In Down', value: 'animate__backInDown'},
            {text: 'Back In Left', value: 'animate__backInLeft'},
            {text: 'Back In Right', value: 'animate__backInRight'},
            {text: 'Back In Up', value: 'animate__backInUp'},
        //    ************************************************ Back exits
            {text: 'Back exits', disable: true},
            {text: 'Back Out Down', value: 'animate__backOutDown'},
            {text: 'Back Out Left', value: 'animate__backOutLeft'},
            {text: 'Back Out Right', value: 'animate__backOutRight'},
            {text: 'Back Out Up', value: 'animate__backOutUp'},
        //    ************************************************ Bouncing entrances
            {text: 'Bouncing entrances', disable: true},
            {text: 'Bounce In', value: 'animate__bounceIn'},
            {text: 'Bounce In Down', value: 'animate__bounceInDown'},
            {text: 'Bounce In Left', value: 'animate__bounceInLeft'},
            {text: 'Bounce In Right', value: 'animate__bounceInRight'},
            {text: 'Bounce In Up', value: 'animate__bounceInUp'},
        //    ************************************************ Bouncing exits
            {text: 'Bouncing exits', disable: true},
            {text: 'Bounce Out', value: 'animate__bounceOut'},
            {text: 'Bounce Out Down', value: 'animate__bounceOutDown'},
            {text: 'Bounce Out Left', value: 'animate__bounceOutLeft'},
            {text: 'Bounce Out Right', value: 'animate__bounceOutRight'},
            {text: 'Bounce Out Up', value: 'animate__bounceOutUp'},
      //    ************************************************ Fading entrances
            {text: 'Fading entrances', disable: true},
            {text: 'Fade In ', value: 'animate__fadeIn'},
            {text: 'Fade In Down', value: 'animate__fadeInDown'},
            {text: 'Fade In Down Big', value: 'animate__fadeInDownBig'},
            {text: 'Fade In Left', value: 'animate__fadeInLeft'},
            {text: 'Fade In Left Big', value: 'animate__fadeInLeftBig'},
            {text: 'Fade In Right', value: 'animate__fadeInRight'},
            {text: 'Fade In Right Big', value: 'animate__fadeInRightBig'},
            {text: 'Fade In Up', value: 'animate__fadeInUp'},
            {text: 'Fade In Up Big', value: 'animate__fadeInUpBig'},
            {text: 'Fade In Top Left', value: 'animate__fadeInTopLeft'},
            {text: 'Fade In Top Right', value: 'animate__fadeInTopRight'},
            {text: 'Fade In Bottom Left', value: 'animate__fadeInBottomLeft'},
            {text: 'Fade In Bottom Right', value: 'animate__fadeInBottomRight'},
      //    ************************************************ Fading exits
            {text: 'Fading exits', disable: true},
            {text: 'Fade Out ', value: 'animate__fadeOut'},
            {text: 'Fade Out Down', value: 'animate__fadeOutDown'},
            {text: 'Fade Out Down Big', value: 'animate__fadeOutDownBig'},
            {text: 'Fade Out Left', value: 'animate__fadeOutLeft'},
            {text: 'Fade Out Left Big', value: 'animate__fadeOutLeftBig'},
            {text: 'Fade Out Right', value: 'animate__fadeOutRight'},
            {text: 'Fade Out Right Big', value: 'animate__fadeOutRightBig'},
            {text: 'Fade Out Up', value: 'animate__fadeOutUp'},
            {text: 'Fade Out Up Big', value: 'animate__fadeOutUpBig'},
            {text: 'Fade Out Top Left', value: 'animate__fadeOutTopLeft'},
            {text: 'Fade Out Top Right', value: 'animate__fadeOutTopRight'},
            {text: 'Fade Out Bottom Right', value: 'animate__fadeOutBottomRight'},
            {text: 'Fade Out Bottom Left', value: 'animate__fadeOutBottomLeft'},
      //    ************************************************ Flippers
            {text: 'Flippers', disable: true},
            {text: 'Flip', value: 'animate__flip'},
            {text: 'Flip In X', value: 'animate__flipInX'},
            {text: 'Flip In Y', value: 'animate__flipInY'},
            {text: 'Flip Out X', value: 'animate__flipOutX'},
            {text: 'Flip Out Y', value: 'animate__flipOutY'},
      //    ************************************************ Lightspeed
            {text: 'Lightspeed', disable: true},
            {text: 'LightSpeedInRight', value: 'animate__lightSpeedInRight'},
            {text: 'LightSpeedInLeft', value: 'animate__lightSpeedInLeft'},
            {text: 'LightSpeedOutRight', value: 'animate__lightSpeedOutRight'},
            {text: 'LightSpeedOutLeft', value: 'animate__lightSpeedOutLeft'},
      //    ************************************************ Rotating entrances
            {text: 'Rotating entrances', disable: true},
            {text: 'Rotate In', value: 'animate__rotateIn'},
            {text: 'Rotate In Down Left', value: 'animate__rotateInDownLeft'},
            {text: 'Rotate In Down Right', value: 'animate__rotateInDownRight'},
            {text: 'Rotate In Up Left', value: 'animate__rotateInUpLeft'},
            {text: 'Rotate In Up Right', value: 'animate__rotateInUpRight'},
      //    ************************************************ Rotating exits
            {text: 'Rotating exits', disable: true},
            {text: 'Rotate Out', value: 'animate__rotateOut'},
            {text: 'Rotate Out Down Left', value: 'animate__rotateOutDownLeft'},
            {text: 'Rotate Out Down Right', value: 'animate__rotateOutDownRight'},
            {text: 'Rotate Out Up Left', value: 'animate__rotateOutUpLeft'},
            {text: 'Rotate Out Up Right', value: 'animate__rotateOutUpRight'},
      //    ************************************************ Specials
            {text: 'Specials', disable: true},
            {text: 'Hinge', value: 'animate__hinge'},
            {text: 'JackInTheBox', value: 'animate__jackInTheBox'},
            {text: 'RollIn', value: 'animate__rollIn'},
            {text: 'RollOut', value: 'animate__rollOut'},
      //    ************************************************ Zooming entrances
            {text: 'Zooming entrances', disable: true},
            {text: 'Zoom In', value: 'animate__zoomIn'},
            {text: 'Zoom In Down', value: 'animate__zoomInDown'},
            {text: 'Zoom In Left', value: 'animate__zoomInLeft'},
            {text: 'Zoom In Right', value: 'animate__zoomInRight'},
            {text: 'Zoom In Up', value: 'animate__zoomInUp'},
      //    ************************************************ Zooming exits
            {text: 'Zooming exits', disable: true},
            {text: 'Zoom Out', value: 'animate__zoomOut'},
            {text: 'Zoom Out Down', value: 'animate__zoomOutDown'},
            {text: 'Zoom Out Left', value: 'animate__zoomOutLeft'},
            {text: 'Zoom Out Right', value: 'animate__zoomOutRight'},
            {text: 'Zoom Out Up', value: 'animate__zoomOutUp'},
      //    ************************************************ Sliding entrances
            {text: 'Sliding entrances', disable: true},
            {text: 'Slide In Down', value: 'animate__slideInDown'},
            {text: 'Slide In Left', value: 'animate__slideInLeft'},
            {text: 'Slide In Right', value: 'animate__slideInRight'},
            {text: 'Slide In Up', value: 'animate__slideInUp'},
      //    ************************************************ Sliding exits
            {text: 'Sliding exits', disable: true},
            {text: 'Slide Out Down', value: 'animate__slideOutDown'},
            {text: 'Slide Out Left', value: 'animate__slideOutLeft'},
            {text: 'Slide Out Right', value: 'animate__slideOutRight'},
            {text: 'Slide Out Up', value: 'animate__slideOutUp'},
        ]"
        item-disabled="disable"
        @change="addAnimationToElement"
        v-model="animation"
        label="Effects"
        outlined
        dense
      ></v-select>
    </div>

    <div>
      <span>Duration:</span>
      <v-slider
        v-model="duration"
        thumb-label
        min="0.5"
        max="10"
        @input="changeDuration"
       track-fill-color="#519EF4"
        thumb-color="#519EF4"
        step="0.5"
      ></v-slider>
    </div>

    <div>
      <span>Delay:</span>
      <v-slider
        v-model="delay"
        thumb-label
        min="0.5"
        max="60"
        @input="setDelay"
       track-fill-color="#519EF4"
        thumb-color="#519EF4"
        step="0.5"
      ></v-slider>
    </div>

    <div>
      <span>Repeat:</span>
      <v-slider
        v-model="repeat"
        thumb-label
        min="1"
        max="120"
        @input="animationrepeat"
       track-fill-color="#519EF4"
        thumb-color="#519EF4"
      ></v-slider>
    </div>


  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
export default {
  name: "Animations",
  data() {
    return {
      animation: undefined,
      duration: undefined,
      delay: undefined,
      repeat: undefined,
    }
  },
  props: {
    selectedElement: null
  },
  methods: {
    addAnimationToElement() {
      const element = document.getElementById(this.selectedElement.id);
      element.classList.remove(element.getAttribute('data-animated'));
      element.setAttribute('data-animated', this.animation)
      element.classList.add('animate__animated')
      element.classList.add(this.animation);
    },

    changeDuration() {
      const element = document.getElementById(this.selectedElement.id);
      element.style.setProperty('--animate-duration', this.duration + 's')
    },

    animationrepeat() {
      const element = document.getElementById(this.selectedElement.id);
      element.style.setProperty('animation-iteration-count', this.repeat)
    },

    setDelay() {
      const element = document.getElementById(this.selectedElement.id);
      element.style.setProperty('animation-delay', this.delay + 's')
    }
  }
}
</script>

<style scoped>

</style>
