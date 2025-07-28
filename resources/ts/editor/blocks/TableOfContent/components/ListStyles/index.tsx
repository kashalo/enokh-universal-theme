import React from 'react';
import { PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { SelectControl, PanelBody } from '@wordpress/components';

const ListStyles: React.FunctionComponent = ( props: TableOfContentBlockProps ) => {
    const { setAttributes } = props;
    const { textColor, linkColor, background, listStyle } = props.attributes;

    return (
        <>
            <PanelColorSettings
                title={ __( 'List items color settings' ) }
                colorSettings={ [
                    {
                        value: textColor,
                        onChange: ( color: string ) => {
                            setAttributes( { textColor: color } );
                        },
                        disableCustomColors: false,
                        label: __( 'Text color' ),
                    },
                    {
                        value: linkColor,
                        onChange: ( color: string ) => {
                            setAttributes( { linkColor: color } );
                        },
                        disableCustomColors: false,
                        label: __( 'Link color' ),
                    },
                    {
                        value: background,
                        onChange: ( color: string ) => {
                            setAttributes( { background: color } );
                        },
                        disableCustomColors: false,
                        label: __( 'Background color' ),
                    },
                ] }
            />
            <PanelBody title={ 'List Style' }>
                <SelectControl
                    label={ __( 'Heading Level' ) }
                    // @ts-ignore
                    value={ listStyle }
                    options={ [
                        { label: 'Lower-alpha', value: 'lower-alpha' },
                        { label: 'Upper-alpha', value: 'upper-alpha' },
                        { label: 'Square', value: 'square' },
                        { label: 'Decimal', value: 'decimal' },
                        { label: 'None', value: 'none' },
                    ] }
                    onChange={ ( value: string ) => {
                        setAttributes( { listStyle: value } );
                    } }
                />
            </PanelBody>
        </>
    );
};

export default ListStyles;
