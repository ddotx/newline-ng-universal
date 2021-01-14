# NewlineNgUniversal

## Browser Flow
| Step | Browser Flow | NG | SSR |
|---|---|---|---|
|1| Establish a connection with server and query the data | - | - |
|2| Retrieve the data | Time to First Byte | TTFB |
|3| Render HTML and apply CSS | - | FCP |
|4| Bootstrap JS and Angular -> Render views | First Contentful Print | Other 1 |
|5| Bind functions to HTML elements, execute other script | Other | Other 2 |

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
| SEO | ? | 


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

## Improved SSR

To learn
- [ ] What are potential security branches that you neeed to avoid when building Angular Universal app
- [ ] How to pass server secrets into Angular app
- [ ] How to pass function references to Angular app
- [ ] How to use Angular's DI mechanism to provide different service implementations for different Angular execution environments

