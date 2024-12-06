This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.




# Getting Started -- README WIP

###  Install Packages
```
npm i
```

###  Update node version from v16.20 to v20.9 in ubuntu or VS Code then restart ubuntu and vs code to see the updated versions
```
nvm install 20.9
nvm alias default 20.9
```

###  Create a .env file with the following
```
DATABASE_URL="postgres://your-external-db-link"
NEXTAUTH_SECRET='<supersecretpass>'
```

###  Run Command to Migrate and Create dev.db
```
npx prisma migrate dev --name init
```

###  Run the development server
```
npm run dev
```

###  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

###  Seed/Unseed Commands
```
# "seed": "node seed/seed-all.js"
npm run seed

# "unseed": "node seed/unseed.js"
npm run unseed

# run this command to be able to reseed after unseeding
# this command will unseed and reset your db for you, so you dont need to run 'npm run unseed'
npx prisma migrate reset
npm run seed


```

### View Database with Seed Data
```
npx prisma studio
```

## Database & Relationships
## ![Database & Relationships](https://i.imgur.com/mX43A8u.png)

## API Routes

## Deploy on Vercel

# For Developers - Setting Up Local & Production Work Environments
- [Prisma Docs](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database)

## PostgreSQL Installation Steps on Ubuntu
###  Open Ubuntu
```
sudo apt update
sudo apt install postgresql
# Hit Y and Enter
```

###  Log in to postgres CLI
```
sudo -u postgres psql

# if you run into an error, restart ubuntu
# if you get permission denied, run this command then do the above command again

service postgresql service postgresql restart
```
### Display Current Databases
```
\l
```

###  Display Users
```
\du
```

###  Create a User
```
CREATE ROLE <username> WITH PASSWORD '<password>';

#Run \du

#New Username should be under 'ROLE NAME' column

#List of roles should be 'Cannot login'

#Empty object for the last column 'Member of'
```

###  Create User Admin Privileges to Create a DB and to Login
```
ALTER ROLE <username> WITH SUPERUSER;
ALTER ROLE <username> WITH CREATEDB;
ALTER ROLE <username> WITH LOGIN;
```

###  Create Database
```
CREATE DATABASE <db-name> WITH OWNER <username>;
# \l to see the new database is created
```

###  Connect Database to Project .env file
```
DATABASE_URL="postgres://<PSQLusername>:<PSQLpassword>@localhost:5432/<postgresDBname>?schema=schema_name"
```

###  Test The Database
```
#Create db
npx prisma migrate dev --name init

#Run app, send feedback, and check console for feedback
npm run dev

#Run prisma studio to check postgresql database in browser
npx prisma studio
```

###  **Important Note** - **ONLY HAVE ONE .env FILE -- There should not be a .env.local**

### Troubleshooting Logging into PSQL
```
service postgresql status #14/main (port 5432) down
pg_lsclusters (Use this to find version number and cluster name for next command)
sudo pg_ctlcluster <ver> <Cluster> start
sudo -u postgres psql
```
