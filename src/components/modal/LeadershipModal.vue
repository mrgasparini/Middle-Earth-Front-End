<template>
  <b-modal
    id="modal-sm"
    ref="modal"
    hide-header
    hide-footer
    :visible="leadershipModal"
    @hidden="cancelLeadershipModal"
  >
    <div class="modal-header">
      <h5>Leadership</h5>
    </div>
    <div class="table">
      <b-table bordered hover :items="placeList" :fields="fields"> </b-table>
    </div>
  </b-modal>
</template>

<script>
import PlaceService from "../../services/PlaceService";
import VoteService from "../../services/VoteService";

export default {
  name: "LeadershipModal",
  data() {
    return {
      placeList: [],
      fields: [
        { key: "name", label: "Nome", sortable: true },
        { key: "votes", label: "Votos", sortable: true },
      ],
    };
  },
  props: {
    leadershipModal: Boolean,
  },
  methods: {
    cancelLeadershipModal() {
      this.$emit("update:leadershipModal", false);
    },
  },
  async mounted() {
    let placeResponse = await PlaceService.GetAllPlaces();
    let voteResponse = await VoteService.GetVotes();
    let votes = voteResponse.data.votes;
    let places = placeResponse.places;
    places.forEach((place) => {
      let vote = votes[0].find((vote) => {
        return vote.placeId == place.id;
      });

      this.placeList.push({
        name: place.name,
        votes: vote === undefined ? 0 : vote.votesNum,
      });
    });
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