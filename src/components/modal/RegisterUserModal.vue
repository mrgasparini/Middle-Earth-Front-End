<template>
  <b-modal
    id="modal-sm"
    ref="modal"
    hide-header
    hide-footer
    :visible="registerModal"
    @hidden="CancelRegisterModal"
  >
    <div class="modal-header">
      <h5>Cadastrar</h5>
    </div>
    <div class="form">
      <b-form @submit.prevent="RegisterUser">
        <div class="input">
          <img
            class="inputIcon"
            src="https://img.icons8.com/metro/26/000000/user-male.png"
          />
          <b-form-input
            class="inputField"
            v-model="username"
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
        <div class="input">
          <img
            class="inputIcon"
            src="https://img.icons8.com/ios-filled/50/000000/one-ring.png"
          />
          <b-form-input
            class="inputField"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmar senha"
          ></b-form-input>
        </div>
        <div class="footer">
          <b-button class="loginButton" variant="success" type="submit"
            >Cadastrar</b-button
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
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  props: {
    registerModal: Boolean,
    loginModalOpened: Boolean,
  },
  methods: {
    CancelRegisterModal() {
      this.$emit("update:registerModal", false);
    },
    async RegisterUser() {
      let validate = this.validateForm();
      if (validate) {
        try {
          await LoginService.RegisterUser(
            this.username,
            this.password,
            this.confirmPassword
          );
          this.$emit("update:registerModal", false);
          this.$emit("showMessage", {
            message: "Usuário cadastrado com sucesso.",
            type: "Success",
          });
          this.$emit("update:loginModalOpened", true);
        } catch (err) {
          this.$emit("showMessage", {
            message: err.response.data.description
              ? err.response.data.description
              : "Ocorreu um erro inesperado.",
            type: "Error",
          });
        }
      }
    },
    validateForm() {
      if (
        this.password == "" ||
        this.confirmPassword == "" ||
        this.username == ""
      ) {
        this.$emit("showMessage", {
          message: "Necessário preencher todas as informações.",
          type: "Error",
        });
        return false;
      }
      if (this.password !== this.confirmPassword) {
        this.$emit("showMessage", {
          message: "As senhas não são identicas.",
          type: "Error",
        });
        return false;
      }
      return true;
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