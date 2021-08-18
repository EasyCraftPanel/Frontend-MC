<template>
  <div class="page-login">
    <div class="part-ad">
      <div class="part-ad-content"></div>
    </div>
    <div class="part-login">
      <div class="style-login-animation">
        <img src="../static/img/login/npc.jpg" />
      </div>

      <div class="dialog" horn="top-left">
        <div :class="{ 'dialog-tips': true, show: error }">
          <span class="dialog-tips-iconbox theme-danger"
            ><i class="mci-icon">close</i></span
          >
          <div class="dialog-tips-title">{{ error }}</div>
          请检查您的...
          <button class="btn btn-sm theme-warning mt-2" @click="error = false">
            重试
          </button>
        </div>

        <div class="dialog-content">
          <div class="style-login-title">登录到 {panelName}</div>
        </div>

        <form class="form-login">
          <div class="textfield">
            <label>用户名</label>
            <input name="username" type="text" v-model="form.username" />
          </div>

          <div class="textfield is-error">
            <label>密码</label>
            <input name="" type="password" v-model="form.password" />
          </div>

          <button type="button" class="btn btn-sm mt-1" @click="login">
            <i class="mci-icon">login</i> 登录
          </button>
        </form>

        <a class="style-login-copyright">Easycraft Panel</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    form: {
      username: null,
      password: null,
    },
    error: false,
  }),
  methods: {
    login() {
      let data = new FormData();
      data.append("username", this.form.username);
      data.append("password", this.form.password);
      this.$axios
        .post("/login", data)
        .then((data) => {
          if (!data.data.status) {
            this.error = data.data.msg;
          } else {
            window.localStorage["token"] = data.data.data.UserRequest.auth;
            this.$store.commit("onLogin", data.data.data.UserInfo);
            setTimeout(() => {
              this.$router.push("/");
            }, 3000);
          }
        })
        .catch((e) => {});
    },
  },
};
</script>

<style scoped>
.page-login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-grow: 1;
  position: relative;

  overflow: hidden;
}

.page-login::before {
  content: "";
  display: block;

  width: 100%;
  height: 100vh;

  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: 85%;
  background-image: url("../static/img/login/login.jpg");

  overflow: hidden;
}

.page-login::after {
  content: "";
  display: block;

  width: 100%;
  height: 100vh;

  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: 85%;
  background-image: url("../static/img/login/water.png");

  animation: login-water 2s infinite ease-in-out;
  animation-direction: alternate;

  overflow: hidden;
}

@keyframes login-water {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(1.01, 0.99);
  }
}

.part-login {
  margin: auto;
  margin-left: unset;
  margin-right: 10%;
  height: min-content;
}

.style-login-animation {
  max-width: 420px;
}

.style-login-animation img {
  height: calc(120px + 6vw);
  margin-bottom: -1.5vw;
}

.page-login .dialog {
  min-width: 380px;
  max-width: 420px;
  margin-left: calc(56px + 6vw);
}

.part-ad {
  width: 100%;
  display: flex;
}

.part-ad-content {
  margin: auto;
}

@media (max-width: 786px) {
  .part-login {
    width: 100%;
    padding: 0 24px;
    margin: auto;
  }

  .part-ad {
    display: none;
  }

  .style-login-animation {
    display: flex;
    margin: -64px auto 0 auto;
  }

  .style-login-animation img {
    margin-right: auto;
    margin-left: -88px;
  }

  .page-login .dialog {
    width: 100%;
    margin: auto !important;
    min-width: unset !important;
  }
}

.style-login-title {
  margin: 24px 16px 8px 16px;
  font-size: calc(1.2rem + 0.5vw) !important;
}

.form-login {
  padding: 16px 24px;
}

.style-login-copyright {
  opacity: 0.5;
  display: block;
  margin: 4px 8px;
  font-size: 18px;
  cursor: pointer;
  text-align: right;
  transition: color 0.25s ease-in-out, opacity 0.25s ease-in-out;
}

.style-login-copyright:hover {
  opacity: 1;
  color: #fefe3e;
}

.dialog-tips {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  padding: 0 24px;
  position: absolute;
  text-align: center;
  line-height: 1.2em;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(33, 33, 33, 0.8);
  backdrop-filter: blur(4px);

  visibility: hidden;
}

.dialog-tips-iconbox {
  width: 56px;
  height: 56px;
  font-size: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 40px;
}

.dialog-tips-iconbox .mci-icon {
  font-size: inherit;
}

.dialog-tips-title {
  margin: 16px 0;
  font-size: 1.4em;
  text-shadow: 0 2px 0 rgb(0 0 0 / 25%);
}

.dialog-tips.show {
  visibility: visible;
  animation-iteration-count: 1;
  animation: dialog-tips-show 0.4s ease-in forwards;
}

.dialog-tips.hide {
  animation-iteration-count: 1;
  animation: dialog-tips-hide 0.25s ease-in forwards;
}

@keyframes dialog-tips-show {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dialog-tips-hide {
  from {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }
  to {
    opacity: 0;
    transform: scale(0.8);
    visibility: hidden;
  }
}
</style>
