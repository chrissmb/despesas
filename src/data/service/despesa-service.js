import { db } from '@/core/service/firebase';
import Vue from 'vue';
import { ParcelaService } from '@/data/service/parcela-service';
import { ValidacaoService } from '@/core/service/validacao-service';

const parcelaService = new ParcelaService();

export class DespesaService {
  constructor() {
    this.uid = Vue.prototype.$uid;
    this.validacoes = this._getValidacoes();
  }

  _getValidacoes() {
    return new ValidacaoService((despesa) => {
      return {
        descricao: [
          {
            isInvalid:
              !despesa.descricao || despesa.descricao.trim().length < 3,
            msg: 'A descrição deve ser preenchida com mais de 3 caracteres.'
          }
        ],
        valorTotal: [
          {
            isInvalid:
              !despesa.valorTotal || despesa.valorTotal <= 0,
            msg: 'Valor Total dever ser um valor acima de 0.'
          }
        ],
        dataParcelaUm: [
          {
            isInvalid:
              !despesa.dataParcelaUm && !Date.parse(despesa.dataParcelaUm),
            msg: 'Data da 1ª parcela deve ser preenchida.'
          }
        ],
        parcelas: [
          {
            isInvalid:
              !despesa.eFixa &&
              (!despesa.parcelas ||
                !Number.isInteger(despesa.parcelas) ||
                despesa.parcelas < 1),
            msg: 'Preenchar parcelas com um valor válido.'
          }
        ]
      };
    });
  }

  getRef() {
    if (!this.uid || this.uild === '') {
      throw new Error('uid indefinido');
    }
    return db.ref(`${this.uid}/despesas`);
  }

  async getDespesas() {
    const snapshot = await this.getRef().orderByKey().once('value');
    const despesas = [];
    for (let key in snapshot.val()) {
      despesas.push(snapshot.val()[key]);
    }
    return despesas;
  }

  async getDespesa(key) {
    const snapshot = await this.getRef().child(key).once('value');
    return snapshot.val();
  }

  async salvarDespesa(despesa) {
    if (this.eFixa) {
      despesa.parcelas = 1;
    }

    if (!this.validacoes.isValid(despesa)) {
      throw Error(this.validacoes.getErrorMessages(despesa).join('\n'));
    }
    if (despesa.key == null) {
      const despesaRef = this.getRef().push();
      despesa.key = despesaRef.key;
      await despesaRef.set(despesa);
      await parcelaService.criaParcelas(despesa);
    } else {
      this.getRef().child(despesa.key).update({
        valorTotal: despesa.valorTotal
      });
    }

    return despesa;
  }

  async deleteDespesa(despesa) {
    await this.getRef().child(despesa.key).remove();
    await parcelaService.deleteParecelasPorDespesa(despesa);
  }

  async verificaFixas() {
    const snapshot = await this.getRef()
      .orderByChild('eFixa')
      .equalTo(true)
      .once('value');
    const despesas = snapshot.val();
    for (let key in despesas) {
      await parcelaService.novasParcelasFixas(despesas[key]);
    }
  }
}
