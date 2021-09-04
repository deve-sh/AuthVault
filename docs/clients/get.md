## OAuth Single Client Fetcher Route `/get/:clientId`

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

Status Code: **200** on successful creation of OAuth Client.
Every other status code means something went wrong.

```json
{
	"message": "Successfully fetched OAuth Client",
	"client": <OAuth Client Instance>
}
```