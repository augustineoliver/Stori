<template>
  <div class="move-container" ref="moveContainer">
    <moveable
      class="dragHandler"
      v-bind="moveableOne"
      @drag="handleDrag"
      @resize="handleResize"
      @rotate="handleRotate"
      ref="dragHandler"
    />
    <div v-if="type != 'text'" class="contentContainer" ref="contentContainer">
      <img
        v-if="type == 'unsplashPhotos' || 'uploadedMedia' "
        class="content"
        style="object-fit: cover;"
        ref="imageContent"
      />
      <video v-if="type == 'pexelsVideo'" width="500" height="400" ref="videoContent" class="content">
        <source type="video/mp4">
        Your browser does not support HTML video.
      </video>
    </div>

    <div v-if="type == 'text' || type == 'callToActionButtons'" class="writeUpContainer" ref="writeUpContainer">
    </div>
  </div>
</template>

<script>
import Moveable from "vue-moveable";

export default {
  name: "MoveV2",
  components: {
    Moveable
  },

  props: ["type", "tgt", "dataHtml", "elementPosition"],

  data() {
    return {
      moveableOne: {
        draggable: true,
        resizable: true,
        rotatable: true,
        container: this.$parent.$refs.page,
        bounds: {
          left: this.$parent.$refs.page.offsetLeft,
          top: this.$parent.$refs.page.offsetTop,
          bottom:
            this.$parent.$refs.page.offsetTop +
            this.$parent.$refs.page.offsetHeight,
          right:
            this.$parent.$refs.page.offsetLeft +
            this.$parent.$refs.page.offsetWidth
        }
      },

      contentType: "Image",
      textType: "heading",

      visibleDimension: {
        width: 0,
        height: 0
      }
    };
  },

  mounted() {
    const moveContainer = this.$refs.moveContainer;

    moveContainer.style.cssText =
      "top: 50%;left: 50%;transform:translate(-50%,-50%);";

    moveContainer.onclick = e => {
      this.handleClick(e);
    };

    const dragHandler = this.$refs.dragHandler;
    dragHandler.moveable.on("resizeEnd", () => {
      if (this.contentType != "text") {
        const contentContainer = this.$refs.contentContainer;
        this.visibleDimension.width = contentContainer.clientWidth;
        this.visibleDimension.height = contentContainer.clientHeight;
      }
    });

    if (
      this.$props.type == "unsplashPhotos"
    ) {
      this.$refs.imageContent.src = this.$props.dataHtml.src;

      this.$refs.imageContent.onload = () => {
        const imageHeight = this.$refs.imageContent.getBoundingClientRect()
          .height;
        const imageWidth = this.$refs.imageContent.getBoundingClientRect()
          .width;

        const aspectRatio = imageHeight / imageWidth;

        const elementWidth = 300;
        const elementHeight = aspectRatio * elementWidth;

        dragHandler.$el.style.width = `${elementWidth}px`;
        dragHandler.$el.style.height = `${elementHeight}px`;

        moveContainer.style.width = `${elementWidth}px`;
        moveContainer.style.height = `${elementHeight}px`;

        this.visibleDimension.width = elementWidth;
        this.visibleDimension.height = elementHeight;

        this.$refs.imageContent.style.objectFit = "cover";
        this.$refs.imageContent.style.width = `${elementWidth}px`;
        this.$refs.imageContent.style.height = `${elementHeight}px`;

        this.$refs.imageContent.id = this.$props.dataHtml.id;

        dragHandler.updateRect();
      };
    } else if (this.$props.type == "text") {
      const dragHandler = this.$refs.dragHandler;
      dragHandler.$el.style.width = `200px`;
      dragHandler.$el.style.height = `100px`;

      moveContainer.style.width = `200px`;
      moveContainer.style.height = `100px`;

      const writeUpContainer = this.$refs.writeUpContainer;
      writeUpContainer.style.width = `200px`;
      writeUpContainer.style.height = `100px`;
      writeUpContainer.textContent = this.$props.dataHtml.textContent;
      writeUpContainer.style.cssText =
        writeUpContainer.style.cssText + this.$props.dataHtml.style.cssText;
      writeUpContainer.id = this.$props.dataHtml.id;
      dragHandler.updateRect();
    } else if(
      this.$props.type == "pexelsVideo"){
        this.$refs.videoContent.children[0].src = this.$props.dataHtml.children[0].src
        
        const elementWidth = this.$refs.videoContent.getBoundingClientRect().width;
        const elementHeight = this.$refs.videoContent.getBoundingClientRect().height;
        
        dragHandler.$el.style.width = `${elementWidth}px`;
        dragHandler.$el.style.height = `${elementHeight}px`;

        moveContainer.style.width = `${elementWidth}px`;
        moveContainer.style.height = `${elementHeight}px`;

        this.visibleDimension.width = elementWidth;
        this.visibleDimension.height = elementHeight;

        this.$refs.imageContent.style.objectFit = "cover";
        this.$refs.imageContent.style.width = `${elementWidth}px`;
        this.$refs.imageContent.style.height = `${elementHeight}px`;

        this.$refs.imageContent.id = this.$props.dataHtml.id;

        dragHandler.updateRect()
      } else {
        const writeUpContainer = this.$refs.writeUpContainer;

        const elementWidth = 100;
        const elementHeight = 50;
        
        dragHandler.$el.style.width = `${elementWidth}px`;
        dragHandler.$el.style.height = `${elementHeight}px`;

        moveContainer.style.width = `${elementWidth}px`;
        moveContainer.style.height = `${elementHeight}px`;

        this.$props.dataHtml.ref = "button";

        writeUpContainer.appendChild(this.$props.dataHtml)
        dragHandler.updateRect()
      }
  },

  methods: {
    handleDrag({ target, transform }) {
      target.style.transform = transform;
      if (this.$props.type == "text" || this.$props.type == "callToActionButtons") {
        const writeUpContainer = this.$refs.writeUpContainer;
        writeUpContainer.style.transform = transform;
      } else {
        const contentContainer = this.$refs.contentContainer;
        contentContainer.style.transform = transform;
      }
    },

    handleRotate({ target, transform }) {
      //   this.frame.rotate = e.beforeRotate;
      //   e.target.style.transform = `translate(${this.frame.translate[0]}px, ${this.frame.translate[1]}px) rotate(${e.beforeRotate}deg)`;
      target.style.transform = transform;
      const contentContainer =
        this.$props.type == "text" || this.$props.type == 'callToActionButtons'
          ? this.$refs.writeUpContainer
          : this.$refs.contentContainer;

      contentContainer.style.transform = transform;
    },

    handleResize({ target, width, height, direction, drag }) {
      const content = this.type == 'pexelsVideo' ? this.$refs.videoContent : this.$refs.imageContent;
      const contentContainer =
        this.$props.type == "text" || this.$props.type == 'callToActionButtons'
          ? this.$refs.writeUpContainer
          : this.$refs.contentContainer;

      if (this.$props.type == "text" || this.$props.type == "callToActionButtons") {
       
        if(this.$props.type == 'callToActionButtons'){
          const button = contentContainer.children[0];
          if(direction[0] == 1){
            button.style.width = `${width}px`;
          }
          
          if(direction[1] == 1){
            button.style.height = `${height}px`;
          }
        }

        contentContainer.style.width = `${width}px`;
        contentContainer.style.height = `${height}px`;
      } else {
        if (direction[0] == 1) {
          if (contentContainer.clientWidth > this.visibleDimension.width) {
            content.style.width = `${width}px`;
            content.style.left = "0px";
          }

          contentContainer.style.width = `${width}px`;

          contentContainer.style.transform =
            "translate(" +
            drag.beforeTranslate[0] +
            "px, " +
            drag.beforeTranslate[1] +
            "px";
        }

        if (direction[0] == -1) {
          if (contentContainer.clientWidth > this.visibleDimension.width) {
            content.style.width = `${width}px`;
          } else {
            content.style.left =
              contentContainer.clientWidth - this.visibleDimension.width + "px";
          }

          contentContainer.style.width = `${width}px`;
          contentContainer.style.transform =
            "translate(" +
            drag.beforeTranslate[0] +
            "px, " +
            drag.beforeTranslate[1] +
            "px";
        }

        if (direction[1] == 1) {
          if (contentContainer.clientHeight > this.visibleDimension.height) {
            content.style.height = `${height}px`;
            content.style.top = "0px";
          }

          contentContainer.style.height = `${height}px`;
          contentContainer.style.transform =
            "translate(" +
            drag.beforeTranslate[0] +
            "px, " +
            drag.beforeTranslate[1] +
            "px";
        }

        if (direction[1] == -1) {
          if (contentContainer.clientHeight > this.visibleDimension.height) {
            content.style.height = `${height}px`;
          } else {
            content.style.top =
              contentContainer.clientHeight -
              this.visibleDimension.height +
              "px";
          }

          contentContainer.style.height = `${height}px`;
          contentContainer.style.transform =
            "translate(" +
            drag.beforeTranslate[0] +
            "px, " +
            drag.beforeTranslate[1] +
            "px";
        }
      }

      target.style.width = `${width}px`;
      target.style.height = `${height}px`;

      target.style.transform =
        "translate(" +
        drag.beforeTranslate[0] +
        "px, " +
        drag.beforeTranslate[1] +
        "px";
    },

    handleClick({ target }) {
      document.getElementsByClassName("moveable-control").forEach(element => {
        element.style.display = "none";
      });
      document.getElementsByClassName("moveable-line").forEach(element => {
        element.style.display = "none";
      });
      const element = this.$refs.moveContainer;
      element.nextElementSibling
        .getElementsByClassName("moveable-control")
        .forEach(element => {
          element.style.display = "block";
        });
      element.nextElementSibling
        .getElementsByClassName("moveable-line")
        .forEach(element => {
          element.style.display = "block";
        });

      switch (this.$props.type) {
        case "text":
          var text = target;
          this.$parent.selectElement("text", text.id);
          text.contentEditable = true;
          text.style.position = "relative";
          // text.style.zIndex = "999999";
          text.onblur = () => {
            text.contentEditable = false;
            text.style.position = "";
            text.style.zIndex = "";
          };
          break;
        case "unsplashPhotos":
          var photo = this.$refs.imageContent;
          console.log(photo.src);
          this.$parent.selectElement("image", photo.id);
          this.$parent.selectedImageSrc = photo.src;
          this.$parent.alwaysOnTop(photo);
          break;
        case "callToActionButtons":
          var button = this.$refs.writeUpContainer.children[0];
          this.$parent.$store.commit("setSelectedButton", {
            title: button.innerHTML.trim(),
            url: button.getAttribute("data-href").trim(),
            background: button.style.background.trim(),
            textColour: button.style.color.trim()
          });
          this.selectElement("callToActionButtons", button.id);
          this.selectedButtonData = {
            title: button.innerHTML,
            url: button.getAttribute("data-href")
          };
          break;
        default:
          break;
      }
    },

  }
};
</script>


<style scoped>
.move-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.dragHandler {
  z-index: 3;
  position: absolute;
  left: 0px;
  top: 0px;
}

.content {
  position: absolute;
  left: 0px;
  top: 0px;
  object-fit: cover;
}

.contentContainer {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}

.writeUpContainer {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 3;
  /* text-align: start; */
}

[contenteditable] {
  outline: 0px solid transparent;
  color: black;
}
</style>