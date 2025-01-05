import {
  DEFAULT_COLUMNS,
  DEFAULT_ROWS,
  DEFAULT_SIMULATION_SPEED,
} from "../constants/gridConstants";
import {
  countNeighbors,
  createGrid,
  getNextCellState,
  validateDimensions,
} from "../utils/gridUtils";
import { useCallback, useEffect, useState } from "react";

export type GridDimensions = {
  rows: number;
  columns: number;
};

export type Grid = number[][];

export function useGridLogic(rows = DEFAULT_ROWS, columns = DEFAULT_COLUMNS) {
  const [dimensions, setDimensions] = useState<GridDimensions>({
    rows,
    columns,
  });
  const [grid, setGrid] = useState<Grid>(() => createGrid(rows, columns));
  const [simulationSpeed, setSimulationSpeed] = useState(
    DEFAULT_SIMULATION_SPEED
  );
  const [isRunning, setIsRunning] = useState(false);

  const resetGame = useCallback(() => {
    setIsRunning(false);
    setGrid(createGrid(dimensions.rows, dimensions.columns));
  }, [dimensions]);

  const toggleTile = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
    setGrid(newGrid);
  };

  const updateGrid = useCallback(() => {
    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(currentGrid, i, j);
          return getNextCellState(cell === 1, neighbors);
        })
      );
      return newGrid;
    });
  }, []);

  const startGame = useCallback(() => setIsRunning(true), []);
  const pauseGame = useCallback(() => setIsRunning(false), []);

  const setRows = useCallback((rows: number) => {
    setDimensions((prev) => validateDimensions({ ...prev, rows }));
  }, []);

  const setColumns = useCallback((columns: number) => {
    setDimensions((prev) => validateDimensions({ ...prev, columns }));
  }, []);

  const importGrid = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file: File | null = target.files ? target.files[0] : null;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          try {
            const result = e.target?.result;
            if (typeof result === "string") {
              const importedGrid = JSON.parse(result);
              if (
                Array.isArray(importedGrid) &&
                importedGrid.every(Array.isArray)
              ) {
                const newDimensions = {
                  rows: importedGrid.length,
                  columns: importedGrid[0].length,
                };
                setDimensions(newDimensions);
                setGrid(importedGrid);
              } else {
                console.error("Invalid grid format");
              }
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const exportGrid = () => {
    const jsonContent = JSON.stringify(grid, null, 2);
    console.log("grid to export", grid);
    const blob = new Blob([jsonContent], { type: "application/json" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "grid_export.json");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(updateGrid, simulationSpeed);
    }

    return () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, simulationSpeed, updateGrid]);

  useEffect(() => {
    const validDimensions = validateDimensions(dimensions);
    if (
      grid.length !== validDimensions.rows ||
      grid[0].length !== validDimensions.columns
    ) {
      setGrid(createGrid(validDimensions.rows, validDimensions.columns));
    }
  }, [dimensions, grid]);

  return {
    grid,
    isRunning,
    dimensions,
    simulationSpeed,
    setSimulationSpeed,
    toggleTile,
    setRows,
    setColumns,
    startGame,
    pauseGame,
    resetGame,
    importGrid,
    exportGrid,
  };
}
