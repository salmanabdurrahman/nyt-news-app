import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import NotFoundPage from "@/pages/NotFoundPage";

describe("NotFoundPage Component", () => {
  it("renders the 404 message and a link to the homepage", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", { level: 1, name: /404/i });
    expect(heading).toBeInTheDocument();

    const message = screen.getByText(/Halaman Tidak Ditemukan/i);
    expect(message).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Kembali ke Halaman Utama/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
