import React, { useContext } from "react";
import { tweak } from "../lib/color";
import { ColorPalette } from "../lib/colorPalette";
import { Context } from "../lib/context";

export interface LoadingSpinnerPageProps {
  noCtx?: boolean;
  colorPalette?: ColorPalette;
}

export const LoadingSpinnerPage: React.FC<LoadingSpinnerPageProps> = (
  props
) => {
  if (!(props?.noCtx ?? false)) {
    const { state, update } = useContext(Context);
    return (
      <>
        <div className="container">
          <div className="loader"></div>
        </div>
        <style jsx global>
          {`
            body {
              background: ${state.style.colorPalette.background};
            }
          `}
        </style>
        <style jsx>{`
          .container {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .loader {
            border: 16px solid ${state.style.colorPalette.text};
            border-top: 16px solid ${state.style.colorPalette.interface};
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </>
    );
  }
  if (props?.colorPalette === null)
    throw Error("Provide context or color palette to 'LoadingSpinner'!");
  return (
    <>
      <div className="container">
        <div className="loader"></div>
      </div>
      <style jsx global>
        {`
          body {
            background: ${props.colorPalette.background};
          }
        `}
      </style>
      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loader {
          border: 16px solid ${props.colorPalette.text};
          border-top: 16px solid ${props.colorPalette.interface};
          border-radius: 50%;
          width: 120px;
          height: 120px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export interface LoadingSpinnerProps {
  size: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  const { state, update } = useContext(Context);
  return (
    <>
      <div className="container">
        <div className="loader"></div>
      </div>
      <style jsx global>
        {`
          body {
            background: ${state.style.colorPalette.background};
          }
        `}
      </style>
      <style jsx>{`
        .container {
          width: ${props.size * 1.5}px;
          height: ${props.size * 1.5}px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loader {
          border: ${props.size / 8}px solid
            ${state.style.colorPalette.interface};
          border-top: ${props.size / 8}px solid
            ${tweak(
              state.style.isDark
                ? state.style.colorPalette.interface
                : state.style.colorPalette.text,
              state.style.isDark ? 0.1 : 2
            )};
          border-radius: 50%;
          width: ${props.size}px;
          height: ${props.size}px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};
