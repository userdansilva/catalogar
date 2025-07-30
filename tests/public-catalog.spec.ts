import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
const CATALOG_SLUG = "@catalogar";

/**
 * Esse teste é relacionado a aspectos da paginação e suas variações de estado
 *
 * Devo garantir que o usuário consiga acessas as páginas e navegar entre elas
 */
test.describe("Paginação", () => {
  test("Cada link de paginação deve conter a URL correspondente à sua página", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/${CATALOG_SLUG}`);

    const pageLinks = page.getByTestId("page-link");
    const allPageLinks = await pageLinks.all();

    for (const pageLink of allPageLinks) {
      const content = await pageLink.innerText();

      await expect(pageLink).toHaveAttribute(
        "href",
        `/${CATALOG_SLUG}?p=${content}`,
      );
    }
  });

  test("O link de próxima página deve conter a URL correspondente à próxima página", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/${CATALOG_SLUG}`);

    await expect(page.getByTestId("page-link-next")).toHaveAttribute(
      "href",
      `/${CATALOG_SLUG}?p=2`,
    );
  });

  test("O link da página atual deve conter a URL correspondente à página atual", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/${CATALOG_SLUG}?p=2`);

    await expect(page.getByTestId("page-link-current")).toHaveAttribute(
      "href",
      `/${CATALOG_SLUG}?p=2`,
    );
  });

  test("O link de página anterior deve conter a URL correspondente à página anterior", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/${CATALOG_SLUG}?p=2`);

    await expect(page.getByTestId("page-link-prev")).toHaveAttribute(
      "href",
      `/${CATALOG_SLUG}`,
    );
  });
});

/**
 * Esse teste é relacionado ao feedback que o usuário recebe ao realiza algo inválido
 * como a busca de uma página inexistente, busca, categoria e etc
 *
 * Devo garantir que o usuário receba um feedback compatível com a invalidade, e que
 * consiga retornar ao válido
 */
test.describe("Fallback", () => {
  test("Ao acessar uma página inexistente deve conter feedback e link com URL para limpar paginação", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/${CATALOG_SLUG}?p=999`);

    expect(
      page.getByText("Nenhum item foi encontrado na página 999"),
    ).toBeDefined();

    await expect(
      page.getByRole("link", { name: "Limpar busca" }),
    ).toHaveAttribute("href", `/${CATALOG_SLUG}`);
  });

  test("Ao realizar uma busca inválida, deve conter feedback e link com URL para limpar apenas busca", async ({
    page,
  }) => {
    await page.goto(
      `${BASE_URL}/${CATALOG_SLUG}?produto=bone&categoria=bebida&busca=dfasdfasdfads`,
    );

    expect(
      page.getByText("Nenhum item foi encontrado para a busca dfasdfasdfads"),
    ).toBeDefined();

    await expect(
      page.getByRole("link", { name: "Limpar busca" }),
    ).toHaveAttribute("href", `/${CATALOG_SLUG}?produto=bone&categoria=bebida`);
  });

  test("Ao realizar uma busca e página inválida, deve conter feedback e link com URL para limpar apenas busca e paginação", async ({
    page,
  }) => {
    await page.goto(
      `${BASE_URL}/${CATALOG_SLUG}?produto=bone&categoria=bebida&busca=dfasdfasdfads&p=999`,
    );

    expect(
      page.getByText(
        "Nenhum item foi encontrado para a busca dfasdfasdfads na página 999",
      ),
    ).toBeDefined();

    await expect(
      page.getByRole("link", { name: "Limpar busca" }),
    ).toHaveAttribute("href", `/${CATALOG_SLUG}?produto=bone&categoria=bebida`);
  });

  // test("Devo conseguir limpar categoria, caso acessado uma categoria inexistente, removida ou desativada", async ({
  //   page,
  // }) => {
  //   await page.goto(`${BASE_URL}/${CATALOG_SLUG}?categoria=inexistente`);

  //   expect(
  //     page.getByText(
  //       "A categoria que está buscando não foi encontrada! Pode ter sido removida ou temporariamente desativada",
  //     ),
  //   ).toBeDefined();
  // });
});
