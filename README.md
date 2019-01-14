# Asset Register Frontend

## Running the application

### Serving

```bash
make serve
```

### Running the tests

```bash
make test
```

### With google maps API

If you wish to run the application with the `/maps` route, you need a valid google maps API key. 

To run it with your api key, use the following command:

```bash
env MAP_API_KEY=<apiKey> make serve
```

docker-compose will then pull your api key through into the application to use with the Google Maps API

## Architecture Decision Records

In order to provide context around some of our architecture decisions, we have documented them inside [./ArchitectureDecisionRecords](ArchitectureDecisionRecords).
