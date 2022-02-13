import { createPageRenderer } from "vite-plugin-ssr";
import { telefunc } from "telefunc";
// `importBuild.js` enables Vercel to bundle our serverless functions, see https://vite-plugin-ssr.com/vercel and https://vite-plugin-ssr.com/importBuild.js
import "../dist/server/importBuild.js";

const renderPage = createPageRenderer({ isProduction: true });

export default async function handler(req, res) {
  const { url } = req;

  console.log("Request to url:", url);

  if (url === "_telefunc") {
    const httpResponse = await telefunc({
      url: req.originalUrl,
      method: req.method,
      body: req.body,
    });
    const { body, statusCode, contentType } = httpResponse;
    res.statusCode = statusCode;
    res.setHeader("content-type", contentType);
    res.end(body);
    return;
  }

  const pageContextInit = { url };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;

  if (!httpResponse) {
    res.statusCode = 200;
    res.end();
  } else {
    const { body, statusCode, contentType } = httpResponse;

    res.statusCode = statusCode;
    res.setHeader("content-type", contentType);
    res.end(body);
  }
}
