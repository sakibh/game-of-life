import { renderHook, act } from "@testing-library/react";
import { useGridLogic } from "../useGridLogic";
import { DEFAULT_SIMULATION_SPEED } from "../../constants/gridConstants";

describe("useGridLogic", () => {
  const defaultRows = 10;
  const defaultColumns = 10;

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useGridLogic());

    expect(result.current.grid.length).toBe(defaultRows);
    expect(result.current.grid[0].length).toBe(defaultColumns);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.dimensions).toEqual({
      rows: defaultRows,
      columns: defaultColumns,
    });
  });

  it("should toggle a tile to alive and then to dead", () => {
    const { result } = renderHook(() => useGridLogic());

    act(() => {
      result.current.toggleTile(0, 0);
    });

    expect(result.current.grid[0][0]).toBe(1);

    act(() => {
      result.current.toggleTile(0, 0);
    });

    expect(result.current.grid[0][0]).toBe(0);
  });

  it("should start and pause the game", () => {
    const { result } = renderHook(() => useGridLogic());

    act(() => {
      result.current.startGame();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      result.current.pauseGame();
    });

    expect(result.current.isRunning).toBe(false);
  });

  it("should reset the game", () => {
    const { result } = renderHook(() => useGridLogic());

    act(() => {
      result.current.toggleTile(0, 0);
      result.current.startGame();
      result.current.resetGame();
    });

    expect(result.current.grid[0][0]).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it("should update dimensions", () => {
    const { result } = renderHook(() => useGridLogic());

    act(() => {
      result.current.setRows(20);
      result.current.setColumns(20);
    });

    expect(result.current.dimensions).toEqual({ rows: 20, columns: 20 });
    expect(result.current.grid.length).toBe(20);
    expect(result.current.grid[0].length).toBe(20);
  });

  it("should update grid on each tick when running", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useGridLogic());

    act(() => {
      result.current.toggleTile(0, 1);
      result.current.toggleTile(1, 1);
      result.current.toggleTile(2, 1);
      result.current.startGame();
    });

    act(() => {
      jest.advanceTimersByTime(DEFAULT_SIMULATION_SPEED);
    });

    expect(result.current.grid[1][0]).toBe(1);
    expect(result.current.grid[1][1]).toBe(1);
    expect(result.current.grid[1][2]).toBe(1);
  });
});
