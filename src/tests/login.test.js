import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a tela de login', () => {
  test('Testa os componentes na tela', () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('Testa se o botão só é ativado quando os dados corretos são informados', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'wrongEmail@com');
    expect(btnEntrar).toBeDisabled();
    userEvent.type(inputPassword, '12345');
    expect(btnEntrar).toBeDisabled();
  });

  test('Testa se o botão só é ativado quando os dados corretos são informados', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '12345');
    expect(btnEntrar).toBeDisabled();
  });

  test('Testa se o botão só é ativado quando os dados corretos são informados', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'email.com');
    userEvent.type(inputPassword, '123456');
    expect(btnEntrar).toBeDisabled();
  });

  test('Testa se o botão só é ativado quando os dados corretos são informados', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');
    expect(btnEntrar).toBeEnabled();
  });

  test('Testa se a rota altera após o login bem sucedido', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');

    userEvent.click(btnEntrar);

    expect(history.location.pathname).toBe('/carteira');
  });

  test('Testa se os dados estão no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnEntrar = screen.getByRole('button', { name: /entrar/i });

    const emailToCheck = 'email@email.com';
    userEvent.type(inputEmail, emailToCheck);
    userEvent.type(inputPassword, '1234567');

    userEvent.click(btnEntrar);
    expect(store.getState().user.email).toBe(emailToCheck);
  });
});
