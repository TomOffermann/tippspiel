import { MouseEventHandler, useContext, useState } from "react";
import { tweak } from "../lib/color";
import { Context } from "../lib/context";
import { Screen, useScreen } from "../lib/useScreen";

interface IconButtonProps {
  spacing?: string;
  id?: string;
  name: string;
  svg?: React.SVGProps<SVGSVGElement> | undefined;
  width?: string;
  bgColor?: string;
  txtColor?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function Button(props: IconButtonProps) {
  const { state, update } = useContext(Context);
  const [active, setActive] = useState(false);
  const [screen, setScreen] = useScreen();

  let timeOutId = undefined;
  const wrapOnClick = (e) => {
    if (timeOutId !== undefined) clearTimeout(timeOutId);
    setActive(true);
    props.onClick(e);
    timeOutId = setTimeout(() => {
      setActive(false);
    }, 200);
  };
  return (
    <>
      <button
        id={props.id !== undefined ? props.id : ""}
        className={!active ? "button-container" : "button-container-active"}
        onClick={wrapOnClick}
      >
        {props.svg !== undefined && props.svg}
        {props.name}
      </button>
      <style jsx>{`
        .button-container {
          height: ${screen === Screen.Desktop ? "36px" : "26px"};
          min-width: ${props.width !== undefined ? props.width : "auto"};
          padding: ${
            screen === Screen.Desktop ? "5px 15px 5px 10px" : "0px 10px 0px 5px"
          };
          font-size: ${screen === Screen.Desktop ? "20px" : "14px"};
          font-weight: 500;
          border: 1px
          ${
            props.svg !== undefined
              ? props.bgColor !== undefined
                ? props.bgColor
                : state.style.colorPalette.secondary
              : props.bgColor !== undefined
              ? props.bgColor
              : state.style.colorPalette.primary
          };
            solid;
          border-radius: 5px;
          outline: none;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: ${
            props.spacing !== undefined ? props.spacing : "space-around"
          } ;
          background-color: ${
            props.svg !== undefined
              ? props.bgColor !== undefined
                ? props.bgColor
                : state.style.colorPalette.secondary
              : props.bgColor !== undefined
              ? props.bgColor
              : state.style.colorPalette.primary
          };
          color: ${
            props.txtColor !== undefined
              ? props.txtColor
              : state.style.colorPalette.textOnPrimary
          };
        }

        .button-container-active {
          min-width: ${props.width !== undefined ? props.width : "auto"};
          height: ${screen === Screen.Desktop ? "36px" : "26px"};
          padding:${
            screen === Screen.Desktop ? "5px 15px 5px 10px" : "0px 10px 0px 5px"
          };
          font-size: ${screen === Screen.Desktop ? "20px" : "14px"};
          font-weight: 500;
          border: 1px
          ${
            props.svg !== undefined
              ? props.bgColor !== undefined
                ? props.bgColor
                : state.style.colorPalette.secondary
              : props.bgColor !== undefined
              ? props.bgColor
              : state.style.colorPalette.primary
          };
            solid;
          border-radius: 5px;
          outline: none;
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: ${
            props.spacing !== undefined ? props.spacing : "space-around"
          } ;
          background-color: ${
            props.svg !== undefined
              ? props.bgColor !== undefined
                ? props.bgColor
                : state.style.colorPalette.secondary
              : props.bgColor !== undefined
              ? props.bgColor
              : state.style.colorPalette.primary
          };
          color: ${
            props.txtColor !== undefined
              ? props.txtColor
              : state.style.colorPalette.textOnPrimary
          };
          animation-duration: 0.2s;
          animation-timing-function: ease-out;
          animation-name: animate-border;
        }
        @media (hover: hover) {
          .button-container-active:hover {
            min-width: ${props.width !== undefined ? props.width : "auto"};
            filter: ${
              state.style.isDark ? "brightness(110%)" : "brightness(90%)"
            };
          }
          .button-container:hover {
            min-width: ${props.width !== undefined ? props.width : "auto"};
            filter: ${
              state.style.isDark ? "brightness(110%)" : "brightness(90%)"
            };
            transition: 0.1s;
          }
        }

        @media (hover: none) {
          .button-container:hover {
          }
          .button-container-active:hover {
          }
        }

        @keyframes animate-border {
          from {
            border-radius: 5px;
          }
          50% {
            border-radius: 10px;
            transform: scale(0.9, 0.9);
            filter: ${
              state.style.isDark ? "brightness(120%)" : "brightness(80%)"
            };
              box-shadow: 2px 2px 10px
              ${tweak(
                state.style.colorPalette.interface,
                state.style.isDark ? 0.55 : 0.85
              )};
          }
          to {
            border-radius: 5px;
          }
        }
      `}</style>
    </>
  );
}

export default Button;
