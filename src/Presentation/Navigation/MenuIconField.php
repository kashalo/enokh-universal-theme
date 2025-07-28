<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Presentation\Navigation;

use Enokh\DesignSystem\Presentation\Icon\IconSetRegistry;
use Inpsyde\MoreMenuFields\EditField;
use Inpsyde\MoreMenuFields\EditFieldValue;

// phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
class MenuIconField implements EditField
{
    public const NAME = 'enokh-universal-theme-navigation-icon';

    public function __construct(
        private IconSetRegistry $iconSetRegistry,
        private EditFieldValue $value
    ) {
    }

    /**
     * @return string
     */
    public function name(): string
    {
        return self::NAME;
    }

    /**
     * @return string
     */
    public function field_markup(): string
    {
        if (!$this->value->is_valid()) {
            return '';
        }

        $currentValue = (string) $this->value->value();

        ob_start(); ?>

        <p>
            <label>
                <?= esc_html__('Select Icon', 'enokh-universal-theme') ?><br />
                <select
                    name="<?= esc_attr($this->value->form_field_name()); ?>"
                    id="<?= esc_attr($this->value->form_field_id()); ?>">

                    <?php

                    printf(
                        '<option value="%s">%s</option>',
                        '',
                        __('Select an icon', 'enokh-universal-theme')
                    );

                    foreach ($this->iconSetRegistry->all() as $iconSet) {
                        printf('<optgroup label="%s">', esc_attr($iconSet->label()));
                        foreach ($iconSet->icons() as $iconName) {
                            $iconValue = sprintf('%s_%s', $iconSet->name(), $iconName);
                            printf(
                                '<option value="%s" %s>%s</option>',
                                esc_attr($iconValue),
                                selected($iconValue, $currentValue, false),
                                esc_html($iconName)
                            );
                        }
                        echo '</optgroup>';
                    }

                    ?>
                </select>
            </label>
        </p>

        <?php return ob_get_clean();
    }
}
