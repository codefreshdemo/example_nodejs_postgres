# PostgreSQL/NodeJS Integration tests example

This is an example NodeJs application that uses PostgreSQL as a backend database.
It is compiled using Codefresh.

## Running the integration tests locally

To compile and package using Docker compose

```bash
docker-compose up
```

This command will also execute the tests automatically.

## To use this project in Codefresh

There is also a [codefresh.yml](codefresh.yml) for easy usage with the [Codefresh](codefresh.io) CI/CD platform.

More details can be found in [Codefresh documentation](https://codefresh.io/docs/docs/yaml-examples/examples/integration-tests-with-postgres/)

