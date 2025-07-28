import React from 'react';
import { PanelBody, FontSizePicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const HeadingStyles: React.FunctionComponent = ( props: TableOfContentBlockProps ) => {
    const { setAttributes } = props;
    const { headingFontSize } = props.attributes;
    const fontSize = [
        {
            name: __( 'Small' ),
            slug: 'small',
            size: 13,
        },
        {
            name: __( 'Medium' ),
            slug: 'medium',
            size: 20,
        },
        {
            name: __( 'Large' ),
            slug: 'large',
            size: 36,
        },
        {
            name: __( 'Extra Large' ),
            slug: 'x-large',
            size: 42,
        },
        {
            name: __( 'Extra Extra Large' ),
            slug: 'xx-large',
            size: 42,
        },
    ];

    const fontSizeClass = ( size: number ) => {
        for ( let index = 0; index < fontSize.length; index++ ) {
            if ( fontSize[ index ].size === size ) {
                return `has-${ fontSize[ index ].slug }-font-size`;
            }
        }
        return 'has-small-font-size';
    };

    return (
        <>
            <PanelBody title={ 'Heading Font Size' }>
                <FontSizePicker
                    disableCustomFontSizes={ true }
                    value={ headingFontSize }
                    fontSizes={ [
                        {
                            name: __( 'Small' ),
                            slug: 'small',
                            size: 13,
                        },
                        {
                            name: __( 'Medium' ),
                            slug: 'medium',
                            size: 20,
                        },
                        {
                            name: __( 'Large' ),
                            slug: 'large',
                            size: 36,
                        },
                        {
                            name: __( 'Extra Large' ),
                            slug: 'x-large',
                            size: 42,
                        },
                    ] }
                    onChange={ ( size: number ) => {
                        setAttributes( {
                            headingFontSize: size,
                            headingFontSizeClass: fontSizeClass( size ),
                        } );
                    } }
                />
            </PanelBody>
        </>
    );
};

export default HeadingStyles;
