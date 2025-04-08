# Teslo Shop

This is a project based on [Next.js](https://nextjs.org) created with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The project uses Prisma as ORM and PostgreSQL as database.

---

## Requirements
Before you begin, make sure you have the following programs installed:

- [Node.js](https://nodejs.org) (version 18 or latest).
- [Docker](https://www.docker.com)

---

## Init config.

1. **Clone this repository on your local computer:**
```bash
git clone https://github.com/LuisAlexis73/e-commerce-nextjs.git
cd teslo-shop
```

2. **Configure environments variables:**
Copy the `.env.template` file and rename it to `.env` with your environment variables.

3. **Install dependencies:**
```bash
npm install
```

4. Execute docker:
```bash
docker-compose up -d
```

5. **Generate Prisma client and run migrations:**
run `npx prisma generate`and `npx prisma migrate dev --name init`

**6. Start server:**
```bash
npm run dev
```

---

### Additional notes

If you make changes to the Prisma scheme (prisma/schema.prisma), remember to execute:
```bash
npx prisma generate
npx prisma migrate dev --name <name_of_migration>
```

#### Project structure
- 📁src: Application source code.
- 📁prisma: Contain the Prisma schema and related files like migrations folder.
- 📁public: Contains statics resources.
- .env: Configuration file of environments variables.
- docker-compose.yml: Configuration to raise services with Docker.