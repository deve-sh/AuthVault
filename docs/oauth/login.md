## OAuth User Login Route `GET /login`

#### Example Query Params

```json
?clientId=<Your Client ID Here>
```

#### Example Response

Renders a login form for the user to login with their credentials, once logged in, redirects to the OAuth Code Route. Check with Content-Type being `html`.

Anything else means an invalid request.