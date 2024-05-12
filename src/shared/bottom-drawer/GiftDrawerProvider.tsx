import { StackSpacing } from '@/components/ui/stack-spacing';
import { UniteText } from '@/components/ui/unite-text';
import { PaymentModel } from '@/models/PaymentModel';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import useLocationHash from 'src/hooks/useLocationHash';
import { Pix } from '../utils/pix';
import { RegistryEntry } from '../utils/registryMap';

export interface GiftDrawerInterface {
  openDrawer: (data: RegistryEntry) => void;
}

export const GiftDrawerContext = React.createContext<GiftDrawerInterface>({
  openDrawer: () => undefined,
});

export const GiftDrawerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [drawerInfo, openDrawer] = React.useState<RegistryEntry | undefined>(undefined);
  const locationHash = useLocationHash();
  const [payments, setPayments] = useState<PaymentModel>();
  const [pixCode, setPixCode] = useState<string>();
  const [pixCopied, setPixCopied] = useState<boolean>(false);
  const [btcCopied, setBtcCopied] = useState<boolean>(false);

  useEffect(() => {
    if (drawerInfo) {
      closeDrawer();
    }
    // hack to close regardless of state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationHash]);

  useEffect(() => {
    if (drawerInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [drawerInfo]);

  useEffect(() => {
    if (!payments || !drawerInfo) {
      return;
    }
    const pix = new Pix(
      payments.pix.code,
      drawerInfo.text,
      payments.pix.name,
      payments.pix.location,
      payments.pix.code,
      drawerInfo.price,
    );
    setBtcCopied(false);
    setPixCopied(false);
    setPixCode(pix.getPayload());
  }, [drawerInfo, payments]);

  useEffect(() => {
    const grabSecretsOnce = async () => {
      setPayments(new PaymentModel(process.env.REACT_APP_PAYMENTS));
    };
    grabSecretsOnce();
  }, []);

  const closeDrawer = () => {
    openDrawer(undefined);
  };

  const onCopyCode = () => {
    if (!pixCode) {
      return;
    }
    setPixCopied(true);
    navigator.clipboard.writeText(pixCode);
  };

  const onClickPayPalBRL = (amount: number) => {
    if (!payments) {
      return;
    }
    window.open(`${payments.payPalBRL}&amount=${amount}`);
  };

  const onClickPayPalUSD = (amount: number) => {
    if (!payments) {
      return;
    }
    window.open(`${payments.payPalUSD}&amount=${amount}`);
  };

  const onClickCopyBitcoin = () => {
    if (!payments) {
      return;
    }
    setBtcCopied(true);
    navigator.clipboard.writeText(payments.btc);
  };

  return (
    <GiftDrawerContext.Provider value={{ openDrawer }}>
      {drawerInfo ? (
        <div className="w-full h-full fixed top-0 left-0 z-50">
          <div className="w-full h-full absolute top-0 left-0 bg-black opacity-75 z-60"></div>
          <div
            className={`w-full ${drawerInfo.image ? 'h-full' : ''} absolute bottom-0 left-0 bg-white z-70 rounded-t-3xl text-left p-8 overflow-auto`}
          >
            <div className="flex justify-end">
              <button
                className="h-10 w-10 rounded-full border-black border-2 items-center justify-center"
                onClick={closeDrawer}
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>
            <div>
              {drawerInfo.image ? (
                <div className="pt-5 pb-5">
                  <img
                    className="w-full rounded-2xl shadow-md"
                    src={drawerInfo.image}
                    height={200}
                    width={200}
                  />
                </div>
              ) : null}
              <div className="pb-5">
                <h1 className="font-bold font-pt-serif text-3xl">{drawerInfo.text}</h1>
              </div>
              <UniteText>
                <span className="font-medium">Valor</span>: R$
                {drawerInfo.price.toLocaleString('pt-BR')}
              </UniteText>
              <StackSpacing size="sm" />
              <UniteText weight="bold">PIX</UniteText>
              <StackSpacing size="sm" />
              <button
                className="border-[2px] rounded-xl border-[#4848B8] p-1 pl-4 pr-4 text-[#4848B8] font-roboto font-medium bg-[#FFFEFB]"
                onClick={() => onCopyCode()}
              >
                {pixCopied ? 'Código PIX Copiado ✔️' : 'Copiar código PIX'}
              </button>
              <StackSpacing size="sm" />
              <UniteText weight="bold">PayPal</UniteText>
              <StackSpacing size="sm" />
              <button
                className="border-[2px] rounded-xl border-[#4848B8] p-1 pl-4 pr-4 text-[#4848B8] font-roboto font-medium bg-[#FFFEFB]"
                onClick={() => onClickPayPalBRL(drawerInfo.price)}
              >
                Pagar com PayPal (BRL)
              </button>
              <StackSpacing size="sm" />
              <button
                className="border-[2px] rounded-xl border-[#4848B8] p-1 pl-4 pr-4 text-[#4848B8] font-roboto font-medium bg-[#FFFEFB]"
                onClick={() => onClickPayPalUSD(drawerInfo.price / 5)}
              >
                Pagar com PayPal (USD)
              </button>
              <StackSpacing size="sm" />
              <UniteText weight="bold">Bitcoin</UniteText>
              <StackSpacing size="sm" />
              <button
                className="border-[2px] rounded-xl border-[#4848B8] p-1 pl-4 pr-4 text-[#4848B8] font-roboto font-medium bg-[#FFFEFB]"
                onClick={onClickCopyBitcoin}
              >
                {btcCopied ? 'Endereço Bitcoin Copiado ✔️' : 'Copiar endereço Bitcoin'}
              </button>
              <StackSpacing size="sm" />
              <UniteText>
                Após o pagamento, espere até um dia para o estoque ser atualizado. Por favor avise o
                Gabriel caso esses botões não estejam funcionando =)
              </UniteText>
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </GiftDrawerContext.Provider>
  );
};
