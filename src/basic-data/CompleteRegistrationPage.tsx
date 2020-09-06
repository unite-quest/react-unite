import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../shell/theme';
import WhitePageWrapper from '../shell/WhitePageWrapper';
import styles from './BasicDataPage.module.css';
import BasicDataService from './BasicDataService';
import HeaderFormStep from './HeaderFormStep';
import { useInput } from './useInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-fullWidth': {
        marginBottom: theme.spacing(2)
      },
      '& > label': {
        alignItems: 'flex-start',
      },
      '& > label > .MuiButtonBase-root': {
        paddingTop: '0',
      },
    },
  }),
);

function CompleteRegistrationPage(props: any) {
  const { value: region, bind: bindRegion } = useInput('');
  const { value: dialect, bind: bindDialect } = useInput('');
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    const service = new BasicDataService()
    service.save({ region, dialect }).then(() => {
      navigate('/gravar');
    });
  }

  const onToggleTermsAndConditions = (evt: any) => {
    setTermsAndConditions(!termsAndConditions);
  }

  return (
    <ThemeProvider theme={theme}>
      <WhitePageWrapper>
        <HeaderFormStep title="Finalize seu cadastro" step="2/2"></HeaderFormStep>
        <form noValidate autoComplete="off" onSubmit={handleSubmit} className={`${classes.root} ${styles.fullHeight}`}>
          <FormControl fullWidth>
            <InputLabel htmlFor="region-selector">Região</InputLabel>
            <Select
              fullWidth
              native
              {...bindRegion}
              inputProps={{
                name: 'region',
                id: 'region-selector',
              }}
            >
              {/* @todo bff this */}
              <option aria-label="None" value="" />
              <option value={'N'}>Norte</option>
              <option value={'NE'}>Nordeste</option>
              <option value={'CO'}>Centro-Oeste</option>
              <option value={'SD'}>Sudeste</option>
              <option value={'S'}>Sul</option>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="dialect-selector">Sotaque</InputLabel>
            <Select
              fullWidth
              native
              {...bindDialect}
              inputProps={{
                name: 'dialect',
                id: 'dialect-selector',
              }}
            >
              {/* @todo bff this */}
              <option aria-label="None" value="" />
              <option value={'caipira'}>Caipira</option>
              <option value={'costa-norte'}>Costa Norte</option>
              <option value={'paulistano'}>Paulistano</option>
              <option value={'carioca'}>Carioca</option>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={termsAndConditions}
                onChange={onToggleTermsAndConditions}
                name="checkedB"
                color="primary"
              />
            }
            label="Concordo com os termos e permito a utilização da minha voz e dos meus dados para fins científicos."
          />
          <div className={styles.ctaButtonWrapper}>
            <button className={styles.ctaButton} type="submit">Continuar</button>
          </div>
        </form>
      </WhitePageWrapper>
    </ThemeProvider>
  );
}

export default CompleteRegistrationPage;
