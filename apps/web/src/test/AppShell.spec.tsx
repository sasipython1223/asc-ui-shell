import { render, screen, fireEvent } from "@testing-library/react";
import { AppShell } from "@ui/shell/AppShell";

describe("AppShell", () => {
  it("renders core chrome", () => {
    render(<AppShell />);
    expect(screen.getByTestId("activity-bar")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("editor")).toBeInTheDocument();
    expect(screen.getByTestId("bottom-panel")).toBeInTheDocument();
    expect(screen.getByTestId("status-bar")).toBeInTheDocument();
  });

  it("opens command palette with Ctrl+K", () => {
    render(<AppShell />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(screen.getByRole("dialog", { name: /command palette/i })).toBeInTheDocument();
  });

  it("starts a run and shows progress", async () => {
    render(<AppShell />);
    fireEvent.click(screen.getByRole("button", { name: /run schedule/i }));
    expect(await screen.findByText(/running/i)).toBeInTheDocument();
  });
});
