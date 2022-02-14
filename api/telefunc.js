import { telefunc } from "telefunc";
import "../dist/server/importBuild.js";

export default async (req, res) => {
  const httpResponse = await telefunc({
    url: req.url,
    body: req.body,
    method: req.method,
  });
  res.setHeader("content-type", httpResponse.contentType);
  res.status(httpResponse.statusCode).send(httpResponse.body);
};
