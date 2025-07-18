import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import HomePage from "./HomePage";
import * as apiService from "@/services/api";
import { MOCK_ARTICLES } from "@/constants/dummyData";

vi.mock("@/services/api");

describe("HomePage Component", () => {
  beforeEach(() => {
    vi.spyOn(apiService, "searchArticles").mockResolvedValue(MOCK_ARTICLES);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test cases for HomePage component
  it("renders the initial welcome message", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: /Pencarian Artikel/i });
    const welcomeMessage = screen.getByText(/Selamat Datang!/i);
    expect(heading).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();
  });

  // Test case for searching articles
  it("allows user to search for articles and displays the results", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/Cari artikel tentang/i);
    const searchButton = screen.getByRole("button", { name: /Cari/i });

    await user.type(searchInput, "indonesia");
    expect(searchInput).toHaveValue("indonesia");

    await user.click(searchButton);

    await waitFor(() => {
      const articleTitle1 = screen.getByText(
        "Before Trump, Indonesia Had Another Trade Headache: China"
      );
      const articleTitle2 = screen.getByText("Trump Is Winning the Race to the Bottom");

      expect(articleTitle1).toBeInTheDocument();
      expect(articleTitle2).toBeInTheDocument();
    });

    expect(screen.queryByText(/Selamat Datang!/i)).not.toBeInTheDocument();
  });

  // Test case for empty search input
  it("displays an error message if the API call fails", async () => {
    vi.spyOn(apiService, "searchArticles").mockRejectedValue(new Error("API Gagal"));

    const user = userEvent.setup();
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/Cari artikel tentang/i);
    const searchButton = screen.getByRole("button", { name: /Cari/i });

    await user.type(searchInput, "fail");
    await user.click(searchButton);

    const errorMessage = await screen.findByText(/Oops! Terjadi Kesalahan/i);
    expect(errorMessage).toBeInTheDocument();
    expect(screen.getByText("API Gagal")).toBeInTheDocument();
  });
});
