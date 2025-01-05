import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "../atoms/Button";
import { Label } from "../atoms/Label";
import { ConfigurationCombobox } from "../organisms/ConfigurationCombobox";

const SPEED_CONFIGURATIONS = [
  {
    value: "200",
    label: "1x",
  },
  {
    value: "100",
    label: "2x",
  },
  {
    value: "67",
    label: "3x",
  },
  {
    value: "50",
    label: "4x",
  },
];

interface GameActionsProps {
  isRunning: boolean;
  startGame: () => void;
  pauseGame: () => void;
  resetGame: () => void;
  setSimulationSpeed: (speed: number) => void;
}

export function GameActions({
  isRunning,
  startGame,
  pauseGame,
  resetGame,
  setSimulationSpeed,
}: GameActionsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Label>Controls</Label>
      <div className="flex flex-row gap-4">
        <Button disabled={isRunning} onClick={startGame}>
          <Play />
          Start
        </Button>
        <Button disabled={!isRunning} onClick={pauseGame}>
          <Pause />
          Pause
        </Button>
        <Button onClick={resetGame}>
          <RotateCcw />
          Reset
        </Button>
      </div>
      <Label>Simulation Speed</Label>
      <ConfigurationCombobox
        configurations={SPEED_CONFIGURATIONS}
        onSelect={setSimulationSpeed}
        placeholder="Select speed..."
      />
    </div>
  );
}
