import React from "react";
const passes = [
  {
    result: "incomplete",
    receiver: "Demaryius Thomas",
    distance: 0.7,
  },
  {
    result: "complete",
    receiver: "Tim Patrick",
    distance: 0.9,
  },
  {
    result: "complete",
    receiver: "Demaryius Thomas",
    distance: 0.3,
  },
  {
    result: "incomplete",
    receiver: "Tim Patrick",
    distance: 0.9,
  },
  {
    result: "incomplete",
    receiver: "Tim Patrick",
    distance: 0.8,
  },
  {
    result: "complete",
    receiver: "Demaryius Thomas",
    distance: 0.1,
  },
  {
    result: "interception",
    receiver: "Demaryius Thomas",
    distance: 0.4,
  },
];
export const Players = (props) => {
  const initialValues = (result) => {
    if (result === "complete") {
      return {
        completed: 1,
        incompleted: 0,
      };
    } else if (result === "incomplete") {
      return {
        completed: 0,
        incompleted: 1,
      };
    } else {
      return {
        completed: 0,
        incompleted: 0,
        passes: [],
      };
    }
  };

  const aggregateData = (current, newValues) => {
    const { result, distance, receiver } = newValues;
    let resObject = {};
    if (result === "complete") {
      resObject = {
        ...current,
        completed: current.completed + 1,
        passes: [...current.passes, distance],
      };
    } else if (result === "incomplete") {
      resObject = {
        ...current,
        incompleted: current.incompleted + 1,
        passes: [...current.passes, distance],
      };
    } else {
      resObject = {
        ...current,
      };
    }

    return resObject;
  };

  let players = passes.reduce((red, current, index) => {
    const { receiver, distance, result } = current;
    const doesPlayerExists = red.some((plr) => plr.receiver === receiver);
    if (!doesPlayerExists) {
      red.push({
        receiver,
        passes: [distance],
        ...initialValues(result),
      });
    } else {
      let playerIndex = red.findIndex((plr) => plr.receiver === receiver);
      //const res = addInfo(red[playerIndex], current);
      red[playerIndex] = aggregateData(red[playerIndex], current);
    }

    return red;
  }, []);

  const calculatePercentage = (player) => {
    const { completed, incompleted } = player;
    const total = completed + incompleted;
    return { winRatio: (completed / total) * 100 };
  };

  const addPercentage = () => {
    players = players.map((plr) => {
      return {
        ...plr,
        ...calculatePercentage(plr),
      };
    });
  };
  addPercentage();

  const getMostCompleteConfig = () => {
    const winner = players.reduce(
      (red, currentPlayer) => {
        if (red.winRatio < currentPlayer.winRatio) {
          red = currentPlayer;
        }
        return red;
      },
      { winRatio: 0 }
    );
    const { receiver, winRatio } = winner;
    return {
      player: receiver,
      value: `${winRatio}%`,
    };
  };

  const mostComplete = getMostCompleteConfig();
  console.log("most compelte", mostComplete);

  const getLongDistancePass = () => {
    const winner = players.reduce(
      (red, currentPlayer) => {
        const longestPass = Math.max(...currentPlayer.passes);
        if (red.longestPass < longestPass) {
          red = { ...currentPlayer, longestPass };
        }
        return red;
      },
      { longestPass: 0 }
    );

    return {
      player: winner.receiver,
      value: winner.longestPass,
    };
  };

  const longestPass = getLongDistancePass();
  console.log("longestPass", longestPass);

  console.log("players", players);
  return (
    <div>
      <h1>Check console for the results</h1>
    </div>
  );
};

// const mostCompletePerentace = {
//     player: "Player Name",
//     value: 93%
// };

// const longDistancePass = {
//     player: "Player Name",
//     value: 12.0
// };
