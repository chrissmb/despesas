<template>
  <div>
    <modal ref="modalRef" :color="color">
      <template v-slot:header>{{ title }}</template>
      <template v-slot:body>{{ message }}</template>
      <template v-slot:footer>
        <btn @click="confirmOk">Ok</btn>
        <btn v-if="isConfirm" @click="cancel">Cancelar</btn>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from "@/shared/ui-components/modal/Modal";
import Btn from "@/shared/ui-components/btn/Btn";

export default {
  name: "message-box",
  components: { Modal, Btn },
  data() {
    return {
      color: "",
      message: "",
      title: "",
      isConfirm: false,
      callbackOk: null,
      callbackCancel: null,
    };
  },
  methods: {
    information(message, callbackOk) {
      this.title = "Informação";
      this.color = "";
      this.isConfirm = false;
      this.showModal(message, callbackOk);
    },
    error(message, callbackOk) {
      this.title = "Erro";
      this.color = "red";
      this.isConfirm = false;
      this.showModal(message, callbackOk);
    },
    confirm(message, callbackOk, callbackCancel) {
      this.title = "Confirmação";
      this.color = "";
      this.isConfirm = true;
      this.$global.confirm = null;
      this.callbackOk = callbackOk;
      this.callbackCancel = callbackCancel;
      this.showModal(message, callbackOk);
    },
    showModal(message, callbackOk) {
      this.callbackOk = callbackOk;
      this.message = message;
      this.$refs.modalRef.showModal();
    },
    confirmOk() {
      this.closeModal();
      if (this.callbackOk) {
        this.callbackOk();
      }
    },
    cancel() {
      this.closeModal();
      if (this.callbackCancel) {
        this.callbackCancel();
      }
    },
    closeModal() {
      this.$refs.modalRef.closeModal();
    },
  },
  mounted() {
    this.$root.$on("information", (m, fOk) => this.information(m, fOk));
    this.$root.$on("error", (m, fOk) => this.error(m, fOk));
    this.$root.$on("confirm", (m, fOk, fCancel) =>
      this.confirm(m, fOk, fCancel)
    );
  },
};
</script>
