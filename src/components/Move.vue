<template>
    <Moveable
        :ref="tgt"
        :class="'moveableObj ' + tgt"
        :style="elementPosition"
        v-bind="moveable"
        @drag="handleDrag"
        @resize="handleResize"
        @scale="handleScale"
        @rotate="handleRotate"
        @warp="handleWarp"
    ></Moveable>
</template>

<script>

import Moveable from 'vue-moveable';
export default {
    name: 'MoveView',
    props: [ 'type', 'tgt', 'dataHtml', 'elementPosition' ],
    mounted(){
        const moveable = this.$refs[this.$props.tgt];
        setTimeout(() => {
            console.log(moveable);
            this.$parent.selectedMovable = moveable.moveable;
            moveable.$el.style.cssText = this.elementPosition ? this.elementPosition : 'top: 50%;left: 50%;transform:translate(-50%,-50%);'
            moveable.$el.style.clipPath = 'inset(0px)';
            if(this.$props.type == 'text'){
                moveable.$el.textContent = this.$props.dataHtml.textContent;
                console.log(this.$props.dataHtml.style);
                moveable.$el.style.cssText = moveable.$el.style.cssText + this.$props.dataHtml.style.cssText;
                moveable.$el.id = this.$props.dataHtml.id;
                //moveable.$el.style.width = this.$props.dataHtml.getBoundingClientRect().width;
                //moveable.$el.style.height = this.$props.dataHtml.getBoundingClientRect().height;
            } else if(this.$props.type == 'unsplashPhotos') {
                //console.log(this.$props.dataHtml);
                var img = new Image();
                img.onload = () => {
                    moveable.moveable.updateTarget();
                    moveable.moveable.updateRect();
                }
                img.src = this.$props.dataHtml.src;
               
                moveable.$el.appendChild(this.$props.dataHtml);
            } else {
                moveable.$el.appendChild(this.$props.dataHtml);
                moveable.$el.style.width = '100%';
                moveable.$el.children[0].addEventListener('loadeddata', () => {
                    moveable.moveable.updateTarget();
                    moveable.moveable.updateRect();
                }, false);
            }
            moveable.moveable.updateTarget();
            moveable.moveable.updateRect();
            
            //moveable.moveable.request("draggable", { x: 0, y: 0 });
            moveable.moveable.on("clip", e => {
                if (e.clipType === "rect") {
                    e.target.style.clip = e.clipStyle;
                } else {
                    e.target.style.clipPath = e.clipStyle;
                }
            }).on("dragStart",({ target }) => {
                document.getElementsByClassName("moveable-control").forEach(element => { element.style.display = 'none'; });
                document.getElementsByClassName("moveable-line").forEach(element => { element.style.display = 'none'; });
                target.nextElementSibling.getElementsByClassName("moveable-control").forEach(element => { element.style.display = 'block'; });
                target.nextElementSibling.getElementsByClassName("moveable-line").forEach(element => { element.style.display = 'block'; });
            }).on("click", ({ target }) => {
                document.getElementsByClassName("moveable-control").forEach(element => { element.style.display = 'none'; });
                document.getElementsByClassName("moveable-line").forEach(element => { element.style.display = 'none'; });
                target.nextElementSibling.getElementsByClassName("moveable-control").forEach(element => { element.style.display = 'block'; });
                target.nextElementSibling.getElementsByClassName("moveable-line").forEach(element => { element.style.display = 'block'; });
                switch(this.$props.type){
                    case 'text':
                        var text = target;
                        this.$parent.selectElement('text', text.id);
                        text.contentEditable = true;
                        text.style.position = 'relative';
                        text.style.zIndex = '999999';
                        text.onblur = () => {
                            text.contentEditable = false;
                            text.style.position = '';
                            text.style.zIndex = '';
                        }
                    break;
                    case 'unsplashPhotos':
                        var photo = target.children[0];
                        this.$parent.selectElement('image', photo.id);
                        this.$parent.selectedImageSrc = photo.src
                        this.$parent.alwaysOnTop(photo);
                    break;
                    case 'callToActionButtons':
                        var button = target.children[0];
                        this.$parent.$store.commit('setSelectedButton', {
                            title: button.innerHTML.trim(),
                            url: button.getAttribute('data-href').trim(),
                            background: button.style.background.trim(),
                            textColour: button.style.color.trim(),
                        });
                        this.selectElement('callToActionButtons', button.id);
                        this.selectedButtonData = {title: button.innerHTML, url: button.getAttribute('data-href')};
                    break;
                    default:
                    break;
                }
            });

        }, 100);
    },
    data() {
        return {
            moveable: {
                target: this.$refs[this.$props.tgt],
                container: this.$parent.$refs.page,
                bounds: { left: 0, top: 0, bottom: this.$parent.$refs.page.offsetHeight, right: this.$parent.$refs.page.offsetWidth },
                draggable: true,
                resizable: true,
                keepRatio: false,
                checkInput: true,
                padding: { left: 0, top: 0, right: 0, bottom: 0 },
                scalable: false,
                renderDirections: ["n","s","w","e","nw","ne","sw","se"],
                dragArea: true,
                rotatable: true,
                snappable:true,
                pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
                origin: false,
                clippable: false,
                defaultClipPath: "inset",
                customClipPath: "",
                clipRelative: false,
                clipArea: false,
                dragWithClip: true,
                clipTargetBounds: true,
                edge:true
            },
        }
    },
    methods: {
        handleDrag({ target, transform }) {
            target.style.transform = transform;
        },
        handleResize({ target, width, height, delta }) {
            delta[0] && (target.style.width = `${width}px`);
            delta[1] && (target.style.height = `${height}px`);
            //console.log(target.children[0].style.height = '100%';);
            target.children[0].style.height = '100%';
            target.children[0].style.width = 'auto';
            const moveable = this.$refs[this.$props.tgt];
            moveable.moveable.updateTarget();
            moveable.moveable.updateRect();
        },
        handleScale({ target, transform, direction }) {
            console.log(target, transform, direction);
            target.style.transform = transform;
            
        },
        handleRotate({ target, transform }) {
            target.style.transform = transform;
        },
        handleWarp({ target, transform }) {
            target.style.transform = transform;
        }
    },
    components: {
        Moveable,
    }
}
</script>
