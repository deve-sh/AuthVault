## OAuth Single Client Deleter Route `/delete/:clientId`

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

Status Code: **200** on successful deletion of OAuth Client.
Every other status code means something went wrong.

```json
{
	"message": "Successfully removed OAuth Client",
	"client": <OAuth Client Instance>
}
```
