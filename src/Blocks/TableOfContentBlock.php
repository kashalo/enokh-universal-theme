<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks;

use Enokh\UniversalTheme\Module\EditorModule;

class TableOfContentBlock
{
    public const NAME = 'enokh-blocks/table-of-contents';
    public const LOCALIZE_VAR = 'TableOfContent';

    // ATTR
    public const ATTR_HEADING = 'heading';
    public const ATTR_HEADING_LEVEL = 'headingLevel';
    public const ATTR_HEADING_ENABLED = 'headingEnabled';
    public const ATTR_TEXT_COLOR = 'textColor';
    public const ATTR_LINK_COLOR = 'linkColor';
    public const ATTR_BACKGROUND = 'background';
    public const ATTR_LIST_STYLE = 'listStyle';
    public const ATTR_HEADING_FONT_SIZE = 'headingFontSize';
    public const ATTR_HEADING_FONT_SIZE_CLASS = 'headingFontSizeClass';

    public function name(): string
    {
        return self::NAME;
    }

    public function attributes(): array
    {
        return [
            self::ATTR_HEADING => [
                'type' => 'string',
                'default' => '',
            ],
            self::ATTR_HEADING_LEVEL => [
                'type' => 'number',
                'default' => 4,
            ],
            self::ATTR_HEADING_ENABLED => [
                'type' => 'boolean',
                'default' => true,
            ],
            self::ATTR_TEXT_COLOR => [
                'type' => 'string',
                'default' => '#000000',
            ],
            self::ATTR_LINK_COLOR => [
                'type' => 'string',
                'default' => '#01857C',
            ],
            self::ATTR_BACKGROUND => [
                'type' => 'string',
                'default' => 'transparent',
            ],
            self::ATTR_LIST_STYLE => [
                'type' => 'string',
                'default' => 'decimal',
            ],
            self::ATTR_HEADING_FONT_SIZE => [
                'type' => 'number',
                'default' => 12,
            ],
            self::ATTR_HEADING_FONT_SIZE_CLASS => [
                'type' => 'string',
                'default' => 'has-large-font-size',
            ],
        ];
    }

    public function args(): array
    {
        return [
            'attributes' => $this->attributes(),
            'supports' => $this->supports(),
            'render_callback' => [$this, 'render'],
        ];
    }

    public function render(array $attributes, string $content, \WP_Block $block): string
    {
        $classes = sprintf('wp-block-table-of-contents %s', $attributes['className'] ?? '');

        $heading = isset($attributes[self::ATTR_HEADING_ENABLED]) && $attributes[self::ATTR_HEADING_ENABLED]
            ? sprintf(
                '<h%s>%s</h%s',
                $attributes[self::ATTR_HEADING_LEVEL],
                $attributes[self::ATTR_HEADING],
                $attributes[self::ATTR_HEADING_LEVEL]
            )
            : '';

        $nav = "<nav class='$classes' >";

        if ($content && preg_match('/<nav class=".*">/mU', $content, $matches)) {
            $nav = $matches[0];
        }

        global $post;

        if (!$post instanceof \WP_Post) {
            return '';
        }

        $blocks = parse_blocks($post->post_content);
        $headingItems = $this->extractHeadings($blocks);

        return sprintf(
            '<div class="enokh-blocks-table-of-content %s" 
                style="background-color: %s">%s %s %s %s </div>',
            $attributes['className'] ?? '',
            $attributes[self::ATTR_BACKGROUND],
            $heading,
            $nav,
            $this->renderList($headingItems, 0, $attributes),
            '</nav>'
        );
    }

    public function renderList(array $items, int $dept = 0, array $attributes = []): string
    {
        if (empty($items)) {
            return '';
        }

        global $wp;

        $output = sprintf(
            '<ol style="color: %s; list-style: %s">',
            $attributes[self::ATTR_TEXT_COLOR],
            $attributes[self::ATTR_LIST_STYLE]
        );

        foreach ($items as $item) {
            $newDept = $dept + 1;
            $output .= sprintf(
                '<li>
                    <a class="enokh-blocks-table-of-content__entry" style="color: %s" href="%s">
                    %s</a>%s</li>',
                $attributes[self::ATTR_LINK_COLOR],
                home_url($wp->request) . '/#' . $item['id'],
                $item['title'],
                $this->renderList($item['items'], $newDept, $attributes)
            );
        }

        $output .= '</ol>';

        return $output;
    }

    private function extractHeadings(array $blocks): array
    {
        $headings = [];
        foreach ($blocks as $block) {
            if (
                $block['blockName'] !== TextBlock::NAME ||
                empty($block['innerHTML']) ||
                !isset($block['attrs']['addToTableOfContent']) ||
                !$block['attrs']['addToTableOfContent']
            ) {
                continue;
            }

            if (
                !preg_match_all(
                    '/<h([2-6]).*?id\s*=\s*["|\']([^"\']+)["|\'][^>]*>(.+?)<\/h[2-6]>/is',
                    $block['innerHTML'],
                    $matches,
                    PREG_SET_ORDER
                )
            ) {
                continue;
            }

            [, $level, $id, $title] = $matches[0];

            $headings[] = ['level' => intval($level), 'id' => $id, 'title' => $title];
        }

        return $this->buildTree($headings);
    }

    private function buildTree(array $headings, int $level = 0, int $currentKey = -1): array
    {
        $output = [];
        $previousHeading = 0;
        $children = [];

        foreach ($headings as $index => $heading) {
            $index = (int) $index;

            if (
                $index <= $currentKey ||
                ($previousHeading && $heading['level'] > $previousHeading)
            ) {
                continue;
            }

            if ($level === $heading['level']) {
                return $output;
            }

            if (
                isset($headings[$index + 1]) &&
                $heading['level'] < $headings[$index + 1]['level']
            ) {
                $children = $this->buildTree($headings, $heading['level'], $index);
            }

            $previousHeading = $heading['level'];

            $heading['items'] = $children;
            $output[] = $heading;
            // Need to reset children before continue with the next item
            $children = [];
        }

        return $output;
    }

    public function supports(): array
    {
        return [
            'html' => false,
        ];
    }

    public function config(): array
    {
        return [
            'apiVersion' => 3,
            'name' => $this->name(),
            'title' => __('Enokh Table of Contents', 'enokh-blocks'),
            'category' => EditorModule::BLOCK_CATEGORY,
            'attributes' => $this->attributes(),
            'supports' => $this->supports(),
            'isUsedInTemplate' => $this->inPostTemplate(),
            'filtersAdded' => false,
        ];
    }

    private function inPostTemplate(): bool
    {
        global $post;

        if (!$post instanceof \WP_Post) {
            return false;
        }

        $currentPostType = $post->post_type;

        $templates = get_block_templates(['slug__in' => ["single-{$currentPostType}"]]);

        if (isset($templates[0])) {
            return str_contains($templates[0]->content, self::NAME);
        }

        $templates = get_block_templates(['slug__in' => ["single"]]);

        if (isset($templates[0])) {
            return str_contains($templates[0]->content, self::NAME);
        }

        return false;
    }
}
