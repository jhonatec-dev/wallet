// Coloque aqui suas actions
export const ACTIONS = {
  userLogin: 'userLogin',
  fetchCurrencies: 'fetchCurrencies',
  addExpense: 'addExpense',
  removeExpense: 'removeExpense',
  editExpense: 'editExpense',
  updateExpense: 'updateExpense',
  cancelEditExpense: 'cancelEditExpense',
};

export const actionUserLogin = (email) => ({
  type: ACTIONS.userLogin,
  payload: {
    email,
  },
});

const actionCurrencies = (currencies) => ({
  type: ACTIONS.fetchCurrencies,
  payload: currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const payload = Object.keys(data).filter(
    (curr) => curr !== 'USDT',
  );
  dispatch(actionCurrencies(payload));
};

const addExpense = (expenseWithRates) => ({
  type: ACTIONS.addExpense,
  payload: expenseWithRates,
});

const updateExpense = (expenseWithRates) => ({
  type: ACTIONS.updateExpense,
  payload: expenseWithRates,
});

export const actionWalletEditExpense = (expense) => async (dispatch) => {
  // fazer a requisição na API e adicionar ao payload
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  // console.error('id no action', expense.id);
  const expenseWithRates = {
    ...expense,
    exchangeRates: data,
  };
  // console.error('id no action 2', expense.id);
  const menosUm = -1;
  if (expense.id > menosUm) {
    // console.warn('AGORA VAI DAR CERTO');
    dispatch(updateExpense(expenseWithRates));
  } else {
    dispatch(addExpense(expenseWithRates));
  }
};

export const actionRemoveExpense = (expenseId) => ({
  type: ACTIONS.removeExpense,
  payload: expenseId,
});

export const actionEditExpense = (expenseId) => ({
  type: ACTIONS.editExpense,
  payload: expenseId,
});

export const actionCancelEditExpense = () => ({
  type: ACTIONS.cancelEditExpense,
});
