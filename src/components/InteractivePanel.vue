<template>
  <div>
      <!--    <h4>Binary Poll</h4>-->
    <amp-story-interactive-binary-poll
        draggable="true"
        @mousedown="dragMedia($event)"
        class="binaryInteraction"
        endpoint="https://backend.com/v1/interactives"
        prompt-text="Like Pizza?"
        option-1-text="Yes"
        option-1-confetti="🍕"
        option-2-text="No"
        option-2-confetti="🤢"
    >
      <div class="question">
        Like Pizza?
      </div>
      <div class="options">
        <div>Yes</div>
        <div>No</div>
      </div>
    </amp-story-interactive-binary-poll>

<!--    <div>-->
<!--      <h4>Poll</h4>-->
<!--      <amp-story-interactive-poll-->
<!--          draggable="true"-->
<!--          @mousedown="dragMedia($event)"-->
<!--          class="pollInteraction"-->
<!--          endpoint="https://backend.com/v1/interactives"-->
<!--          prompt-text="Pick a season"-->
<!--          option-1-text="Spring" option-1-confetti="🌼"-->
<!--          option-2-text="Summer" option-2-confetti="☀"-->
<!--          option-3-text="Fall" option-3-confetti="🍁"-->
<!--          option-4-text="Winter" option-4-confetti="☃">-->
<!--      >-->

<!--      </amp-story-interactive-poll>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
name: "InteractivePanel",
  data() {
    return {

    }
  },

  methods: {
    dragMedia(evt) {
      this.$parent.draggedElement = evt.target;
    },
  }
}
</script>

<style lang="scss">
.binaryInteraction {
  width: 250px;
  height: 150px;
  margin: 20px 35px;
  border-radius: 40px 40px 20px 20px;
  background: #0259ED;

  &:hover {
    &:before {
      content: '';
      position: absolute;
      width: 250px;
      height: 150px;
      z-index: 1;
    }
  }
  .question {
    position: relative !important;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6em;
    font-weight: 600;
    padding: 0 50px;
    height: 65px;
  }

  .options {
    position: relative !important;
    width: 100%;
    height: 85px;
    border-radius: 20px;
    background: white;
    display: flex;

    div {
      position: relative !important;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1 1 100%;
      color: black;
      font-weight: 900;
      font-size: 1.5em;
      padding: 20px;
      &:first-child {
        border-right: 1px solid #EAEAEA;
      }
    }
  }
}
</style>
