# URL Shortner

A URL Shortner service that takes in a valid URL and returns a shortened URL, redirecting the user to the previously provided URL.

Also, keeping a track of total visits/clicks on the URL.

### Routes

-- POST /URL - Generates a new short URL and returns the shortened URL in the format example.com/random-id

-- GET /:id - Redirects the user to the original URL.

-- GET /URL/analytics/:id - returns the clicks for the provided short id.
