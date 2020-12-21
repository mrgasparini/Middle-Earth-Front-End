<template>
  <b-row class="itemsRow" v-if="placeList">
    <h6 v-if="placeList.length < 1">Nenhum lugar cadastrado.</h6>
    <b-col md="3" v-for="place in placeList" :key="place.id">
      <div class="card">
        <img
          v-if="place.photoType == 'URL'"
          :src="place.photoUrl"
          class="card-img-top"
        />
        <img
          v-if="place.photoType == 'IMG'"
          :src="place.photo"
          class="card-img-top"
        />
        <img
          class="deleteIcon"
          @click="DeletePlace(place.id)"
          src="https://img.icons8.com/metro/26/000000/trash.png"
        />
        <div class="card-body">
          <h5 class="card-title">{{ place.name }}</h5>
          <b-button
            variant="primary"
            v-if="userVote !== place.id"
            :disabled="userVote > 0"
            @click="handleVote(place.id)"
          >
            Votar
          </b-button>
          <b-button
            class="undoVote"
            variant="danger"
            v-if="userVote == place.id"
            @click="CancelVote(place.id)"
          >
            Cancelar
          </b-button>
          <b-button variant="dark" @click="handleEdit(place)">Editar</b-button>
        </div>
      </div>
    </b-col>
  </b-row>
  <!-- https://assets.sutori.com/user-uploads/image/1015bbe0-5321-40b7-bf62-789d0097cc98/64d8e9862b5fedbe16f9a41e0cf35316.gif -->
</template>

<script>
import PlaceService from "../services/PlaceService";
import VoteService from "../services/VoteService";

export default {
  name: "PlaceList",
  props: {
    userVote: Number,
    placeList: [],
  },
  methods: {
    async handleVote(placeId) {
      try {
        await VoteService.RegisterVote(placeId);
        this.$emit("showMessage", {
          message: "Voto registrado com sucesso.",
          type: "Success",
        });
        this.$emit("GetUserVote");
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
    handleEdit(place) {
      this.$emit("showPlaceModal", place);
    },
    async DeletePlace(placeId) {
      try {
        await PlaceService.DeletePlace(placeId);
        this.$emit("LoadPlaces");
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
    async CancelVote(placeId) {
      try {
        await VoteService.CancelVote(placeId);
        this.$emit("showMessage", {
          message: "Voto desfeito com sucesso.",
          type: "Success",
        });
        this.$emit("GetUserVote");
      } catch (err) {
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
.btn {
  margin: 10px;
}
.card-body {
  text-align: center;
}
.card {
  margin: 10px 0 20px 0;
}
.card-img-top {
  width: 232px;
  height: 170px;
}
.deleteIcon {
  width: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
}

.deleteIcon:hover {
  width: 25px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.undoVote {
  margin-left: 0;
}
h6 {
  margin: auto;
}
</style>