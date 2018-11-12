# Yamble Bet Factory

This is the repository for the Yamble Bet Factory.

## Getting Started

Yamble Bet Factory is a React app, you need the standard development tools:

- a working version of Node.js, ideally versioned (with `nvm` or equivalent)
- a browser (ideally Chrome)

### Retrieve Code

To clone the repository with its submodule (in src/Commons):

- setup a ssh key (https://confluence.atlassian.com/bitbucket/set-up-ssh-for-git-728138079.html)
- clone the repository:

```sh
$ git clone --recursive git@bitbucket.org:yambl/yamble-react-firebase.git
```

### Installing

You can use yarn to install all dependencies:

```sh
$ yarn
```

### Usage

To start developing, start the packager using `yarn`:

```sh
$ yarn start
```

# Additional Tooling

Code will be formatted when commiting.
If this behaviour is unintended, you can remove the `"precommit"` script declared in `package.json`.

## License

©2018 Yamble.
