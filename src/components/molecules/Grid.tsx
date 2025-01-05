import { useMemo } from "react";
import { Tile } from "../atoms/Tile";
import { useDragGrid } from "../../hooks/useDragGrid";
import type { Grid, GridDimensions } from "../../hooks/useGridLogic";

interface GridProps {
  grid: Grid;
  dimensions: GridDimensions;
  toggleTile: (row: number, column: number) => void;
}

export function Grid({ grid, dimensions, toggleTile }: GridProps) {
  const tileSize = useMemo(() => {
    const minSize = 4;
    const maxSize = 72;
    const calculatedSize = Math.floor(
      Math.min(window.innerWidth / dimensions.columns, maxSize)
    );
    return Math.max(calculatedSize, minSize);
  }, [dimensions.columns]);

  const { handleMouseDown, handleMouseEnter, handleMouseUp } =
    useDragGrid(toggleTile);

  return (
    <div className="max-w-[50vw]">
      <div
        role="grid"
        className="inline-grid gap-[1px] bg-gray-200 p-1 overflow-auto w-full max-h-[70vh]"
        style={{
          gridTemplateColumns: `repeat(${dimensions.columns}, ${tileSize}px)`,
        }}
        onMouseUp={handleMouseUp}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <Tile
              row={i}
              column={j}
              state={cell === 1 ? "Alive" : "Dead"}
              tileSize={tileSize}
              onMouseDown={handleMouseDown}
              onMouseEnter={handleMouseEnter}
            />
          ))
        )}
      </div>
    </div>
  );
}
