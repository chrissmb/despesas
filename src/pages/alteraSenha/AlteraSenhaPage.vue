<template>
  <div>
    <div v-if="eContaGoogle">
      Usuário autenticado pelo Google não pode alterar a senha aqui.
    </div>
    <div v-if="!eContaGoogle">
      <div>
        <textfield
          label="Senha atual"
          type="password"
          v-model="cadastro.senhaAtual"
        ></textfield>
      </div>
      <textfield
        label="Nova senha"
        type="password"
        v-model="cadastro.senha"
        :msgValidate="errosSenha"
      ></textfield>
      <textfield
        label="Confirmar senha"
        type="password"
        v-model="cadastro.repeteSenha"
      ></textfield>
      <btn @click="alteraSenha" :disabled="!eValido">Alterar</btn>
    </div>
  </div>
</template>

<script>
import { AuthService } from "@/core/service/auth-service";
import { AsyncSpinnerService } from "@/shared/ui-components/spinner/async-spinner-service";
import { MessageBoxService } from "@/shared/ui-components/modal/message-box-service.js";
import Textfield from "@/shared/ui-components/textfield/Textfield";
import Btn from "@/shared/ui-components/btn/Btn";

const asyncSpinnerService = new AsyncSpinnerService();
const messageBoxService = new MessageBoxService();
const authService = new AuthService();

export default {
  name: "AlteraSenha",
  components: { Textfield, Btn },
  data() {
    return {
      cadastro: {
        senhaAtual: "",
        senha: "",
        repeteSenha: "",
      },
    };
  },
  methods: {
    alteraSenha() {
      if (!this.eValido) return;

      asyncSpinnerService
        .exec(() => authService.alteraSenha(this.cadastro))
        .then(() => {
          messageBoxService.information("Senha alterada.");
          this.limpaForm();
        })
        .catch((e) => {
          console.error(e.erro);
          messageBoxService.error(e.msg);
        });
    },
    limpaForm() {
      this.cadastro = {
        senhaAtual: "",
        senha: "",
        repeteSenha: "",
      };
    },
  },
  computed: {
    errosSenha() {
      return authService.validacoes.getErrorMessages(this.cadastro, "senha");
    },
    eValido() {
      return this.errosSenha.length === 0;
    },
    eContaGoogle() {
      return authService.eContaGoogle();
    }
  },
  mounted() {
    asyncSpinnerService.root = this.$root;
    messageBoxService.root = this.$root;
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300");

* {
  font-family: "Roboto", sans-serif;
}
</style>
