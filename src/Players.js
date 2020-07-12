import React from "react";
import { COMPLETE, INTERECPTION, INCOMPLETE } from "./const/constants";

const getInitialValues = (receiver) => {
  let initialValues = {
    receiver,
    completed: 0,
    incompleted: 0,
    passes: [],
  };

  return initialValues;
};
const addPlayerData = (newPlayer, stats) => {
  const { passes } = newPlayer;
  const { result, distance } = stats;
  let playerStats = {
    ...newPlayer,
  };
  switch (result) {
    case COMPLETE: {
      return {
        ...playerStats,
        completed: newPlayer.completed + 1,
        passes: [...passes, distance],
      };
    }
    case INCOMPLETE:
    case INTERECPTION: {
      return {
        ...playerStats,
        incompleted: newPlayer.incompleted + 1,
        passes: [...passes, distance],
      };
    }
  }
};
const getPlayersStats = (passes) => {
  const players = passes.reduce((red, currentPlayer, index) => {
    const { receiver, distance, result } = currentPlayer;
    const doesPlayerExists = red.some((plr) => plr.receiver === receiver);
    //if the player does not exist
    if (!doesPlayerExists) {
      //creating player with initial values
      let newPlayer = {
        ...getInitialValues(receiver),
      };
      //adding data to the player
      newPlayer = {
        ...addPlayerData(newPlayer, currentPlayer),
      };
      red.push(newPlayer);
    } else {
      //players exists
      //finding player`s index
      const playerIndex = red.findIndex((plr) => plr.receiver === receiver);
      //adding data to the currentPlayer
      const existingPlayer = {
        ...addPlayerData(red[playerIndex], currentPlayer),
      };
      red[playerIndex] = existingPlayer;
    }
    return red;
  }, []);

  return players;
};
const getMostCompleteConfig = (players) => {
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

const calculateWinRatio = (player) => {
  const { completed, incompleted } = player;
  const total = completed + incompleted;
  return { winRatio: +((completed / total) * 100).toFixed(2) };
};

const getPlayersWinRatio = (players) => {
  return players.map((plr) => {
    return {
      ...plr,
      ...calculateWinRatio(plr),
    };
  });
};
const getLongDistancePass = (players) => {
  const winner = players.reduce(
    (red, currentPlayer) => {
      //finding the longest pass of the player
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

export const Players = (props) => {
  const { passes } = props;

  //aggregated player
  const players = getPlayersStats(passes);
  /**
   * we need to have the players with their winRatio in order to find the player with the most complete config
   * map function returns brand new array we are not mutating the current players
   */
  const playersWithRatio = getPlayersWinRatio(players);
  console.log("playersWithRatio", playersWithRatio);
  const mostCompleteConfig = getMostCompleteConfig(playersWithRatio);
  console.log("most complete config", mostCompleteConfig);
  const longestPass = getLongDistancePass(players);
  console.log("longestpass", longestPass);
  return (
    <div>
      <h1>Check console for the results</h1>
    </div>
  );
};
