import { SIGN_FAILURE, SIGN_REQUEST, SIGN_SUCCESS } from "./actionTypes";

interface MyData {
  isLoading: string;
  isError: string;
  msg: string;
}

const initialstate: MyData = {
  isLoading: "",
  isError: "",
  msg: "",
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case SIGN_REQUEST:
      return { ...state, isLoading: true };
    case SIGN_SUCCESS:
      return { ...state, isLoading: false, msg: action.payload };
    case SIGN_FAILURE:
      return { ...state, isError: true };
    default:
      return { ...state };
  }
};

export { reducer };
