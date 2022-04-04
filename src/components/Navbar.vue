<template>
  <div class="navbar">
    <nav>
      <div class="logo">
        <img src="@/assets/ninja.png" alt="Muso Ninjas" />
        <h1><router-link :to="{ name: 'Home' }">Muso Ninjas</router-link></h1>
      </div>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
export default {
  setup() {
    const { error, logout } = useLogout();
    const { user } = getUser();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("user logged out");
      }
      router.push({ name: "Login" });
    };

    return { handleClick, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
}
.logo {
  display: flex;
  align-items: center;
  width: 210px;
  justify-content: space-between;
}
nav .links a,
button {
  font-size: 14px;
  margin-left: 16px;
}
nav img {
  max-width: 60px;
}
</style>
