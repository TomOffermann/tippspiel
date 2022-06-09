# tippspiel

`Soccer Betting-Application` on [tippspiel.kxmii.de](https://tippspiel.kxmii.de) for `European- and World-Championchips`. <br/>
All data is based on [football-data.org](https://football-data.org), but the origin can be changed.

## Local Setup:

```shell
> cd next-app
> npm install
```

### .env Configuration:

| Variable | Purpose |
| ----------- | ----------- |
| `DATABASE_URL:` | Database URL-String for Prisma (Getting Started: [prisma.io](https://www.prisma.io/docs/getting-started/setup-prisma)) |
| `JWT_SECRET:` | Secret for en- and decoding JSON-Web-Tokens for Authenication |
| `COOKIE_MAX_AGE:` | Time an Auth-Token-Cookie is valid in Client-Browser (http-only Cookie attached on all HTTP-Requests) |
| `API_KEY:` | Api secret for the Data-Provider of your choice. (e.g.: [football-data.org](https://football-data.org)) |

### Example:
```
DATABASE_URL = "postgresql:..." 
JWT_SECRET = "1234..."
COOKIE_MAX_AGE = "18000000"
API_KEY = "secret"
```

`For Development:`
```shell
> npm run dev
```
`For Production:`
```shell
> npm run build
> npm run start
```

### Setup Data:

The incoming data from `process.env.API_URL` has to match the following Schemas: (For [football-data.org](https://football-data.org) on API v4 this should work out of the box.)

`process.env.API_URL/matches`
```ts
interface Matches {
  countries: Countrie[];
  ... (not complete)
}
```

### Finished:

You should now be able to view the Application on [http://localhost:3000](http://localhost:3000):

![login-1](https://user-images.githubusercontent.com/71230696/172833061-926f8295-a1ce-44ba-929a-7510cd6f05c6.png)

![localhost-1](https://user-images.githubusercontent.com/71230696/172833094-f4136053-efc2-4738-b274-10cbd6f075f4.png)

![localhost1-1](https://user-images.githubusercontent.com/71230696/172833067-0254ece3-66a2-436a-aef5-69b7e9d0aa63.png)


