export function dateToString(data) {
  const ano = data.getFullYear();
  const mes = data.getMonth() + 1;
  const dia = data.getDate();
  return (
    '' +
    ano +
    '-' +
    (mes < 10 ? '0' : '') +
    mes +
    '-' +
    (dia < 10 ? '0' : '') +
    dia
  );
}

export function dateToStringBr(data) {
  const ano = data.getFullYear();
  const mes = data.getMonth() + 1;
  const dia = data.getDate();
  return (
    '' +
    (dia < 10 ? '0' : '') +
    dia +
    '/' +
    (mes < 10 ? '0' : '') +
    mes +
    '/' +
    ano
  );
}

export function formataStringDate(dataStr) {
  return dateToStringBr(instanciaDate(dataStr));
}

export function instanciaDate(dataStr) {
  let data = dataStr ? new Date(dataStr) : new Date();
  data.setMinutes(data.getMinutes() + data.getTimezoneOffset());
  return data;
}

export function qtdMeseAteHoje(dataStr) {
  const hoje = new Date();
  const data = instanciaDate(dataStr);
  const mesHoje = hoje.getMonth();
  const mesData = data.getMonth();
  const anoHoje = hoje.getYear();
  const anoData = data.getYear();
  let qtdMeses = (anoHoje - anoData) * 12;
  qtdMeses += mesHoje - mesData;
  return qtdMeses;
}

export function eDataValida(dataStr) {
  const data = Date.parse(dataStr);
  return data != null;
}

export function proximoMes(dataStr, numMes) {
  const data = instanciaDate(dataStr);
  data.setMonth(data.getMonth() + numMes);
  return dateToString(data);
}

export function arredonda(num, decimal) {
  const exp = Math.pow(10, decimal);
  return Math.trunc(num * exp) / exp;
}

export function maskMoeda(n) {
  let s = '' + n;
  const arr = s.split('.');
  const arrInt = arr[0].split('');
  for (let i = arrInt.length - 4; i > 0; i = i - 3) {
    arrInt.splice(i, 0, '.');
  }
  let dec = '00';
  if (arr.length > 1) {
    dec = arr[1].slice(0, 2);
    dec = dec.length === 1 ? dec + '0' : dec;
  }
  return 'R$ ' + arrInt.join('') + ',' + dec;
}
