const ID_PAYLOAD_FORMAT_INDICATOR = '00';
const ID_MERCHANT_ACCOUNT_INFORMATION = '26';
const ID_MERCHANT_ACCOUNT_INFORMATION_GUI = '00';
const ID_MERCHANT_ACCOUNT_INFORMATION_KEY = '01';
const ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION = '02';
const ID_MERCHANT_CATEGORY_CODE = '52';
const ID_TRANSACTION_CURRENCY = '53';
const ID_TRANSACTION_AMOUNT = '54';
const ID_COUNTRY_CODE = '58';
const ID_MERCHANT_NAME = '59';
const ID_MERCHANT_CITY = '60';
const ID_ADDITIONAL_DATA_FIELD_TEMPLATE = '62';
const ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = '05';
const ID_CRC16 = '63';

export class Pix {
  pixKey: string;
  description: string;
  merchantName: string;
  merchantCity: string;
  taxId: string;
  amount: string;

  constructor(
    pixKey: string,
    description: string,
    merchantName: string,
    merchantCity: string,
    taxId: string,
    amount: number,
  ) {
    this.pixKey = pixKey;
    this.description = description;
    this.merchantName = merchantName;
    this.merchantCity = merchantCity;
    this.taxId = taxId;
    this.amount = amount.toFixed(2);
  }

  _getValue(id: string, value: string) {
    const size = String(value.length).padStart(2, '0');
    return id + size + value;
  }

  _getMechantAccountInfo() {
    const gui = this._getValue(ID_MERCHANT_ACCOUNT_INFORMATION_GUI, 'br.gov.bcb.pix');
    const key = this._getValue(ID_MERCHANT_ACCOUNT_INFORMATION_KEY, this.pixKey);
    const description = this._getValue(
      ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION,
      this.description,
    );

    return this._getValue(ID_MERCHANT_ACCOUNT_INFORMATION, gui + key + description);
  }

  _getAdditionalDataFieldTemplate() {
    const taxId = this._getValue(ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, this.taxId);
    return this._getValue(ID_ADDITIONAL_DATA_FIELD_TEMPLATE, taxId);
  }

  getPayload() {
    const payload =
      this._getValue(ID_PAYLOAD_FORMAT_INDICATOR, '01') +
      this._getMechantAccountInfo() +
      this._getValue(ID_MERCHANT_CATEGORY_CODE, '0000') +
      this._getValue(ID_TRANSACTION_CURRENCY, '986') +
      this._getValue(ID_TRANSACTION_AMOUNT, this.amount) +
      this._getValue(ID_COUNTRY_CODE, 'BR') +
      this._getValue(ID_MERCHANT_NAME, this.merchantName) +
      this._getValue(ID_MERCHANT_CITY, this.merchantCity) +
      // TODO tirar
      this._getAdditionalDataFieldTemplate();

    return payload + this._getCRC16(payload);
  }

  _getCRC16(payload: string) {
    function ord(str: string) {
      return str.charCodeAt(0);
    }
    function dechex(value: number) {
      if (value < 0) {
        value = 0xffffffff + value + 1;
      }
      return parseInt(String(value), 10).toString(16);
    }

    //ADICIONA DADOS GERAIS NO PAYLOAD
    payload = payload + ID_CRC16 + '04';

    //DADOS DEFINIDOS PELO BACEN
    const polinomio = 0x1021;
    let resultado = 0xffff;
    let length;

    //CHECKSUM
    if ((length = payload.length) > 0) {
      for (let offset = 0; offset < length; offset++) {
        resultado ^= ord(payload[offset]) << 8;
        for (let bitwise = 0; bitwise < 8; bitwise++) {
          if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
          resultado &= 0xffff;
        }
      }
    }

    //RETORNA CÓDIGO CRC16 DE 4 CARACTERES
    return ID_CRC16 + '04' + dechex(resultado).toUpperCase();
  }
}
