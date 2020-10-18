<template>
  <card title="Login" :dm="3">
    <template v-slot:content>
      <textfield label="E-mail" v-model="email" :dw="12"></textfield>
      <textfield
        type="password"
        label="Senha"
        v-model="senha"
        :dw="12"
        @enter="fazLogin"
      ></textfield>
      <div>
        <a href="javascript:void(0)" @click="googleLogin"
          >Login com conta Google</a
        >
      </div>
      <div>
        <router-link to="/cadastro">Efetuar cadastro</router-link>
      </div>
      <div>
        <a href="javascript:void(0)" @click="esqueceuSenha">Esqueceu a senha</a>
      </div>
    </template>
    <template v-slot:footer>
      <btn @click="fazLogin">Efetuar login</btn>
    </template>
  </card>
</template>

<script>
import { AuthService } from "@/core/service/auth-service";
import { AsyncSpinnerService } from "@/shared/ui-components/spinner/async-spinner-service";
import { MessageBoxService } from "@/shared/ui-components/modal/message-box-service.js";
import Textfield from "@/shared/ui-components/textfield/Textfield";
import Btn from "@/shared/ui-components/btn/Btn";
import Card from "@/shared/ui-components/card/Card";

const authService = new AuthService();
const asyncSpinnerService = new AsyncSpinnerService();
const messageBoxService = new MessageBoxService();

export default {
  name: "Login",
  components: { Textfield, Btn, Card },
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    fazLogin() {
      asyncSpinnerService
        .exec(() => authService.autenticar(this.email, this.senha))
        .then(() => {
          this.$router.push("/inicio/despesa");
        })
        .catch((error) => {
          console.error(error);
          messageBoxService.error("Falha de login.");
        });
    },
    googleLogin() {
      authService
        .autenticarGoogle()
        .then(() => this.$router.push("/inicio/despesa"))
        .catch((error) => console.error(`${error.code}: ${error.message}`));
    },
    esqueceuSenha() {
      asyncSpinnerService
        .exec(() => authService.recuperarSenha(this.email))
        .then(() => messageBoxService.information("E-mail enviado com sucesso"))
        .catch(() =>
          messageBoxService.error(
            "Houve uma falha ao enviar o e-mail. Certifique -se de ter digitado o e-mail corretamente"
          )
        );
    },
  },
  created() {
    authService.estadoAlterado((user) => {
      if (user) {
        this.$router.push("/inicio/despesa");
      }
    });
    asyncSpinnerService.root = this.$root;
    messageBoxService.root = this.$root;
  },
};
</script>
