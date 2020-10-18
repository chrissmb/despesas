export class ValidacaoService {
  constructor(fnValidacoes) {
    this.fnValidacoes = fnValidacoes;
  }

  isValid(object) {
    const validacoes = this.fnValidacoes(object);
    for (let campo in validacoes) {
      const isTudoValido = validacoes[campo].every((e) => !e.isInvalid);
      if (!isTudoValido) {
        return false;
      }
    }
    return true;
  }

  getErrorMessages(object, campo) {
    const validacoes = this.fnValidacoes(object);
    if (campo == null) {
      let messages = [];
      for (let c in validacoes) {
        messages = messages.concat(
          validacoes[c].filter((e) => e.isInvalid).map((e) => e.msg)
        );
      }
      return messages;
    }

    return validacoes[campo].filter((e) => e.isInvalid).map((e) => e.msg);
  }
}
