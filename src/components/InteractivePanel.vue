<template>
  <div>
      <!--    <h4>Binary Poll</h4>-->
    <div class="binaryInteraction" v-on:click="isBinaryPool = true; interactionType = 'binaryPoll'; isModalActive = true">
      <div class="question">
        Like Pizza?
      </div>
      <div class="options">
        <div>Yes</div>
        <div>No</div>
      </div>
    </div>

<!--    <h4>Poll</h4>-->


<!--        endpoint="https://backend.com/v1/interactives"-->
<!--        prompt-text="Pick a season"-->
<!--        option-1-text="Spring" option-1-confetti="🌼"-->
<!--        option-2-text="Summer" option-2-confetti="☀"-->
<!--        option-3-text="Fall" option-3-confetti="🍁"-->
<!--        option-4-text="Winter" option-4-confetti="☃">-->
    <div class="pollInteraction"  v-on:click="isBinaryPool = false; interactionType = 'poll'; isModalActive = true">
      <div class="question">
        Pick a season
      </div>
      <div class="options">
        <div>Spring</div>
        <div>Summer</div>
        <div>Fall</div>
        <div>Winter</div>
      </div>
    </div>


    <div class="pollInteraction"  v-on:click="isBinaryPool = false; interactionType = 'quiz'; isModalActive = true">
      <div class="question">
        Who was the artist that created the famous painting "The Last Supper"?
      </div>
      <div class="options">
        <div>
          <div>
            <span>A</span>
          </div>
          Michelangelo
        </div>
        <div>
          <div>
            <span>B</span>
          </div>
          Leonardo da Vinci
        </div>
        <div>
          <div>
            <span>C</span>
          </div>
          Rahael
        </div>
        <div>
          <div>
            <span>D</span>
          </div>
          Sandro Boticelli
        </div>
      </div>
    </div>

    <InteractiveModal v-if="isModalActive === true" :is-binary-pool="isBinaryPool" :interaction-type="interactionType"></InteractiveModal>
  </div>
</template>

<script>
import InteractiveModal from '@/components/InteractiveModal'
export default {
name: "InteractivePanel",
  data() {
    return {
      isModalActive: false,
      isBinaryPool: undefined,
      interactionType: undefined,
    }
  },

  methods: {
    dragMedia(evt) {
      this.$parent.draggedElement = evt.target;
    },
  },

  components: {
    InteractiveModal
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
    color: black;

    div {
      position: relative !important;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1 1 100%;
      font-weight: 900;
      font-size: 1.5em;
      color: inherit;
      padding: 20px;
      &:first-child {
        border-right: 1px solid #EAEAEA;
      }
    }
  }
}

.pollInteraction {
  width: 250px;
  margin: 20px 35px;
  border-radius: 40px 40px 20px 20px;
  background: #0259ED;
  height: max-content;

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
    min-height: 65px;
    padding: 15px 10px;
    height: max-content;
  }

  .options {
    position: relative !important;
    width: 100%;
    height: max-content;
    border-radius: 20px;
    background: white;
    //display: flex;
    color: black;
    padding: 10px;

    > div {
      position: relative !important;
      box-shadow: 0 0 2px #7c7c7c;
      margin: 10px auto;
      border-radius: 10px;
      box-sizing: border-box;
      font-weight: 500;
      font-size: 1em;
      color: inherit;
      padding: 10px;
      div {
        span {
          //position: absolute;
          border-radius: 100%;
          width: 20px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #0a81be;
          padding: 12px;
        }
      }
      &:first-child {
        border-right: 1px solid #EAEAEA;
      }
    }
  }
}


</style>
