## User Token Fetcher Route `/token`

#### Example Body

```json
{
	"email": "devesh@gmail.com",
	"password": "cryptographicstringwith1234#$%"
}
```

#### Example Response

Status Code: **200** on successful signing in and token generation of user.
Every other status code means something went wrong.

```json
{
	"message": "Successfully fetched token",
	"token": "eyJsda..... full JWT here",
}
```
