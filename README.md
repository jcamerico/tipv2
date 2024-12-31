# TIP v2

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/jcamerico/tipv2/frontend.yml?branch=main) [![codecov](https://codecov.io/gh/jcamerico/tipv2/graph/badge.svg?token=FAK02FKYS2)](https://codecov.io/gh/jcamerico/tipv2)

## Contributing
A dev container is configured with everything needed to run the application locally. You will have in the container:
* The dev container workspace with the code, Angular and Chrome (for unit tests)
* A local instance of Keycloak (and a postgres database for its data) - it can be accessed on http://localhost:8080. In case the realm "registration" was not correctly imported at Keycloak startup, you can manually import it using the file registration.json.

## Launching the application
Once you're in the tip-registration folder, run `ng serve` to run the application locally.

