import type { Context } from "https://edge.netlify.com";

export default async function handler(request: Request, context: Context) {
  const username = Deno.env.get("BASIC_AUTH_USER");
  const password = Deno.env.get("BASIC_AUTH_PASS");

  if (!username || !password) {
    return context.next();
  }

  const auth = request.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === username && pass === password) {
        return context.next();
      }
    }
  }

  return new Response("401 Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Restricted", charset="UTF-8"',
    },
  });
}

export const config = { path: "/*" };
