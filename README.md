
## Client Setup

### for using tanstack router and tanstack query devtools
uncomment these lines in client/src/routes/__root.tsx

```javascript
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

  {/* <TanStackRouterDevtools />
       <ReactQueryDevtools /> */}
```

### starting client server

```bash
cd client
npm install
npm run dev
```

## Server Setup

```bash
cd server
```

### create a .env file in server folder.

i'm using drizzle orm with neon drivers, you can either use neon postgress or you will need to install and setup datbase drivers of your preference. refer drizzle documentation "https://orm.drizzle.team/docs/get-started-postgresql"

i used nodemailer and g-mail smtp for email services
 
```env
DRIZZLE_DATABASE_URL="neon postgress url"

NODE_ENV=production

JWT_SECRET=
JWT_EXPIRES_TIME=60
COOKIE_EXPIRES_TIME=60

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
```

### for generating and applying migrations use

```bash
npm run db:generate
npm run db:migrate
```

### starting server in development

```bash
npm install
npm run dev
```

