# ToDo With IndexedDB

Simple ToDo application built using React for a hiring project.

## Features

- Todo list
  - Add Todo
  - Delete Todo
  - Complete Todo
- List is persisted between page refreshes using IndexedDB as a database ([Dexie.js](https://dexie.org/) as the abstraction)

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
  - Good performance ("Dexie has near-native performance")
  - Solid test coverage
  - Simple API
  - Small package size (~22kb gzipped)
  - Solid usage (~65k weekly downloads)
  - Minor, but TypeScript support out of the box
