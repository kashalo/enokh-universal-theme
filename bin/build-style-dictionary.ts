// Third-party dependencies
const StyleDictionary = require('style-dictionary');
const {
    createPropertyFormatter,
    fileHeader,
    formattedVariables
} = StyleDictionary.formatHelpers;

// Implementation dependencies
const TRANSFORM_GROUP_CUSTOM_PROPERTIES = 'css/enokh-custom-properties-transform-group';
const TRANSFORM_NAME_LONGER_KEBAB = 'name/enokh-longer-kebab-transform';
const TRANSFORM_VALUE_CSS_CUSTOM_PROPERTIES = 'name/enokh-css-custom-properties-transform';
const FORMAT_CSS_CUSTOM_PROPERTIES = 'format-enokh-css-custom-properties';

/**
 * Use double dashes to separate token path parts
 *
 * Example: --enokh--color--white
 */
StyleDictionary.registerTransform({
    name: TRANSFORM_NAME_LONGER_KEBAB,
    type: 'name',
    transformer: (token) => token.path.join('--')
})

/**
 * Allow overriding token by custom properties defined by theme.json
 *
 * Example: var(--wp--preset--color--white, var(--enokh--color--white));
 */
StyleDictionary.registerTransform({
    name: TRANSFORM_VALUE_CSS_CUSTOM_PROPERTIES,
    type: 'value',
    transformer: (token, platform) => {

        // Allow color overriding
        if (token.path[0] === 'enokh' && token.path[1] === 'color') {
            const partialPath = [...token.path.filter((value, index) => index !== 0)];
            return `var(--wp--preset--${partialPath.join('--')}, ${token.value})`;
        }

        return token.value;
    }
})

/**
 * Register transform group for CSS custom properties
 */
StyleDictionary.registerTransformGroup({
    name: TRANSFORM_GROUP_CUSTOM_PROPERTIES,
    transforms: [TRANSFORM_NAME_LONGER_KEBAB]
})

const createCustomPropertiesFormatter = function createPropertyFormatter(dictionary) {

    let indentation = '  ';
    let prefix = '--';
    let suffix = ';';
    let separator =  ':';
    const allowedCategoryOverrides = [
        'color'
    ];

    return function(token) {
        let to_ret_prop = `${indentation}${prefix}${token.name}${separator} `;
        let value = token.value;

        if (dictionary.usesReference(token.original.value)) {
            const refs = dictionary.getReferences(token.original.value);
            const originalIsObject = typeof token.original.value === 'object' && token.original.value !== null;

            if (!originalIsObject) {
                value = token.original.value;
            }

            refs.forEach(ref => {
                if (Object.prototype.hasOwnProperty.call(ref, 'value') && Object.prototype.hasOwnProperty.call(ref, 'name')) {
                    value = value.replace(originalIsObject
                        ? ref.value
                        : new RegExp(`{${ref.path.join('.')}(.value)?}`, 'g'), () => `var(${prefix}${ref.name})`);
                }
            });
        }

        /**
         * Allow overrides from theme.json
         *
         * Example: var(--wp--preset--color--white, var(--enokh--color--white));
         */
        if (token.path[0] === 'enokh' && allowedCategoryOverrides.indexOf(token.path[1]) >= 0) {
            const partialPath = [...token.path.filter((value, index) => index !== 0)];
            value = `var(--wp--preset--${partialPath.join('--')}, ${token.value})`
        }

        to_ret_prop += value + suffix;

        return to_ret_prop;
    }
}

// Register custom formatting for CSS properties
StyleDictionary.registerFormat({
    name: FORMAT_CSS_CUSTOM_PROPERTIES,
    formatter: ({dictionary, options, file}) => {
        return fileHeader({file}) +
            `${options.selector ? options.selector : `:root`} {\n` +
            dictionary.allTokens.map(createCustomPropertiesFormatter(dictionary)).join('\n') +
            `\n}\n`;
    }
});

// Configure and build
StyleDictionary.extend({
    source: [
        `resources/design-tokens/**/*.{js,json,jsonc,json5}`
    ],
    platforms: {
        json: {
            buildPath: "./",
            files: [
                {
                    destination: "resources/design-tokens.json",
                    format: "json/nested"
                }
            ]
        },
        sass: {
            transformGroup: TRANSFORM_GROUP_CUSTOM_PROPERTIES,
            buildPath: 'resources/scss/',
            files: [
                {
                    destination: 'custom-properties/core-font-office.scss',
                    format: FORMAT_CSS_CUSTOM_PROPERTIES,
                    options: {
                        selector: 'body',
                    }
                },
                {
                    destination: 'custom-properties/core-block-editor.scss',
                    format: FORMAT_CSS_CUSTOM_PROPERTIES,
                    options: {
                        selector: '.editor-styles-wrapper',
                    }
                },
                {
                    destination: 'variables/tokens.scss',
                    format: 'scss/map-deep',
                    options: {
                        outputReferences: true,
                    }
                }
            ]
        },
        ts: {
            transformGroup: 'js',
            buildPath: 'resources/ts/',
            files: [
                {
                    format: "javascript/module",
                    destination: "tokens.ts"
                },
                {
                    format: "typescript/module-declarations",
                    destination: "tokens.d.ts"
                }
            ]
        }
    }
}).buildAllPlatforms();
