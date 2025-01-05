import {
  MAX_COLUMNS,
  MAX_ROWS,
  MIN_COLUMNS,
  MIN_ROWS,
} from "../constants/gridConstants";
import { Grid, GridDimensions } from "../hooks/useGridLogic";

export function createGrid(rows: number, columns: number): number[][] {
  const validatedRows = Math.max(MIN_ROWS, Math.min(MAX_ROWS, rows));
  const validatedColumns = Math.max(
    MIN_COLUMNS,
    Math.min(MAX_COLUMNS, columns)
  );

  return Array(validatedRows)
    .fill(null)
    .map(() => Array(validatedColumns).fill(0));
}

export const validateDimensions = ({
  rows,
  columns,
}: GridDimensions): GridDimensions => {
  const validRows = Math.max(MIN_ROWS, Math.min(MAX_ROWS, rows));
  const validCols = Math.max(MIN_COLUMNS, Math.min(MAX_COLUMNS, columns));
  return { rows: validRows, columns: validCols };
};

export const countNeighbors = (grid: Grid, i: number, j: number): number => {
  let count = 0;
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [di, dj] of directions) {
    const newI = i + di;
    const newJ = j + dj;
    if (
      newI >= 0 &&
      newI < grid.length &&
      newJ >= 0 &&
      newJ < grid[0].length &&
      grid[newI][newJ]
    ) {
      count++;
    }
  }
  return count;
};

export const getNextCellState = (
  isAlive: boolean,
  neighbors: number
): number => {
  if (isAlive) {
    return Number(neighbors === 2) || Number(neighbors === 3);
  }
  return Number(neighbors === 3);
};
