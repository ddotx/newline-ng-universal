# NewlineNgUniversal

### On HEROKU

#### Without Universal (ng --prod)
https://newline-ng-node-static-ddotx.herokuapp.com
#### Universal SSR
https://newline-ng-universal-ddotx.herokuapp.com

| Testing | Without Universal | Universal SSR | Improve
|---|---|---|---
| TTFB | 34 ms | 392 ms | :bangbang:
| FCP | 1.6 s | 1 s | :white_check_mark:
| Time Interactive | 2.1 s | 5.1 s | :bangbang:


### On Lightsail
http://13.229.238.17


---


## User authentication

```bash
curl -i http://localhost/api/isLoggedIn

curl -i --header "Content-Type: application/json" \
--request POST \
--data '{"email": "name@email.com","password": "abc123"}' \
--cookie-jar cookie \
http://localhost/api/login

curl -i --cookie cookie \
http://localhost/api/isLoggedIn
```

## Adding product to list of favorites

```bash
curl -i --header "Content-Type: application/json" \
--request POST \
--data '{"email": "name@email.com","password": "abc123"}' \
--cookie-jar cookie \
http://localhost/api/login

curl -i \
--request POST \
--cookie cookie \
http://localhost/api/favorites/5ed3bbefaf1c4c0e81d9b406
```
