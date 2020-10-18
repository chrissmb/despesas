<template>
  <div>
    <div class="form-group">
      <textfield
        label="E-mail"
        v-model="cadastro.email"
        :msgValidate="errosEmail"
      />
    </div>
    <div class="form-group">
      <textfield
        type="password"
        label="Senha"
        v-model="cadastro.senha"
        :msgValidate="errosSenha"
      />
      <textfield
        type="password"
        label="Repita a senha"
        v-model="cadastro.repeteSenha"
      />
    </div>
    <div>
      <btn @click="cadastrar" :disabled="!ehValido">Efetuar cadastro</btn>
    </div>
    <div>
      <br />
      <router-link to="/login">Voltar</router-link>
    </div>
  </div>
</template>

<script>
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-alert: "off" */
import { AuthService } from "@/core/service/auth-service";
import { AsyncSpinnerService } from "@/shared/ui-components/spinner/async-spinner-service";
import { MessageBoxService } from "@/shared/ui-components/modal/message-box-service.js";
import Textfield from "@/shared/ui-components/textfield/Textfield";
import Btn from "@/shared/ui-components/btn/Btn";

const asyncSpinnerService = new AsyncSpinnerService();
const messageBoxService = new MessageBoxService();
const authService = new AuthService();

export default {
  name: "Cadastro",
  components: { Textfield, Btn },
  data() {
    return {
      cadastro: {
        email: "",
        senha: "",
        repeteSenha: "",
      },
    };
  },
  methods: {
    cadastrar() {
      asyncSpinnerService
        .exec(() => authService.cadastrar(this.cadastro))
        .then(() => {
          messageBoxService.information(
            "Foi enviado um e-mail de verificação para ativar a conta." +
              " O sistema não vai permitir leitura e gravações de dados" +
              " enquanto o e-mail não for verificado.",
            () => {
              this.$router.push("login");
            }
          );
        })
        .catch((e) => {
          console.error(e);
          messageBoxService.error(e.msg);
        });
    },
  },
  computed: {
    ehValido() {
      return authService.validacoes.isValid(this.cadastro);
    },
    errosEmail() {
      return authService.validacoes.getErrorMessages(this.cadastro, "email");
    },
    errosSenha() {
      return authService.validacoes.getErrorMessages(this.cadastro, "senha");
    },
  },
  mounted() {
    asyncSpinnerService.root = this.$root;
    messageBoxService.root = this.$root;
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300");

* {
  font-family: "Roboto", sans-serif;
}
</style>
