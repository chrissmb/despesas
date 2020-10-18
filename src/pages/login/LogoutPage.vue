<template>
  <div>Desconectando...</div>
</template>
<script>
import { AuthService } from "@/core/service/auth-service";
const authService = new AuthService();

export default {
  name: "Logout",
  mounted() {
    authService
      .logout()
      .then(() => this.$router.push("Login"))
      .catch((e) => console.error(e));
  },
};
</script>