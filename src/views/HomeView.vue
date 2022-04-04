<template>
  <div class="home">
    <div v-if="error">Could not fetch data</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";

export default {
  name: "HomeView",
  components: {
    ListView,
  },
  setup() {
    const { error, documents } = getCollection("playlists");

    return { error, documents };
  },
};
</script>
