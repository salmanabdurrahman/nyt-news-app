import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import HomePage from "@/pages/HomePage";
import * as articleService from "@/services/articleService";
import { MOCK_ARTICLES } from "@/constants/dummyData";

vi.mock("@/services/articleService");

describe("HomePage Component", () => {
  beforeEach(() => {
    vi.spyOn(articleService, "searchArticles").mockResolvedValue({
      articles: MOCK_ARTICLES,
      metadata: {
        hits: 20,
        offset: 0,
        time: 15,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // test case for rendering the HomePage component
  it("renders the initial welcome message", () => {
    render(<HomePage />);
    expect(screen.getByText(/Selamat Datang!/i)).toBeInTheDocument();
  });

  // test case for rendering the search input and button
  it("allows user to search for articles and displays the results", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/Cari artikel tentang/i);
    const searchButton = screen.getByRole("button", { name: /Cari/i });

    await user.type(searchInput, "indonesia");
    await user.click(searchButton);

    expect(
      await screen.findByText(/Before Trump, Indonesia Had Another Trade Headache: China/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Trump Is Winning the Race to the Bottom/i)).toBeInTheDocument();
  });

  // test case for handling empty search results
  it("re-fetches articles when sort option is changed", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/Cari artikel tentang/i);
    const searchButton = screen.getByRole("button", { name: /Cari/i });
    await user.type(searchInput, "testing");
    await user.click(searchButton);

    expect(articleService.searchArticles).toHaveBeenCalledWith("testing", 0, "relevance");

    const sortDropdown = screen.getByRole("combobox");
    await user.click(sortDropdown);

    const newestOption = await screen.findByRole("option", { name: /Terbaru/i });
    await user.click(newestOption);

    await waitFor(() => {
      expect(articleService.searchArticles).toHaveBeenCalledWith("testing", 0, "newest");
    });

    expect(articleService.searchArticles).toHaveBeenCalledTimes(2);
  });

  // test case for handling API errors
  it("displays an error message if the API call fails", async () => {
    vi.spyOn(articleService, "searchArticles").mockRejectedValue(new Error("API Gagal"));
    const user = userEvent.setup();
    render(<HomePage />);

    const searchInput = screen.getByPlaceholderText(/Cari artikel tentang/i);
    const searchButton = screen.getByRole("button", { name: /Cari/i });
    await user.type(searchInput, "fail");
    await user.click(searchButton);

    expect(await screen.findByText(/Oops! Terjadi Kesalahan/i)).toBeInTheDocument();
  });
});
