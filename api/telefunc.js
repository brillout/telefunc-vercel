import { telefunc, telefuncConfig } from "telefunc";
import "../dist/server/importBuild.js";

telefuncConfig.debug = true

export default async (req, res) => {
  console.log('request :'+req.url)
  console.log('request body :'+req.body)
  const httpResponse = await telefunc({
    url: req.url,
    body: req.body,
    method: req.method,
  });
  res.setHeader("content-type", httpResponse.contentType);
  res.status(httpResponse.statusCode).send(httpResponse.body);
};
