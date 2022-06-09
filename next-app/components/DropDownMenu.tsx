import React, { ReactElement, useContext, useEffect, useState } from "react";
import { tweak } from "../lib/color";
import { Context } from "../lib/context";
import { Screen, useScreen } from "../lib/useScreen";
import Button from "./Button";
import Icons from "./Icons";

interface DropDownMenuProps {
  menuItems: ReactElement[];
}

interface MenuProps {
  items: ReactElement[];
  position: [number, number];
  width: number;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { state, update } = useContext(Context);
  return (
    <>
      <div id="menu" className="menu">
        {props.items.map((e, i) => {
          return <div key={"menu-item-" + i}>{e}</div>;
        })}
      </div>

      <style jsx>{`
        .menu {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          position: absolute;
          padding: 20px 5px;
          background: ${state.style.colorPalette.interface};
          width: ${props.width}px;
          box-shadow: 2px 2px 80px ${state.style.isDark ? "#030303" : "#444444"};
          left: calc(${props.position[0]}px - 2rem);
          top: ${props.position[1]}px;
          border: 2px ${state.style.colorPalette.interface} solid;
          border-radius: 2px;
          z-index: 1000;
        }
      `}</style>
    </>
  );
};

const DropDownMenu: React.FC<DropDownMenuProps> = (props) => {
  const [active, setActive] = useState<boolean>(false);
  const [btnPos, setBtnPos] = useState<[number, number]>([0, 0]);
  const [screen, setScreen] = useScreen();
  const { state, update } = useContext(Context);

  useEffect(() => {
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  useEffect(() => {
    setBtnPos(getWidthHeight("drop-btn"));
  }, [screen]);

  const handleClose = (e) => {
    setActive(false);
  };

  const getPosition = (
    id: string,
    width: number
  ): [number, number, number, number] => {
    const element = document.getElementById(id).getBoundingClientRect();
    const x =
      window.innerWidth - element.left <= width
        ? -(element.left - (window.innerWidth - width))
        : 0;
    return [x, element.height + 10, element.left, element.top];
  };
  const getWidthHeight = (id: string): [number, number] => {
    const element = document.getElementById(id).getBoundingClientRect();
    return [element.width, element.height];
  };

  return (
    <>
      <div
        style={{ position: "relative", width: btnPos[0], height: btnPos[1] }}
      >
        <Button
          id="drop-btn"
          svg={
            active
              ? Icons.DropArrowDown(
                  state.style.colorPalette.secondary,
                  screen === Screen.Desktop ? false : true
                )
              : Icons.DropArrowRight(
                  state.style.colorPalette.secondary,
                  screen === Screen.Desktop ? false : true
                )
          }
          bgColor={state.style.colorPalette.background}
          txtColor={state.style.colorPalette.text}
          onClick={(e) => {
            setActive(!active);
          }}
          name={props.children.toString()}
        ></Button>
        {active && (
          <>
            <Menu
              items={props.menuItems}
              position={
                getPosition("drop-btn", 200).splice(0, 2) as [number, number]
              }
              width={200}
            />
            <div className="overlay" onClick={handleClose}></div>
          </>
        )}
      </div>
      <style jsx>
        {`
          .overlay {
            position: fixed;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
          }
        `}
      </style>
    </>
  );
};

export default DropDownMenu;
