import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VisitsChart } from "../../src/components/VisitsChart";

describe("VisitsChart", () => {
  test("renderiza o título e um elemento canvas do gráfico", () => {
    render(<VisitsChart />);
    expect(screen.getByText(/visitas/i)).not.toBeNull();
    const canvas = screen.getByRole("region").querySelector("canvas");
    expect(canvas).not.toBeNull();
  });
});
