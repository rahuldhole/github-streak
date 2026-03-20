import app from "../../src/index.ts";

export default (request: Request) => {
  // @ts-ignore - Deno is a global in Netlify Edge
  return app.fetch(request, Deno.env.toObject());
};
