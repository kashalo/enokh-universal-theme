<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Config;

class BlockDefaultAttributes
{
    /**
     * @return array
     *
     * @phpcs:disable
     */
    public static function defaults(): array
    {
        $display = [
            'display',
            'flexDirection',
            'flexWrap',
            'alignItems',
            'justifyContent',
            'columnGap',
            'rowGap',
            'position',
            'overflowX',
            'overflowY',
            'zindex',
            'stickyTop',
            'stickyBottom',
        ];

        $flex_child = [
            'flexGrow',
            'flexShrink',
            'flexBasis',
            'order',
        ];

        $spacing = [
            'marginTop',
            'marginRight',
            'marginBottom',
            'marginLeft',
            'paddingTop',
            'paddingRight',
            'paddingBottom',
            'paddingLeft',
            'borderSizeTop',
            'borderSizeRight',
            'borderSizeBottom',
            'borderSizeLeft',
            'borderRadiusTopRight',
            'borderRadiusBottomRight',
            'borderRadiusBottomLeft',
            'borderRadiusTopLeft',
        ];

        $options = array_merge(
            $display,
            $flex_child,
            $spacing
        );

        $defaults = [];
        foreach ($options as $option) {
            $defaults[$option] = '';
            $defaults[$option . 'Tablet'] = '';
            $defaults[$option . 'Mobile'] = '';
        }

        // Spacing.
        $defaults['spacing'] = [];
        $defaults['marginUnit'] = 'px';
        $defaults['paddingUnit'] = 'px';
        $defaults['borderRadiusUnit'] = 'px';

        // Sizing.
        $defaults['sizing'] = [];
        $defaults['useGlobalMaxWidth'] = false;

        // Typography.
        $defaults['typography'] = [];

        // Icons.
        $defaults['iconStyles'] = [];

        // Borders.
        $defaults['borders'] = [];

        // Sticky
        $defaults['includeAdminBar'] = false;

        // @phpcs:enable
        return $defaults;
    }
}
