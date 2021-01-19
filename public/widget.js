
window.addEventListener('load', () => {
    const storiWidget = document.getElementById('stori-widget')

    console.log(storiWidget.src)
    addCSSStyles()
    getAllRouteInformation(storiWidget.src + '')
})

function addCSSStyles() {
    const styleTag = document.createElement('style')
    styleTag.innerHTML = `.poweredBy {
        text-decoration: none;
        color: inherit;
    }
    .poweredBy:hover {
        color: gold;
    }

    .repeat {
      --animate-repeat: 8;
    }

    button {
        outline: none;
    }

    .iframeFullScreen {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 90000;
        background: #202125;
    }

    .iframeFullScreen > iframe {
        width: 100vw;
        height: 100vh;
        border: 0;
    }

    .iframeFullScreen > button {
        width: 150px;
        padding: 10px;
        background: #1B1C1E;
        color: white;
        position: absolute;
        right: 170px;
        top: 3px;
        border: none;
        border-radius: 10px;
        margin: 10px;
        font-size: 1.2em;
        outline: none;
        cursor: pointer;
    }


    .iframeDesktop {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 90000;
        background: rgba(32, 33, 37, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .iframeDesktop > iframe {
        width: 70%;
        height: 70%;
        border: 0;
        border-radius: 50px;
    }

    .iframeDesktop > button {
        width: 100px;
        padding: 10px;
        background: #1B1C1E;
        color: white;
        position: absolute;
        right: 50px;
        top: 20px;
        border: none;
        border-radius: 10px;
        margin: 10px;
        font-size: 1.2em;
        outline: none;
        cursor: pointer;
    }


    .iframeMobile {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 90000;
        background: rgba(32, 33, 37, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .iframeMobile > iframe {
        width: 453px;
        height: 822px;
        border: 0;
        border-radius: 10px;
    }

    .iframeMobile > button {
        width: 100px;
        padding: 10px;
        background: #1B1C1E;
        color: white;
        position: absolute;
        right: 50px;
        top: 20px;
        border: none;
        border-radius: 10px;
        margin: 10px;
        font-size: 1.2em;
        outline: none;
        cursor: pointer;
    }`
    document.head.appendChild(styleTag)

    const linkTag = document.createElement('link')
    linkTag.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
    linkTag.rel = 'stylesheet'
    document.head.appendChild(linkTag)
}

const squareWidget = document.createElement('div')
const circleWidget = document.createElement('div')
const bottomBar = document.createElement('div')
const iframe = document.createElement('div')

function getAllRouteInformation(src) {
    // eslint-disable-next-line no-unused-vars
    let title, subtitle, url, logoURL, position, type, size, animation, background, colour;
    let parameterList = src.match(/\?.*/)[0].replace('?', '').split('&')


    squareWidget.classList.add('animate__animated', 'animate__slow', 'animate__repeat-3');
    squareWidget.id="squareWidget"
    squareWidget.style.position = 'fixed'
    squareWidget.style.width = '150px';
    squareWidget.style.height = '150px';
    squareWidget.style.padding = '5px';
    squareWidget.style.borderRadius = '5px';
    squareWidget.style.boxSizing = 'border-box';
    squareWidget.style.cursor = 'pointer';

    circleWidget.classList.add('animate__animated', 'animate__slow', 'animate__repeat-3');
    circleWidget.id="circleWidget"
    circleWidget.style.position = 'fixed'
    circleWidget.style.width = '70px';
    circleWidget.style.height = '70px';
    circleWidget.style.padding = '5px';
    circleWidget.style.borderRadius = '100%';
    circleWidget.style.boxSizing = 'border-box';
    circleWidget.style.cursor = 'pointer';

    bottomBar.classList.add('animate__animated', 'animate__slow', 'animate__repeat-3');
    bottomBar.id="circleWidget"
    bottomBar.style.position = 'fixed'
    bottomBar.style.width = '100vw';
    bottomBar.style.height = '80px';
    bottomBar.style.padding = '5px';
    bottomBar.style.boxSizing = 'border-box';
    bottomBar.style.cursor = 'pointer';
    bottomBar.style.left = '0';
    bottomBar.style.bottom = '0';

    parameterList.forEach(param => {
        const splittedParem = param.split('=')

        switch (splittedParem[0]) {
            case 'title': this.title = splittedParem[1]; break;
            case 'subtitle': this.subtitle = splittedParem[1]; break;
            case 'url': this.url = splittedParem[1]; break;
            case 'logoURL': this.logoURL = splittedParem[1]; break;
            case 'position': this.position = splittedParem[1]; break;
            case 'type': this.type = splittedParem[1]; break;
            case 'size': this.size = splittedParem[1]; break;
            case 'animation': this.animation = splittedParem[1]; break;
            case 'background': this.background = splittedParem[1]; break;
            case 'colour': this.colour = splittedParem[1]; break;
        }

        bottomBar.style.background = this.background;
        bottomBar.style.color = this.colour;

        switch (this.animation) {
            case 'flash': {
                squareWidget.classList.add('animate__flash');
                circleWidget.classList.add('animate__flash');
                break;
            }

            case 'zoom': {
                squareWidget.classList.add('animate__pulse');
                circleWidget.classList.add('animate__pulse');
                break;
            }

            case 'shakingY': {
                squareWidget.classList.add('animate__shakeY');
                circleWidget.classList.add('animate__shakeY');
                break;
            }

            case 'shakingX': {
                squareWidget.classList.add('animate__shakeX');
                circleWidget.classList.add('animate__shakeX');
                break;
            }
        }

        switch (this.position) {
            case 'topRight': {
                squareWidget.style.top = '10px';
                squareWidget.style.right = '10px';
                squareWidget.style.background = this.background;
                squareWidget.style.color = this.colour;

                circleWidget.style.top = '10px';
                circleWidget.style.right = '10px';
                circleWidget.style.background = this.background;
                circleWidget.style.color = this.colour;
                break;
            }

            case 'topLeft': {
                squareWidget.style.top = '10px';
                squareWidget.style.left = '10px';
                squareWidget.style.background = this.background;
                squareWidget.style.color = this.colour;

                circleWidget.style.top = '10px';
                circleWidget.style.left = '10px';
                circleWidget.style.background = this.background;
                circleWidget.style.color = this.colour;
                break;
            }

            case 'bottomRight': {
                squareWidget.style.bottom = '10px';
                squareWidget.style.right = '10px';
                squareWidget.style.background = this.background;
                squareWidget.style.color = this.colour;

                circleWidget.style.bottom = '10px';
                circleWidget.style.right = '10px';
                circleWidget.style.background = this.background;
                circleWidget.style.color = this.colour;

                break;
            }

            case 'bottomLeft': {
                squareWidget.style.bottom = '10px';
                squareWidget.style.left = '10px';
                squareWidget.style.background = this.background;
                squareWidget.style.color = this.colour;

                circleWidget.style.bottom = '10px';
                circleWidget.style.left = '10px';
                circleWidget.style.background = this.background;
                circleWidget.style.color = this.colour;
                break;
            }
        }


        switch (this.size) {
            case 'mobile': {
                iframe.classList.add('iframeMobile')
                iframe.id = 'iframeMobile'
                iframe.innerHTML = `<button onclick="document.getElementById('iframeMobile').remove()" id="iframeMobileButton">Close</button>
                <iframe src="${this.url}"></iframe>`;

                break;
            }

            case 'desktop': {
                iframe.classList.add('iframeDesktop')
                iframe.id = 'iframeDesktop'
                iframe.innerHTML = `<button onclick="document.getElementById('iframeDesktop').remove()" id="iframeDesktopButton">Close</button>
                <iframe src="${this.url}"></iframe>`;

                break;
            }

            case 'fullScreen': {
                iframe.classList.add('iframeFullScreen');
                iframe.id = 'iframeFullScreen';
                iframe.innerHTML = `<button onclick="document.getElementById('iframeFullScreen').remove()" id="iframeFullScreenButton">Close</button>
                <iframe src="${this.url}"></iframe>`;

                break;
            }
        }
    })

    squareWidget.innerHTML =
            `<div style="display: flex; align-items: center; flex-direction: column">
                <img style="width: 50px; height: 50px; margin: 10px;" src="${this.logoURL}" alt="">
            </div>
            <div style="display: flex; align-items: center; flex-direction: column">
                <div style="font-size: 1.2em; margin: 5px 2px">${this.title}</div>
                <div style="font-size: 0.8em">${this.subtitle}</div>
                <div style="font-size: 0.7em; margin: 10px 2px"><a class="poweredBy" target="_blank" href="https://stori-73bd3.web.app/">⚡ by Stori</a></div>
            </div>`

    squareWidget.addEventListener("click", openStori)

    circleWidget.innerHTML =
            `<div style="display: flex; width: 100%; height: 100%; justify-content: center; align-items: center">
                <img style="width: 50px; height: 50px" src="${this.logoURL}" alt="">
            </div>`

    circleWidget.addEventListener("click", openStori)

    bottomBar.innerHTML =
            `<div style="display: flex; align-items: center; flex-direction: column">
                <div style="font-size: 1.2em; margin: 5px 2px">${this.title}</div>
                <div style="font-size: 0.8em">${this.subtitle}</div>
                <div style="font-size: 0.7em; margin: 10px 2px"><a class="poweredBy" target="_blank" href="https://stori-73bd3.web.app/">⚡ by Stori</a></div>
            </div>`

    bottomBar.addEventListener("click", openStori)


    switch (this.type) {
        case 'square': {
            document.body.appendChild(squareWidget);
            break;
        }
        case 'circle': {
            document.body.appendChild(circleWidget);
            break;
        }
        case 'bottomBar': {
            document.body.appendChild(bottomBar);
            break;
        }
    }
}

function openStori() {
    document.body.appendChild(iframe)
}
