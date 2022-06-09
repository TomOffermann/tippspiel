import { useContext, useState } from "react";
import { LoadingSpinner } from "../components/elements/LoadingSpinner";
import Navbar from "../components/header/Navbar";
import { OptionPage } from "../components/pages/OptionPage";
import { PageSelector } from "../components/PageSelector";
import { SetWinner } from "../components/subpages/SetWinner";
import { TablePage } from "../components/pages/TablePage";
import { tweak } from "../lib/frontend/utils/color";
import { Context } from "../lib/frontend/middleware/context";

export const optionPage = {
  name: "Optionen",
};

export const betPage = {
  name: "Tippen",
};

export const tablePage = {
  name: "Tabelle",
};

export type Pages = typeof optionPage | typeof betPage | typeof tablePage;

const Main: React.FC = () => {
  const { state, update } = useContext(Context);
  const [page, setPage] = useState<Pages>(betPage);
  return (
    <>
      <Navbar
        username={state.data.user.name}
        expiresAt={state.data.expiresAt}
      ></Navbar>
      <PageSelector setPage={setPage} />
      {page === betPage ? (
        <SetWinner />
      ) : page === tablePage ? (
        <TablePage />
      ) : (
        <OptionPage />
      )}
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
    </>
  );
};

export default Main;
