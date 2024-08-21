import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface PopUpsProps {
  LoginError: boolean;
  addFavorite: boolean;
  addFavoriteError: boolean;
  removeFavorite: boolean;
  removeFavoriteError:boolean;
  changeBooleanLoginError: () => void;
  changeBooleanAddFavorite: () => void;
  changeBooleanAddFavoriteError: () => void;
  changeBooleanRemove: () => void;
  changeBooleanRemoveFavoriteError: () => void;
}

function PopUps({
    LoginError,
    addFavorite,
    addFavoriteError,
    removeFavorite,
    removeFavoriteError,
    changeBooleanLoginError,
    changeBooleanAddFavorite,
    changeBooleanAddFavoriteError,
    changeBooleanRemove,
    changeBooleanRemoveFavoriteError
  }: PopUpsProps) {
    return (
      <>
        {/* Se o usuario tentar fazer algo mas não estiver logado */}
        <Snackbar
          open={LoginError}
          autoHideDuration={5000}
          onClose={changeBooleanLoginError}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="info" sx={{ fontSize: '1.25rem', paddingRight: '20px' }}>
            Erro: Faça seu Login Primeiro para usar esse recurso
          </Alert>
        </Snackbar>
        {/* ------------------------------------------------------- */}

        {/* Usuario adciona o pokemon aos Favoritos */}
        <Snackbar
          open={addFavorite}
          autoHideDuration={5000}
          onClose={changeBooleanAddFavorite}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ fontSize: '1.25rem', paddingRight: '20px' }}>
            Adicionado aos Favoritos!
          </Alert>
        </Snackbar>
        {/* ------------------------------------------------------- */}

        {/* Usuario já tem o pokemon nos favoritos */}
        <Snackbar
          open={addFavoriteError}
          autoHideDuration={5000}
          onClose={changeBooleanAddFavoriteError}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error" sx={{ fontSize: '1.25rem', paddingRight: '20px' }}>
            Erro: Esse Pokémon já está nos seus favoritos!
          </Alert>
        </Snackbar>
        {/* ------------------------------------------------------- */}
        
        {/* Usuario remove o pokemon dos favoritos */}
        <Snackbar
          open={removeFavorite}
          autoHideDuration={5000}
          onClose={changeBooleanRemove}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ fontSize: '1.25rem', paddingRight: '20px' }}>
            Removido dos Favoritos!
          </Alert>
        </Snackbar>
        {/* ------------------------------------------------------- */}

        {/* Usuario já tem o pokemon nos favoritos */}
        <Snackbar
          open={removeFavoriteError}
          autoHideDuration={5000}
          onClose={changeBooleanRemoveFavoriteError}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error" sx={{ fontSize: '1.25rem', paddingRight: '20px' }}>
            Erro: Esse Pokemon não está nos seus favoritos!
          </Alert>
        </Snackbar>
        {/* ------------------------------------------------------- */}
      </>
    );
  }
  
  export default PopUps;
  