# chattr
Open-source community chat made simple.

## Why?

chattr was created to make an open-source communication platform for community chat. As someone who has grown up in the open-source community, it makes me cringe everytime I see a project Discord server. This serves as an alternative in the true style of the community.

## Running

To spin up the development server, you will need to create a .env on the root of the server directory with the following items:

```dosini
NODE_ENV = dev # change to prod for production
PORT = 5000 # your desired port number
MONGO_URI = mongodb+srv:// # your mongo uri
JWT_SECRET = secret_key # your jwt secret key
```

Then you can run the following to spin up the development server:

```bash
npm run dev
```

## License

This project is licensed under the GPL v3 license available in [LICENSE](LICENSE).

## Authors

<a href="https://matthewgallant.me"><img src="https://avatars.githubusercontent.com/u/12502248?v=4?s=100" width="100px;" alt="Matthew Gallant"/><br /><sub><b>Matthew Gallant</b></a>

## Todo
- Add a register page
