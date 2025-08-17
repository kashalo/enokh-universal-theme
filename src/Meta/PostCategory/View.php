<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Meta\PostCategory;

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
     * phpcs:disable Syde.Functions.FunctionLength.TooLong
     */
    public function render(BoxInfo $info): string
    {
        $featuredImageId = get_term_meta($this->term->term_id, Metabox::META_KEY_FEATURED_IMAGE_ID, true);
        $isFeaturedTerm = get_term_meta($this->term->term_id, Metabox::META_KEY_IS_FEATURED_TERM, true);
        $isFeaturedTerm = !empty($isFeaturedTerm);
        wp_enqueue_media();
        ob_start();
        $buttonText = __('Select image', 'enokh-blocks');
        ?>
        <style>
            .taxonomy-category .termbox-container {
                float: none;
            }
        </style>
        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="<?= esc_attr(Metabox::FEATURED_IMAGE_ID) ?>">
                        <?= esc_html__('Featured Image', 'enokh-blocks') ?>
                    </label>
                </th>
                <td>
                    <div class='image-preview-wrapper'>
                        <img id='image-preview'
                            src='<?php echo esc_url((string) wp_get_attachment_url($featuredImageId)); ?>'
                            height='100'>
                    </div>
                    <input id="upload_image_button" type="button" class="button"
                            value="<?= esc_attr($buttonText); ?>"/>
                    <input id="delete_image_button" type="button" class="button"
                            value="<?= esc_attr(__('Delete', 'enokh-blocks')) ?>"/>
                    <input
                            name="<?= esc_attr(Metabox::FEATURED_IMAGE_ID) ?>"
                            id="<?= esc_attr(Metabox::FEATURED_IMAGE_ID) ?>"
                            type="hidden"
                            value="<?= esc_attr($featuredImageId) ?>"/>
                </td>
            </tr>

            <tr>
                <th scope="row">
                    <label for="<?= esc_attr(Metabox::IS_FEATURED_TERM) ?>">
                        <?= esc_html__('Featured Term', 'enokh-blocks') ?>
                    </label>
                </th>
                <td>
                    <input
                            name="<?= esc_attr(Metabox::IS_FEATURED_TERM) ?>"
                            id="<?= esc_attr(Metabox::IS_FEATURED_TERM) ?>"
                            type="checkbox"
                            <?= $isFeaturedTerm ? 'checked' : ''?>
                            />
                </td>
            </tr>
        </table>
        <?php
        $this->screenPrintScript();
        return ob_get_clean();
    }

    // phpcs:enable Syde.Functions.FunctionLength.TooLong

    private function screenPrintScript(): void
    {
        ?>
        <script type='text/javascript'>
            jQuery(document).ready(function ($) {
                let file_frame;
                let wp_media_post_id = wp.media.model.settings.post.id;
                jQuery('#upload_image_button').on('click', function (event) {
                    event.preventDefault();
                    if (file_frame) {
                        file_frame.open();
                        return;
                    }

                    file_frame = wp.media.frames.file_frame = wp.media({
                        multiple: false
                    });

                    file_frame.on('select', function () {
                        attachment = file_frame.state().get('selection').first().toJSON();
                        $('#image-preview').attr('src', attachment.url).css('width', 'auto');
                        $('#featured_image_id').val(attachment.id);
                        wp.media.model.settings.post.id = wp_media_post_id;
                    });

                    file_frame.open();
                });

                jQuery('a.add_media').on('click', function () {
                    wp.media.model.settings.post.id = wp_media_post_id;
                });

                jQuery('#delete_image_button').on('click', function (event) {
                    event.preventDefault();
                    $('#image-preview').removeAttr('src');
                    image_id = $('#featured_image_id').val();
                    $('#featured_image_id').val('-' + image_id);
                    wp.media.model.settings.post.id = '';
                });
            })
        </script>
        <?php
    }
}
