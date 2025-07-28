<?php

declare(strict_types=1);

/**
 * @var array $attributes Block attributes.
 * @var string $content Block default content.
 * @var \WP_Block $block Block instance.
 */

use Enokh\UniversalTheme\Blocks\Icon as IconBlock;
use Enokh\UniversalTheme\Config\BlockDefaultAttributes;
use Enokh\UniversalTheme\Presentation\Elements\Icon;

use function Enokh\UniversalTheme\icon;
use function Enokh\UniversalTheme\package;
use function Inpsyde\PresentationElements\renderTag;

$attributes = $attributes ?? [];
$attributes = wp_parse_args(
    $attributes,
    BlockDefaultAttributes::defaults()
);

/**
 * Dynamic attributes
 */
$useDynamicData = $attributes['useDynamicData'] ?? false;
$dynamicContentType = $attributes['dynamicContentType'] ?? '';
$tax = $attributes['termTaxonomy'] ?? '';
$termId = $attributes['termId'] ?? 0;
$term = get_term($termId, $tax);
$isUseDynamicContent = $useDynamicData
    && $dynamicContentType === 'icon-meta'
    && ($term instanceof \WP_Term);

$icon = $attributes['icon'] ?? null;
$iconSet = $attributes['iconGroup'] ?? null;
$title = $attributes['altText'] ?? null;
$description = $attributes['altDescription'] ?? null;
/** @var IconBlock\Style $style */
$style = package()->container()->get(IconBlock\Style::class);
$blockUtility = package()->container()->get(\Enokh\UniversalTheme\Utility\BlockUtility::class);

if ($isUseDynamicContent) {
    $termIcon = Enokh\UniversalTheme\Meta\TermIcon::fromTerm($term);
    $icon = $termIcon->icon();
    $iconSet = $termIcon->iconSet();
}

if (empty($icon) || empty($iconSet)) {
    return;
}

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
/** @var Icon $iconInstance */
$iconInstance = icon($iconSet, $icon)
    ->withAttribute('class', 'enokh-blocks-icon');
!empty($title) and $iconInstance->withTitle($title);
!empty($description) and $iconInstance->withDescription($description);

$renderedIcon = $iconInstance->render();
$isRest = \Inpsyde\WpContext::determine()->isRest();
$queryContext = filter_input(INPUT_GET, 'context', FILTER_SANITIZE_SPECIAL_CHARS);

if ($isRest && $queryContext === 'edit') {
    // phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
    echo $renderedIcon;
    return;
}

$css = $style->withSettings($attributes)
    ->generate()
    ->output();

add_filter(
    $blockUtility->cssHookName(),
    static function (array $inlineCss) use ($css, $attributes): array {
        $inlineCss[$attributes['uniqueId']] = $css;

        return $inlineCss;
    }
);

$classNames = [
    'enokh-blocks-icon',
    'enokh-blocks-icon-' . ($attributes['uniqueId'] ?? ''),
];

if (!empty($attributes['isAccordionCollapse'])) {
    $classNames[] = 'enokh-blocks-accordion-collapse-icon';
    $classNames[] = 'enokh-blocks-accordion-collapse-icon-' . $attributes['uniqueId'];
}
if (!empty($attributes['isAccordionExpand'])) {
    $classNames[] = 'enokh-blocks-accordion-expand-icon';
    $classNames[] = 'enokh-blocks-accordion-expand-icon-' . $attributes['uniqueId'];
}
// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo renderTag(
    'span',
    \get_block_wrapper_attributes([
        'class' => implode(' ', $classNames),
    ]),
    $renderedIcon
);
