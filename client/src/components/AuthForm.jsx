import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { useReducer } from "react";
import { eye, eyedash } from "../assets";
import classes from "./AuthForm.module.css";

const initialState = {
  visible: false,
  inputType: "password",
  icon: eye,
};

const toggleReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        visible: !state.visible,
        inputType: state.visible ? "password" : "text",
        icon: state.visible ? eye : eyedash,
      };
    default:
      return state;
  }
};

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [state, dispatchAction] = useReducer(toggleReducer, initialState);
  const { inputType, icon } = state;

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1 className={classes.heading}>
          {isLogin ? "Log in" : "Create a new user"}
        </h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        {!isLogin && (
          <p>
            <label htmlFor="text">Name</label>
            <input id="name" type="text" name="name" required />
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <label htmlFor="image">Password</label>
        <div className="relative flex justify-center">
          <input id="password" type={inputType} name="password" required />
          <img
            src={icon}
            alt="toggler"
            className="z-50 absolute top-2 right-2 w-5 h-5 cursor-pointer"
            onClick={() => dispatchAction({ type: "TOGGLE" })}
          />
        </div>
        <div className={classes.actions}>
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            className={classes.actions}
          >
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
