<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

use Enokh\UniversalTheme\Config\BlockDefaultAttributes;
use Enokh\UniversalTheme\Module\EditorModule;
use Enokh\UniversalTheme\Style\ButtonStyle;
use Enokh\UniversalTheme\Utility\BlockUtility;
use Enokh\UniversalTheme\Utility\DynamicContentUtility;

class ButtonBlock
{
    public const NAME = 'enokh-blocks/button';
    public const ICON = 'button';
    public const LOCALIZE_VAR = 'ButtonBlock';

    private BlockUtility $blockUtility;
    private ButtonStyle $buttonStyle;
    private DynamicContentUtility $dynamicContentUtility;

    public function __construct(
        BlockUtility $blockUtility,
        ButtonStyle $buttonStyle,
        DynamicContentUtility $dynamicContentUtility
    ) {

        $this->blockUtility = $blockUtility;
        $this->buttonStyle = $buttonStyle;
        $this->dynamicContentUtility = $dynamicContentUtility;
    }

    public function args(): array
    {
        return [
            'render_callback' => [$this, 'render'],
            'attributes' => $this->attributes(),
            'uses_context' => [
                'enokh-blocks/query',
                'enokh-blocks/queryId',
                'enokh-blocks/inheritQuery',
                'termId',
                'taxonomyType',
                'termShowPostCounts',
            ],
        ];
    }

    /**
     * @return array
     */
    public function attributes(): array
    {
        return [];
    }

    /**
     * @param array $attrs
     * @param string $content
     * @param \WP_Block $block
     * @return string
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong, Syde.Metrics.NestingLevel.TooHigh, Generic.Metrics.CyclomaticComplexity.TooHigh, SlevomatCodingStandard.Complexity.Cognitive.ComplexityTooHigh
     */
    public function render(array $attrs, string $content, \WP_Block $block): string
    {
        if (!isset($attrs['hasUrl']) && strpos(trim($content), '<a') === 0) {
            $attrs['hasUrl'] = true;
        }

        $attrs['isButton'] = true;

        $settings = wp_parse_args(
            $attrs,
            $this->defaults()
        );

        $css = $this->buttonStyle->withSettings($settings)
            ->generate()
            ->output();

        add_filter(
            $this->blockUtility->cssHookName(),
            static function (array $inlineCss) use ($css, $settings): array {
                $inlineCss[$settings['uniqueId']] = $css;

                return $inlineCss;
            }
        );

        if (!isset($attrs['useDynamicData']) || !$attrs['useDynamicData']) {
            return $content;
        }

        $dynamicContent = !empty($attrs['dynamicContentType'])
            ? $this->dynamicContentUtility->findDynamicContent($attrs, $block)
            : wp_strip_all_tags($block->inner_html);
        $allowEmptyContent = !empty($attrs['hasIcon']) && !empty($attrs['removeText']);

        if (empty($dynamicContent) && !$allowEmptyContent) {
            return '';
        }

        $classNames = [
            'enokh-blocks-button',
            'wp-block-button__link',
            'enokh-blocks-button-text',
            'enokh-blocks-button-' . $settings['uniqueId'],
            ...$this->maybeContainAccordionClasses($settings),
        ];

        if (!empty($settings['className'])) {
            $classNames[] = $settings['className'];
        }

        $relAttributes = [];

        if (!empty($settings['relNoFollow'])) {
            $relAttributes[] = 'nofollow';
        }

        if (!empty($settings['target'])) {
            $relAttributes[] = 'noopener';
            $relAttributes[] = 'noreferrer';
        }

        $iconHtml = $settings['hasIcon'] ? $this->parseIconHtml($content) : '';

        $output = '';

        foreach ((array) $dynamicContent as $content) {
            $tagName = 'span';
            $dynamicLinkType = $settings['dynamicLinkType'] ?? '';
            $dynamicUrl = $this->dynamicContentUtility->dynamicUrl($settings, $block);
            $isSharing = $settings['isSharing'] ?? false;

            // Open in a new tab for sharer link
            $isSharing && $settings['target'] = '_blank';

            if (is_array($content) && !empty($content['attributes']['href']) || $dynamicUrl) {
                $tagName = 'a';
            }

            if (($settings['buttonType'] ?? '') === 'button') {
                $tagName = 'button';
            }

            if (($settings['buttonType'] ?? '') === 'go-to-top') {
                $tagName = 'button';
            }

            $classNames[] = $dynamicLinkType === 'copy-link' ? 'enokh-blocks-button__copy-link' : '';
            $classNames[] = $dynamicLinkType === 'print' ? 'enokh-blocks-button__print' : '';

            $buttonAttributes = [
                'id' => !empty($settings['anchor']) ? $settings['anchor'] : null,
                'class' => implode(' ', array_filter($classNames)),
                'href' => $tagName === 'a' ? $dynamicUrl : null,
                'rel' => !empty($relAttributes) ? implode(' ', $relAttributes) : null,
                'target' => !empty($settings['target']) ? '_blank' : null,
                'aria-label' => !empty($settings['ariaLabel'])
                    ? $this->dynamicContentUtility->parsedAriaLabel($settings, $settings['ariaLabel'])
                    : null,
            ];

            if (isset($content['attributes'])) {
                foreach ($content['attributes'] as $attribute => $value) {
                    if ($attribute === 'class') {
                        $buttonAttributes[$attribute] .= ' ' . $value;
                        continue;
                    }
                    $buttonAttributes[$attribute] = $value;
                }
            }

            $output .= sprintf(
                '<%1$s %2$s>',
                $tagName,
                $this->blockUtility->attribute(
                    'dynamic-button',
                    $buttonAttributes,
                    $settings,
                    $block
                )
            );

            if (($settings['iconLocation'] ?? '') === 'left') {
                $output .= $iconHtml;
            }

            $output .= $content['content'] ?? $content;

            if (($settings['iconLocation'] ?? '') === 'right') {
                $output .= $iconHtml;
            }
            $output .= sprintf(
                '</%s>',
                $tagName
            );
        }

        return $output;
    }

    public function defaults(): array
    {
        $blockDefaults = BlockDefaultAttributes::defaults();
        return array_merge(
            $blockDefaults,
            [
                'backgroundColor' => '',
                'backgroundColorOpacity' => '',
                'backgroundColorHover' => '',
                'backgroundColorHoverOpacity' => '',
                'backgroundColorCurrent' => '',
                'backgroundColorCurrentOpacity' => '',
                'textColor' => '',
                'textColorHover' => '',
                'textColorCurrent' => '',
                'hasIcon' => false,
                'ariaLabel' => '',
                'hasButtonContainer' => false,
                'variantRole' => '',
                'buttonType' => 'link',
                'iconLocation' => 'left',
                'textColorTablet' => '',
                'textColorHoverTablet' => '',
                'textColorCurrentTablet' => '',
                'textColorMobile' => '',
                'textColorHoverMobile' => '',
                'textColorCurrentMobile' => '',
                'backgroundColorTablet' => '',
                'backgroundColorHoverTablet' => '',
                'backgroundColorCurrentTablet' => '',
                'backgroundColorMobile' => '',
                'backgroundColorHoverMobile' => '',
                'backgroundColorCurrentMobile' => '',
                'removeText' => false,
                'isAccordionToggle' => false,
                'useTextShadow' => false,
                'textShadows' => [],
                'useTypography' => false,
                'typographyEffects' => [],
            ]
        );
    }

    private function maybeContainAccordionClasses(array $settings): array
    {
        $classNames = [];

        if (!$settings['isAccordionToggle']) {
            return $classNames;
        }

        $classNames[] = 'enokh-blocks-button-accordion-toggle';
        return $classNames;
    }

    // @phpcs:enable

    private function parseIconHtml(string $content): string
    {
        $doc = $this->dynamicContentUtility->loadHtml($content);

        if (!$doc) {
            return '';
        }

        $icon = '';
        $nodes = $doc->getElementsByTagName('span');

        foreach ($nodes as $node) {
            if (!str_contains($node->getAttribute('class'), 'enokh-blocks-icon')) {
                continue;
            }
            $icon = $doc->saveHTML($node);
        }

        return $icon;
    }

    public function config(): array
    {
        return [
            'apiVersion' => 2,
            'name' => $this->name(),
            'title' => esc_html__('Enokh Button', 'enokh-blocks'),
            'category' => EditorModule::BLOCK_CATEGORY,
            'icon' => self::ICON,
            'attributes' => $this->attributes(),
        ];
    }

    public function name(): string
    {
        return self::NAME;
    }
}
