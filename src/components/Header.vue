<template>
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
</template>

<script>
export default {
name: "Header"
}
</script>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-sizing: border-box;
    background: black;

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
        align-items: center;
        background: #373E48;
        border: #707070;
        color: #FFFFFF;
        width: 165px;
        height: 40px;
        border-radius: 35px;
        font-family: 'Apple SD Gothic Neo', sans-serif;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;

        .workIcon {
          width: 23px;
          height: 23px;
          margin: 5px;
        }

        div {
          font-family: Rubik, sans-serif;
          font-weight: lighter;

          &:first-child {
            font-size: 8px;
          }

          &:last-child {
            font-size: 11px;
          }
        }

        .downIcon {
          width: 28px;
          height: 28px;
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
</style>
