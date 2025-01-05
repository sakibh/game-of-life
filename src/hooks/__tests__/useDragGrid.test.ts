import { renderHook, act } from "@testing-library/react";
import { useDragGrid } from "../useDragGrid";

describe("useDragGrid", () => {
  const mockToggleTile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with isDragging as false", () => {
    const { result } = renderHook(() => useDragGrid(mockToggleTile));
    expect(result.current.handleMouseDown).toBeDefined();
    expect(result.current.handleMouseEnter).toBeDefined();
    expect(result.current.handleMouseUp).toBeDefined();
  });

  it("should call toggleTile and set isDragging to true on mouseDown", () => {
    const { result } = renderHook(() => useDragGrid(mockToggleTile));

    act(() => {
      result.current.handleMouseDown(1, 2);
    });

    expect(mockToggleTile).toHaveBeenCalledWith(1, 2);
    expect(mockToggleTile).toHaveBeenCalledTimes(1);
  });

  it("should not call toggleTile on mouseEnter when not dragging", () => {
    const { result } = renderHook(() => useDragGrid(mockToggleTile));

    act(() => {
      result.current.handleMouseEnter(1, 2);
    });

    expect(mockToggleTile).not.toHaveBeenCalled();
  });

  it("should stop dragging on mouseUp", () => {
    const { result } = renderHook(() => useDragGrid(mockToggleTile));

    act(() => {
      result.current.handleMouseDown(0, 0);
      result.current.handleMouseUp();
      result.current.handleMouseEnter(1, 2);
    });

    expect(mockToggleTile).toHaveBeenCalledTimes(1);
    expect(mockToggleTile).toHaveBeenCalledWith(0, 0);
  });
});
