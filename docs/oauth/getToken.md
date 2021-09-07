## OAuth User Token Route `POST /getToken`

#### Example Body

```json
{
	"code": "<The code received from the OAuth /code route",
	"clientId": "<The clientId received while creating the OAuth Client>",
	"clientSecret": "<The clientSecret received while creating the OAuth Client>"
}
```

#### Example Response

Status Code: **200** on successful generation of OAuth Token for the user.
Every other status code means something went wrong.

```json
{
	"message": "OAuth Token Generated",
	"token": "eyBANHdsadhdasd..."
}
```
