<template>
  <section>
    <header>
      <img src="../assets/images/home/logo.svg" alt="Stori">
      <nav>
        <div>
          <img src="../assets/images/home/new-story.svg" alt="">
          <router-link :to="{name: 'Home'}">New Story</router-link>
        </div>
        <div>
          <img src="../assets/images/home/templates.svg" alt="">
          <router-link :to="{name: 'Home'}">Templates</router-link>
        </div>
        <div>
          <img src="../assets/images/home/uploads.svg" alt="">
          <router-link :to="{name: 'Home'}">Uploads</router-link>
        </div>
        <div>
          <img src="../assets/images/home/shared.svg" alt="">
          <router-link :to="{name: 'Home'}">Shared</router-link>
        </div>
        <div>
          <img src="../assets/images/home/folder.svg" alt="">
          <router-link :to="{name: 'Home'}">Folder</router-link>
        </div>
        <div>
          <img src="../assets/images/home/settings.svg" alt="">
          <router-link :to="{name: 'Home'}">Settings</router-link>
        </div>
      </nav>

      <div class="rightHeader">
        <div class="workspaceName">
          <img alt="" class="workIcon" src="../assets/images/home/work-icon.svg"/>
          <div>
            <div>WORKSPACE</div>
            <div>Artculture BMC</div>
          </div>
          <img alt="" class="downIcon" src="../assets/images/home/drop-down.svg"/>
        </div>
        <div>
          <img src="../assets/images/home/sun.svg" alt="">
          <img src="../assets/images/home/notification.svg" alt="">
          <img src="../assets/images/home/user.svg" alt="">
        </div>
      </div>
    </header>

    <main>
      <div class="searchAndStoryTypes">
        <div>
          <router-link :to="{name: 'Home'}" class="active">All Stories</router-link>
          <router-link :to="{name: 'Home'}">My Stories</router-link>
          <router-link :to="{name: 'Home'}">Draft</router-link>
          <router-link :to="{name: 'Home'}">Published</router-link>
        </div>
        <div>
          <label>
            <input type="search">
            <i class="fas fa-search"></i>
          </label>
        </div>
      </div>

      <div class="templateList">
        <div class="template">
          <div class="preview">
            <img src="../assets/images/home/preview.svg" alt="">
          </div>
          <div class="details">
            <div>
              <div>Facebook Story</div>
              <div>Created on Friday 12-10-2020</div>
            </div>
            <div>
              <div>
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="template">
          <div class="preview">
            <img src="../assets/images/home/preview.svg" alt="">
          </div>
          <div class="details">
            <div>
              <div>Facebook Story</div>
              <div>Created on Friday 12-10-2020</div>
            </div>
            <div>
              <div>
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="template">
          <div class="preview">
            <img src="../assets/images/home/preview.svg" alt="">
          </div>
          <div class="details">
            <div>
              <div>Facebook Story</div>
              <div>Created on Friday 12-10-2020</div>
            </div>
            <div>
              <div>
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="template">
          <div class="preview">
            <img src="../assets/images/home/preview.svg" alt="">
          </div>
          <div class="details">
            <div>
              <div>Facebook Story</div>
              <div>Created on Friday 12-10-2020</div>
            </div>
            <div>
              <div>
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="template">
          <div class="preview">
            <img src="../assets/images/home/preview.svg" alt="">
          </div>
          <div class="details">
            <div>
              <div>Facebook Story</div>
              <div>Created on Friday 12-10-2020</div>
            </div>
            <div>
              <div>
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="template">
          <div class="preview">
            <img src="../assets/images/home/preview.svg" alt="">
          </div>
          <div class="details">
            <div>
              <div>Facebook Story</div>
              <div>Created on Friday 12-10-2020</div>
            </div>
            <div>
              <div>
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="template">
          <div class="preview">
            <img src="../assets/images/home/preview.svg" alt="">
          </div>
          <div class="details">
            <div>
              <div>Facebook Story</div>
              <div>Created on Friday 12-10-2020</div>
            </div>
            <div>
              <div>
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="template">
          <div class="preview">
            <img src="../assets/images/home/preview.svg" alt="">
          </div>
          <div class="details">
            <div>
              <div>Facebook Story</div>
              <div>Created on Friday 12-10-2020</div>
            </div>
            <div>
              <div>
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="template">
          <div class="preview">
            <img src="../assets/images/home/preview.svg" alt="">
          </div>
          <div class="details">
            <div>
              <div>Facebook Story</div>
              <div>Created on Friday 12-10-2020</div>
            </div>
            <div>
              <div>
                <i class="fas fa-eye"></i>
              </div>
              <div>
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>
        </div>


      </div>
    </main>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style lang="scss">
section {
  background: #000000;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  color: white;

  header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;

    nav {
      display: flex;

      div {
        padding: 10px;
        margin: 10px;
        max-width: 132px;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        img {
          margin-right: 10px;
        }

        a {
          color: #FFFFFF;
          font-size: 18px;
          line-height: 20px;
          text-decoration: none;
          :visited {
            color: #FFFFFF;
            font-size: 18px;
            line-height: 20px;
            text-decoration: none;
          }
        }
      }
    }

    .rightHeader {
    display: flex;
    align-items: center;
    .workspaceName {
        display: flex;
        justify-content: space-evenly;
        background: #373E48;
        border: #707070;
        color: #FFFFFF;
        width: 212px;
        height: 27px;
        border-radius: 35px;
        font-family: 'Apple SD Gothic Neo', sans-serif;
        font-size: 18px;
        font-weight: 500;
        padding: 15px 15px;
        cursor: pointer;

        .workIcon {
          width: 17px;
          height: 17px;
          margin: 5px;
        }

      div {
        font-family: Rubik, sans-serif;
        font-weight: lighter;
        &:first-child {
          font-size: 10px;
        }

        &:last-child {
          font-size: 15px;
        }
      }

      .downIcon {
        width: 24px;
        height: 24px;
        margin: 3px;
      }
    }

    img {
      height: 30px;
      width: auto;
      padding: 5px;
      margin: 5px;
    }
  }
  }

  main {
    display: block;
    width: 100%;
    height: calc(100vh - 102px);
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 12px;
      background-color: rgba(0, 0, 0, 0);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #555;
    }

    .searchAndStoryTypes {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      margin: 20px 0;
      box-sizing: border-box;
      height: 80px;
      align-items: center;

      > :first-child {
        display: flex;
        align-items: center;
        a {
          font-size: 22px;
          line-height: 27px;
          margin: 5px 30px;
          height: 70px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          text-decoration: none;
          color: white;

          &.active, &:hover {
            border-bottom: solid 5px #519EF4;
          }
        }
      }

      > :last-child {
        label {
          width: 302px;
          height: 47px;
          background: #212325;
          padding: 0 0 0 20px;
          box-sizing: border-box;
          border-radius: 50px;
          display: flex;
          align-items: center;

          input {
            font-size: 18px;
            width: 240px;
            background: rgba(0, 0, 0, 0);
            color: white;
            border: none;
            height: 41px;

            &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active, &:focus, :focus {
              border: none !important;
              transition: background-color 5000s ease-in-out 0s;
              outline: none;
            }
          }

          i {
              color: #3494FF;
              font-size: 22px;
              padding: 5px;
            }
        }
      }
    }

    .templateList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      padding: 20px 50px;
      box-sizing: border-box;
      align-items: center;
      .template {
        width: 308px;
        height: 450px;
        background: #1A1A1A;
        border-radius: 13px;
        padding: 24px;
        box-sizing: border-box;
        margin: 20px;

        .preview {
          background: #212326;
          border-radius: 13px;
          width: 260px;
          height: 331px;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: auto;
            height: auto;
            max-width: 100%;
          }
        }

        .details {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;

          > :first-child {
            display: block;
            > :first-child {
              font-size: 12px;
              line-height: 14px;
              color: #CBDBEC;
              margin-bottom: 5px;
            }
            > :last-child {
              font-size: 8px;
              line-height: 9px;
              color: #CBDBEC;
            }
          }

          > :last-child {
            display: flex;
            align-items: center;
            justify-content: space-around;

            > :first-child {
              width: 52px;
              height: 28px;
              border-radius: 6px;
              background: #212326;
              color: #CBDBEC;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
            > :last-child {
              color: #CBDBEC;
              padding: 0 5px;
              margin: 0 5px;
              cursor: pointer;
            }
          }

        }
      }
    }
  }
}
</style>
