import { ofetch } from "ofetch";

export const apiFetch = ofetch.create({
  baseURL: `${process.env.API_URL}/api`,
  async onResponseError({ request, response }) {
    const [, path] = request.toString().split("/api");

    // Log error
    console.error(
      "[Fetch Response Error]",
      path,
      response.status,
      response._data,
    );
  },
});
