<?php

/**
 * Title: Social Links
 * Slug: enokh-universal-theme/social/links
 * Categories: uncategorized
 */

declare(strict_types=1);

use function Inpsyde\PresentationElements\block;

// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
echo block(
    'core/social-links',
    [
        "layout" => [
            "type" => "flex",
            "orientation" => "horizontal",
            "justifyContent" => "left",
            "verticalAlignment" => "center",
            "flexWrap" => "nowrap",
        ],
    ],
    [
        block('core/social-link')->withAttributes([
            'service' => 'twitter',
            'url' => 'https://twitter.com/MerckAH',
        ]),
        block('core/social-link')->withAttributes([
            'service' => 'facebook',
            'url' => 'https://www.facebook.com/merckanimalhealth',
        ]),
        block('core/social-link')->withAttributes([
            'service' => 'youtube',
            'url' => 'https://www.youtube.com/user/MerckAnimalHealth',
        ]),
        block('core/social-link')->withAttributes([
            'service' => 'linkedin',
            'url' => 'https://www.linkedin.com/showcase/merck-animal-health',
        ]),
        block('core/social-link')->withAttributes([
            'service' => 'instagram',
            'url' => 'https://www.instagram.com/merckanimalhealth/',
        ]),
    ],
)->serialize();
