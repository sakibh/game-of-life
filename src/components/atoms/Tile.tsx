export type TileState = "Alive" | "Dead";

interface TileProps {
  row: number;
  column: number;
  state: TileState;
  tileSize: number;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
}

export function Tile({
  row,
  column,
  state,
  tileSize,
  onMouseDown,
  onMouseEnter,
}: TileProps) {
  return (
    <div
      data-testid={`${row}-${column}`}
      onMouseDown={() => onMouseDown(row, column)}
      onMouseEnter={() => onMouseEnter(row, column)}
      key={`${row}-${column}`}
      style={{ width: `${tileSize}px`, height: `${tileSize}px` }}
      className={`transition-colors cursor-pointer ${
        state === "Alive" ? "bg-black" : "bg-white"
      } hover:bg-gray-400`}
    />
  );
}
