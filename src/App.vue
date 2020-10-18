<template>
  <div>
    <router-view />
    <async-spinner />
    <message-box />
  </div>
</template>

<script>
import AsyncSpinner from "@/shared/ui-components/spinner/AsyncSpinner";
import MessageBox from "@/shared/ui-components/modal/MessageBox";

export default {
  name: "App",
  components: { AsyncSpinner, MessageBox },
};
</script>
