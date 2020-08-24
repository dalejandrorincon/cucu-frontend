const initialState = {
  counter: 0,
};

const counterReducer = (
  state = initialState,
  action: { type: any; value: any }
) => {
  switch (action.type) {
    case "INCREASE_COUNTER": {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    case "DECREASE_COUNTER": {
      return {
        ...state,
        counter: state.counter - 1,
      };
    }
    default: {
      return state;
    }
  }
};

export default counterReducer;
