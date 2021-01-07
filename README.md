# NewlineNgUniversal

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
