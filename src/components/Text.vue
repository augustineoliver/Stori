<template>
  <v-tabs
    centered
    background-color="#1B1C1E"
  >
    <v-tab>Text</v-tab>
    <v-tab>Text Block</v-tab>

    <v-tab-item>
      <div class="normalText">
        <div draggable="true" data-type="heading" @mousedown="dragText($event)" style="height: 35px">Add a heading</div>
        <div draggable="true" data-type="subheading" @mousedown="dragText($event)" style="height: 40px">Add a subheading</div>
        <div draggable="true" data-type="normal" @mousedown="dragText($event)" style="height: 30px">Normal text</div>
      </div>
    </v-tab-item>

    <v-tab-item>
      Coming Soon
    </v-tab-item>


</v-tabs>
</template>

<script>
export default {
name: "Text",

  methods: {
    dragText(evt) {
      // console.log(evt);
      this.$parent.draggedElement = evt.target;
    },
  }
}
</script>

<style lang="scss">
.normalText {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;

  div {
    width: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
