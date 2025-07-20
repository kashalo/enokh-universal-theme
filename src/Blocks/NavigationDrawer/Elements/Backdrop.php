<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\NavigationDrawer\Elements;

use Inpsyde\PresentationElements\Element;

use function Inpsyde\PresentationElements\renderTag;

class Backdrop extends Element\BaseElement
{
    public const CLASS_WRAPPER = 'enokh-blocks-navigation-drawer-backdrop';

    public static function name(): string
    {
        return 'enokh-universal-theme/navigation-drawer-backdrop';
    }

    public function render(): string
    {
        $this->prependToAttribute('class', self::CLASS_WRAPPER);

        return renderTag('div', $this->attributes());
    }
}
