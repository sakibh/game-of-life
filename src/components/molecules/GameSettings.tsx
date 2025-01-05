import { MIN_COLUMNS, MAX_COLUMNS } from "../../constants/gridConstants";
import { Slider } from "../atoms/Slider";
import { Upload } from "lucide-react";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";
import { GridDimensions } from "../../hooks/useGridLogic";
import { ChangeEvent } from "react";

interface GameSettingsProps {
  isRunning: boolean;
  dimensions: GridDimensions;
  importGrid: () => void;
  exportGrid: () => void;
  handleSliderDimension: (dimension: number[]) => void;
  handleInputDimension: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function GameSettings({
  isRunning,
  dimensions,
  importGrid,
  exportGrid,
  handleSliderDimension,
  handleInputDimension,
}: GameSettingsProps) {
  return (
    <>
      <Label>Import Inital State</Label>
      <Button onClick={importGrid} disabled={isRunning}>
        <Upload />
        Import
      </Button>
      <Label>Export Current State</Label>
      <Button onClick={exportGrid} disabled={isRunning}>
        <Upload />
        Export
      </Button>
      <Label>Grid Dimension</Label>
      <div className="flex flex-row gap-2">
        <Slider
          defaultValue={[dimensions.columns]}
          min={MIN_COLUMNS}
          max={MAX_COLUMNS}
          step={1}
          onValueChange={handleSliderDimension}
        />
        <Input
          type="number"
          value={dimensions.columns}
          onChange={handleInputDimension}
          min={MIN_COLUMNS}
          max={MAX_COLUMNS}
        />
      </div>
    </>
  );
}
