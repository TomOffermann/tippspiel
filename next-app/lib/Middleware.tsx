import Router from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { LoadingSpinnerPage } from "../components/LoadingSpinner";
import TinyScreen from "../components/TinyScreen";
import { useColor } from "./color";
import { computeColorPalette } from "./colorPalette";
import { ApplicationData, Context } from "./context";
import { Screen, useScreen } from "./useScreen";

export const Middleware: React.FC = (props) => {
  const { state, update } = useContext(Context);
  const [isDark, setIsDark] = useState<boolean | null>(null);
  const [screen, setScreen] = useScreen();

  useEffect(() => {
    const colorInit = useColor();
    setIsDark(colorInit.isDark);
    fetch("./api/login", {
      method: "POST",
      body: JSON.stringify({}),
    }).then((response) => {
      if (response.status >= 300) {
        update({
          loggedIn: true,
          style: colorInit,
          data: state.data,
        });
        Router.push("/login");
        return;
      }
      fetch("./api/data", {
        method: "GET",
      })
        .then((response) => {
          if (response.status < 300) {
            return response.json();
          } else {
            update({
              loggedIn: true,
              style: colorInit,
              data: state.data,
            });
            Router.push("/login");
            return;
          }
        })
        .then((data) => {
          if (data !== undefined) {
            const newCtxData: ApplicationData = data;
            update({
              loggedIn: true,
              style: colorInit,
              data: newCtxData,
            });
          } else {
            update({
              loggedIn: true,
              style: colorInit,
              data: state.data,
            });
            Router.push("/login");
            return;
          }
        });
    });
  }, []);
  return !state.loggedIn ? (
    <LoadingSpinnerPage
      noCtx={true}
      colorPalette={computeColorPalette(isDark === null ? true : isDark)}
    />
  ) : (
    <>{screen === Screen.Tiny ? <TinyScreen /> : props.children}</>
  );
};
