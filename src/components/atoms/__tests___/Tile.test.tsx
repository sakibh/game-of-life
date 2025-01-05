import { render, fireEvent } from "@testing-library/react";
import { Tile, TileState } from "../Tile";
import "@testing-library/jest-dom";

describe("Tile", () => {
  const defaultProps = {
    row: 1,
    column: 2,
    state: "Dead" as TileState,
    tileSize: 20,
    onMouseDown: jest.fn(),
    onMouseEnter: jest.fn(),
  };

  it("renders correctly", () => {
    const { getByTestId } = render(<Tile {...defaultProps} />);
    const tileElement = getByTestId("1-2");
    expect(tileElement).toBeInTheDocument();
  });

  it("has correct size", () => {
    const { getByTestId } = render(<Tile {...defaultProps} />);
    const tileElement = getByTestId("1-2");
    expect(tileElement).toHaveStyle("width: 20px");
    expect(tileElement).toHaveStyle("height: 20px");
  });

  it("has white background when dead", () => {
    const { getByTestId } = render(<Tile {...defaultProps} />);
    const tileElement = getByTestId("1-2");
    expect(tileElement).toHaveClass("bg-white");
  });

  it("has black background when alive", () => {
    const { getByTestId } = render(<Tile {...defaultProps} state="Alive" />);
    const tileElement = getByTestId("1-2");
    expect(tileElement).toHaveClass("bg-black");
  });

  it("calls onMouseDown with correct arguments", () => {
    const { getByTestId } = render(<Tile {...defaultProps} />);
    const tileElement = getByTestId("1-2");
    fireEvent.mouseDown(tileElement);
    expect(defaultProps.onMouseDown).toHaveBeenCalledWith(1, 2);
  });

  it("calls onMouseEnter with correct arguments", () => {
    const { getByTestId } = render(<Tile {...defaultProps} />);
    const tileElement = getByTestId("1-2");
    fireEvent.mouseEnter(tileElement);
    expect(defaultProps.onMouseEnter).toHaveBeenCalledWith(1, 2);
  });

  it("has hover effect", () => {
    const { getByTestId } = render(<Tile {...defaultProps} />);
    const tileElement = getByTestId("1-2");
    expect(tileElement).toHaveClass("hover:bg-gray-400");
  });
});
