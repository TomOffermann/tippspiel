import Router from "next/router";
import React, { useContext } from "react";
import { tweak } from "../../lib/frontend/utils/color";
import { Context } from "../../lib/frontend/middleware/context";
import { useScreen, Screen } from "../../lib/frontend/utils/useScreen";
import Button from "../elements/Button";
import DropDownMenu from "../elements/DropDownMenu";
import Icons from "../elements/Icons";
import Timer from "../elements/Timer";

interface NavbarProps {
  username: string;
  expiresAt: number | null;
}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { state, update } = useContext(Context);
  const [screen, setScreen] = useScreen();
  return (
    <>
      <div className="container">
        <div className="title">WM 2022</div>
        <div className="sub-title">Hallo, {props.username}!</div>
        {screen === Screen.Desktop && <></>}
        <DropDownMenu
          menuItems={[
            <div>
              <div className="session">Sitzung:</div>
              {props.expiresAt !== null && (
                <Timer expiresAt={props.expiresAt} />
              )}
              <div className="spacer"></div>
              <Button
                spacing="flex-start"
                width="160px"
                name="Erneuern"
                svg={Icons.Refresh(state.style.colorPalette.textOnPrimary)}
                onClick={(e) => {
                  fetch("./api/login", {
                    method: "POST",
                    body: JSON.stringify({}),
                  }).then((response) => {
                    if (response.status < 300) {
                      window.location.href = "/";
                    } else {
                      Router.push("/login");
                    }
                  });
                }}
              />
              <div className="divider"></div>
            </div>,
            <div>
              <div className="session">Sonstiges:</div>
              <div className="spacer"></div>
              <Button
                spacing="flex-start"
                width="160px"
                name={"Farbe"}
                svg={
                  state.style.isDark
                    ? Icons.DarkMode(state.style.colorPalette.background)
                    : Icons.LightMode(state.style.colorPalette.background)
                }
                onClick={(e) => {
                  state.style.setColorMode(!state.style.isDark, {
                    state,
                    update,
                  });
                }}
              />
              <div className="spacer"></div>
              <Button
                spacing="flex-start"
                width="160px"
                name={"Logout"}
                bgColor={state.style.colorPalette.error}
                txtColor={state.style.colorPalette.textOnError}
                svg={Icons.Logout(state.style.colorPalette.textOnError)}
                onClick={(e) => {
                  fetch("./api/logout", {
                    method: "POST",
                  }).then((e) => Router.push("/login"));
                }}
              />
            </div>,
          ]}
        >
          Menu
        </DropDownMenu>
      </div>
      <style jsx global>{`
        body {
          background: ${state.style.colorPalette.background};
        }
      `}</style>
      <style jsx>{`
        .divider {
          margin: 20px 0px;
          height: 0px;
          border-top: 2px solid ${state.style.colorPalette.text};
        }
        .spacer {
          margin-top: 15px;
          height: 0px;
          width: 0px;
        }
        .session {
          text-align: center;
          margin-bottom: 5px;
          font-weight: 500;
          font-size: 24px;
        }
        .title {
          font-weight: 800;
          font-size: 40px;
          color: ${state.style.colorPalette.text};
        }
        .sub-title {
          font-weight: 400;
          font-size: 30px;
          color: ${state.style.colorPalette.text};
        }
        .container {
          box-shadow: 1px 1px 4px
            ${tweak(
              state.style.colorPalette.interface,
              state.style.isDark ? 0.55 : 0.85
            )};
          padding: ${screen === Screen.Desktop ? "30px" : "10px"};
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          gap: ${screen === Screen.Desktop ? "10px" : "5px"}; 30px;
          justify-content: space-between;
          color: ${state.style.colorPalette.text};
          background-color: ${state.style.colorPalette.interface};
        }
      `}</style>
    </>
  );
};

export default Navbar;
