import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as SadIcon } from '../assets/icons/sad.svg';
import { authenticationService } from '../authentication/AuthenticationService';
import { UserContext } from '../authentication/UserProvider';
import RectangularButton from '../shared/buttons/RectangularButton';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import AppLogo from '../shell/AppLogo';
import LinkItem from '../shell/LinkItem';
import styles from './DashboardMenu.module.css';

function DashboardMenu(props: { close: () => void }) {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const navigate = useNavigate();
  const authenticationState = useContext(UserContext);
  const isAuthenticated = Boolean(authenticationState.user);

  const logout = async () => {
    setLoading(true);
    await authenticationService.logout();
    navigate('/');
  }

  const deleteUser = () => {
    setLoading(true);
    navigate('/excluir');
  }

  const leaderboard = () => {
    setLoading(true);
    navigate('/placar-dos-lideres');
  }

  const friendsLeaderboard = () => {
    setLoading(true);
    navigate('/placar-dos-amigos');
  }

  const content = isAuthenticated ? <nav className={styles.navigation}>
    <ul className={`${styles.list} ${styles.content}`}>
      <li><button className={styles.link} onClick={leaderboard}>Placar dos líderes</button></li>
      <li><button className={styles.link} onClick={friendsLeaderboard}>Placar dos amigos</button></li>
      <li><a href="contact.asp" className={styles.link}>Alterar meus dados cadastrais</a></li>
      <li><a href="about.asp" className={styles.link}>Indique um amigo</a></li>
      <li><a href="about.asp" className={styles.link}>Faça uma sugestão</a></li>
      <li><a href="about.asp" className={styles.link}>Conheça mais sobre nós</a></li>
    </ul>
    <ul className={styles.list}>
      <li><button className={styles.link} onClick={logout}>Sair da conta</button></li>
      <li><button className={`${styles.link} ${styles.delete}`} onClick={deleteUser}>Excluir conta</button></li>
    </ul>
  </nav> :
    <div className={styles.centeredContent}>
      <div className={styles.unregisteredImage}>
        <SadIcon />
      </div>
      <div className={styles.unregisteredMessageWrapper}>
        <span className={styles.unregisteredMessage}>Você ainda não está cadastrado</span>
      </div>
      <div className={styles.registrationButton}>
        <RectangularButton title="Fazer meu cadastro" primary onClick={() => navigate('/cadastrar')} />
      </div>
      <div>
        <LinkItem title="Conheça mais sobre nós" onclick={() => navigate('/sobre')} color="cobalt" />
      </div>
    </div>;

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <AppLogo black />
        <CloseIcon className={styles.closeIcon} onClick={props.close} />
      </div>
      {content}
    </div>
  );

}

export default DashboardMenu;