import { countNeighbors, getNextCellState } from "../gridUtils";
import { Grid } from "../../hooks/useGridLogic";

describe("countNeighbors", () => {
  it("counts neighbors correctly in the middle of the grid", () => {
    const grid: Grid = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    expect(countNeighbors(grid, 1, 1)).toBe(4);
  });

  it("counts neighbors correctly at the corner of the grid", () => {
    const grid: Grid = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    expect(countNeighbors(grid, 0, 0)).toBe(2);
  });

  it("counts neighbors correctly at the edge of the grid", () => {
    const grid: Grid = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    expect(countNeighbors(grid, 0, 1)).toBe(2);
  });

  it("returns 0 for a cell with no live neighbors", () => {
    const grid: Grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(countNeighbors(grid, 1, 1)).toBe(0);
  });

  it("returns 8 for a cell surrounded by all live neighbors", () => {
    const grid: Grid = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    expect(countNeighbors(grid, 1, 1)).toBe(8);
  });
});

describe("getNextCellState", () => {
  describe("Live cell", () => {
    it("dies with fewer than 2 live neighbors", () => {
      expect(getNextCellState(true, 0)).toBe(0);
      expect(getNextCellState(true, 1)).toBe(0);
    });

    it("lives with 2 or 3 live neighbors", () => {
      expect(getNextCellState(true, 2)).toBe(1);
      expect(getNextCellState(true, 3)).toBe(1);
    });

    it("dies with more than 3 live neighbors", () => {
      expect(getNextCellState(true, 4)).toBe(0);
      expect(getNextCellState(true, 8)).toBe(0);
    });
  });

  describe("Dead cell", () => {
    it("remains dead with fewer than 3 live neighbors", () => {
      expect(getNextCellState(false, 0)).toBe(0);
      expect(getNextCellState(false, 1)).toBe(0);
      expect(getNextCellState(false, 2)).toBe(0);
    });

    it("becomes alive with exactly 3 live neighbors", () => {
      expect(getNextCellState(false, 3)).toBe(1);
    });

    it("remains dead with more than 3 live neighbors", () => {
      expect(getNextCellState(false, 4)).toBe(0);
      expect(getNextCellState(false, 8)).toBe(0);
    });
  });
});
