import { createPageRenderer } from "vite-plugin-ssr";
import "../dist/server/importBuild.js";

const renderPage = createPageRenderer({ isProduction: true });

export default async (req, res) => {
  const pageContextInit = { url: req.url };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  if (!httpResponse) {
    return res.status(500).send("Internal Server Error");
  }
  res.setHeader("content-type", httpResponse.contentType);
  res.status(httpResponse.statusCode).send(httpResponse.body);
};
