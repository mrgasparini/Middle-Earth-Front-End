<template>
  <b-modal
    id="modal-sm"
    ref="modal"
    hide-header
    hide-footer
    :visible="loginModalOpened"
    @hidden="cancelLoginModal"
  >
    <div class="modal-header">
      <h5>Bem-Vindo</h5>
    </div>
    <div class="form">
      <b-form @submit.prevent="DoLogin">
        <div class="input">
          <img
            class="inputIcon"
            src="https://img.icons8.com/metro/26/000000/user-male.png"
          />
          <b-form-input
            class="inputField"
            v-model="user"
            placeholder="Login"
          ></b-form-input>
        </div>
        <div class="input">
          <img
            class="inputIcon"
            src="https://img.icons8.com/ios-filled/50/000000/one-ring.png"
          />
          <b-form-input
            class="inputField"
            v-model="password"
            type="password"
            placeholder="Senha"
          ></b-form-input>
        </div>
        <div class="footer">
          <b-button class="loginButton" variant="success" type="submit"
            >Entrar</b-button
          >
        </div>
      </b-form>
    </div></b-modal
  >
</template>

<script>
import LoginService from "../../services/LoginService";

export default {
  name: "LoginModal",
  data() {
    return {
      user: "",
      password: "",
    };
  },
  props: {
    userVote: Number,
    loginModalOpened: Boolean,
  },
  methods: {
    cancelLoginModal() {
      this.$emit("update:loginModalOpened", false);
    },
    async DoLogin() {
      try {
        let response = await LoginService.DoLogin(this.user, this.password);
        localStorage.token = response.token;
        localStorage.username = response.username;
        this.$emit("update:username", response.username);
        this.$emit("GetUserVote");
        this.$emit("update:loginModalOpened", false);

        this.$emit("showMessage", {
          message: "Login realizado com sucesso.",
          type: "Success",
        });
      } catch (err) {
        if (err.response.status == 403)
          this.$emit("showMessage", {
            message: "Necessário realizar login.",
            type: "Error",
          });
        else
          this.$emit("showMessage", {
            message: err.response.data.description
              ? err.response.data.description
              : "Ocorreu um erro inesperado.",
            type: "Error",
          });
      }
    },
  },
};
</script>

<style scoped>
h5 {
  display: table;
  margin: auto;
}
.input {
  margin: 20px 0 10px 0;
  height: 40px;
  border-radius: 15px;
  border: 1px solid #ddd;
}
.inputIcon {
  width: 25px;
  float: left;
  padding-top: 6px;
  margin-left: 10px;
}
.inputField {
  position: relative;
  border: none;
  padding-bottom: 10px;
  width: 420px;
  height: 40px;
  background-color: transparent;
}
input.form-control:focus {
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}
.loginButton {
  width: 200px;
}
.footer {
  text-align: center;
  padding-top: 20px;
}
</style>