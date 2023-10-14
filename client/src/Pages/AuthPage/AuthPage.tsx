import "./AuthPage.scss";
import { useState } from "react";
import { getUsers, signInApi, signUpApi } from "./AuthApi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../store/index";
import { setAuth } from "../../store/slices/authSlice";
import { isValid } from "../../interfaces/interfaces";
import MyInput from "../../components/UI/MyInput";

const AuthPage: React.FC = () => {
  const appDispatch = useAppDispatch();
  const globalState = useAppSelector((state: RootState) => state);

  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [isValidEmail, setIsValidEmail] = useState<isValid>({
    isValid: true,
    errorMessage: "",
  });
  const [isValidPassword, setIsValidPassword] = useState<isValid>({
    isValid: true,
    errorMessage: "",
  });
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState<isValid>(
    {
      isValid: true,
      errorMessage: "",
    }
  );
  const [isValidUserName, setIsValidUserName] = useState<isValid>({
    isValid: true,
    errorMessage: "",
  });

  const isFormValid = () => {
    let check = true;
    const requiredFieldErr = {
      isValid: false,
      errorMessage: "Обязательное поле",
    };
    if (password === "") {
      setIsValidPassword(requiredFieldErr);
      check = false;
    }
    if (email === "") {
      setIsValidEmail(requiredFieldErr);
      check = false;
    }
    console.log(isValidEmail, isValidPassword);
    if (!isValidEmail.isValid || !isValidPassword.isValid) check = false;
    if (isNewUser) {
      if (confirmPassword === "") {
        setIsValidConfirmPassword(requiredFieldErr);
        check = false;
      }
      if (userName === "") {
        setIsValidUserName(requiredFieldErr);
        check = false;
      }
      if (!isValidConfirmPassword.isValid || !isValidUserName.isValid)
        check = false;
    }

    return check;
  };

  const validateEmail = (str: string) => {
    const emailRE = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    setIsValidEmail({
      isValid: emailRE.test(str),
      errorMessage: "Некорректный email",
    });
  };

  const validatePassword = (str: string) => {
    setIsValidPassword({
      isValid: str.length < 8 ? false : true,
      errorMessage: "Пароль должен быть не менее 8 символов",
    });
  };

  const validateConfirmPassword = (str: string) => {
    setIsValidConfirmPassword({
      isValid: str === password,
      errorMessage: "Пароли не совпадают",
    });
  };

  const signIn = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    if (isValidEmail.isValid && isValidPassword.isValid) {
      const response = await signInApi(email, password);
      if (response.status.toString()[0] !== "2") {
        setIsValidEmail({ isValid: false, errorMessage: response.message });
        setIsValidPassword({ isValid: false, errorMessage: response.message });
      } else {
        const token = response.data.token;
        localStorage.setItem("token", token);
        appDispatch(setAuth({ user: response.data.user, isAuth: true }));
      }
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    const response = await signUpApi(email, password, userName, phoneNumber);
    if (response.status !== 401) {
      const token = response.data.token;
      localStorage.setItem("token", token);
    } else console.log("Неправильный логин или пароль");
    appDispatch(setAuth({ user: response.data.user, isAuth: true }));
  };

  return (
    <div className="authForm-wrapper">
      <form className="auth-form">
        <h1 className="header-dark">{isNewUser ? "Регистрация" : "Вход"} </h1>
        <MyInput
          value={email}
          isValid={isValidEmail}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          type={"email"}
          label={"Email"}
        />
        <MyInput
          value={password}
          isValid={isValidPassword}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          type={"password"}
          label={"Пароль"}
        />
        {isNewUser ? (
          <>
            <MyInput
              type={"password"}
              label={"Повторите пароль"}
              isValid={isValidConfirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
            />
            <MyInput
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              isValid={isValidUserName}
              label={"Ваше имя"}
            />
            <MyInput
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              label={"Номер телефона"}
            />
          </>
        ) : (
          <></>
        )}
        <div className="center-block">
          <button
            type="co"
            onClick={isNewUser ? signUp : signIn}
            className="primary-button"
          >
            {isNewUser ? "Регистрация" : "Войти"}
          </button>
        </div>
        <div className="center-block">
          <p className="dark-text" style={{ marginTop: "10px" }}>
            {isNewUser ? "" : "Нет аккаунта? "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={(e) => setIsNewUser(!isNewUser)}
            >
              {isNewUser ? "У меня уже есть аккаунт" : "Зарегистрируйтесь"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
