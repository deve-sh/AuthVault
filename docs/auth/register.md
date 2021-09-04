## User Registration Route `POST /register`

#### Example Body

```json
{
	"user": {
		"email": "devesh@gmail.com",
		"password": "cryptographicstringwith1234#$%",
		"displayName": "Devesh",
		"phoneNumber": "+911234567890", // Optional
		"photoURL": "https://photourlhere.com/image.png" // Optional
	}
}
```

#### Example Response

Status Code: **201** on successful creation of user.
Every other status code means something went wrong.

```json
{
    "message": "Successfully created user",
    "id": "OXNO2N68O6ZCMQ7iV7nnwCO15Wh1",
    "user": {
        "displayName": "Devesh",
        "uid": "OXNO2N68O6ZCMQ7iV7nnwCO15Wh1",
        "email": "devesh@gmail.com",
		"phoneNumber": "+911234567890",
		"photoURL": "https://photourlhere.com/image.png"
    },
}
```
