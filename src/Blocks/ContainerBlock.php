<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

use Enokh\UniversalTheme\Config\BlockDefaultAttributes;
use Enokh\UniversalTheme\Module\EditorModule;
use Enokh\UniversalTheme\Style\ContainerStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;
use Enokh\UniversalTheme\Utility\BlockUtility;
use Enokh\UniversalTheme\Utility\DynamicContentUtility;

class ContainerBlock
{
    public const NAME = 'enokh-blocks/container';
    public const ICON = 'grid-view';
    public const LOCALIZE_VAR = 'ContainerBlock';
    public const CONTAINER_BLOCK_WIDTH_FILTER = 'enokh-blocks.container-block-width';
    private BlockUtility $blockUtility;
    private ContainerStyle $containerStyle;
    /**
     * @var array<array-key, array<string, mixed>>
     */
    private array $svgShapes;
    private InlineCssGenerator $inlineCssGenerator;
    private DynamicContentUtility $dynamicContentUtility;

    public function __construct(
        BlockUtility $blockUtility,
        ContainerStyle $containerStyle,
        array $svgShapes,
        InlineCssGenerator $inlineCssGenerator,
        DynamicContentUtility $dynamicContentUtility
    ) {

        $this->containerStyle = $containerStyle;
        $this->blockUtility = $blockUtility;
        $this->svgShapes = $svgShapes;
        $this->inlineCssGenerator = $inlineCssGenerator;
        $this->dynamicContentUtility = $dynamicContentUtility;
    }

    public function name(): string
    {
        return self::NAME;
    }

    /**
     * @return array
     *
     * @phpcs:disable
     */
    public function attributes(): array
    {
        return [];
    }

    public function args(): array
    {

        return [
            'render_callback' => [$this, 'render'],
            'attributes' => $this->attributes(),
            'uses_context' => [
                'enokh-blocks/accordionId',
            ],
        ];
    }

    public function render(array $attrs, string $content, \WP_Block $block): string
    {
        $settings = wp_parse_args(
            $attrs,
            $this->defaults()
        );

        $css = $this->containerStyle->withSettings($settings)
            ->generate()
            ->output();


        add_filter($this->blockUtility->cssHookName(), static function ($inlineCss) use ($css, $settings) {
            $inlineCss[$settings['uniqueId']] = $css;
            return $inlineCss;
        });

        $output = '';
        $classNames = [
            'enokh-blocks-container',
            'enokh-blocks-container-' . $settings['uniqueId'],
            ...$this->maybeContainAccordionClasses($settings, $block),
            ...$this->maybeContainTabClasses($settings),
            ...$this->maybeContainDividerClass($settings),
        ];

        if ($this->maybeRemoveIfBlockEmpty($settings, $content)) {
            return '';
        }

        if ($settings['isGrid']) {
            $gridClassNames = [
                'enokh-blocks-grid-column',
                sprintf("enokh-blocks-grid-column-%s", $settings['uniqueId']),
            ];

            $output .= sprintf(
                '<%1$s %2$s>',
                'div',
                $this->blockUtility->attribute(
                    'grid-item',
                    [
                        'id' => $settings['anchor'] ?? null,
                        'class' => implode(' ', $gridClassNames),
                    ],
                    $settings,
                    $block
                )
            );
        }

        /**
         * Push dynamic url to block attributes
         */
        if ($settings['useDynamicData'] && $settings['dynamicLinkType'] !== '') {
            $attrs['url'] = $this->dynamicContentUtility->dynamicUrl($settings, $block);
            $settings['url'] = $attrs['url'];
        }

        if (!empty($settings['className'])) {
            $classNames[] = $settings['className'];
        }

        if (!$settings['isGrid'] && !empty($settings['align'])) {
            $classNames[] = 'align' . $settings['align'];
        }

        $tagName = $settings['tagName'] ?? '';
        if (!in_array($tagName, $this->allowTagNames(), true)) {
            $tagName = 'div';
        }

        if (!empty($settings['url']) && 'wrapper' === $settings['linkType']) {
            $tagName = 'a';
        }

        $rootBlockAttributes = [
            'id' => $settings['anchor'] ?? null,
            'class' => implode(' ', $classNames),
            'style' => $this->inlineStyleOutput($settings),
            ...$this->maybeAddA11YAttributes($settings),
        ];


        if (!empty($settings['url']) || $settings['linkType'] === 'wrapper') {
            $relAttributes = [];
            $ariaLabel = $settings['hiddenLinkAriaLabel'] ?? '';

            if ($settings['relNoFollow']) {
                $relAttributes[] = 'nofollow';
            }

            if ($settings['relSponsored']) {
                $relAttributes[] = 'sponsored';
            }


            if ($settings['target']) {
                $relAttributes[] = 'noopener';
                $relAttributes[] = 'noreferrer';
            }

            if ($settings['dynamicLinkType'] === 'single-post') {
                $ariaLabel = $this->dynamicContentUtility->postTitleContent($settings);
            }


            $rootBlockAttributes = array_merge_recursive(
                $rootBlockAttributes,
                [
                    'href' => esc_url($settings['url'] ?? ''),
                    'rel' => !empty($relAttributes) ? implode(' ', $relAttributes) : '',
                    'target' => $settings['target'] ? '_blank' : '',
                ]
            );

            $rootBlockAttributes['aria-label'] = !empty($ariaLabel) ?
                esc_attr($ariaLabel) :
                esc_attr($rootBlockAttributes['aria-label'] ?? '');
        }

        $output .= sprintf(
            '<%1$s %2$s>',
            $tagName,
            $this->blockUtility->attribute(
                'container',
                $rootBlockAttributes
                ,
                $settings,
                $block
            )
        );

        $output .= $this->maybeAddHiddenLink($settings, $attrs);

        // Add inner content
        $output .= $content;

        $output .= $this->shapes($settings);

        // Closing the container
        $output .= sprintf(
            '</%s>',
            $tagName
        );

        if ($settings['isGrid']) {
            $output .= '</div>';
        }

        // Accordion item content wrapping
        if ($settings['isAccordionItemContent']) {
            $output = sprintf(
                '<div class="enokh-blocks-accordion-header-content-wrapper">%s</div>',
                $output
            );
        }

        if (did_action('wp_head')) {
            $output = sprintf(
                '<style>%s</style>%s',
                $this->cssOutput(),
                $output
            );
        }

        return $output;
    }

    public function config(): array
    {
        return [
            'apiVersion' => 2,
            'name' => $this->name(),
            'title' => esc_html__('Enokh Container', 'enokh-blocks'),
            'category' => EditorModule::BLOCK_CATEGORY,
            'icon' => self::ICON,
            'attributes' => $this->attributes(),
        ];
    }

    /**
     * @return array
     *
     * @phpcs:disable
     */
    public function defaults(): array
    {
        $container_width = apply_filters(self::CONTAINER_BLOCK_WIDTH_FILTER, 1200);
        $blockDefaults = BlockDefaultAttributes::defaults();
        return array_merge(
            $blockDefaults,
            [
                'tagName' => 'div',
                'isGrid' => false,
                'isCarouselItem' => false,
                'isTabHeader' => false,
                'isAccordionItemHeader' => false,
                'isAccordionItemHeaderInner' => false,
                'isAccordionItemContent' => false,
                'backgroundColor' => '',
                'carouselId' => '',
                'tabPanelId' => '',
                'gradient' => false,
                'gradientDirection' => '',
                'gradientColorOne' => '',
                'gradientColorOneOpacity' => '',
                'gradientColorStopOne' => '',
                'gradientColorTwo' => '',
                'gradientColorTwoOpacity' => '',
                'gradientColorStopTwo' => '',
                'gradientSelector' => 'element',
                'textColor' => '',
                'linkColor' => '',
                'linkColorHover' => '',
                'bgImage' => '',
                'bgOptions' => [
                    'selector' => 'element',
                    'opacity' => 1,
                    'overlay' => false,
                    'position' => 'center center',
                    'size' => 'cover',
                    'repeat' => 'no-repeat',
                    'attachment' => '',
                ],
                'bgImageSize' => 'full',
                'bgImageInline' => false,
                'fontFamilyFallback' => '',
                'googleFont' => false,
                'googleFontVariants' => '',
                'useInnerContainer' => false,
                'variantRole' => '',
                'containerWidth' => $container_width,
                'outerContainer' => 'full',
                'innerContainer' => 'contained',
                'minHeight' => false,
                'minHeightUnit' => 'px',
                'minHeightTablet' => false,
                'minHeightUnitTablet' => 'px',
                'minHeightMobile' => false,
                'minHeightUnitMobile' => 'px',
                'width' => '',
                'widthTablet' => '',
                'widthMobile' => '',
                'autoWidth' => false,
                'autoWidthTablet' => false,
                'autoWidthMobile' => false,
                'flexBasisUnit' => 'px',
                'verticalAlignment' => '',
                'verticalAlignmentTablet' => 'inherit',
                'verticalAlignmentMobile' => 'inherit',
                'borderColorOpacity' => 1,
                'backgroundColorOpacity' => 1,
                'fontSize' => '',
                'fontSizeTablet' => '',
                'fontSizeMobile' => '',
                'fontSizeUnit' => 'px',
                'fontWeight' => '',
                'textTransform' => '',
                'alignment' => '',
                'alignmentTablet' => '',
                'alignmentMobile' => '',
                'removeVerticalGap' => false,
                'removeVerticalGapTablet' => false,
                'removeVerticalGapMobile' => false,
                'fontFamily' => '',
                'borderColor' => '',
                'innerZindex' => '',
                'useDynamicData' => false,
                'postId' => null,
                'dynamicContentType' => '',
                'dynamicLinkType' => '',
                'dynamicSource' => 'current-post',
                'gridItemPaddingTop' => '',
                'gridItemPaddingRight' => '',
                'gridItemPaddingBottom' => '',
                'gridItemPaddingLeft' => '',
                'shapeDividers' => [],
                'useBoxShadow' => false,
                'boxShadows' => [],
                'useTextShadow' => false,
                'textShadows' => [],
                'useAdvancedBackgrounds' => false,
                'advancedBackgrounds' => [],
                'hideOnDesktop' => false,
                'hideOnTablet' => false,
                'hideOnMobile' => false,
                'textColorTablet' => '',
                'linkColorTablet' => '',
                'linkColorHoverTablet' => '',
                'textColorMobile' => '',
                'linkColorMobile' => '',
                'linkColorHoverMobile' => '',
                'linkType' => 'hidden-link',
                'url' => '',
                'hiddenLinkAriaLabel' => '',
                'relNoFollow' => false,
                'target' => false,
                'relSponsored' => false,
                'removeIfEmpty' => false,

                'useTransform' => false,
                'transforms' => [],
                'transformDisableInEditor' => false,

                'useOpacity' => false,
                'opacities' => [],
                'opacityDisableInEditor' => false,

                'useTransition' => false,
                'transitions' => [],

                'aspectRatio' => '',
                'aspectRatioTablet' => '',
                'aspectRatioMobile' => '',

                'stickyOnScroll' => '',
                'stickyOnScrollTablet' => '',
                'stickyOnScrollMobile' => '',

                'altText' => '',
                'role' => '',
            ]
        );
        // @phpcs:enable
    }

    public function allowTagNames(): array
    {
        return [
            'div',
            'article',
            'section',
            'header',
            'footer',
            'aside',
            'a',
        ];
    }

    public function cssOutput(): string
    {
        global $post;
        $output = '';

        if (empty($post)) {
            return $output;
        }

        $containerBlocks = $this->blockUtility->parseBlocks($post->post_content, $this->name());

        if (empty($containerBlocks)) {
            return $output;
        }

        foreach ($containerBlocks as $containerBlock) {
            $settings = wp_parse_args(
                $containerBlock['attrs'],
                $this->defaults()
            );
            $output .= $this->containerStyle->withSettings($settings)
                ->generate()
                ->output();
        }

        return $output;
    }

    /**
     * @param array $attrs
     * @return string
     */
    private function shapes(array $attrs): string
    {
        $shapesOutput = '';

        if (empty($attrs['shapeDividers'])) {
            return $shapesOutput;
        }

        $shapeSettings = $attrs['shapeDividers'];
        $shapes = $this->svgShapes;
        $flattenShapes = [];
        foreach ($shapes as $shape) {
            if (empty($shape['shapes']) || !is_array($shape['shapes'])) {
                continue;
            }

            foreach ($shape['shapes'] as $key => $shape) {
                $flattenShapes[$key] = $shape['icon'];
            }
        }

        $shapesOutput .= '<div class="enokh-blocks-shapes">';

        foreach ($shapeSettings as $index => $option) {
            if (empty($option['shape'])) {
                continue;
            }

            if (!isset($flattenShapes[$option['shape']])) {
                continue;
            }

            $shapeNumber = $index + 1;
            $shapesOutput .= sprintf(
                '<div class="%1$s-shape %1$s-shape-' . $shapeNumber . '">%2$s</div>',
                "enokh-blocks",
                $flattenShapes[$option['shape']]
            );
        }

        $shapesOutput .= '</div>';

        return $shapesOutput;
    }

    /**
     * @param array $settings
     * @return string
     */
    private function inlineStyleOutput(array $settings): string
    {
        $inlineStyle = [
            ...array_values($this->inlineBackground($settings)),
            ...array_values($this->inlineBackgroundColour($settings)),
        ];

        return implode('', $inlineStyle);
    }

    /**
     * @param array $settings
     * @return string[]
     */
    private function inlineBackground(array $settings): array
    {
        $hasBgImage = $settings['bgImage'] ||
            ($settings['useDynamicData'] && $settings['dynamicContentType'] === 'featured-image');

        if (!$hasBgImage || !$settings['bgImageInline']) {
            return [];
        }

        $backgroundUrl = $this->inlineCssGenerator->backgroundImageUrl($settings);
        if (empty($backgroundUrl)) {
            return [];
        }

        $propertyName = 'background-image';
        $propertyName = $settings['bgOptions']['selector'] !== 'element'
            ? sprintf("--%s", $propertyName)
            : $propertyName;

        $backgroundInline = sprintf("%s: url(%s);", $propertyName, esc_url($backgroundUrl));

        return [$backgroundInline];
    }

    private function inlineBackgroundColour(array $settings): array
    {
        $hasDynamicBgColour = $settings['useDynamicData']
            && $settings['dynamicContentType'] === 'species-term';

        if (!$hasDynamicBgColour) {
            return [];
        }

        $backgroundColor = $this->inlineCssGenerator->backgroundColour($settings);
        if (empty($backgroundColor)) {
            return [];
        }

        $propertyName = 'background-color';
        $inline = sprintf("%s: %s;", $propertyName, esc_html($backgroundColor));

        return [$inline];
    }

    private function maybeAddHiddenLink(array $settings, array $attributes): string
    {
        $output = '';

        if ($settings['url'] === '' || $settings['linkType'] !== 'hidden-link') {
            return $output;
        }

        $relAttributes = [];

        if ($settings['relNoFollow']) {
            $relAttributes[] = 'nofollow';
        }

        if ($settings['relSponsored']) {
            $relAttributes[] = 'sponsored';
        }

        if ($settings['target']) {
            $relAttributes[] = 'noopener';
            $relAttributes[] = 'noreferrer';
        }

        $output .= sprintf(
            '<a %s></a>',
            $this->blockUtility->attribute(
                'container-link',
                [
                    'class' => 'enokh-blocks-container-link',
                    'href' => esc_url($settings['url']),
                    'aria-label' =>
                        $settings['hiddenLinkAriaLabel']
                            ? esc_attr($settings['hiddenLinkAriaLabel'])
                            : '',
                    'rel' => !empty($relAttributes) ? implode(' ', $relAttributes) : '',
                    'target' => $settings['target'] ? '_blank' : '',
                ],
                $settings
            )
        );

        return $output;
    }

    /**
     * @param array $settings
     * @param string $content
     * @return bool
     */
    private function maybeRemoveIfBlockEmpty(array $settings, string $content): bool
    {
        return $settings['removeIfEmpty'] && empty(trim($content));
    }

    private function maybeContainAccordionClasses(array $settings, \WP_Block $block): array
    {
        $classNames = [];
        $accordionId = $block->context['enokh-blocks/accordionId'] ?? '';
        if ($settings['isAccordionItemHeader']) {
            $classNames[] = 'enokh-blocks-accordion-header';
            $classNames[] = 'enokh-blocks-accordion-header-' . $accordionId;
        }
        if ($settings['isAccordionItemHeaderInner']) {
            $classNames[] = 'enokh-blocks-accordion-header-inner';
            $classNames[] = 'enokh-blocks-accordion-header-inner-' . $accordionId;
        }
        if ($settings['isAccordionItemContent']) {
            $classNames[] = 'enokh-blocks-accordion-header-content';
            $classNames[] = 'enokh-blocks-accordion-header-content-' . $accordionId;
        }

        return $classNames;
    }

    private function maybeContainTabClasses(array $settings): array
    {
        $classNames = [];

        if (!$settings['isTabHeader']) {
            return $classNames;
        }

        $classNames[] = 'enokh-blocks-tab-item-header';
        $classNames[] = 'enokh-blocks-tab-item-header-' . $settings['tabPanelId'];

        return $classNames;
    }

    private function maybeContainDividerClass(array $settings): array
    {
        $classNames = [];
        $hasDivider = !empty($settings['divider']);

        if (!$hasDivider) {
            return $classNames;
        }

        $classNames[] = 'enokh-blocks-has-divider';

        return $classNames;
    }

    /**
     * Conditionally adds accessibility attributes to the container block.
     *
     * If either alt text or role is provided, this method returns an array of
     * ARIA attributes including `aria-label`, `role`, and a `tabindex="0"` to make
     * the container focusable for screen readers.
     *
     * @param array $settings The settings array from block attributes.
     * @return array Associative array of accessibility attributes, or an empty array.
     */
    private function maybeAddA11YAttributes(array $settings): array
    {
        $title = $settings['altText'] ?? null;
        $role = $settings['role'] ?? null;

        if (empty($title) && empty($role)) {
            return [];
        }

        $postId = $this->dynamicContentUtility->selectedPostId($settings);

        $postTitle = get_the_title($postId);
        $thumbId = get_post_thumbnail_id($postId);
        $featuredImageAltText = !empty($thumbId)
            ? get_post_meta($thumbId, '_wp_attachment_image_alt', true)
            : '';

        $placeholders = [
            '{post_id}',
            '{post_title}',
            '{post_featured_image_alt}',
        ];
        $replacements = [
            (string) $postId,
            $postTitle,
            $featuredImageAltText,
        ];

        return [
            'aria-label' => $title
                ? esc_attr(str_replace($placeholders, $replacements, $title))
                : '',
            'role' => $role ? esc_attr($role) : '',
            'tabindex' => '0',
        ];
    }
}
