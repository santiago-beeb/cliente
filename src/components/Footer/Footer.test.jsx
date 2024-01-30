import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { AppProvider } from "@context/AppContext";

test("renders Footer correctly", () => {
  render(
    <AppProvider>
      <Footer />
    </AppProvider>
  );

  expect(screen.getByText(/Copyright/)).toBeDefined();
});
