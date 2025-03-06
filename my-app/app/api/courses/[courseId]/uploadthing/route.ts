import { createRouteHandler } from "uploadthing/server";

import { ourFileRouter } from "./uploadthing";

// Export routes for Next App Router
const handlers = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});
export { handlers as GET, handlers as POST };
