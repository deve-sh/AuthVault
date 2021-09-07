## OAuth User Code Route `POST /code`

#### Example Query Params

```json
?clientId=<Your Client ID Here>
```

#### Example Body

```
URLEncoded
email=devesh@gmail.com
password=cryptographicstringwith1234#$%
```


#### Example Response

Redirects to the `redirectURL` specified while creating the OAuth Client with the `clientId`, with `code` query parameter that can be used to get the user's token using clientId and clientSecret.