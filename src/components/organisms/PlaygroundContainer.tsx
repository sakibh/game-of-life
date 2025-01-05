import { ChangeEvent } from "react";
import { Separator } from "../atoms/Separator";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules/Card";
import { Grid } from "../molecules/Grid";
import { useGridLogic } from "../../hooks/useGridLogic";
import {
  MAX_COLUMNS,
  MAX_ROWS,
  MIN_COLUMNS,
  MIN_ROWS,
} from "@/constants/gridConstants";
import { GameActions } from "../molecules/GameActions";
import { GameSettings } from "../molecules/GameSettings";

export function PlaygroundContainer() {
  const {
    grid,
    isRunning,
    dimensions,
    setSimulationSpeed,
    toggleTile,
    setRows,
    setColumns,
    startGame,
    pauseGame,
    resetGame,
    importGrid,
    exportGrid,
  } = useGridLogic();

  const handleSliderDimension = (dimension: number[]) => {
    setRows(dimension[0]);
    setColumns(dimension[0]);
  };

  const handleInputDimension = (event: ChangeEvent<HTMLInputElement>) => {
    const dimension = parseInt(event.target.value);
    if (
      dimension >= MIN_ROWS &&
      dimension <= MAX_ROWS &&
      dimension >= MIN_COLUMNS &&
      dimension <= MAX_COLUMNS
    ) {
      setRows(dimension);
      setColumns(dimension);
    }
  };

  return (
    <div className="container mx-auto px-4 py-2 flex flex-row gap-x-2 h-screen">
      <Card className="basis-3/4">
        <CardHeader>
          <CardTitle className="mx-auto">
            Click on the tiles or draw on the grid
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center	">
          <Grid grid={grid} dimensions={dimensions} toggleTile={toggleTile} />
        </CardContent>
      </Card>
      <Card className="basis-1/4">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <GameSettings
            isRunning={isRunning}
            dimensions={dimensions}
            importGrid={importGrid}
            exportGrid={exportGrid}
            handleInputDimension={handleInputDimension}
            handleSliderDimension={handleSliderDimension}
          />
        </CardContent>
        <Separator />
        <CardHeader>
          <CardTitle>Game Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <GameActions
            isRunning={isRunning}
            startGame={startGame}
            pauseGame={pauseGame}
            resetGame={resetGame}
            setSimulationSpeed={setSimulationSpeed}
          />
        </CardContent>
        <Separator />
      </Card>
    </div>
  );
}
