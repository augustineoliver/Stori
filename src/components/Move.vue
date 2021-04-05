<template>
  <Moveable
    :ref="tgt"
    :class="'moveableObj ' + tgt"
    :style="elementPosition"
    v-bind="moveable"
    @drag="handleDrag"
    @resize="handleResize"
    @rotate="handleRotate"
  ></Moveable>
</template>

<script>
import Moveable from "vue-moveable";
export default {
  name: "MoveView",
  props: ["type", "tgt", "dataHtml", "elementPosition"],

  mounted() {
    const moveable = this.$refs[this.$props.tgt];
    setTimeout(() => {
      this.$parent.selectedMovable = moveable.moveable;
      moveable.$el.style.cssText = this.elementPosition
        ? this.elementPosition
        : "top: 50%;left: 50%;transform:translate(-50%,-50%);";
      moveable.$el.style.clipPath = "inset(0px)";
      if (this.$props.type == "text") {
        moveable.$el.textContent = this.$props.dataHtml.textContent;
        moveable.$el.style.cssText =
          moveable.$el.style.cssText + this.$props.dataHtml.style.cssText;
        moveable.$el.id = this.$props.dataHtml.id;
      } else if (this.$props.type == "unsplashPhotos") {
        var img = new Image();
        img.onload = () => {
          setTimeout(() => {
            var elementHeight = this.$props.dataHtml.getBoundingClientRect()
              .height;
            var elementWidth = this.$props.dataHtml.getBoundingClientRect()
              .width;

            console.log(this.$props.dataHtml.getBoundingClientRect());


            this.imageOriginalDimension.height = elementHeight;
            this.imageOriginalDimension.width = elementWidth;

            moveable.$el.children[0].width = elementWidth;
            moveable.$el.children[0].height = elementHeight;
            moveable.$el.children[0].style.objectFit = 'cover';

            moveable.$el.style.width = elementWidth;
            moveable.$el.style.height = elementHeight;
            moveable.moveable.updateTarget();
            moveable.moveable.updateRect();
          }, 10);
        };
        img.src = this.$props.dataHtml.src;

        moveable.$el.appendChild(this.$props.dataHtml);
      } else {
        moveable.$el.appendChild(this.$props.dataHtml);
        moveable.$el.style.width = "100%";
        moveable.$el.children[0].addEventListener(
          "loadeddata",
          () => {
            moveable.moveable.updateTarget();
            moveable.moveable.updateRect();
          },
          false
        );
      }
      moveable.moveable.updateTarget();
      moveable.moveable.updateRect();
      moveable.moveable
        .on("clip", e => {
          if (e.clipType === "rect") {
            e.target.style.clip = e.clipStyle;
          } else {
            e.target.style.clipPath = e.clipStyle;
          }
        })
        .on("dragStart", ({ target }) => {
          document
            .getElementsByClassName("moveable-control")
            .forEach(element => {
              element.style.display = "none";
            });
          document.getElementsByClassName("moveable-line").forEach(element => {
            element.style.display = "none";
          });
          target.nextElementSibling
            .getElementsByClassName("moveable-control")
            .forEach(element => {
              element.style.display = "block";
            });
          target.nextElementSibling
            .getElementsByClassName("moveable-line")
            .forEach(element => {
              element.style.display = "block";
            });
        })
        .on("click", ({ target }) => {
          document
            .getElementsByClassName("moveable-control")
            .forEach(element => {
              element.style.display = "none";
            });
          document.getElementsByClassName("moveable-line").forEach(element => {
            element.style.display = "none";
          });
          target.nextElementSibling
            .getElementsByClassName("moveable-control")
            .forEach(element => {
              element.style.display = "block";
            });
          target.nextElementSibling
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
              text.style.zIndex = "999999";
              text.onblur = () => {
                text.contentEditable = false;
                text.style.position = "";
                text.style.zIndex = "";
              };
              break;
            case "unsplashPhotos":
              var photo = target.children[0];
              this.$parent.selectElement("image", photo.id);
              this.$parent.selectedImageSrc = photo.src;
              this.$parent.alwaysOnTop(photo);
              break;
            case "callToActionButtons":
              var button = target.children[0];
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
        })
        .on("rotateStart", e => {
          e.set(this.frame.rotate);
        })
        .on("resizeStart", e => {
          e.setOrigin(["%", "%"]);

          const style = window.getComputedStyle(e.target);
          const cssWidth = parseFloat(style.width);
          const cssHeight = parseFloat(style.height);

          e.set([cssWidth, cssHeight]);

          e.dragStart && e.dragStart.set(this.frame.translate);
        })
        .on("resizeEnd", e => {
          this.imageOriginalDimension.height = e.target.children[0].height;
          this.imageOriginalDimension.width = e.target.children[0].width;
          this.timeResized = 0;
          if (
            e.lastEvent.width &&
            e.target.children[0].width < e.lastEvent.width
          ) {
            e.target.style.width = `${e.target.children[0].width}px`;
          }
        });
        console.log(this.$props.type);
    }, 100);
  },
  data() {
    return {
      frame: {
        translate: [0, 0],
        rotate: 0
      },
      moveable: {
        target: this.$refs[this.$props.tgt],
        container: this.$parent.$refs.page,
        bounds: { left: this.$parent.$refs.page.offsetLeft, top: this.$parent.$refs.page.offsetTop, bottom: this.$parent.$refs.page.offsetTop + this.$parent.$refs.page.offsetHeight, right: this.$parent.$refs.page.offsetLeft + this.$parent.$refs.page.offsetWidth },
        throttleResize: 0,
        draggable: true,
        resizable: true,
        keepRatio: false,
        checkInput: true,
        padding: { left: 0, top: 0, right: 0, bottom: 0 },
        scalable: false,
        renderDirections: ["n", "s", "w", "e", "nw", "ne", "sw", "se"],
        dragArea: true,
        rotatable: true,
        snappable: true,
        pinchable: true,
        warpabale: true,
        origin: false,
        baseDirection: [1,1],
        edge: false
      },
      imageOriginalDimension: {
        height: 0,
        width: 0
      },

      translateIncrementalCache: {
        x: 0,
        y: 0
      },
    };
  },
  methods: {
    handleDrag({ target, transform }) {
      target.style.transform = transform;
      const style = getComputedStyle(target);
      const matrix = new DOMMatrix(style.webkitTransform);
      const scale = matrix.m11;
      this.frame.translate = [matrix.m41 * scale, matrix.m42 * scale, 0];
    },

    handleResize(e) {
        const beforeTranslate = e.drag.beforeTranslate;
        this.frame.translate = beforeTranslate;

        e.target.style.width = `${e.width}px`;
        e.target.style.height = `${e.height}px`;

        if (
          e.target.childNodes[0].nodeName == "IMG" ||
          e.target.childNodes[0].nodeName == "VIDEO"
        ) {
          e.target.children[0].style.objectFit = "cover";

          if (e.width > this.imageOriginalDimension.width) {
            e.target.children[0].style.width = `${e.width}px`;
            e.target.children[0].style.transform = `translate(0px)`;
          } else if (e.direction[0] == -1) {
            e.target.children[0].style.transform = `translate(${e.dist[0]}px, ${this.translateIncrementalCache.y}px)`;
            this.translateIncrementalCache.x = e.dist[0];
          }

          if (e.height > this.imageOriginalDimension.height) {
            e.target.children[0].style.height = `${e.height}px`;
            e.target.children[0].style.transform = `translate(${this.translateIncrementalCache.x}px, 0px)`;
          }
          else if (e.direction[1] == -1) {
            e.target.children[0].style.transform = `translate(${this.translateIncrementalCache.x}px, ${e.dist[1]}px)`;
            this.translateIncrementalCache.y = e.dist[1];
          }
        }

        e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    },

    handleRotate(e) {
      this.frame.rotate = e.beforeRotate;
      e.target.style.transform = `translate(${this.frame.translate[0]}px, ${this.frame.translate[1]}px) rotate(${e.beforeRotate}deg)`;
    }
  },
  components: {
    Moveable
  }
};
</script>
