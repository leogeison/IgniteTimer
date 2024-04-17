import { ThemeProvider } from 'styled-components';
import { Button } from './Components/Button';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <Button />
      <Button />

      <GlobalStyle />
    </ThemeProvider>
  );
}
