import { db } from '@/core/service/firebase';
import Vue from 'vue';
import { qtdMeseAteHoje, proximoMes, arredonda } from '@/core/service/funcoes';
import { Parcela } from '@/data/schema/parcela';

export class ParcelaService {
  constructor() {
    this.uid = Vue.prototype.$uid;
  }

  getRef() {
    if (!this.uid || this.uild === '') {
      throw new Error('uid indefinido');
    }
    return db.ref(`${this.uid}/parcelas`);
  }

  async getParcelas() {
    const snapshot = await this.getRef().orderByKey().once('value');
    const parcelas = [];
    for (let key in snapshot.val()) {
      parcelas.push(snapshot.val()[key]);
    }
    return parcelas;
  }

  async salvarParcela(parcela) {
    if (parcela.key == null) {
      const parcelaRef = await this.getRef().push();
      parcela.key = parcelaRef.key;
      await parcelaRef.set(parcela);
    } else {
      this.getRef()
        .child(parcela.key)
        .update({ dataPagamento: parcela.dataPagamento });
    }
    return parcela;
  }

  async criaParcelas(despesa) {
    if (despesa.eFixa) {
      await this.parcelaFixa(despesa);
    } else if (despesa.parcelas > 1) {
      await this.maisParcelas(despesa);
    } else {
      await this.umaParcela(despesa);
    }
  }

  async parcelaFixa(despesa) {
    const qtdMeses = qtdMeseAteHoje(despesa.dataParcelaUm);
    for (let i = 0; i <= qtdMeses + 1; i += 1) {
      const parcela = new Parcela();
      parcela.despesaId = despesa.key;
      parcela.descricao = despesa.descricao;
      parcela.dataVencimento = proximoMes(despesa.dataParcelaUm, i);
      parcela.valor = despesa.valorTotal;
      parcela.dataPagamento = '';
      await this.salvarParcela(parcela);
    }
  }

  async umaParcela(despesa) {
    const parcela = new Parcela();
    parcela.despesaId = despesa.key;
    parcela.descricao = despesa.descricao;
    parcela.dataVencimento = despesa.dataParcelaUm;
    parcela.valor = despesa.valorTotal;
    parcela.dataPagamento = '';
    await this.salvarParcela(parcela);
  }

  async maisParcelas(despesa) {
    let valorParcela = despesa.valorTotal / despesa.parcelas;
    valorParcela = arredonda(valorParcela, 2);
    let ultimaParcela =
      despesa.valorTotal - valorParcela * despesa.parcelas + valorParcela;
    ultimaParcela = arredonda(ultimaParcela, 2);
    for (let i = 0; i < despesa.parcelas; i += 1) {
      const parcela = new Parcela();
      parcela.despesaId = despesa.key;
      parcela.descricao = despesa.descricao;
      parcela.dataVencimento = proximoMes(despesa.dataParcelaUm, i);
      parcela.dataPagamento = '';
      if (i === despesa.parcelas - 1) {
        parcela.valor = ultimaParcela;
      } else {
        parcela.valor = valorParcela;
      }
      await this.salvarParcela(parcela);
    }
  }

  async novasParcelasFixas(despesa) {
    const self = this;
    const snapshot = await db
      .ref(`${self.uid}/parcelas`)
      .orderByChild('despesaId')
      .equalTo(despesa.key)
      .once('value');

    const parcelasFixas = snapshot.val();
    const ultima = self.getUltimaParcela(parcelasFixas);
    const parcela = {};
    let qtdMeses;
    if (ultima == null) {
      qtdMeses = qtdMeseAteHoje(despesa.dataParcelaUm);
      for (let i = 0; i <= qtdMeses + 1; i++) {
        parcela.despesaId = despesa.key;
        parcela.descricao = despesa.descricao;
        parcela.dataVencimento = proximoMes(despesa.dataParcelaUm, i);
        parcela.valor = despesa.valorTotal;
        parcela.dataPagamento = '';
        await this.salvarParcela(parcela);
      }
    } else {
      qtdMeses = qtdMeseAteHoje(ultima.dataVencimento);
      for (let i = 1; i <= qtdMeses + 1; i++) {
        parcela.despesaId = ultima.despesaId;
        parcela.descricao = ultima.descricao;
        parcela.dataVencimento = proximoMes(ultima.dataVencimento, i);
        parcela.valor = ultima.valor;
        parcela.dataPagamento = '';
        await this.salvarParcela(parcela);
      }
    }
  }

  getUltimaParcela(parcelas) {
    if (parcelas == null) {
      return null;
    }
    let ultimaParcela = { dataVencimento: '1900-01-01' };
    for (let key in parcelas) {
      const p = parcelas[key];
      const dataUltima = Date.parse(ultimaParcela.dataVencimento);
      const dataParcela = Date.parse(p.dataVencimento);
      if (dataParcela > dataUltima) {
        ultimaParcela = p;
      }
    }
    return ultimaParcela;
  }

  async deleteParecelasPorDespesa(despesa) {
    const parcelasSnapshot = await db
      .ref(`${this.uid}/parcelas`)
      .orderByChild('despesaId')
      .equalTo(despesa.key)
      .once('value');

    for (let key in parcelasSnapshot.val()) {
      await this.getRef().child(key).remove();
    }
  }
}
