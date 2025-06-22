<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation\Icon;

use Inpsyde\Modularity\Properties\Properties;

class AntDesignFilledIconSet extends BaseIconSet
{
    protected string $name = 'ant-design-filled';
    protected string $label = 'Ant Design: Filled';

    public function __construct(Properties $properties)
    {
        $this->directory = \trailingslashit($properties->basePath()) . 'resources/icons/ant-design-filled';
    }
}
