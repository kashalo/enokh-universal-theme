<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta\TermIcon;

use Mah\Blocks\Provider\AssetProvider;
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
        $icon = get_term_meta($this->term->term_id, Metabox::META_KEY_ICON, true);
        $iconSet = get_term_meta($this->term->term_id, Metabox::META_KEY_ICON_SET, true);
        ob_start();
        ?>
        <table class="form-table">
            <tr>
                <td>
                    <div
                        id="enokh-blocks-term-icon-selector-root"
                        data-icon-set="<?= esc_attr($iconSet)?>"
                        data-icon="<?= esc_attr($icon)?>">
                    </div>
                </td>
            </tr>
        </table>
        <?php
        wp_enqueue_script(AssetProvider::MAH_BLOCKS_TERM_ICON_HANDLE);
        wp_enqueue_style(AssetProvider::MAH_BLOCKS_TERM_ICON_HANDLE);
        return ob_get_clean();
    }
}
