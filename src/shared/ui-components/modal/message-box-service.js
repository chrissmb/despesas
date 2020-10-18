export class MessageBoxService {
  constructor() {
    this.root = {};
  }

  information(msg, fOk) {
    this.root.$emit('information', msg, fOk);
  }

  error(msg, fOk) {
    this.root.$emit('error', msg, fOk);
  }

  confirm(msg, fOk, fCancel) {
    this.root.$emit('confirm', msg, fOk, fCancel);
  }
}
