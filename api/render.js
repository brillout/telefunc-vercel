import { createPageRenderer } from 'vite-plugin-ssr';
import '../dist/server/importBuild.js';
import { telefunc } from 'telefunc';

const renderPage = createPageRenderer({ isProduction: true });

export default async (req, res) => {
  const pageContextInit = { url: req.url };

  if (pageContextInit.url.startsWith('/_telefunc')) {
    const { contentType, body, statusCode } = await telefunc({
      url: req.url,
      body: req.body,
      method: req.method,
    });

    res.setHeader('content-type', contentType);
    return res.status(statusCode).send(body);
  }

  let contentType = 'text/html';

  const pageContext = await renderPage(pageContextInit);

  const { httpResponse } = pageContext;

  if (!httpResponse) {
    return res.status(200).send('not found: '+req.url);
  }

  const { body, statusCode } = httpResponse;
  res.setHeader('content-type', contentType);
  res.status(statusCode).send(body);
};
