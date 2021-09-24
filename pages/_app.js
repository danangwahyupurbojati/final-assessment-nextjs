import '../styles/globals.css';
import Layout from '../components/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000'
        }
    }
});

function MyApp({ Component, pageProps }) {
  return (
      <ThemeProvider theme={theme}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    ) 
}

export default MyApp
