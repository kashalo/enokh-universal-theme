<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\NavigationDrawer\Elements;

use Inpsyde\PresentationElements\Element;

use function Inpsyde\PresentationElements\renderTag;

class Drawer extends Element\BaseElement
{
    public const ARG_CONTENT = 'content';
    public const CLASS_WRAPPER = 'enokh-blocks-navigation-drawer';

    public static function name(): string
    {
        return 'enokh-universal-theme/navigation-drawer';
    }

    public function withContent(mixed $content): self
    {
        $this->withArgument(self::ARG_CONTENT, $content);

        return $this;
    }

    public function render(): string
    {
        $classes = $this->attribute('class');
        is_array($classes) || $classes = [$classes];

        if (!in_array(self::CLASS_WRAPPER, $classes, true)) {
            $this->prependToAttribute('class', self::CLASS_WRAPPER);
        }

        return renderTag('div', $this->attributes(), $this->argument(self::ARG_CONTENT));
    }
}
