<template>
<div class="main">
  <div class="left">
    <div>
      <img class="abstractImage" src="../../assets/images/login/Ellipse 140.png" height="406" width="406" alt=""/>
      <div class="loginBox">
      <div>
        <img src="../../assets/images/home/logo.svg" alt="Stori Logo">
      </div>
      <div class="welcomeMessage">Join Us, Sign up to continue</div>

      <div class="mainLoginBox">

        <label class="email input">
          <span class="imageIcon">
            <img src="../../assets/images/login/user.svg" alt="">
          </span>
          <span class="mainInput">
            <span>Full Name</span>
            <input type="text" v-model="fullName">
          </span>
          <span>
            <i class="fa fa-check-circle" style="visibility: hidden"></i>
          </span>
        </label>

        <label class="email input">
          <span class="imageIcon">
            <img src="../../assets/images/login/email.svg" alt="">
          </span>
          <span class="mainInput">
            <span>Email Address</span>
            <input type="email" v-model="email">
          </span>
          <span>
            <i class="fa fa-check-circle" @click="showingPassword = true"></i>
          </span>
        </label>

        <label class="password input">
          <span class="imageIcon">
            <img src="../../assets/images/login/padlock.svg" alt="">
          </span>

          <span class="mainInput">
            <span>Password</span>
            <input :type="showingPassword ? 'text' : 'password'" v-model="password">
          </span>
          <span>
            <i class="fa fa-eye" v-if="showingPassword === false" @click="showingPassword = true"></i>
            <i class="fa fa-eye-slash" v-if="showingPassword === true" @click="showingPassword = false"></i>
          </span>
        </label>
      </div>

      <div class="signInSignOut">
        <div>Forget Password?</div>
        <div>
          <button class="signIn" @click="register">Sign Up</button>
          <router-link :to="{name: 'Login'}"><button class="signOut">Sign In</button></router-link>
        </div>
      </div>

      <div>
          <div class="or">
            <hr>
            <div>OR</div>
          </div>
          <div class="joinWithApps">You can also join us with these apps</div>
          <div class="socialLogin">
            <img src="../../assets/images/login/google.svg" alt="">
            <img src="../../assets/images/login/facebook.svg" alt="">
            <img src="../../assets/images/login/twitter.svg" alt="">
          </div>
        </div>
    </div>
      <img class="abstractImage2" src="../../assets/images/login/Ellipse 139.png" height="406" width="406" alt=""/>
    </div>

  </div>

  <div class="right">
    <img src="../../assets/images/login/login-background.png" height="1706" width="737" alt=""/>
  </div>
</div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "SignUp",
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      showingPassword: false,
      baseUrl: process.env.VUE_APP_baseUrl
    }
  },

  methods: {
    register() {
      const payload = {
        username: this.fullName,
        email : this.email,
        password : this.password
      }
      axios.post(`${this.baseUrl}auth/register`, payload).then(res => {
        console.log(res.data);
        if (res.data.data) {
          localStorage.setItem('authToken', res.data.data.accessToken)
          localStorage.setItem('userId', res.data.data.id)
          axios.defaults.headers.common['Authorization'] = localStorage.getItem('authToken');
          router.push('home')
        } else {
          console.log(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.main {
  background: black;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  overflow-y: hidden!important;
  justify-content: space-between;
  color: white;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50%;
    max-height: 100%;
    overflow: hidden;
    width: max-content;

    .abstractImage {
      position: absolute;
      margin-top: -40px;
      margin-left: 120px;
      z-index: 0;
    }

    .abstractImage2 {
      position: absolute;
      margin-top: -370px;
      margin-left: -40px;
      z-index: 0;
    }

    .loginBox {
      width: 500px;
      height: auto;
      padding: 2vh 50px;
      border-radius: 15px;
      border: 1px solid #519EF4;
      box-sizing: border-box;
      background: black;
      position: relative;
      z-index: 2;

      .welcomeMessage {
        font-size: 25px;
        line-height: 29px;
        font-family: Helvetica, Arial, sans-serif;
      }

      .mainLoginBox {
        border-radius: 15px;
        border: 1px solid #CBDBEC;
        display: flex;
        flex-direction: column;
        margin-top: 5vh;

        .email {
          padding: 25px 35px 15px 35px;
          border-bottom: 1px solid #CBDBEC;
        }

        .password {
          padding: 15px 35px 25px 35px;
        }

        .input {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0,0,0,0);
          //height: 50px;
          :first-child {
            width: 60px;
            text-align: center;
            img {
              box-sizing: border-box;
              width: auto;
              height: 28px;
            }
          }

          .mainInput {
            width: 200px;

            > :first-child {
              font-size: 18px;
              line-height: 21px;
              width: 100%;
            }

            > :last-child {
              font-size: 18px;
              line-height: 21px;
              width: 100%;
            }
            span {
              font-size: 20px;
              line-height: 21px;
              padding: 0 5px 10px 5px;
              text-align: left;
              display: block;
            }

            input {
              height: 30px;
              font-size: 20px;
              text-align: left;
              width: 100%;
              background: rgba(0,0,0,0);
              border: none;
              color: white;
              &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active {
                border: none;
                background-color: rgba(0,0,0,0);
                -webkit-text-fill-color: white;
                -webkit-box-shadow: none;
                outline: none;
                box-shadow: none;
                transition: background-color 5000s ease-in-out 0s;
              }
            }
          }
          i {
            font-size: 20px;
            &.fa-eye, &.fa-eye-slash {
              cursor: pointer;
            }
          }
        }
      }

      .signInSignOut {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 3vh;
        padding: 5px 2px;

        .signIn {
          width: 100px;
          height: 59px;
          border: none;
          border-radius: 5px;
          background: rgba(81, 158, 244, 0.11);
          color: white;
          cursor: pointer;
          margin: 12px;
        }

        .signOut {
          width: 100px;
          height: 59px;
          border: none;
          border-radius: 5px;
          background: #519EF4;
          color: white;
          cursor: pointer;
          margin: 12px;
        }
      }

      .or {
        display: flex;
        justify-content: center;
        margin: 2vh 0;

        hr {
          width: 100%;
          border: #535a61 1px solid;
        }
        div {
          position: absolute;
          background: black;
          width: 50px;
          height: 30px;
          text-align: center;
        }
      }

      .joinWithApps {
        font-size: 12px;
        line-height: 14px;
        text-align: center;
      }

      .socialLogin {
        margin: 2vh 20px;
        display: flex;
        justify-content: space-around;

        img {
          cursor: pointer;
          width: 50px;
          height: 50px;
        }
      }
    }
  }

  .right {
    height: 100vh;
    overflow: hidden!important;
    img {
      margin-top: -7vh;
      margin-right: 10vw;
      height: 120vh;
      width: auto;
    }
  }
}
</style>
