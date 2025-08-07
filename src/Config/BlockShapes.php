<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Config;

class BlockShapes
{
    /**
     * @return array
     *
     * @phpcs:disable
     */
    public static function get(): array
    {
        return [
            'gb-waves' => [
                'group' => esc_attr__('Waves', 'enokh-blocks'),
                'shapes' => [
                    'gb-waves-1' => [
                        'label' => sprintf(__('Wave %s', 'enokh-blocks'), '1'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 194.3" preserveAspectRatio="none"><path d="M1200 133.3l-50 8.9c-50 8.6-150 26.9-250 31.1-100 4.2-200-4.2-300-26.7S400 89.2 300 62.2C200 35.8 100 17.5 50 8.9L0 0v194.3h1200v-61z"/></svg>',
                    ],
                    'gb-waves-2' => [
                        'label' => sprintf(__('Wave %s', 'enokh-blocks'), '2'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 137.6" preserveAspectRatio="none"><path d="M0 137.6h1200V21.9l-66.7 26.7c-66.7 26.7-200 80-333.3 66.7S533.3 21.9 400 4.2C266.7-13.9 133.3 31.1 66.7 53L0 75.3v62.3z"/></svg>',
                    ],
                    'gb-waves-3' => [
                        'label' => sprintf(__('Wave %s', 'enokh-blocks'), '3'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 96.2" preserveAspectRatio="none"><path d="M0 96.2h1200V72.9l-50-8.9c-50-8.6-150-26.9-250-22.2C800 46.2 700 72.9 600 64 500 55.4 400 10.4 300 1.8 200-7.1 100 19.5 50 32.9L0 46.2v50z"/></svg>',
                    ],
                    'gb-waves-4' => [
                        'label' => sprintf(__('Wave %s', 'enokh-blocks'), '4'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130.3" preserveAspectRatio="none"><path d="M0 107.9l40-22.2c40-21.9 120-66.9 200-62.2 80 4.4 160 57.8 240 53.3C560 72 640 10.4 720 1.2S880 37 960 59c80 22.3 160 22.3 200 22.3h40v49H0v-22.4z"/></svg>',
                    ],
                    'gb-waves-5' => [
                        'label' => sprintf(__('Wave %s', 'enokh-blocks'), '5'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 218" preserveAspectRatio="none"><path d="M0 218h1200v-31.3l-40 4.4c-40 4.8-120 13.1-200 0-80-13.6-160-48.6-240-66.7-80-17.8-160-17.8-240-8.8-80 8.6-160 26.9-240 8.8-80-17.7-160-71.1-200-97.7L0 0v218z"/></svg>',
                    ],
                    'gb-waves-6' => [
                        'label' => sprintf(__('Wave %s', 'enokh-blocks'), '6'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 234" preserveAspectRatio="none"><path d="M0 0l40 40c40 40 120 120 200 115.6 80-4.8 160-93.1 240-111.2C560 26.7 640 80 720 88.9c80 8.6 160-26.4 240-13.3 80 13.6 160 75.2 200 106.7l40 31.1V234H0V0z"/></svg>',
                    ],
                    'gb-waves-7' => [
                        'label' => sprintf(__('Wave %s', 'enokh-blocks'), '7'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 217.3" preserveAspectRatio="none"><path d="M1200 195.6l-25-22.2c-25-21.9-75-66.9-125-75.5-50-8.9-100 17.8-150 26.7-50 8.6-100 .2-150-13.3-50-13.1-100-31.4-150-26.7-50 4.4-100 31.1-150 26.7-50-4.8-100-39.8-150-66.7C250 18.1 200-.2 150 0 100-.2 50 18.1 25 26.7L0 35.6v181.7h1200v-21.7z"/></svg>',
                    ],
                    'gb-waves-8' => [
                        'label' => sprintf(__('Wave %s', 'enokh-blocks'), '8'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 230.8" preserveAspectRatio="none"><path d="M1200 179.5l-22.2-26.7c-22.2-26.7-66.9-80-111.1-75.6-44.4 4.8-89.2 66.4-133.3 102.2-44.4 35.8-89.2 44.2-133.3 8.9-44.4-35.6-89.2-115.6-133.3-155.6-44.4-40-89.2-40-133.3-17.8C488.9 37 444.2 82 400 81.7c-44.4.2-89.2-44.8-133.3-57.8-44.4-13.6-89.2 4.8-133.3 26.7-44.5 22.2-89.2 48.9-110.9 62.2L0 126.1v104.7H1199.7l.3-51.3z"/></svg>',
                    ],
                ],
            ],
            'gb-angles' => [
                'group' => esc_attr__('Angles', 'enokh-blocks'),
                'shapes' => [
                    'gb-angle-1' => [
                        'label' => sprintf(__('Angle %s', 'enokh-blocks'), '1'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 360" preserveAspectRatio="none"><path d="M1200 360H0V0l1200 348z"/></svg>',
                    ],
                ],
            ],
            'gb-curves' => [
                'group' => esc_attr__('Curves', 'enokh-blocks'),
                'shapes' => [
                    'gb-curve-1' => [
                        'label' => sprintf(__('Curve %s', 'enokh-blocks'), '1'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 350" preserveAspectRatio="none"><path d="M1200 336.7V350H0V0s22.4 276.4 1200 336.7z"/></svg>',
                    ],
                    'gb-curve-2' => [
                        'label' => sprintf(__('Curve %s', 'enokh-blocks'), '2'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 350" preserveAspectRatio="none"><path d="M1200 350V0C22.4 60.3 0 336.7 0 336.7V350h1200z"/></svg>',
                    ],
                    'gb-curve-3' => [
                        'label' => sprintf(__('Curve %s', 'enokh-blocks'), '3'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 211.2" preserveAspectRatio="none"><path d="M600 188.4C321.1 188.4 84.3 109.5 0 0v211.2h1200V0c-84.3 109.5-321.1 188.4-600 188.4z"/></svg>',
                    ],
                    'gb-curve-4' => [
                        'label' => sprintf(__('Curve %s', 'enokh-blocks'), '4'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 211.2" preserveAspectRatio="none"><path d="M1200 188.4v22.8H0v-22.8C84.3 78.9 321.1 0 600 0s515.7 78.9 600 188.4z"/></svg>',
                    ],
                ],
            ],
            'gb-triangles' => [
                'group' => esc_attr__('Triangles', 'enokh-blocks'),
                'shapes' => [
                    'gb-triangle-1' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '1'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M1200 100H0V0l400 77.2L1200 0z"/></svg>',
                    ],
                    'gb-triangle-2' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '2'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M1200 77.2L400 0 0 77.2V100h1200z"/></svg>',
                    ],
                    'gb-triangle-3' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '3'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 70" preserveAspectRatio="none"><path d="M1200 0v70H0V0h530l70 50 70-50z"/></svg>',
                    ],
                    'gb-triangle-4' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '4'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 70" preserveAspectRatio="none"><path d="M670 50L600 0l-70 50H0v20h1200V50z"/></svg>',
                    ],
                    'gb-triangle-5' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '5'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 50" preserveAspectRatio="none"><path d="M1200 0v50H0V0h560l40 30 40-30z"/></svg>',
                    ],
                    'gb-triangle-6' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '6'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 50" preserveAspectRatio="none"><path d="M640 30L600 0l-40 30H0v20h1200V30z"/></svg>',
                    ],
                    'gb-triangle-7' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '7'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 230" preserveAspectRatio="none"><path d="M1200 230H0V0l600 207.2L1200 0z"/></svg>',
                    ],
                    'gb-triangle-8' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '8'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 230" preserveAspectRatio="none"><path d="M1200 207.2L600 0 0 207.2V230h1200z"/></svg>',
                    ],
                    'gb-triangle-9' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '9'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 131" preserveAspectRatio="none"><path d="M1200 131H0V40l154.8 50L410 35l277 69L899 0l301 110z"/></svg>',
                    ],
                    'gb-triangle-10' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '10'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 131" preserveAspectRatio="none"><path d="M1200 0L899 110 687 6 410 75 154.8 20 0 70v61h1200z"/></svg>',
                    ],
                    'gb-triangle-11' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '11'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 176" preserveAspectRatio="none"><path d="M0 0l400 156 400-88 400 74v34H0z"/></svg>',
                    ],
                    'gb-triangle-12' => [
                        'label' => sprintf(__('Triangle %s', 'enokh-blocks'), '12'),
                        'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 176" preserveAspectRatio="none"><path d="M0 176h1200V14L800 88 400 0 0 156z"/></svg>',
                    ],
                ],
            ],
        ];
        //@phpcs:enable
    }
}
