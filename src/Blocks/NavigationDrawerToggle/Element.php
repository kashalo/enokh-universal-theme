<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\NavigationDrawerToggle;

use Enokh\UniversalTheme\Presentation\Elements\Icon;
use Inpsyde\PresentationElements;

use function Enokh\UniversalTheme\icon;
use function Inpsyde\PresentationElements\isBlockRendererRestRequest;

class Element extends PresentationElements\Element\BaseElement
{
    // Configuration
    public const BLOCK_TYPE = 'enokh-universal-theme/navigation-drawer-toggle';

    // Arguments
    public const ARG_LABEL_ENABLED = 'labelEnabled';
    public const ARG_LABEL_TEXT = 'labelText';
    public const ARG_LABEL_POSITION = 'labelPosition';

    // Argument values
    public const LABEL_POSITION_BEFORE = 'before';
    public const LABEL_POSITION_AFTER = 'after';

    // Classes
    public const CLASS_WRAPPER = 'enokh-blocks-navigation-drawer-toggle';
    public const CLASS_OPEN_ICON = self::CLASS_WRAPPER . '__open';
    public const CLASS_CLOSE_ICON = self::CLASS_WRAPPER . '__close';

    public static function name(): string
    {
        return 'enokh-universal-theme/navigation-drawer-toggle';
    }

    public static function argumentsSchema(): array
    {
        return [
            'type' => 'object',
            'properties' => [
                self::ARG_LABEL_ENABLED => [
                    'type' => 'boolean',
                    'default' => static::defaultArguments()[self::ARG_LABEL_ENABLED],
                ],
                self::ARG_LABEL_TEXT => [
                    'type' => 'string',
                    'default' => static::defaultArguments()[self::ARG_LABEL_TEXT],
                ],
                self::ARG_LABEL_POSITION => [
                    'type' => 'string',
                    'default' => static::defaultArguments()[self::ARG_LABEL_POSITION],
                ],
            ],
        ];
    }

    public static function defaultArguments(): array
    {
        return [
            self::ARG_LABEL_ENABLED => false,
            self::ARG_LABEL_TEXT => '',
            self::ARG_LABEL_POSITION => self::LABEL_POSITION_BEFORE,
        ];
    }

    public function render(): string
    {
        $this->withArguments(wp_parse_args(
            $this->arguments(),
            static::defaultArguments()
        ));

        if (isBlockRendererRestRequest(self::BLOCK_TYPE)) {
            return $this->renderContent();
        }

        $classes = $this->attribute('class');
        is_array($classes) || $classes = [$classes];

        if (!in_array(self::CLASS_WRAPPER, $classes, true)) {
            $this->prependToAttribute('class', self::CLASS_WRAPPER);
        }

        return PresentationElements\renderTag(
            'button',
            $this->attributes(),
            $this->renderContent()
        );
    }

    private function renderContent(): string
    {
        return PresentationElements\renderValue([
            $this->isLabelPositionBefore() ? $this->labelText() : '',
            $this->openIcon(),
            $this->closeIcon(),
            $this->isLabelPositionAfter() ? $this->labelText() : '',
        ]);
    }

    private function isLabelPositionBefore(): bool
    {
        return $this->argument(self::ARG_LABEL_POSITION) === self::LABEL_POSITION_BEFORE;
    }

    private function isLabelPositionAfter(): bool
    {
        return $this->argument(self::ARG_LABEL_POSITION) === self::LABEL_POSITION_AFTER;
    }

    private function labelText(): string
    {
        return $this->argument(self::ARG_LABEL_ENABLED)
            ? (string) $this->argument(self::ARG_LABEL_TEXT)
            : '';
    }

    private function openIcon(): Icon
    {
        return icon('font-awesome-solid', 'bars')
            ->appendToAttribute('class', self::CLASS_OPEN_ICON);
    }

    private function closeIcon(): Icon
    {
        return icon('font-awesome-solid', 'xmark')
            ->appendToAttribute('class', self::CLASS_CLOSE_ICON);
    }
}
