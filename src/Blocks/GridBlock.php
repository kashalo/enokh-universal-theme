<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

use Enokh\UniversalTheme\Blocks\TaxonomyList\Renderer;
use Enokh\UniversalTheme\Module\EditorModule;
use Enokh\UniversalTheme\Style\GridStyle;
use Enokh\UniversalTheme\Utility\BlockUtility;
use Enokh\UniversalTheme\Utility\DynamicContentUtility;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

use function Enokh\UniversalTheme\package;

class GridBlock
{
    public const NAME = 'enokh-blocks/grid';
    public const ICON = 'schedule';
    public const LOCALIZE_VAR = 'GridBlock';
    private BlockUtility $blockUtility;
    private GridStyle $gridStyle;
    private DynamicContentUtility $dynamicContentUtility;

    public function __construct(BlockUtility $blockUtility, GridStyle $gridStyle, DynamicContentUtility $dynamicContentUtility)
    {
        $this->blockUtility = $blockUtility;
        $this->gridStyle = $gridStyle;
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

    // @phpcs:enable

    public function args(): array
    {
        return [
            'render_callback' => [$this, 'render'],
            'attributes' => $this->attributes(),
            'uses_context' => [
                'enokh-blocks/query',
                'enokh-blocks/queryId',
                'enokh-blocks/inheritQuery',
                'enokh-blocks/termQuery',
                'enokh-blocks/taxonomyType',
                'enokh-blocks/termQueryId',
                'enokh-blocks/termShowPostCounts',
                "enokh-blocks/termInheritQuery",
            ],
        ];
    }

    /**
     * @param array $attrs
     * @param string $content
     * @param \WP_Block $block
     * @return string
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     *
     * @phpcs:disable Syde.Functions.FunctionLength.TooLong
     */
    public function render(array $attrs, string $content, \WP_Block $block): string
    {
        if (isset($attrs['query'])) {
            return $content;
        }

        $settings = wp_parse_args(
            $attrs,
            $this->defaults()
        );

        $css = $this->gridStyle->withSettings($settings)
            ->generate()
            ->output();

        add_filter(
            $this->blockUtility->cssHookName(),
            static function (array $inlineCss) use ($css, $settings): array {
                $inlineCss[$settings['uniqueId']] = $css;

                return $inlineCss;
            }
        );

        $hasDivider = !empty($settings['divider']);

        $classNames = [
            'enokh-blocks-grid-wrapper',
            'enokh-blocks-grid-wrapper-' . $settings['uniqueId'],
        ];

        if (!empty($settings['className'])) {
            $classNames[] = $settings['className'];
        }

        if ($hasDivider) {
            $classNames[] = 'enokh-blocks-has-divider';
        }

        $output = sprintf(
            '<div %s>',
            $this->blockUtility->attribute(
                'grid-wrapper',
                [
                    'id' => $settings['anchor'] ?? null,
                    'class' => implode(' ', $classNames),
                ],
                $settings,
                $block
            )
        );

        /** @var Renderer $termListRenderer */
        $termListRenderer = package()->container()->get(Renderer::class);
        /** Renders the output */
        $output .= empty($settings['isQueryLoop']) && empty($settings['isTermQueryLoop'])
            ? $content
            : '';
        $output .= !empty($settings['isQueryLoop'])
            ? QueryLoop::new($this, $this->dynamicContentUtility)->render($attrs, $content, $block)
            : '';
        $output .= !empty($settings['isTermQueryLoop'])
            ? $termListRenderer->render($attrs, $content, $block)
            : '';
        $output .= '</div>';

        return $output;
    }

    // @phpcs:enable

    public function config(): array
    {
        return [
            'apiVersion' => 2,
            'name' => $this->name(),
            'title' => esc_html__('Enokh Grid', 'enokh-blocks'),
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
        return [
            'uniqueId' => '',
            'anchor' => '',
            'columns' => '',
            'className' => '',
            'horizontalGap' => '',
            'verticalGap' => '',
            'verticalAlignment' => '',
            'horizontalGapTablet' => '',
            'verticalGapTablet' => '',
            'verticalAlignmentTablet' => 'inherit',
            'horizontalGapMobile' => '',
            'verticalGapMobile' => '',
            'verticalAlignmentMobile' => 'inherit',
            'horizontalAlignment' => '',
            'horizontalAlignmentTablet' => '',
            'horizontalAlignmentMobile' => '',
            'useLegacyRowGap' => false,
        ];
        // @phpcs:enable
    }

    public function cssOutput(): string
    {
        global $post;
        $output = '';

        if (empty($post)) {
            return $output;
        }

        $gridBlocks = $this->blockUtility->parseBlocks($post->post_content, $this->name());

        if (empty($gridBlocks)) {
            return $output;
        }

        foreach ($gridBlocks as $gridBlock) {
            $settings = wp_parse_args(
                $gridBlock['attrs'],
                $this->defaults()
            );
            $output .= $this->gridStyle->withSettings($settings)
                ->generate()
                ->output();
        }

        return $output;
    }
}
