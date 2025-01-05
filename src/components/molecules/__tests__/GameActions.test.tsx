import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GameActions } from "../GameActions";

describe("GameActions", () => {
  const mockStartGame = jest.fn();
  const mockPauseGame = jest.fn();
  const mockResetGame = jest.fn();

  const renderComponent = (isRunning: boolean) => {
    render(
      <GameActions
        isRunning={isRunning}
        startGame={mockStartGame}
        pauseGame={mockPauseGame}
        resetGame={mockResetGame}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all buttons", () => {
    renderComponent(false);
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Pause")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("disables Start button when game is running", () => {
    renderComponent(true);
    expect(screen.getByText("Start")).toBeDisabled();
  });

  it("enables Start button when game is not running", () => {
    renderComponent(false);
    expect(screen.getByText("Start")).not.toBeDisabled();
  });

  it("disables Pause button when game is not running", () => {
    renderComponent(false);
    expect(screen.getByText("Pause")).toBeDisabled();
  });

  it("enables Pause button when game is running", () => {
    renderComponent(true);
    expect(screen.getByText("Pause")).not.toBeDisabled();
  });

  it("calls startGame when Start button is clicked", () => {
    renderComponent(false);
    fireEvent.click(screen.getByText("Start"));
    expect(mockStartGame).toHaveBeenCalledTimes(1);
  });

  it("calls pauseGame when Pause button is clicked", () => {
    renderComponent(true);
    fireEvent.click(screen.getByText("Pause"));
    expect(mockPauseGame).toHaveBeenCalledTimes(1);
  });

  it("calls resetGame when Reset button is clicked", () => {
    renderComponent(false);
    fireEvent.click(screen.getByText("Reset"));
    expect(mockResetGame).toHaveBeenCalledTimes(1);
  });
});
