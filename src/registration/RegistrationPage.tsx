import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../authentication/UserProvider';
import BasicDataStep from './BasicDataStep';
import NicknameRegistrationStep from './NicknameRegistrationStep';
import { RegistrationDataModel } from './RegistrationDataModel';
import { sendRegistrationData } from './RegistrationIntegrationService';
import UsernameStep from './UsernameStep';

export enum RegistrationSteps {
  NICKNAME = 'nickname',
  BASIC = 'basic',
  USERNAME = 'username'
}

function RegistrationPage() {
  const navigation = useNavigate();
  const authenticationState = useContext(UserContext);
  const [registrationData, setRegistrationData] = useState<RegistrationDataModel | null>(null); // fix any
  const [step, setStep] = useState<RegistrationSteps>(RegistrationSteps.NICKNAME);

  useEffect(() => {
    const sendData = async (data: RegistrationDataModel) => {
      await sendRegistrationData(data);
    }

    const fromSocialMedia = !!authenticationState.user?.email; // defines whether came from social media

    if (fromSocialMedia) {
      if (step === RegistrationSteps.BASIC && registrationData?.age) {
        sendData(registrationData);
      }
    } else {
      if (step === RegistrationSteps.BASIC && registrationData?.age) {
        setStep(RegistrationSteps.USERNAME);
      } else if (step === RegistrationSteps.USERNAME && registrationData?.username) {
        sendData(registrationData);
      }
    }
    if (step === RegistrationSteps.NICKNAME && registrationData?.name) {
      setStep(RegistrationSteps.BASIC);
    }
  }, [step, registrationData, authenticationState]);

  const completeNick = (data: any) => {
    setRegistrationData({
      ...registrationData,
      name: data.name,
    })
  }

  const completeBasic = (data: any) => {
    setRegistrationData({
      ...registrationData,
      gender: data.gender,
      age: data.age,
      region: data.region,
      dialect: data.dialect,
    })
  }

  const completeUser = (data: any) => {
    setRegistrationData({
      ...registrationData,
      username: data.username,
      password: data.password,
    })
  }

  const rollbackNick = () => {
    navigation('/login');
  }

  const rollbackBasic = () => {
    setStep(RegistrationSteps.NICKNAME);
  }

  const rollbackUser = () => {
    setStep(RegistrationSteps.BASIC);
  }

  if (step === RegistrationSteps.NICKNAME) {
    return <NicknameRegistrationStep onComplete={completeNick} onBack={rollbackNick} />;
  } else if (step === RegistrationSteps.BASIC) {
    return <BasicDataStep onComplete={completeBasic} onBack={rollbackBasic} />;
  } else if (step === RegistrationSteps.USERNAME) {
    return <UsernameStep onComplete={completeUser} onBack={rollbackUser} />;
  }
  return null;
}

export default RegistrationPage;