<template>
<div id="interactiveModal" class="interactiveModal animate__animated animate__fadeInUp">
  <div class="overlay" @click="removeInteractiveModal"></div>
  <div class="mainDiv">
    <template>
      <label style="flex: 1 1 100%">
        <span>Question</span>
        <input type="text" v-model="question">
      </label>
      <label>
        <span>Option 1</span>
        <span class="inputBox">
          <input type="text" v-model="option1">
          <v-menu
            top
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color=""
                dark
                v-bind="attrs"
                v-on="on"
              >
                <span v-if="!option1Confetti">Emoji</span>
                <span style="font-size: 2em" v-if="option1Confetti">{{option1Confetti}}</span>
              </v-btn>
            </template>

            <picker title="" @select="showOption1Confetti" :data="emojiIndex" set="google" />
          </v-menu>
          <input v-if="interactionType === 'quiz'" type="radio" v-model="correctAnswer" value="option-1-correct">
        </span>
      </label>
      <label>
        <span>Option 2</span>
        <span class="inputBox">
          <input type="text" v-model="option2">
          <v-menu
            top
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color=""
                dark
                v-bind="attrs"
                v-on="on"
              >
                <span v-if="!option2Confetti">Emoji</span>
                <span style="font-size: 2em" v-if="option2Confetti">{{option2Confetti}}</span>
              </v-btn>
            </template>

            <picker title="" @select="showOption2Confetti" :data="emojiIndex" set="google" />
          </v-menu>
          <input v-if="interactionType === 'quiz'" type="radio" v-model="correctAnswer" value="option-2-correct">
        </span>
      </label>
      <label v-if="isBinaryPool === false">
        <span>Option 3 <small>(optional)</small></span>
        <span class="inputBox">
          <input type="text" v-model="option3">
          <v-menu
            top
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color=""
                dark
                v-bind="attrs"
                v-on="on"
              >
                <span v-if="!option3Confetti">Emoji</span>
                <span style="font-size: 2em" v-if="option3Confetti">{{option3Confetti}}</span>
              </v-btn>
            </template>

            <picker title="" @select="showOption3Confetti" :data="emojiIndex" set="google" />
          </v-menu>
          <input v-if="interactionType === 'quiz'" type="radio" v-model="correctAnswer" value="option-3-correct">
        </span>
      </label>
      <label v-if="isBinaryPool === false">
        <span>Option 4 <small>(optional)</small></span>
        <span class="inputBox">
          <input type="text" v-model="option4">
          <v-menu
            top
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color=""
                dark
                v-bind="attrs"
                v-on="on"
              >
                <span v-if="!option4Confetti">Emoji</span>
                <span style="font-size: 2em" v-if="option4Confetti">{{option4Confetti}}</span>
              </v-btn>
            </template>

            <picker title="" @select="showOption4Confetti" :data="emojiIndex" set="google" />
          </v-menu>
          <input v-if="interactionType === 'quiz'" type="radio" v-model="correctAnswer" value="option-4-correct">
        </span>

      </label>

      <v-btn block @click="saveQuiz" color="#519EF4">
        Save
      </v-btn>
    </template>
  </div>
</div>
</template>

<script>
import axios from "axios";
import data from 'emoji-mart-vue-fast/data/all.json'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'
let emojiIndex = new EmojiIndex(data)

export default {
name: "InteractiveModal",

  data() {
    return {
      baseUrl: process.env.VUE_APP_baseUrl,
      authToken: `Bearer ${localStorage.getItem('authToken')}`,
      theme: 'light',
      emojiIndex: emojiIndex,
      question: '',
      option1: '',
      option1Confetti: '',
      option2: '',
      option2Confetti: '',
      option3: '',
      option3Confetti: '',
      option4: '',
      option4Confetti: '',
      correctAnswer: ''
    }
  },

  props: {
    isBinaryPool: undefined,
    interactionType: undefined
  },

  methods: {
    showOption1Confetti(emoji) {
      this.option1Confetti = emoji.native;
    },
    showOption2Confetti(emoji) {
      this.option2Confetti = emoji.native;
    },
    showOption3Confetti(emoji) {
      this.option3Confetti = emoji.native;
    },
    showOption4Confetti(emoji) {
      this.option4Confetti = emoji.native;
    },

    removeInteractiveModal() {
      const div = document.getElementById('interactiveModal')
      div.classList.remove('animate__fadeInUp')
      div.classList.add('animate__fadeOutDown')

      setTimeout(() => {
        this.$parent.isModalActive = false
      }, 600)
    },

    saveQuiz() {
      console.log(this.interactionType)
      switch (this.interactionType) {
        case 'binaryPoll': this.createBinaryPoll(); break;
        case 'poll': this.createPoll(); break;
        case 'quiz': this.createQuiz();
      }
    },

    createBinaryPoll() {
      const payload = {
        user_id: localStorage.getItem('userId'),
        story_id: sessionStorage.getItem('storyId'),
        title: this.$parent.$parent.storyTitle + ' - ' + this.question,
        question: this.question,
        option1: this.option1,
        option2: this.option2
      }
      axios.post(`${this.baseUrl}binary/poll/create`, payload, {headers: {Authorization: this.authToken}})
          .then(res => {
            console.log('Binary Poll Created', res)
            const page = document.getElementById('page')
            const interactivePoll =  document.createElement('amp-story-interactive-binary-poll')

            interactivePoll.setAttribute('endpoint', `${this.baseUrl}quiz/${res.data.id}/show`);
            interactivePoll.setAttribute('theme', this.theme);
            interactivePoll.setAttribute('prompt-text', this.question);

            interactivePoll.setAttribute('option-1-text', this.option1);
            interactivePoll.setAttribute('option-1-confetti', this.option1Confetti);
            interactivePoll.setAttribute('option-2-text', this.option2);
            interactivePoll.setAttribute('option-2-confetti', this.option2Confetti);

            interactivePoll.dataset.data = `{theme: ${this.theme}, prompt-text: ${this.question}, option-1-text: ${this.option1}, option-1-confetti: ${this.option1Confetti}, option-2-text: ${this.option2}, option-2-confetti: ${this.option2Confetti}, option-3-text: ${this.option3}, option-3-confetti: ${this.option3Confetti}, option-4-text: ${this.option4}, option-4-confetti: ${this.option4Confetti}}`
            interactivePoll.style.width = '250px';
            interactivePoll.style.display = 'block';
            interactivePoll.style.overflow = 'hidden';
            interactivePoll.style.position = 'absolute';
            interactivePoll.classList.add('binaryInteraction', 'resize-drag')
            interactivePoll.id = Date.now().toString()
            interactivePoll.innerHTML = `<div class="question"> ${this.question} </div><div class="options" style="background: ${this.theme === "dark" ? '#202124' : ''}; color: ${this.theme === "dark" ? '#ffffff' : ''}"><div>${this.option1}</div><div>${this.option2}</div></div>`

            page.appendChild(interactivePoll)
            this.$parent.$parent.updatePageStructure();
          })
    },

    createPoll() {
      const page = document.getElementById('page')
      const interactivePoll =  document.createElement('amp-story-interactive-poll')

      interactivePoll.setAttribute('endpoint', 'https://backend.com/v1/interactives');
      interactivePoll.setAttribute('theme', this.theme);
      interactivePoll.setAttribute('prompt-text', this.question);

      interactivePoll.setAttribute('option-1-text', this.option1);
      interactivePoll.setAttribute('option-1-confetti', this.option1Confetti);
      interactivePoll.setAttribute('option-2-text', this.option2);
      interactivePoll.setAttribute('option-2-confetti', this.option2Confetti);
      interactivePoll.setAttribute('option-3-text', this.option3);
      interactivePoll.setAttribute('option-3-confetti', this.option3Confetti);
      interactivePoll.setAttribute('option-4-text', this.option4);
      interactivePoll.setAttribute('option-4-confetti', this.option4Confetti);

      interactivePoll.dataset.data = `{theme: ${this.theme}, prompt-text: ${this.question}, option-1-text: ${this.option1}, option-1-confetti: ${this.option1Confetti}, option-2-text: ${this.option2}, option-2-confetti: ${this.option2Confetti}, option-3-text: ${this.option3}, option-3-confetti: ${this.option3Confetti}, option-4-text: ${this.option4}, option-4-confetti: ${this.option4Confetti}}`
      interactivePoll.style.width = '250px';
      // interactivePoll.style.height = '300px';
      interactivePoll.style.display = 'block';
      interactivePoll.style.overflow = 'hidden';
      interactivePoll.style.position = 'absolute';
      interactivePoll.classList.add('pollInteraction', 'resize-drag')
      interactivePoll.id = Date.now().toString()
      interactivePoll.innerHTML = `<div class="question"> ${this.question} </div><div class="options" style="background: ${this.theme === "dark" ? '#202124' : ''}; color: ${this.theme === "dark" ? '#ffffff' : ''}"><div>${this.option1}</div><div>${this.option2}</div><div>${this.option3}</div><div>${this.option4}</div></div>`

      page.appendChild(interactivePoll)
      this.$parent.$parent.updatePageStructure();

      const payload = {
        user_id: localStorage.getItem('userId'),
        story_id: sessionStorage.getItem('storyId'),
        title: this.$parent.$parent.storyTitle + ' - ' + this.question,
        question: this.question,
        option1: this.option1,
        option2: this.option2,
        option3: this.option3,
        option4: this.option4
      }
      axios.post(`${this.baseUrl}poll/create`, payload, {headers: {Authorization: this.authToken}})
          .then(res => {
            console.log('Binary Poll Created', res)
          })
    },

    createQuiz() {
      const page = document.getElementById('page')
      const interactiveQuiz =  document.createElement('amp-story-interactive-quiz')

      interactiveQuiz.setAttribute('endpoint', 'https://backend.com/v1/interactives');
      interactiveQuiz.setAttribute('theme', this.theme);
      interactiveQuiz.setAttribute('prompt-text', this.question);

      interactiveQuiz.setAttribute('option-1-text', this.option1);
      interactiveQuiz.setAttribute('option-1-confetti', this.option1Confetti);
      interactiveQuiz.setAttribute('option-2-text', this.option2);
      interactiveQuiz.setAttribute('option-2-confetti', this.option2Confetti);
      interactiveQuiz.setAttribute('option-3-text', this.option3);
      interactiveQuiz.setAttribute('option-3-confetti', this.option3Confetti);
      interactiveQuiz.setAttribute('option-4-text', this.option4);
      interactiveQuiz.setAttribute('option-4-confetti', this.option4Confetti);

      switch (this.correctAnswer) {
        case 'option-1-correct' : interactiveQuiz.setAttribute('option-1-correct', null); break;
        case 'option-2-correct' : interactiveQuiz.setAttribute('option-2-correct', null); break;
        case 'option-3-correct' : interactiveQuiz.setAttribute('option-3-correct', null); break;
        case 'option-4-correct' : interactiveQuiz.setAttribute('option-4-correct', null);
      }

      interactiveQuiz.dataset.data = `{theme: ${this.theme}, prompt-text: ${this.question}, option-1-text: ${this.option1}, option-1-confetti: ${this.option1Confetti}, option-2-text: ${this.option2}, option-2-confetti: ${this.option2Confetti}, option-3-text: ${this.option3}, option-3-confetti: ${this.option3Confetti}, option-4-text: ${this.option4}, option-4-confetti: ${this.option4Confetti}}`
      interactiveQuiz.style.width = '250px';
      interactiveQuiz.style.height = '300px';
      interactiveQuiz.style.display = 'block';
      interactiveQuiz.style.overflow = 'hidden';
      interactiveQuiz.style.position = 'absolute';
      interactiveQuiz.classList.add('pollInteraction', 'resize-drag')
      interactiveQuiz.id = Date.now().toString()
      interactiveQuiz.innerHTML = `
      <div class="question"> ${this.question} </div>
      <div class="options" style="background: ${this.theme === "dark" ? '#202124' : ''}; color: ${this.theme === "dark" ? '#ffffff' : ''}">
        <div>
          <div>
            <span>A</span>
          </div>
          <div>${this.option1}</div>
        </div>
        <div>
          <div>
            <span>A</span>
          </div>
          <div>${this.option2}</div>
        </div>
        <div>
          <div>
            <span>A</span>
          </div>
          <div>${this.option3}</div>
        </div>
        <div>
          <div>
            <span>A</span>
          </div>
          <div>${this.option4}</div>
        </div>
      </div>
      `

      page.appendChild(interactiveQuiz)
      this.$parent.$parent.updatePageStructure();

      const payload = {
        user_id: localStorage.getItem('userId'),
        story_id: sessionStorage.getItem('storyId'),
        title: this.$parent.$parent.storyTitle + ' - ' + this.question,
        question: this.question,
        option1: this.option1,
        option2: this.option2,
        option3: this.option3,
        option4: this.option4
      }
      axios.post(`${this.baseUrl}quiz/create`, payload, {headers: {Authorization: this.authToken}})
          .then(res => {
            console.log('Quiz Created', res)
          })
    },

  },

  components: {
    'Picker': Picker
  }
}
</script>

<style lang="scss">
@import '~emoji-mart-vue-fast/css/emoji-mart.css';

.interactiveModal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.9);
  z-index: 3000;

  .overlay {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }

  .mainDiv {
    width: 65%;
    max-width: 1050px;
    //height: 80%;
    background: #1B1C1E;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 100px;
    color: #a5d1e7;
    overflow-y: auto;
    z-index: 4000;

    label {
      display: flex;
      flex-direction: column;
      width: 48%;
      margin-bottom: 20px;
      span {
        display: block;
      }
      input[type='text'], textarea {
        display: block;
        width: 100%;
        height: 50px;
        border: solid 1px #a5d1e7;
        border-radius: 5px;
        outline: none;
        padding: 5px;
        color: #a5d1e7;
        font-size: 1.2em;

        &:focus {
          box-shadow: 0 0 5px #a5d1e7;
        }
      }
      .inputBox {
        display: flex;
        align-items: center;

        button {
          height: 50px;
          padding: 5px;
          margin: auto 5px;
        }

        input[type='text'], textarea {
          display: block;width: 100%;
          height: 50px;
          border: solid 1px #a5d1e7;
          border-radius: 5px;
          outline: none;
          padding: 5px;
          color: #a5d1e7;
          font-size: 1.2em;

          &:focus {
            box-shadow: 0 0 5px #a5d1e7;
          }
        }
        input[type='radio'] {
          width: 30px;
          height: 30px;
        }
      }
      .uploadImage {
        display: block;
        align-self: center;
        width: auto;
        height: 150px;
        border: 1px solid #a5d1e7;
        border-radius: 10px;
        margin: 20px;
        padding: 20px;
        font-size: 1.2em;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
