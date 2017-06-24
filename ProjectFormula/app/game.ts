
  export class Status {
    field: number;
    tires: number;
    speed: number;
    outOfTrack: boolean;
  }

  export class Move {
    field: number;
    direction: string;
    amountOfReaction: number;
    reaction: string[][];
  }

  export class Player {
    color: string;
    status: Status;
    action: string[][];
    numberOfMoves: number;
    moves: Move[];
    pid: number;
  }

  export class Tour {
    players: Player[];
  }

  export class Game {
    tours: Tour[];
  }
