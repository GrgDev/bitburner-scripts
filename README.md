Below is the original README from the viteburner-template I used to initialize this repo with a great setup. Please give Tanimodori some love because this is awesome. Therefore I am keeping their README here at the top level.

If you want to see the main README and other docs for this specific project, please see my [README](./docs/README.md) in the [docs](./docs) folder. I am also not bothering to change the LICENSE file as I agree with the MIT license.

# Viteburner-template

This is a template for a viteburner project. It is a simple example of how to use Viteburner.

## How to use

Prerequisites: [Node.js](https://nodejs.org/en/download/)

```bash
git clone https://github.com/Tanimodori/viteburner-template.git
cd viteburner-template
npm i
npm run dev
```

In bitburner, select "Options > Remote API", enter the port of viteburner displays (default: `12525`) and click "Connect".

## API

See [viteburner](https://github.com/Tanimodori/viteburner/blob/main/README.md).

## How to update my clone to the latest version of the template

Usually you only need to upgrade viteburner using npm (or any other package manager you use).

```bash
npm i -D viteburner@latest
```

Or if you want to update all configs:

```bash
# add "upstream" to git remote in case you've overwritten the "origin"
git remote add upstream https://github.com/Tanimodori/viteburner-template.git
# fetch the updates from "upstream"
git fetch upstream
# perform the merge
git merge upstream/main
# NOTE: resolve git conflicts manually now.
# install packages if any gets updated.
npm i
```

## License

[MIT License](LICENSE) © 2022-present Tanimodori
