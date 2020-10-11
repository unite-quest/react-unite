import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import Header from '../shell/Header';
import LinkItem from '../shell/LinkItem';
import styles from './HomePage.module.css';
function HomePage() {
  const navigate = useNavigate();
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);

  const redirectLoginFn = () => {
    navigate('/login')
  }
  const redirectRecordingFn = () => {
    navigate('/fala')
  }

  useEffect(() => {
    setLoading(false); // each page has to implement its own stop loading logic
  });

  return (
    <div>
      <Header link={{ title: 'Entrar', onClick: redirectLoginFn }} />
      <div>
        <img className={styles.banner} src="/square-cover.jpg" alt='Banner'></img>
      </div>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Comece já a sua jornada na ciência!</h1>
      </div>
      <div className={styles.startRecordingWrapper} onClick={redirectRecordingFn}>
        <img className={styles.startRecordingImg} src="/mic.svg" alt='mic'></img>
        <span className={styles.startRecordingText}>Iniciar gravação de voz</span>
      </div>
      <div className={styles.existingUser}>
        <LinkItem title="Já sou cadastrado" onclick={redirectLoginFn} color="cobalt" ></LinkItem>
      </div>
      <div className={styles.descriptionWrapper}>
        <span className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam mauris, convallis eu pharetra nec, facilisis id massa. Sed vel libero sed dolor iaculis dignissim. Aenean mollis, est ac malesuada facilisis, est dui bibendum elit, non ornare orci velit sed tortor. Nullam vitae ultricies augue. Donec pellentesque mauris sed felis tristique lacinia. </span>
      </div>

    </div >
  );
}

export default HomePage;