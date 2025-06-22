<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation\Icon;

use Inpsyde\Modularity\Properties\Properties;

class AntDesignOutlinedIconSet extends BaseIconSet
{
    protected string $name = 'ant-design-outlined';
    protected string $label = 'Ant Design: Outlined';

    public function __construct(Properties $properties)
    {
        $this->directory = \trailingslashit($properties->basePath()) . 'resources/icons/ant-design-outlined';
    }
}
