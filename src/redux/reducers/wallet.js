import { ACTIONS } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
  case ACTIONS.cancelEditExpense:
    return { ...state, editor: false, idToEdit: 0 };
  default:
    return state;
  }
};

export default wallet;
