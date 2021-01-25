<template>
<div id="interactiveModal" class="interactiveModal animate__animated animate__fadeInUp">
  <div class="overlay" @click="removeInteractiveMdal"></div>
  <div class="mainDiv">
    <template>
      <label>
        <span>Title</span>
        <input type="text">
      </label>
      <label style="flex: 1 1 100%">
        <span>Question</span>
        <input type="text">
      </label>
      <label>
        <span>Option 1</span>
        <input type="text">
      </label>
      <label>
        <span>Option 2</span>
        <input type="text">
      </label>
      <label>
        <span>Option 3</span>
        <input type="text">
      </label>
      <label>
        <span>Option 4</span>
        <input type="text">
      </label>

    </template>
  </div>
</div>
</template>

<script>
export default {
name: "InteractiveModal",

  methods: {
    removeInteractiveMdal() {
      const div = document.getElementById('interactiveModal')
      div.classList.remove('animate__fadeInUp')
      div.classList.add('animate__fadeOutDown')

      setTimeout(() => {
        this.$parent.isModalActive = false
      }, 600)
    }
  }
}
</script>

<style lang="scss">
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
    height: 80%;
    background: #1B1C1E;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
      input, textarea {
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
