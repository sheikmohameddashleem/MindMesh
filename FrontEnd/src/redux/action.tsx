import { SIGN_FAILURE, SIGN_REQUEST, SIGN_SUCCESS } from "./actionTypes";
import axios from "axios";

interface MyData {
  name: string;
  email: string;
  password: string;
}

type SIGN_REQUEST = "SIGN_REQUEST";
type SIGN_FAILURE = "SIGN_FAILURE";
type SIGN_SUCCESS = "SIGN_SUCCESS";

type SignAction =
  | { type: SIGN_REQUEST }
  | { type: SIGN_FAILURE }
  | { type: SIGN_SUCCESS };

export const SignFun = (obj: MyData): Promise<SignAction> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://reqres.in/api/register`, obj)
      .then((res) => {
        // resolve({type : SIGN_SUCCESS , payload:res.data })
        console.log(res.data);
        resolve({ type: SIGN_REQUEST });
      })
      .catch((err) => {
        console.error(err);
        reject({ type: SIGN_FAILURE });
      });
  });
};
