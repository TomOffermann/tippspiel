import React, { useContext } from "react";
import { tweak } from "../lib/color";
import { Context } from "../lib/context";
import { Screen, useScreen } from "../lib/useScreen";
import { betPage, optionPage, Pages, tablePage } from "../pages";
import Button from "./Button";
import Icons from "./Icons";

interface PageSelectorProps {
  setPage: (page: Pages) => void;
}

export const PageSelector: React.FC<PageSelectorProps> = (props) => {
  const { state, update } = useContext(Context);
  const [screen, setScreen] = useScreen();
  return (
    <>
      <div
        id={screen === Screen.Desktop ? "page-desk" : "page-mobile"}
        className="page-container"
      >
        <Button
          width={screen === Screen.Desktop ? "max(25%,150px)" : "max(80%, 150px)"}
          svg={Icons.Table(state.style.colorPalette.textOnPrimary, screen === Screen.Mobile)}
          name="Tabelle"
          onClick={() => props.setPage(tablePage)}
        />
        <Button
          width={screen === Screen.Desktop ? "max(25%,150px)" : "max(80%, 150px)"}
          svg={Icons.Bet(state.style.colorPalette.textOnPrimary, screen === Screen.Mobile)}
          name="Tippen"
          onClick={() => props.setPage(betPage)}
        />
        <Button
          width={screen === Screen.Desktop ? "max(25%,150px)" : "max(80%, 150px)"}
          svg={Icons.Options(state.style.colorPalette.textOnPrimary, screen === Screen.Mobile)}
          name="Optionen"
          onClick={() => props.setPage(optionPage)}
        />
      </div>
      <style jsx>{`
        #page-desk {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 10px;
          align-items: center;
          justify-content: space-around;
        }
        #page-mobile {
          display: flex;
          flex-direction: column;
          gap: 10px 0px;
          align-items: center;
        }
        .page-container {
          box-shadow: 1px 1px 4px
            ${tweak(
              state.style.colorPalette.interface,
              state.style.isDark ? 0.55 : 0.85
            )};

          padding: 10px 50px;
          margin-top: 10px;
          background-color: ${state.style.colorPalette.interface};
        }
      `}</style>
    </>
  );
};
