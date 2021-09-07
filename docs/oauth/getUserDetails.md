## OAuth User Details Route `POST /getUserDetails`

#### Example Body

```json
{
	"token": "<The OAuth Token generated OAuth /getToken route",
	"clientId": "<The clientId received while creating the OAuth Client>"
}
```

#### Example Response

Status Code: **200** on successful fetching of User Data from OAuth User Token.
Every other status code means something went wrong.

```json
{
	"message": "Fetched User Details Successfully",
	"user": {
		"displayName": "Devesh Kumar",
		"photoURL": "",
		"email": "devesh@gmail.com",
		"phoneNumber": ""
	}
}
```
