import React from "react";

export const OptionPage: React.FC = () => {
  return (
    <>
      <div className="option-container">
        <button
          onClick={() => {
            fetch("./api/apiTest").then((e) =>
              e.json().then((f) => console.log(f))
            );
          }}
        >
          API TEST
        </button>
      </div>
      <style jsx>{`
        .option-container {
          padding: 0px 50px;
        }
      `}</style>
    </>
  );
};
