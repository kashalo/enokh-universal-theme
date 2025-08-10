<?php

declare(strict_types=1);

namespace Enokh\UniversalTheme\Blocks\TaxonomyList;

use Enokh\UniversalTheme\Blocks\GridBlock;
use Enokh\UniversalTheme\Meta\PostCategory\Metabox;
use Inpsyde\Modularity;
use Psr\Container\ContainerInterface;

class Module implements Modularity\Module\ExecutableModule, Modularity\Module\ServiceModule
{
    use Modularity\Module\ModuleClassNameIdTrait;

    public function services(): array
    {
        return [
            Renderer::class => static fn () => new Renderer(),
        ];
    }

    public function run(ContainerInterface $container): bool
    {
        /** @var Modularity\Properties\Properties $properties */
        $properties = $container->get(Modularity\Package::PROPERTIES);

        add_action(
            'init',
            static function () use ($properties, $container) {
                $renderer = $container->get(Renderer::class);
                $gridBlock = $container->get(GridBlock::class);
                register_block_type_from_metadata(
                    $properties->basePath() . 'assets/Blocks/TaxonomyList',
                    [
                        'render_callback' => [$gridBlock, 'render'],
                    ]
                );
            },
            1
        );

        add_filter('rest_category_query', static function (array $args, \WP_REST_Request $request) {

            if (empty($request->get_param('isFeaturedTerm'))) {
                return $args;
            }

            $isFeaturedTerm = $request->get_param('isFeaturedTerm');
            $isExclude = $isFeaturedTerm === 'exclude';
            $isOnly = $isFeaturedTerm === 'only';

            if ($isOnly) {
                $args['meta_key'] = Metabox::META_KEY_IS_FEATURED_TERM;
                $args['meta_value'] = true;

                return $args;
            }

            if ($isExclude) {
                $newArgs = $args;
                $newArgs['meta_key'] = Metabox::META_KEY_IS_FEATURED_TERM;
                $newArgs['meta_value'] = true;
                $newArgs['fields'] = 'ids';
                $ids = get_terms($newArgs);
                /** Exclude featured items */
                $args['exclude'] = !empty($ids) ? $ids : [];

                return $args;
            }

            return $args;
        }, 10, 2);

        return true;
    }
}
