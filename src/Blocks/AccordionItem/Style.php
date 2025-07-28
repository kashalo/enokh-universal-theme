<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\AccordionItem;

use Enokh\UniversalTheme\Style\BlockDefaultStylesTrait;
use Enokh\UniversalTheme\Style\BlockStyle;
use Enokh\UniversalTheme\Style\InlineCssGenerator;

class Style implements BlockStyle
{
    use BlockDefaultStylesTrait;

    /**
     * @var array<string, mixed>
     */
    protected array $settings;
    private InlineCssGenerator $inlineCssGenerator;

    /**
     * @param InlineCssGenerator $inlineCssGenerator
     */
    public function __construct(InlineCssGenerator $inlineCssGenerator)
    {
        $this->settings = [];
        $this->inlineCssGenerator = $inlineCssGenerator;
    }

    public function withSettings(array $settings): BlockStyle
    {
        $this->settings = $settings;

        return $this;
    }

    public function generate(): BlockStyle
    {
        return $this;
    }

    public function output(): string
    {
        return $this->inlineCssGenerator->output();
    }
}
