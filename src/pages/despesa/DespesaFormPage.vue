<template>
  <div>
    <h3>Cadatro de despesa</h3>
    <textfield
      label="Descrição"
      v-model="despesa.descricao"
      :dw="4"
      :msgValidate="errosDescricao"
    />
    <numberfield
      label="Valor total"
      v-model="despesa.valorTotal"
      :dw="4"
      :min="1"
      :msgValidate="errosValorTotal"
    />
    <datefield
      label="Data 1ª parcelas"
      v-model="despesa.dataParcelaUm"
      :dw="4"
      :msgValidate="errosDataParcelaUm"
    />
    <checkbox label="Despesa fixa" v-model="despesa.eFixa" :dw="12" />
    <numberfield
      v-if="!despesa.eFixa"
      label="Parcelas"
      v-model="despesa.parcelas"
      :dw="6"
      :msgValidate="errosParcelas"
      :min="1"
    />
    <div>
      <btn type="error" @click="voltar()">Voltar</btn>
      <btn type="success" @click="saveDespesa()" :disabled="!isValid"
        >&#128190; Salvar</btn
      >
    </div>
  </div>
</template>

<script>
import Textfield from "@/shared/ui-components/textfield/Textfield";
import Numberfield from "@/shared/ui-components/numberfield/Numberfield";
import Datefield from "@/shared/ui-components/datefield/Datefield";
import Btn from "@/shared/ui-components/btn/Btn";
import Checkbox from "@/shared/ui-components/checkbox/Checkbox";
import { Despesa } from "@/data/schema/despesa";
import { DespesaService } from "@/data/service/despesa-service";
import { AsyncSpinnerService } from "@/shared/ui-components/spinner/async-spinner-service";
import { MessageBoxService } from "@/shared/ui-components/modal/message-box-service.js";

const asyncSpinnerService = new AsyncSpinnerService();
const messageBoxService = new MessageBoxService();
const despesaService = new DespesaService();

export default {
  name: "DespesaFormPage",
  components: {
    Textfield,
    Numberfield,
    Datefield,
    Btn,
    Checkbox,
  },
  data() {
    return {
      despesa: new Despesa(),
    };
  },
  methods: {
    voltar() {
      this.$router.push("/inicio/despesa");
    },
    saveDespesa() {
      asyncSpinnerService
        .exec(() => despesaService.salvarDespesa(this.despesa))
        .then(() => {
          this.voltar();
        })
        .catch((e) => {
          messageBoxService.error(e);
          console.error(e);
        });
    },
  },
  computed: {
    errosDescricao() {
      return despesaService.validacoes.getErrorMessages(
        this.despesa,
        "descricao"
      );
    },
    errosDataParcelaUm() {
      return despesaService.validacoes.getErrorMessages(
        this.despesa,
        "dataParcelaUm"
      );
    },
    errosParcelas() {
      return despesaService.validacoes.getErrorMessages(
        this.despesa,
        "parcelas"
      );
    },
    errosValorTotal() {
      return despesaService.validacoes.getErrorMessages(
        this.despesa,
        "valorTotal"
      );
    },
    erros() {
      return despesaService.validacoes.getErrorMessages(this.despesa);
    },
    isValid() {
      return despesaService.validacoes.isValid(this.despesa);
    },
  },
  mounted() {
    asyncSpinnerService.root = this.$root;
    messageBoxService.root = this.$root;
  },
};
</script>

<style scoped>
</style>
