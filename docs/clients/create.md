## OAuth Client Creator Route `/create`

#### Example Body

```json
{
	"client": {
		"name": "Sample OAuth Client Name",
		"description": "Sample OAuth Client Description",
		"homepage": "https://sampleapp.com",
		"redirectURL": "https://sampleapp.com/oauthsuccess"
	}
}
```

#### Example Response

Status Code: **201** on successful creation of OAuth Client.
Every other status code means something went wrong.

```json
{
	"message": "Successfully created OAuth Client",
	"client": {
		"clientId": "fa163647-dfc2-47f0-b0c5-a5dab019f9e6",
		"clientSecret": "fa163647-dfc2-47f0-b0c5-a5dab019f9e6fa163647-dfc2-47f0-b0c5-a5dab019f9e6",
		"homepage": "https://sampleapp.com",
		"redirectURL": "https://sampleapp.com/oauthsuccess"
	}
}
```
