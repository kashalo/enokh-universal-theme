import classnames from 'classnames';
import { RichText, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { BlockEditProps } from './types';
import _cloneDeep from 'lodash/cloneDeep';
import { applyFilters } from '@wordpress/hooks';
import { useMemo } from '@wordpress/element';

const Save = ( props: BlockEditProps ) => {
    const { attributes, className } = props;
    const { uniqueId, content, listMarker } = attributes;

    const htmlAttributes = {
        className: classnames( 'enokh-blocks-list-item', className, `enokh-blocks-list-item-${ uniqueId }` ),
    };

    const { icon, iconGroup } = listMarker;

    const hasIcon = !! icon && !! iconGroup;
    const blockProps = useBlockProps.save( htmlAttributes );

    return (
        <li { ...blockProps }>
            <div
                className={ classnames( {
                    'enokh-blocks-list-item__content': true,
                    'enokh-blocks-list-item__has-bullet': hasIcon,
                } ) }
            >
                <RichText.Content tagName="span" className="enokh-blocks-list-item__text" value={ content } />
            </div>
            <div className="enokh-blocks-list-item__children">
                <InnerBlocks.Content />
            </div>
        </li>
    );
};
export default Save;
