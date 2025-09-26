import { render, screen } from "@testing-library/react";
import Page from "./page";

jest.mock("@/utils/get-session");

// Somente para teste (do teste), não está funcionando sem esse return na page
// Mas Nextjs não recomenda testes unitários em Server Components
// Jest e Vitest não tem suporte

describe("page", () => {
  it("render a heading", async () => {
    render(await Page({ searchParams: Promise.resolve({ pular: undefined }) }));

    const heading = screen.getByText("Bem vindo ao catalogar");

    expect(heading).toBeInTheDocument();
  });
});
