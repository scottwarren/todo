# ToDo With IndexedDB

Simple ToDo application built using React for a hiring project.

## Features

- (TODO) Syncing in real time with all connected clients (Using WebSockets)
- (TODO) Using IndexedDB as a database
- Ability to add/delete/complete/update todos

## Setup

- Clone repo: `git clone git@github.com:scottwarren/todo.git`
- Install dependencies: `yarn install`
- Run the local server: `yarn start`
- Visit [http://localhost:3000]()

### Notes

- Built and tested with Node v14 -- use `nvm use` to set your version of Node to the same version (assuming you have NVM installed)
- Bootstrapped with Create React App with TypeScript
- I used TailwindCSS to quickly build something that looks polished, and modified the default CRA installation according to the [TailwindCSS installation instructions](https://tailwindcss.com/docs/guides/create-react-app)
- Chose [Dexie.js](https://dexie.org/) for:
  - Solid documentation with examples
  - Solid usage (~65k weekly downloads)
  - Solid test coverage
  - Simple API
  - Small package size (~22kb gzipped)
  - Good performance ("Dexie has near-native performance")
  - Minor, but TypeScript support out of the box is a plus
