import React, { useContext } from "react";
import { tweak } from "../lib/color";
import { Context } from "../lib/context";

function TinyScreen() {
  const { state, update } = useContext(Context);
  return (
    <>
      <div className="tiny">
        Deine Bildschirmgröße wird nicht unterstützt (ist zu schmal)! Bei
        mobilen Geräten kann der Bildschirm gedreht werden, ansonsten muss auf
        ein Gerät mit einem größeren Bildschirm gewechselt werden.
      </div>
      <style jsx global>{`
        body {
          background: ${state.style.colorPalette.background};
        }
        ::-webkit-scrollbar {
          width: 0.5rem;
        }
        ::-webkit-scrollbar-track {
          background: ${state.style.colorPalette.background};
        }
        ::-webkit-scrollbar-thumb {
          background: ${state.style.colorPalette.interface};
          border-radius: 0px 0px 2px 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${tweak(
            state.style.colorPalette.interface,
            state.style.isDark ? 1.1 : 0.85
          )};
        }
        ::-webkit-scrollbar-thumb:active {
          background: ${tweak(
            state.style.colorPalette.interface,
            state.style.isDark ? 1.2 : 0.7
          )};
        }
      `}</style>
      <style jsx>
        {`
          .tiny {
            font-size: 11px;
            font-weight: 500;
            color: ${state.style.colorPalette.error};
          }
        `}
      </style>
    </>
  );
}

export default TinyScreen;
