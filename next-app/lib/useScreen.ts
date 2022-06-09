import { Dispatch, SetStateAction, useEffect, useState } from "react";

export enum Screen {
  Tiny,
  Mobile,
  Desktop,
}

export const useScreen = () => {
  const [screen, setScreen] = useState<Screen>();

  const handleScreen = (e) => {
    const w = e?.target?.innerWidth ?? 0;
    setScreen(w > 650 ? Screen.Desktop : w < 200 ? Screen.Tiny : Screen.Mobile);
  };

  useEffect(() => {
    const w = window?.innerWidth ?? 0;
    setScreen(w > 650 ? Screen.Desktop : w < 200 ? Screen.Tiny : Screen.Mobile)
    window.addEventListener("resize", handleScreen);
    return () => {
      window.removeEventListener("resize", handleScreen);
    };
  }, []);

  return [screen, setScreen] as [Screen, Dispatch<SetStateAction<Screen>>];
};
