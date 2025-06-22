<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation\Icon;

use Inpsyde\Modularity\Properties\Properties;

class AntDesignTwoToneIconSet extends BaseIconSet
{
    protected string $name = 'ant-design-two-tone';
    protected string $label = 'Ant Design: Two Tone';

    public function __construct(Properties $properties)
    {
        $this->directory = \trailingslashit($properties->basePath()) . 'resources/icons/ant-design-two-tone';
    }
}
