<template>
  <b-card class="container">
    <div class="desconnected" v-if="username === ''">
      <span>Você não está logado </span>
      <b-button
        variant="primary"
        size="sm"
        id="login"
        style="margin-left: 10px"
        @click="showLoginModal"
        >Logar</b-button
      >
      <b-button
        variant="success"
        size="sm"
        id="login"
        style="margin-left: 10px"
        @click="showRegisterModal"
        >Cadastrar</b-button
      >
    </div>
    <div class="desconnected" v-if="username.length > 1">
      <span>Seja bem-vindo, </span>
      <strong>{{ username }}!</strong>
      <b-button
        variant="primary"
        size="sm"
        id="login"
        style="margin-left: 10px"
        @click="doLogout"
        >Sair</b-button
      >
    </div>
    <div class="options" style="margin: 20px 0 0 10px">
      <b-card class="options">
        <b-row align-h="between">
          <b-col md="4">
            <div id="search">
              <img
                src="https://img.icons8.com/pastel-glyph/64/000000/search--v3.png"
              />
              <input
                v-model="placeSearch"
                type="text"
                placeholder="Buscar lugar"
              />
            </div>
          </b-col>
          <b-col md="5">
            <b-row align-h="between">
              <b-col md="6">
                <b-button
                  variant="secondary"
                  id="leadership"
                  @click="showLeadershipModal"
                >
                  <spam>
                    <img
                      class="buttonIcon"
                      src="https://img.icons8.com/color/48/000000/legolas.png" /></spam
                  ><a>Leadership</a>
                </b-button>
              </b-col>
              <b-col md="6" style="margin-left: 0px">
                <b-button
                  variant="success"
                  id="addPlace"
                  @click="showPlaceModal"
                >
                  <spam
                    ><img
                      class="buttonIcon"
                      src="https://img.icons8.com/color/48/000000/frodo.png" /></spam
                  ><a>Cadastrar lugar</a>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div id="content" class="mt-3">
      <p class="text-center">Escolha seu lugar favorito.</p>
      <b-card>
        <PlaceList
          :placeList.sync="placeList"
          @showPlaceModal="showPlaceModal"
          :userVote.sync="userVote"
          @LoadPlaces="LoadPlaces"
          @GetUserVote="GetUserVote"
          @showMessage="showMessage"
        ></PlaceList>
      </b-card>
      <LoginModal
        v-if="loginModalOpened"
        :username.sync="username"
        :userVote.sync="userVote"
        :loginModalOpened.sync="loginModalOpened"
        @GetUserVote="GetUserVote"
        @showMessage="showMessage"
      ></LoginModal>
      <PlaceModal
        v-if="placeFormModal"
        :placeFormModal.sync="placeFormModal"
        :place.sync="place"
        @LoadPlaces="LoadPlaces"
        @showMessage="showMessage"
      ></PlaceModal>
      <LeadershipModal
        v-if="leadershipModal"
        :leadershipModal.sync="leadershipModal"
      ></LeadershipModal>
      <RegisterUserModal
        v-if="registerModal"
        :registerModal.sync="registerModal"
        :loginModalOpened.sync="loginModalOpened"
        @showMessage="showMessage"
      ></RegisterUserModal>
    </div>
  </b-card>
</template>

<script>
import LoginModal from "./components/modal/LoginModal.vue";
import PlaceList from "./components/PlaceList";
import PlaceModal from "./components/modal/PlaceRegisterEditForm";
import LeadershipModal from "./components/modal/LeadershipModal";
import RegisterUserModal from "./components/modal/RegisterUserModal";
import PlaceService from "./services/PlaceService";
import VoteService from "./services/VoteService";

export default {
  name: "App",
  components: {
    LoginModal,
    PlaceList,
    PlaceModal,
    LeadershipModal,
    RegisterUserModal,
  },
  data() {
    return {
      username: "",
      userVote: 0,
      placeSearch: "",
      loginModalOpened: false,
      placeFormModal: false,
      leadershipModal: false,
      registerModal: false,
      places: [],
      placeList: [],
    };
  },
  methods: {
    showLoginModal() {
      this.loginModalOpened = true;
    },
    showPlaceModal(place) {
      this.placeFormModal = true;
      this.place = place;
    },
    showLeadershipModal(place) {
      this.leadershipModal = true;
      this.place = place;
    },
    doLogout() {
      this.username = "";
      this.userVote = 0;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
    async LoadPlaces() {
      let response = await PlaceService.GetAllPlaces();
      this.places = response.places;
      this.placeList = response.places;
    },
    async GetUserVote() {
      let userVoteResponse = await VoteService.GetUserVote();
      if (userVoteResponse.votes[0])
        this.userVote = userVoteResponse.votes[0].placeId;
      else this.userVote = 0;
    },
    showRegisterModal() {
      this.registerModal = true;
    },
    showMessage(object) {
      this.$bvToast.toast(`${object.message}`, {
        title: object.type == "Error" ? "Erro" : "Sucesso",
        autoHideDelay: 3000,
        variant: object.type == "Error" ? "danger" : "success",
      });
    },
  },
  async mounted() {
    await this.LoadPlaces();
    if (localStorage.username) {
      this.username = localStorage.username;
      await this.GetUserVote();
    }
  },
  watch: {
    placeSearch: function (val) {
      if (val === "") this.placeList = this.places;
      else {
        this.placeList = [];
        this.places.forEach((place) => {
          if (place.name.toUpperCase().includes(val.toUpperCase()))
            this.placeList.push(place);
        });
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 30px;
  height: 100%;
}
.desconnected {
  text-align: center !important;
}
#content {
  padding-top: 20px;
}
.options {
  border-radius: 15px;
}
.buttonsCol {
  position: relative;
  float: right;
}
#search {
  height: 40px;
  border-radius: 15px;
  border: 1px solid #ddd;
}
#search > input {
  position: relative;
  border: none;
  width: 280px;
  height: 40px;
  background-color: transparent;
}
#search > img {
  width: 30px;
  float: left;
  padding-top: 5px;
  margin-left: 5px;
}
#search > input:focus {
  outline: none !important;
}
.buttonIcon {
  float: left;
  width: 30px;
}
.btn > a {
  position: relative;
  top: 3px;
  margin: 5px;
}
#leadership,
#addPlace {
  margin: 0px;
}
#leadership {
  position: relative;
  right: -60px;
}
</style>
