import { ACTIONS } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const getNextId = (expenses) => {
  if (expenses.length < 1) return 0;
  const expIds = expenses.map(({ id }) => id);
  return (Math.max(...expIds) + 1);
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTIONS.fetchCurrencies:
    return ({ ...state,
      currencies: action.payload });
  case ACTIONS.addExpense:
    // console.log('aqui');
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.payload,
          id: getNextId(state.expenses),
        },
      ],
    };
  case ACTIONS.removeExpense:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case ACTIONS.editExpense:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case ACTIONS.updateExpense:
    return { ...state,
      editor: false,
      idToEdit: 0,
      expenses: state.expenses.map(
        (exp) => (exp.id === action.payload.id ? action.payload : exp),
      ) };
  default:
    return state;
  }
};

export default wallet;
