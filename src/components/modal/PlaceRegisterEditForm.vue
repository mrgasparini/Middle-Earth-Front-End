<template>
  <b-modal
    id="modal-sm"
    ref="modal"
    hide-header
    hide-footer
    :visible="placeFormModal"
    @hidden="cancelPlaceModal"
  >
    <div class="modal-header">
      <h5>{{ placeModel.id ? "Editar" : "Cadastro " }}</h5>
    </div>
    <div class="form">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Nome:">
          <b-form-input
            v-model="placeModel.name"
            placeholder="Informe um nome"
            type="text"
          ></b-form-input
        ></b-form-group>

        <b-form-group
          v-model="placeModel.photoType"
          label-cols-md="4"
          label="Tipo de imagem:"
        >
          <b-form-radio-group
            class="pt-2"
            id="radio-group-2"
            name="radio-sub-component"
            v-model="placeModel.photoType"
          >
            <b-form-radio name="imgType" value="URL">URL</b-form-radio>
            <b-form-radio name="imgType" value="IMG">Arquivo</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group label="URL:" v-if="placeModel.photoType === 'URL'">
          <b-form-input
            v-model="placeModel.photoUrl"
            placeholder="Informe a URL"
            text="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Imagem:" v-if="placeModel.photoType === 'IMG'"
          ><b-form-file
            v-model="photo"
            accept=".jpg, .png, .gif"
            placeholder="Escolha um arquivo ou arraste aqui..."
            drop-placeholder="Solte seu arquivo aqui..."
          ></b-form-file>
          <b-input-form v-model="placeModel.photo" type="file"></b-input-form>
        </b-form-group>

        <div class="footer">
          <b-button class="loginButton" variant="success" type="submit">{{
            placeModel.id ? "Salvar" : "Cadastrar"
          }}</b-button>
        </div>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import Place from "../../model/Place";
import PlaceService from "../../services/PlaceService";

export default {
  name: "RegisterEditForm",
  data() {
    return {
      placeModel: new Place(),
    };
  },
  props: {
    photo: [],
    placeFormModal: Boolean,
    place: {},
  },
  methods: {
    cancelPlaceModal() {
      this.$emit("update:placeFormModal", false);
    },
    async onSubmit() {
      try {
        if (this.placeModel.id !== 0) await this.DoUpdate();
        else await this.RegisterPlace();
      } catch (err) {
        if (err.response.status == 403)
          this.$emit("showMessage", {
            message: "Necessário realizar login.",
            type: "Error",
          });
        else
          this.$emit("showMessage", {
            message: err.description
              ? err.description
              : "Ocorreu um erro inesperado.",
            type: "Error",
          });
      }
    },
    async DoUpdate() {
      let place = await this.GetPlaceObject(this.placeModel);
      await PlaceService.UpdatePlace(place);
      this.$emit("LoadPlaces");
      this.$emit("update:placeFormModal", false);
    },
    async RegisterPlace() {
      let place = await this.GetPlaceObject(this.placeModel);
      await PlaceService.RegisterPlace(place);
      this.$emit("LoadPlaces");
      this.$emit("update:placeFormModal", false);
    },
    Base64Encode(data) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);

        return reader;
      });
    },
    async GetPlaceObject(place) {
      if (place.photoType == "URL") {
        place.photo = "";
        return place;
      }

      place.photoUrl = "";
      let response = await this.Base64Encode(this.photo);
      place.photo = response;
      return place;
    },
  },
  mounted() {
    if (this.place.id) {
      this.placeModel.id = this.place.id;
      this.placeModel.name = this.place.name;
      this.placeModel.photo = this.place.photo;
      this.placeModel.photoType = this.place.photoType;
      this.placeModel.photoUrl = this.place.photoUrl;
      return;
    }

    this.placeModel = new Place();
  },
};
</script>

<style scoped>
h5 {
  display: table;
  margin: auto;
}
.form {
  padding: 20px 10px;
}
.footer {
  text-align: center;
  padding-top: 40px;
}
.footer > button {
  width: 200px;
}
</style>