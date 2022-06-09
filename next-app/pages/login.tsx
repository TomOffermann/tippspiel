import React, { useContext, useState } from "react";
import Button from "../components/elements/Button";
import { tweak } from "../lib/frontend/utils/color";
import { Context } from "../lib/frontend/middleware/context";

interface ResultState {
  code: number | null;
  message: string | null;
}

enum FormState {
  None,
  FillUser,
  FillPass,
  Fill,
}

const formInfo = (
  user: boolean,
  state: FormState,
  style: React.CSSProperties
) => {
  if (user) {
    switch (state) {
      case FormState.None:
        return <></>;
      case FormState.FillUser:
        return <div style={style}>Gib einen Namen an</div>;
      case FormState.Fill:
        return <div style={style}>Gib einen Namen an</div>;
      default:
        return <></>;
    }
  }
  switch (state) {
    case FormState.None:
      return <></>;
    case FormState.FillPass:
      return <div style={style}>Gib ein Passwort an</div>;
    case FormState.Fill:
      return <div style={style}>Gib ein Passwort an</div>;
    default:
      return <></>;
  }
};

const Login: React.FC = (props) => {
  const { state, update } = useContext(Context);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [result, setResult] = useState<ResultState>({
    code: null,
    message: null,
  });
  const [formState, setFormState] = useState<FormState>(FormState.None);

  const login = async (username: string, password: string) => {
    const res = await fetch("./api/login", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
    });
    if (res.status > 300) {
      setFormState(FormState.None);
      setResult({ code: res.status, message: "Name oder Passwort falsch" });
      return;
    }
    window.location.href = "/";
  };

  return (
    <>
      <div className="outer">
        <div className="container">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Nutzername"
            className="text-field"
            value={username}
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                login(username, password);
              }
            }}
          />
          {formState !== FormState.None &&
            formInfo(true, formState, {
              color: state.style.colorPalette.error,
              marginBottom: "10px",
              fontSize: "18px",
              fontWeight: "500",
            })}
          <input
            type="text"
            placeholder="Passwort"
            className="text-field"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                login(username, password);
              }
            }}
          />
          {formState !== FormState.None &&
            formInfo(false, formState, {
              color: state.style.colorPalette.error,
              marginBottom: "10px",
              fontSize: "18px",
              fontWeight: "500",
            })}
          <div className="button">
            <Button
              name="Einloggen"
              onClick={() => {
                if (password.length === 0 && username.length === 0) {
                  setFormState(FormState.Fill);
                  setResult({
                    code: null,
                    message: null,
                  });
                } else if (password.length === 0) {
                  setFormState(FormState.FillPass);
                  setResult({
                    code: null,
                    message: null,
                  });
                } else if (username.length === 0) {
                  setFormState(FormState.FillUser);
                  setResult({
                    code: null,
                    message: null,
                  });
                } else {
                  login(username, password);
                }
              }}
            />
          </div>
          <br />
          {result.code !== null && (
            <div className="message">
              {result.code}: {result.message}
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        body {
          background: ${state.style.colorPalette.background};
        }
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: ${state.style.colorPalette.background};
        }
        ::-webkit-scrollbar-thumb {
          background: ${state.style.colorPalette.interface};
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
      <style jsx>{`
        .button {
          margin: 10px;
        }
        h1 {
          font-weight: 800;
          font-size: 60px;
        }
        .text-field {
          padding: 0px 20px;
          width: 120px;
          font-weight: 400;
          color: #2b2e3d;
          height: 30px;
          margin-bottom: 10px;
          outline: none;
          border: 1px solid transparent;
          border-radius: 5px;
          background-color: none;
          box-shadow: 1px 1px 5px
            ${tweak(
              state.style.colorPalette.interface,
              state.style.isDark ? 0.7 : 0.8
            )};
        }
        .container {
          border-radius: 5px;
          box-shadow: 5px 5px 15px
            ${tweak(
              state.style.colorPalette.interface,
              state.style.isDark ? 0.55 : 0.85
            )};
          position: relative;
          width: 400px;
          display: flex;
          align-items: center;
          flex-direction: column; /*#b3c1b6*/
          color: ${state.style.colorPalette.text};
          background: ${state.style.isDark ? `linear-gradient(
            -45deg,
            #3b525b,
            #3a4355 70%,
            ${state.style.colorPalette.interface}
          )` :state.style.colorPalette.interface};
        }
        .message {
          color: ${state.style.colorPalette.error};
          font-weight: 500;
          margin-bottom: 40px;
        }
        .outer {
          display: flex;
          height: 90vh;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default Login;
