import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Grid } from "../Grid";
import { useDragGrid } from "../../../hooks/useDragGrid";

jest.mock("../../../hooks/useDragGrid", () => ({
  useDragGrid: jest.fn(),
}));

describe("Grid", () => {
  const mockHandleMouseDown = jest.fn();
  const mockHandleMouseEnter = jest.fn();
  const mockHandleMouseUp = jest.fn();

  const defaultProps = {
    grid: [
      [0, 1],
      [1, 0],
    ],
    dimensions: { rows: 2, columns: 2 },
    toggleTile: jest.fn(),
  };

  beforeEach(() => {
    (useDragGrid as jest.Mock).mockReturnValue({
      handleMouseDown: mockHandleMouseDown,
      handleMouseEnter: mockHandleMouseEnter,
      handleMouseUp: mockHandleMouseUp,
    });
  });

  beforeAll(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it("renders correct number of Tiles", () => {
    const { getAllByTestId } = render(<Grid {...defaultProps} />);
    const tiles = getAllByTestId(/\d-\d/);
    expect(tiles).toHaveLength(4);
  });

  it("calculates correct tile size", () => {
    const { getAllByTestId } = render(<Grid {...defaultProps} />);
    const tiles = getAllByTestId(/\d-\d/);
    expect(tiles[0]).toHaveStyle("width: 72px");
    expect(tiles[0]).toHaveStyle("height: 72px");
  });

  it("renders Tiles with correct states", () => {
    const { getAllByTestId } = render(<Grid {...defaultProps} />);
    const deadTiles = getAllByTestId(/(?:0-0|1-1)/);
    const aliveTiles = getAllByTestId(/(?:0-1|1-0)/);

    deadTiles.forEach((tile) => expect(tile).toHaveClass("bg-white"));
    aliveTiles.forEach((tile) => expect(tile).toHaveClass("bg-black"));
  });

  it("handles mouse events correctly", () => {
    const { getAllByTestId, getByRole } = render(<Grid {...defaultProps} />);

    const tiles = getAllByTestId(/\d-\d/);
    const grid = getByRole("grid");

    fireEvent.mouseDown(tiles[0]);
    expect(mockHandleMouseDown).toHaveBeenCalledWith(0, 0);

    fireEvent.mouseEnter(tiles[1]);
    expect(mockHandleMouseEnter).toHaveBeenCalledWith(0, 1);

    fireEvent.mouseUp(grid);
    expect(mockHandleMouseUp).toHaveBeenCalled();
  });

  it("adjusts tile size based on window width", () => {
    window.innerWidth = 200;
    const { getAllByTestId } = render(<Grid {...defaultProps} />);
    const tiles = getAllByTestId(/\d-\d/);
    expect(tiles[0]).toHaveStyle("width: 72px");
    expect(tiles[0]).toHaveStyle("height: 72px");
  });

  it("respects minimum tile size", () => {
    window.innerWidth = 2;
    const { getAllByTestId } = render(<Grid {...defaultProps} />);
    const tiles = getAllByTestId(/\d-\d/);
    expect(tiles[0]).toHaveStyle("width: 4px");
    expect(tiles[0]).toHaveStyle("height: 4px");
  });
});
