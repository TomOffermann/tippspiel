import { useContext, useState } from "react";
import { Context } from "../lib/context";
import { LoadingSpinner } from "./LoadingSpinner";
import Image from "next/image";
import { tweak } from "../lib/color";

import { useScreen, Screen } from "../lib/useScreen";

export const SetWinner: React.FC = () => {
  const { state, update } = useContext(Context);
  const [screen, setScreen] = useScreen();
  const [teamIndex, setTeamIndex] = useState<number | null>(
    state.data.user.teamId
  );
  const [uploading, setUploading] = useState<{
    index: number;
    status: boolean;
  }>({ index: teamIndex, status: false });
  state.data.teams.sort((a, b) => (a.name > b.name ? 1 : -1));
  return (
    <>
      {teamIndex === null ? (
        <div className="team-alert">Bitte einen Tournier-Gewinner angeben!</div>
      ) : (
        <div className="team-success">
          Du hast einen Tournier-Gewinner angegeben!
        </div>
      )}
      <div className="team-container">
        {state.data !== null &&
          state.data.teams.map((team) => {
            return (
              <div
                key={"Team-" + team.id}
                className={
                  team.id === teamIndex ? "team-selected" : "team-unselected"
                }
                onClick={() => {
                  if (teamIndex !== team.id || teamIndex === null) {
                    setUploading({ index: team.id, status: true });
                    setTeamIndex(team.id);
                    fetch("./api/contestWinner", {
                      method: "POST",
                      body: JSON.stringify({ teamId: team.id }),
                    }).then((response) => {
                      setTimeout(
                        () => setUploading({ index: team.id, status: false }),
                        350
                      );
                      if (response.status < 300) {
                        update({
                          ...state,
                          data: {
                            ...state.data,
                            user: {
                              ...state.data.user,
                              teamId: team.id,
                            },
                          },
                        });
                      }
                    });
                  } else {
                    setTeamIndex(null);
                  }
                }}
              >
                <div className="team-container-head">
                  <div className="flag">
                    <Image
                      src={team.flagUrl}
                      alt={"Bild der Flagge von " + team.name}
                      layout="fill"
                      objectFit="contain"
                    ></Image>
                  </div>
                  {team.name}
                </div>
                <div className="team-container-tail">
                  {team.id === teamIndex &&
                    uploading.index === team.id &&
                    uploading.status && <LoadingSpinner size={20} />}
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={team.id === teamIndex ? true : false}
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        setUploading({ index: team.id, status: true });
                        setTeamIndex(team.id);
                        fetch("./api/contestWinner", {
                          method: "POST",
                          body: JSON.stringify({ teamId: team.id }),
                        }).then((response) => {
                          setTimeout(
                            () =>
                              setUploading({ index: team.id, status: false }),
                            350
                          );
                          if (response.status < 300) {
                            update({
                              ...state,
                              data: {
                                ...state.data,
                                user: {
                                  ...state.data.user,
                                  teamId: team.id,
                                },
                              },
                            });
                          }
                        });
                      } else {
                        setTeamIndex(null);
                      }
                    }}
                  ></input>
                </div>
              </div>
            );
          })}
      </div>
      <style jsx>{`
        .team-alert {
          margin: 20px ${screen === Screen.Desktop ? "50px" : "0px"};
          font-weight: 600;
          font-size: ${screen === Screen.Desktop ? "22px" : "16px"};
          text-align: center;
          padding: 5px 30px;
          color: ${state.style.colorPalette.textOnError};
          background-color: ${state.style.colorPalette.error};
        }
        .team-success {
          margin: 20px ${screen === Screen.Desktop ? "50px" : "0px"};
          font-weight: 600;
          font-size: ${screen === Screen.Desktop ? "22px" : "16px"};
          text-align: center;
          padding: 5px 30px;
          color: ${state.style.colorPalette.textOnPrimary};
          background-color: ${state.style.colorPalette.primary};
        }
        .team-container {
          margin-top: 10px;
          display: grid;
          padding: 0px ${screen === Screen.Desktop ? "50px" : "0px"};
          grid-template-columns: repeat(
            auto-fill,
            minmax(${screen === Screen.Desktop ? "290px" : "200px"}, 1fr)
          );
          justify-content: space-around;
          grid-gap: 5px 20px;
        }
        .team-container-head {
          margin: 5px 0px;
          font-weight: 500;
          font-size: ${screen === Screen.Desktop ? "20px" : "15px"};
          height: ${screen === Screen.Desktop ? "60px" : "40px"};
          display: flex;
          align-items: center;
          gap: 0px 20px;
          justify-content: space-between;
          padding-left: 10px;
        }
        .team-container-tail {
          margin: 5px 0px;
          font-weight: 400;
          font-size: 20px;
          height: ${screen === Screen.Desktop ? "60px" : "40px"};
          display: flex;
          align-items: center;
          gap: 0px 10px;
          justify-content: space-between;
          padding-right: 10px;
        }
        .team-container::after {
          content: "";
          flex: auto;
        }
        .team-unselected {
          color: ${state.style.colorPalette.text};
          box-shadow: 1px 1px 4px
            ${tweak(
              state.style.colorPalette.interface,
              state.style.isDark ? 0.55 : 0.85
            )};
          background-color: ${state.style.colorPalette.interface};
          margin: 5px 0px;
          font-weight: 400;
          font-size: 20px;
          height: ${screen === Screen.Desktop ? "60px" : "40px"};
          display: flex;
          align-items: center;
          gap: 0px 5px;
          justify-content: space-between;
        }
        .team-selected {
          box-shadow: 2px 2px 10px
            ${tweak(
              state.style.colorPalette.interface,
              state.style.isDark ? 0.55 : 0.85
            )};
          color: ${state.style.colorPalette.textOnPrimary};
          background-color: ${state.style.colorPalette.primary};
          margin: 5px 0px;
          font-weight: 400;
          font-size: 20px;
          height: ${screen === Screen.Desktop ? "60px" : "40px"};
          display: flex;
          align-items: center;
          gap: 0px 5px;
          justify-content: space-between;
        }
        .flag {
          position: relative;
          width: ${screen === Screen.Desktop ? "50px" : "35px"};
          height: ${screen === Screen.Desktop ? "50px" : "35px"};
        }
        .checkbox {
          width: ${screen === Screen.Desktop ? "22px" : "15px"};
          height: ${screen === Screen.Desktop ? "22px" : "15px"};
        }
      `}</style>
    </>
  );
};
