<template>
  <div>
    <datefield v-model="dataDe" label="De" :dw="5" />
    <datefield v-model="dataAte" label="Ate" :dw="5" />
    <btn type="primary" @click="filtrarData"><icon name="search" /> Filtrar</btn>
    <combobox
      :list="despesas"
      v-model="selectDespesa"
      :itemLabel="labelDespesa"
      chave="key"
      :nullable="true"
    />
    <checkbox label="Só pendentes" v-model="soPendentes" :dw="12" />
    <grid>
      <template v-slot:columns>
        <th>Despesa</th>
        <th>Valor</th>
        <th>Vencimento</th>
        <th>Pagamento</th>
      </template>
      <template v-slot:tbody>
        <tr v-for="parcela in parcelasFiltradas" :key="parcela.key">
          <td>{{ parcela.descricao }}</td>
          <td>{{ maskMoeda(parcela.valor) }}</td>
          <td>{{ maskData(parcela.dataVencimento) }}</td>
          <td style="padding: 1px">
            <datefield
              style="padding: 1px"
              v-model="parcela.dataPagamento"
              @change="savePagamento(parcela)"
              :dw="12"
            />
          </td>
        </tr>
      </template>
    </grid>
  </div>
</template>

<script>
import {
  dateToString,
  instanciaDate,
  formataStringDate,
  maskMoeda,
} from "@/core/service/funcoes";
import Datefield from "@/shared/ui-components/datefield/Datefield";
import Combobox from "@/shared/ui-components/combobox/Combobox";
import Btn from "@/shared/ui-components/btn/Btn";
import Checkbox from "@/shared/ui-components/checkbox/Checkbox";
import Grid from "@/shared/ui-components/grid/Grid";
import Icon from '@/shared/icon/Icon';

import { DespesaService } from "@/data/service/despesa-service";
import { ParcelaService } from "@/data/service/parcela-service";
import { AuthService } from "@/core/service/auth-service";
import { AsyncSpinnerService } from "@/shared/ui-components/spinner/async-spinner-service";
import { MessageBoxService } from "@/shared/ui-components/modal/message-box-service.js";

const asyncSpinnerService = new AsyncSpinnerService();
const messageBoxService = new MessageBoxService();
const despesaService = new DespesaService();
const parcelaService = new ParcelaService();
const authService = new AuthService();

export default {
  name: "ParcelaPage",
  components: {
    Datefield,
    Combobox,
    Btn,
    Checkbox,
    Grid,
    Icon,
  },
  data() {
    return {
      dataDe: dateToString(instanciaDate()),
      dataAte: this.umMesDespois(),
      soPendentes: false,
      selectDespesa: null,
      uid: "",
      parcelas: [],
      despesas: [],
    };
  },
  firebase: {
    parcelas: parcelaService.getRef(),
    despesas: despesaService.getRef(),
  },
  methods: {
    labelDespesa(despesa) {
      return despesa.descricao;
    },
    umMesDespois() {
      let data = instanciaDate();
      data.setMonth(data.getMonth() + 1);
      return dateToString(data);
    },
    filtrarData() {
      this.$rtdbBind(
        "parcelas",
        parcelaService
          .getRef()
          .orderByChild("dataVencimento")
          .startAt(this.dataDe)
          .endAt(this.dataAte)
      );
    },
    savePagamento(parcela) {
      asyncSpinnerService
        .exec(() => parcelaService.salvarParcela(parcela))
        .catch((e) => {
          console.error(e);
          messageBoxService.error(e);
        });
    },
    maskData(dataStr) {
      return formataStringDate(dataStr);
    },
    maskMoeda(valor) {
      return maskMoeda(valor);
    },
  },
  computed: {
    parcelasFiltradas() {
      let parcelas = [];
      Object.assign(parcelas, this.parcelas);
      if (this.soPendentes) {
        parcelas = parcelas.filter((p) => p.dataPagamento === "");
      }
      if (this.selectDespesa != null) {
        parcelas = parcelas.filter(
          (p) => p.despesaId === this.selectDespesa.key
        );
      }
      return parcelas;
    },
  },
  mounted() {
    authService.estadoAlterado((user) => {
      if (user) {
        this.uid = user.uid;
        const parcelasRef = parcelaService
          .getRef()
          .orderByChild("dataVencimento")
          .startAt(this.dataDe)
          .endAt(this.dataAte);
        this.$rtdbBind("parcelas", parcelasRef);
        this.$rtdbBind("despesas", despesaService.getRef());
      } else {
        authService.autenticarComoAnonimo(console.error);
      }
    });

    asyncSpinnerService.root = this.$root;
    messageBoxService.root = this.$root;
  },
};
</script>
