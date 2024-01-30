import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Filter } from "./Filter";
import { AppProvider } from "@context/AppContext";

test("renders Filter correctly", () => {
  render(
    <AppProvider>
      <Filter />
    </AppProvider>
  );

  expect(screen.getByText(/Marca/)).toBeDefined();
});
