import { useState, useCallback } from "react";

export function useDragGrid(toggleTile: (row: number, col: number) => void) {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (row: number, column: number) => {
      setIsDragging(true);
      toggleTile(row, column);
    },
    [toggleTile]
  );

  const handleMouseEnter = useCallback(
    (row: number, column: number) => {
      if (isDragging) {
        toggleTile(row, column);
      }
    },
    [isDragging, toggleTile]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return { handleMouseDown, handleMouseEnter, handleMouseUp };
}
