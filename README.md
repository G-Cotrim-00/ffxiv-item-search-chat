# FFXIV Item Search Chat

A chat-style web app for looking up items from **Final Fantasy XIV**. Type an item ID and the bot replies with the item's name and in-game description, fetched live from the public [XIVAPI](https://v2.xivapi.com/).

## Features

* Chat interface with user and bot message bubbles
* Live lookups against the XIVAPI REST API (`/api/sheet/Item/{id}`)
* "Typing..." indicator while the request is in progress
* Input validation: only numeric item IDs are sent to the API
* Clear error messages for unknown IDs and API failures
* Auto-scroll to the latest message

## Tech stack

* [React 19](https://react.dev/) (hooks: `useState`, `useEffect`, `useRef`)
* [Vite](https://vite.dev/) for development and builds
* ESLint for linting
* Fetch API for HTTP requests

## Getting started

Requirements: [Node.js](https://nodejs.org/) 20 or newer.

```bash
git clone https://github.com/G-Cotrim-00/ffxiv-item-search-chat.git
cd ffxiv-item-search-chat
npm install
npm run dev
```

Then open the local address Vite prints (usually http://localhost:5173).

Other scripts:

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run build`   | Builds the app for production        |
| `npm run preview` | Serves the production build locally  |
| `npm run lint`    | Runs ESLint                          |

## Usage

Type an item ID and press **Enter** or click **Send**. For example:

```
37362
```

The bot replies with the item's name and description. If the ID doesn't exist, or the input isn't a number, it tells you so.

## Project structure

```
src/
├── App.jsx                # Chat logic, API calls and layout
├── components/
│   └── Message.jsx        # A single chat bubble
├── main.jsx               # Entry point
└── index.css / App.css    # Styles
```

## Author

**Guilherme Cotrim Vasconcelos**: [github.com/G-Cotrim-00](https://github.com/G-Cotrim-00)

Item data is provided by [XIVAPI](https://v2.xivapi.com/). FINAL FANTASY XIV is a registered trademark of Square Enix. This is a fan project with no affiliation with Square Enix.
