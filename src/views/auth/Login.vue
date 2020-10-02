<template>
<div class="main">
  <div class="left">
    <div class="loginBox">
      <div>
        <img src="../../assets/images/home/logo.svg" alt="Stori Logo">
      </div>
      <div class="welcomeMessage">Welcome back, Sign in to continue</div>

      <div class="mainLoginBox">
        <label class="email input">
          <span class="imageIcon">
            <img src="../../assets/images/login/email.svg" alt="">
          </span>
          <span class="mainInput">
            <span>Email Address</span>
            <input type="email">
          </span>
          <span>
            <i class="fa fa-check-circle"></i>
          </span>
        </label>

        <label class="password input">
          <span class="imageIcon">
            <img src="../../assets/images/login/padlock.svg" alt="">
          </span>

          <span class="mainInput">
            <span>Email Address</span>
            <input type="password">
          </span>
          <span>
            <i class="fa fa-eye"></i>
          </span>
        </label>
      </div>

      <div class="signInSignOut">
        <div>Forget Password?</div>
        <div>
          <button class="signIn">Sign In</button>
          <button class="signOut">Sign Up</button>
        </div>
      </div>

      <div>
          <div>
            <hr>
            <div>OR</div>
          </div>
          <div>You can also join us with these apps</div>
          <div>
            <img src="../../assets/images/login/google.svg" alt="">
            <img src="../../assets/images/login/facebook.svg" alt="">
            <img src="../../assets/images/login/twitter.svg" alt="">
          </div>
        </div>
    </div>
  </div>

  <div class="right">
    <img src="../../assets/images/login/login-background.png" height="1706" width="737"/>
  </div>
</div>
</template>

<script>
export default {
name: "Login"
}
</script>

<style lang="scss">
.main {
  background: black;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  overflow: hidden!important;
  justify-content: space-between;
  color: white;

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 50%;
    width: max-content;

    .loginBox {
      width: 500px;
      height: auto;
      padding: 50px;
      border-radius: 15px;
      border: 1px solid #519EF4;
      box-sizing: border-box;

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
        margin-top: 73px;

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
          height: 55px;
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
            }
          }
          i {
            font-size: 20px;
            &.fa-eye {
              cursor: pointer;
            }
          }
        }
      }

      .signInSignOut {
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
        padding: 5px 2px;

        .signIn {
          width: 132px;
          height: 59px;
          border: none;
          border-radius: 5px;
          background: #519EF4;
          color: white;
          cursor: pointer;
          margin: 12px;
        }

        .signOut {
          width: 132px;
          height: 59px;
          border: none;
          border-radius: 5px;
          background: #519ef4;
          color: white;
          cursor: pointer;
          margin: 12px;
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
