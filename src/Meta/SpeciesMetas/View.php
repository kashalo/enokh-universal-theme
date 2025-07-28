<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta\SpeciesMetas;

use MetaboxOrchestra\BoxInfo;
use MetaboxOrchestra\BoxView;
use WP_Term;

class View implements BoxView
{
    private WP_Term $term;

    /**
     * View constructor.
     *
     * @param WP_Term $term
     */
    public function __construct(WP_Term $term)
    {
        $this->term = $term;
    }

    /**
     * @param BoxInfo $info
     *
     * @return string
     */
    public function render(BoxInfo $info): string
    {
        $assocBackgroundColor = get_term_meta($this->term->term_id, Metabox::META_KEY_ASSOC_BACKGROUND_COLOR, true);
        ob_start();
        ?>
        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="<?= esc_attr(Metabox::ASSOC_BACKGROUND_COLOR) ?>">
                        <?= esc_html__('Associated Background Colour', 'enokh-blocks') ?>
                    </label>
                </th>
                <td>
                    <input
                            name="<?= esc_attr(Metabox::ASSOC_BACKGROUND_COLOR) ?>"
                            id="<?= esc_attr(Metabox::ASSOC_BACKGROUND_COLOR) ?>"
                            type="color"
                            value="<?= esc_attr($assocBackgroundColor)?>"/>
                </td>
            </tr>
        </table>
        <?php
        return ob_get_clean();
    }
}
