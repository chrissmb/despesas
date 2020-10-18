<template>
  <div>
    <btn type="success" @click="openForm">Criar despesa</btn>

    <grid>
      <template v-slot:columns>
        <th>Descrição</th>
        <th>Valor Total</th>
        <th>Parcelas</th>
        <th>Primeira parcela</th>
        <th>Excluir</th>
      </template>
      <template v-slot:tbody>
        <tr v-for="despesa in despesas" :key="despesa.key">
          <td>{{ despesa.descricao }}</td>
          <td>
            <router-link
              v-if="despesa.eFixa"
              :to="{
                name: 'despesa-valor-total',
                params: { key: despesa.key },
              }"
              >{{ valorTotal(despesa) }}</router-link
            >
            <span v-if="!despesa.eFixa">{{ valorTotal(despesa) }}</span>
          </td>
          <td>{{ despesa.eFixa ? "Fixa" : despesa.parcelas }}</td>
          <td>{{ dataParcelaUm(despesa) }}</td>
          <td style="padding: 2px; text-align: center">
            <btn
              type="error"
              style="padding: 2px 10px"
              @click="deleteDespesa(despesa)"
              >&#128465;</btn
            >
          </td>
        </tr>
      </template>
    </grid>
  </div>
</template>

<script>
import Grid from "@/shared/ui-components/grid/Grid";
import Btn from "@/shared/ui-components/btn/Btn";
import { DespesaService } from "@/data/service/despesa-service";
import { AuthService } from "@/core/service/auth-service";
import { Despesa } from "@/data/schema/despesa";
import { maskMoeda, formataStringDate } from "@/core/service/funcoes";
import { AsyncSpinnerService } from "@/shared/ui-components/spinner/async-spinner-service";
import { MessageBoxService } from "@/shared/ui-components/modal/message-box-service.js";

const asyncSpinnerService = new AsyncSpinnerService();
const messageBoxService = new MessageBoxService();
const despesaService = new DespesaService();
const authService = new AuthService();

export default {
  name: "DespesaPage",
  components: { Grid, Btn },
  data() {
    return {
      despesa: new Despesa(),
      despesas: [],
    };
  },
  methods: {
    openForm() {
      this.$router.push("/inicio/despesaForm");
    },
    dataParcelaUm(despesa) {
      return formataStringDate(new Date(despesa.dataParcelaUm));
    },
    valorTotal(despesa) {
      return maskMoeda(despesa.valorTotal);
    },
    deleteDespesa(despesa) {
      messageBoxService.confirm("Deseja realmente excluir a conta?", () => {
        asyncSpinnerService
          .exec(() => despesaService.deleteDespesa(despesa))
          .catch((e) => {
            console.error(e);
            messageBoxService.error("Hoje uma falha ao excluir");
          });
      });
    },
  },
  mounted() {
    authService.estadoAlterado((user) => {
      if (user) {
        this.$rtdbBind("despesas", despesaService.getRef());
        despesaService.verificaFixas();
      } else {
        authService.autenticarComoAnonimo(console.error);
      }
    });

    asyncSpinnerService.root = this.$root;
    messageBoxService.root = this.$root;
  },
};
</script>

<style scoped>
</style>
