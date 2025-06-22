# Enokh Universal Theme 2

## Documentation

1. [About Block Themes](docs/01%20-%20About%20Block%20Themes.md)
2. [Custom Blocks](docs/02%20-%20Blocks.md)

## Installation

### Requirements

- PHP >= 8.0
- WordPress >= 6.3

### How to install

Install `inpsyde/enokh-universal-theme` via [Composer](https://getcomposer.org/).

### Assets compilation

Install [`inpsyde/composer-assets-compiler`](https://github.com/inpsyde/composer-asset-compiler) as a dependency of the main repository of your project so that assets are compiled automatically every time that `composer compile-assets` runs.

## Development

Here are the quick steps necessary to get you started with development:

1. Run `composer install`
2. Authenticate with GitHub NPM registry using `npm login --scope=@inpsyde-global-service-provider --registry=https://npm.pkg.github.com`
3. Run `yarn` and `yarn build`
4. Symlink this directory into the themes folder of a WordPress installation
5. Activate theme

### Add symlinks fix as a MU plugin

WP Core previously assumed all custom blocks using block.json would be developed in plugins, so assets paths were always pointing to the plugins base URL.

They later changed it so that themes can also do it, but forgot to call realpath() when building the paths for comparison

On WP >=6.4 the get_block_asset_url() function started relying on a static $template_paths_norm variable with calculated paths for assets, and these were calculated at an arbitrary moment, so we need these paths to be fixed on a MU plugin before anything else kicks in and adds the wrong path to the static variable. 

See: https://core.trac.wordpress.org/ticket/56859

```php
// Parent theme
add_filter('template_directory', fn(string $dir): string => realpath($dir));

// Child themes
add_filter('stylesheet_directory', fn(string $dir): string => realpath($dir));
```

### Commands for JS & CSS compilation

- Run `yarn build` to compile blocks and any other JS and CSS on demand
- Run `yarn start` to compile blocks and any other JS and CSS when you change files being watched

### Commands for PHP Quality Assurance

- Run `composer qa` to find Coding Standards and Static Analysis (Psalm) issues with your PHP.
- Run `composer cs` to find any Coding Standards issues with your PHP.
- Run `composer cs:fix` to attempt to automatically fix existing PHP issues.
- Run `composer psalm` to find any Static Analysis (Psalm) issues with your PHP

### Commands for JS Quality Assurance

- Run `yarn lint:js` to find any issues with your JS.
- Run `yarn lint:js --fix` to attempt to automatically fix existing JS issues.

### Commands for CSS Quality Assurance

- Run `yarn lint:css` to find any issues with your CSS.
- Run `yarn lint:css --fix` to attempt to automatically fix existing CSS issues.

### Commands for Markdown Quality Assurance

- Run `yarn lint:md` to find any issues with your Markdown.
- Run `yarn lint:md --fix` to attempt to automatically fix existing Markdown issues.

## Copyright and License

This repository is a free software, and is released under the terms of the GNU General Public License version 2 or (at your option) any later version. See [LICENSE](./LICENSE) for complete license.
