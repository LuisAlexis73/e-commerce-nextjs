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

4. **Execute docker:**
```bash
docker-compose up -d
```

5. **Run Prisma migrations:**
run `npx prisma migrate dev`

6. **Run seed:**
```bash
npm run seed
```

7. **Start server:**
```bash
npm run dev
```

8. **Clean Local Storage.**

---

### Additional notes

If you make changes to the Prisma scheme (prisma/schema.prisma), remember to execute:
```bash
npx prisma generate
```
```bash
npx prisma migrate dev --name <name_of_migration>
```

To create the `AUTH_SECRET` environment variable, run the following command in the terminal.
```bash
openssl rand -base64 32
```

#### Project structure
- 📁src: Application source code.
- 📁prisma: Contain the Prisma schema and related files like migrations folder.
- 📁public: Contains statics resources.
- .env: Configuration file of environments variables.
- docker-compose.yml: Configuration to raise services with Docker.

| Flow and Core |
| ------------- |
| ![Flow-Core](https://github.com/user-attachments/assets/00bf94d9-6608-4a72-9a1f-98530341a812) |
|  App Structure |
| ![App-Structure](https://github.com/user-attachments/assets/9722bd9a-3728-415a-b2c1-b6716c118cdf)

### Stack
<table><thead><tr><th>Category</th><th>Technology</th><th>Version</th><th>Purpose</th></tr></thead><tbody><tr><td>Framework</td><td>Next.js</td><td>15.2.3</td><td>Full-stack React framework</td></tr><tr><td>Runtime</td><td>React</td><td>19.0.0</td><td>UI component library</td></tr><tr><td>Language</td><td>TypeScript</td><td>5.x</td><td>Type-safe JavaScript</td></tr><tr><td>Database</td><td>PostgreSQL</td><td>-</td><td>Primary data store</td></tr><tr><td>ORM</td><td>Prisma</td><td>6.6.0</td><td>Database access and migrations</td></tr><tr><td>Authentication</td><td>NextAuth.js</td><td>5.0.0-beta.25</td><td>Session management and auth</td></tr><tr><td>State Management</td><td>Zustand</td><td>5.0.3</td><td>Client-side state</td></tr><tr><td>Styling</td><td>Tailwind CSS</td><td>4.x</td><td>Utility-first CSS</td></tr><tr><td>Payments</td><td>PayPal SDK</td><td>8.8.3</td><td>Payment processing</td></tr><tr><td>Images</td><td>Cloudinary</td><td>2.7.0</td><td>Image storage and CDN</td></tr><tr><td>Validation</td><td>Zod</td><td>3.24.2</td><td>Schema validation</td></tr></tbody></table>


### DeepWiki
[Nextjs-TesloShop](https://deepwiki.com/LuisAlexis73/e-commerce-nextjs/1-overview#overview)
