# Edenrobe Store

Welcome to the **Edenrobe Store** project! This repository contains the source code for the application. Follow the steps below to set up the project on your local machine.

## Prerequisites
Before you begin, ensure you have the following installed:
- [Homebrew](https://brew.sh/) (For macOS users)
- [pnpm](https://pnpm.io/)
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Installation
Follow these steps to set up the project:

### 1. Install Required Dependencies
```sh
brew install pnpm node git
```

### 2. Clone the Repository
```sh
git clone https://github.com/AqibMughal1/Edenrobe-store.git
cd edenrobe-store
```

### 3. Install Project Dependencies
```sh
pnpm i
```

### 4. Set Up Prisma
Install Prisma CLI and Prisma Client:
```sh
pnpm add -D prisma        # Install Prisma CLI as a dev dependency
pnpm add @prisma/client   # Install Prisma Client
```

Generate Prisma Client:
```sh
pnpm prisma generate
```

Push the schema to the database:
```sh
pnpm prisma db push
```

### 5. Start the Development Server
```sh
pnpm run dev
```

## Contributing
Feel free to submit issues or pull requests to improve the project.

## License
This project is licensed under the MIT License.

---

Happy coding! 🚀
