import { serve } from "https://deno.land/std@0.198.0/http/server.ts";
import React from "https://esm.sh/react@18.2.0";
import { renderToPipeableStream } from "https://esm.sh/react-dom@18.2.0/server";

const port = 8080;

const handler = (request: Request): Response => {
  const app = React.createElement("h1", {}, "Hello Deno!");
  const stream = renderToPipeableStream(app , {
        {
            bootstrapScripts: ['./client.ts'],
            onShellReady: () => {
                res.statusCode = didError ? 500 : 200;
                res.setHeader('Content-type', 'text/html');
                stream.pipe(res);
            },
            onError: (error) => {
                didError = true;
                console.log(error);
            } 
        }
  });

  return new Response(body, { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });
