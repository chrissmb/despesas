<template>
  <div>
    <numberfield
      label="Valor Total"
      v-model="despesa.valorTotal"
      :msgValidate="errosValorTotal"
    />
    <btn type="error" @click="voltar">voltar</btn>
    <btn type="success" @click="alteraValorTotal" :disabled="!isValid"
      >&#128190; Salvar</btn
    >
  </div>
</template>

<script>
import Numberfield from "@/shared/ui-components/numberfield/Numberfield";
import Btn from "@/shared/ui-components/btn/Btn";
import { DespesaService } from "@/data/service/despesa-service";
import { AsyncSpinnerService } from "@/shared/ui-components/spinner/async-spinner-service";
import { MessageBoxService } from "@/shared/ui-components/modal/message-box-service.js";

const asyncSpinnerService = new AsyncSpinnerService();
const messageBoxService = new MessageBoxService();
const despesaService = new DespesaService();

export default {
  name: "DespesaValorTotalPage",
  components: {
    Numberfield,
    Btn,
  },
  data() {
    return {
      despesa: {},
    };
  },
  methods: {
    alteraValorTotal() {
      asyncSpinnerService
        .exec(() => despesaService.salvarDespesa(this.despesa))
        .then(() => {
          this.voltar();
        })
        .catch((e) => {
          console.error(e);
          messageBoxService.error(e);
        });
    },
    voltar() {
      this.$router.push("/inicio/despesa");
    },
  },
  computed: {
    errosValorTotal() {
      return despesaService.validacoes.getErrorMessages(
        this.despesa,
        "valorTotal"
      );
    },
    isValid() {
      return despesaService.validacoes.isValid(this.despesa);
    },
  },
  mounted() {
    despesaService
      .getDespesa(this.$route.params.key)
      .then((d) => (this.despesa = d));

    asyncSpinnerService.root = this.$root;
    messageBoxService.root = this.$root;
  },
};
</script>

<style>
</style>
