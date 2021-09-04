## OAuth Clients List Fetcher Route `GET /list`

#### Example Body

```json

```

#### Example Headers

```json
{
	"authorization": "Token obtained from /auth/token"
}
```

#### Example Response

Status Code: **200** on successful listing of OAuth Clients.
Every other status code means something went wrong.

```json
{
	"message": "Successfully fetched OAuth Clients",
    "clients": [<OAuth Client Instance>],
}
```
