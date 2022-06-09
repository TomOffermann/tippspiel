import Image from "next/image";
import React, { useContext } from "react";
import { tweak } from "../../lib/frontend/utils/color";
import { Context, HiddenUser } from "../../lib/frontend/middleware/context";

export const TablePage: React.FC = () => {
  const { state, update } = useContext(Context);
  const players = [state.data.user as HiddenUser, ...state.data.players];
  players.sort((a, b) => (a.name > b.name ? 1 : -1));
  return (
    <>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table-head">Platz</th>
              <th className="table-head">Name</th>
              <th className="table-head">Tipp</th>
            </tr>
          </thead>
          <tbody>
            {players.map((e, i) => {
              return (
                <tr key={"Spieler-" + e.id} className="table-row">
                  <td className="table-col">{i + 1}.</td>
                  <td className="table-col">{e.name}</td>
                  <td className="table-col">
                    {state.data.teams.find((team) => team.id === e.teamId) && (
                      <div className="flag-container">
                        <div className="flag">
                          <Image
                            src={
                              state.data.teams.find(
                                (team) => team.id === e.teamId
                              ).flagUrl
                            }
                            alt={
                              "Bild der Flagge von " +
                              state.data.teams.find(
                                (team) => team.id === e.teamId
                              ).name
                            }
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        {
                          state.data.teams.find((team) => team.id === e.teamId)
                            .name
                        }
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .table-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          padding: 0px 50px;
        }
        .table {
          border-collapse: collapse;
          width: 100%;
        }
        .table-row {
          color: ${state.style.colorPalette.text};
          font-size: 20px;
          font-weight: 500;
          background-color: ${state.style.colorPalette.interface};
        }
        .table-col {
          padding: 5px 20px;
          border: 2px solid ${state.style.colorPalette.background};
        }
        .table-head {
          background-color: ${state.style.colorPalette.interface};
          font-size: 25px;
          color: ${state.style.colorPalette.text};
        }
        .table-row:nth-child(even) {
          background-color: ${tweak(
            state.style.colorPalette.interface,
            state.style.isDark ? 1.15 : 0.925
          )};
        }
        .flag {
          position: relative;
          width: 30px;
          height: 30px;
        }
        .flag-container {
          display: flex;
          gap: 0px 15px;
          justify-content: flex-start;
          align-items: center;
        }
      `}</style>
    </>
  );
};
