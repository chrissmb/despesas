export class AsyncSpinnerService {
  constructor() {
    this.pool = [];
    this.root = {};
  }

  show() {
    this.pool.push(1);
    this.root.$emit('spinner', true);
  }

  close() {
    this.pool.pop();
    if (this.pool.length === 0) {
      this.root.$emit('spinner', false);
    }
  }

  async exec(callback) {
    this.show();
    let obj = null;

    try {
      obj = await callback();
    } catch (error) {
      this.close();
      throw error;
    }
    this.close();
    return obj;
  }
}
