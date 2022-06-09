import { Bet, Game, Score, Team } from "@prisma/client";
import React, { useEffect } from "react";
import { Color, defaultColor } from "../utils/color";

export interface User {
  name: string;
  email: string;
  id: number;
  teamId: number;
}

export interface HiddenUser {
  name: string;
  id: number;
  teamId: number;
}

export interface ApplicationData {
  teams: Team[];
  user: User;
  games: Game[];
  bets: Bet[];
  scores: Score[];
  expiresAt: number;
  players: HiddenUser[];
}

export interface ApplicationState {
  style: Color;
  loggedIn: boolean;
  data: ApplicationData;
}

const defaultValue: ApplicationState = {
  style: defaultColor,
  loggedIn: false,
  data: {
    expiresAt: Date.now(),
    teams: [],
    bets: [],
    games: [],
    scores: [],
    players: [],
    user: {
      id: 0,
      name: "---",
      email: "---",
      teamId: 0,
    },
  },
};

type UpdateType = React.Dispatch<React.SetStateAction<ApplicationState>>;
const defaultUpdate: UpdateType = () => defaultValue;

export const Context = React.createContext({
  state: defaultValue,
  update: defaultUpdate,
});

export const Provider: React.FC = (props) => {
  const [state, setState] = React.useState<ApplicationState>(defaultValue);
  return (
    <Context.Provider value={{ state: state, update: setState }} {...props} />
  );
};
