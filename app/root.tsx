import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";
import scaffold from "./css/scaffold.css"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: scaffold },
]

// Start mock on dev mode.
if (process.env.NODE_ENV === 'development') {
  if (typeof window === "undefined") {
    const { server } = require("./mocks/server");
    server.listen();
  } else {
    const { worker } = require("./mocks/browser");
    worker.start();
  }
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "A Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
