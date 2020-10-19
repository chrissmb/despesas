import { auth, provider, emailAuthProvider } from '@/core/service/firebase';
import Vue from 'vue';
import { ValidacaoService } from './validacao-service';

export class AuthService {
  constructor() {
    this.validacoes = this._getValidacoes();
  }

  _getValidacoes() {
    return new ValidacaoService((cadastro) => {
      const regexEmail = /\b(\w|\.|-)+@(\w|\.|-)+\.\w{2,4}\b/;
      return {
        email: [
          {
            isInvalid: !regexEmail.test(cadastro.email),
            msg: 'E-mail inválido'
          }
        ],
        senha: [
          {
            isInvalid: !cadastro.senha || cadastro.senha.length < 8,
            msg: 'Senha deve conter no mínimo 8 caracteres.'
          },
          {
            isInvalid: cadastro.repeteSenha !== cadastro.senha,
            msg: 'Senhas não correspondem.'
          }
        ]
      };
    });
  }

  autenticar(email, senha) {
    return auth.signInWithEmailAndPassword(email, senha);
  }

  autenticarGoogle() {
    return auth.signInWithPopup(provider);
  }

  recuperarSenha(email) {
    return auth.sendPasswordResetEmail(email);
  }

  estadoAlterado(callback) {
    auth.onAuthStateChanged((user) => {
      Vue.prototype.$uid = user && user.uid;
      callback(user);
    });
  }

  async cadastrar(cadastro) {
    if (!this.validacoes.isValid) {
      throw Error(this.validacoes.getErrorMessages(cadastro).join('\n'));
    }
    const msgFalhaEmail =
      'Ocorreu uma falha ao enviar o e-mail de verificação.';
    const msgFalhaCadastro = 'Falha ao realizar cadastro.';

    try {
      await auth.createUserWithEmailAndPassword(cadastro.email, cadastro.senha);
    } catch (e) {
      throw { erro: e, msg: msgFalhaCadastro };
    }
    try {
      await auth.currentUser.sendEmailVerification();
    } catch (e) {
      throw { erro: e, msg: msgFalhaEmail };
    }
  }

  async alteraSenha(cadastro) {
    const user = auth.currentUser;
    const msgFalhaAtualizacao = 'Houve uma falha na atualização da senha.';
    const msgSenhaInvalida = 'Senha atual inválida.';
    const erros = this.validacoes.getErrorMessages(cadastro, 'senha');

    if (!user) return;

    if (erros.length > 0) {
      throw { msg: erros.join('\n') };
    }

    const email = user.email;

    try {
      const credential = emailAuthProvider.credential(
        email,
        cadastro.senhaAtual
      );
      await user.reauthenticateAndRetrieveDataWithCredential(credential);
    } catch (e) {
      throw { erro: e, msg: msgSenhaInvalida };
    }

    try {
      await user.updatePassword(cadastro.senha);
    } catch (e) {
      throw { erro: e, msg: msgFalhaAtualizacao };
    }
  }

  eContaGoogle() {
    return (
      auth &&
      auth.currentUser &&
      auth.currentUser.providerData[0] &&
      auth.currentUser.providerData[0].providerId === 'google.com'
    );
  }

  autenticarComoAnonimo(callbackFalha) {
    auth.signInAnonymously().catch(callbackFalha);
  }

  async logout() {
    return auth.signOut();
  }
}
