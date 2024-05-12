export class PaymentModel {
  payPalBRL: string;
  payPalUSD: string;
  pix: {
    code: string;
    name: string;
    location: string;
  };
  btc: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any) {
    if (!data) {
      throw new TypeError('Invalid data from secret');
    }

    const open = atob(data);
    const parsed = JSON.parse(open);
    this.payPalBRL = parsed.payPalBRL;
    this.payPalUSD = parsed.payPalUSD;
    this.pix = {
      code: parsed.pix.code,
      name: parsed.pix.name,
      location: parsed.pix.location,
    };
    this.payPalBRL = parsed.payPalBRL;
    this.payPalBRL = parsed.payPalBRL;
    this.btc = parsed.btc;
  }
}
