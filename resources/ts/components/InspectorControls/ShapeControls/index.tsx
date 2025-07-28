import {
    BaseControl,
    Button,
    Dropdown,
    PanelBody,
    PanelRow,
    SelectControl,
    TextControl,
    ToggleControl,
    Tooltip,
} from '@wordpress/components';
import BlockContext from '../../../block-context';
import { Fragment, useContext } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import classnames from 'classnames';
import ColorPickerControl from '../../ColorPickerControl';
import { getIcon, getAllShapes } from '../../../utils';
import CustomPanel from '@enokh-blocks/components/CustomPanel';

const ShapeControls = ( props: ShapeControlsProps ): JSX.Element => {
    const { deviceType, id } = useContext( BlockContext );
    const { attributes, setAttributes } = props;
    const { backgroundColor, shapeDividers, position } = attributes;

    // Get all shapes to array
    const allShapes = getAllShapes();

    const addShape = () => {
        const shapeDividersValues = [ ...shapeDividers ];
        const newItem: shapeItem = {
            shape: 'gb-waves-1',
            color: '#000000',
            colorOpacity: 1,
            location: 'bottom',
            height: 200,
            heightTablet: '',
            heightMobile: '',
            width: 100,
            widthTablet: '',
            widthMobile: '',
            flipHorizontally: false,
            zindex: '',
        };
        shapeDividersValues.push( newItem );

        setAttributes( {
            shapeDividers: shapeDividersValues,
            position: ! position ? 'relative' : position,
        } );
    };
    const removeShape = ( index: number ) => {
        const shapeDividersValues = [ ...shapeDividers ];

        shapeDividersValues.splice( index, 1 );
        setAttributes( { shapeDividers: shapeDividersValues } );
    };
    const sanitizeSVG = ( string ) => string;
    return (
        <CustomPanel
            id={ `${ id }ShapeControls` }
            title={ __( 'Shapes', 'enokh-blocks' ) }
            initialOpen={ false }
            className={ 'enokh-blocks-panel-label' }
        >
            <BaseControl className="enokh-blocks-shape-chooser">
                { shapeDividers.map( ( location, index ) => {
                    const shapeNumber = index + 1;

                    return (
                        <Fragment key={ index }>
                            <div className="enokh-blocks-shape-container">
                                <div
                                    className={ classnames( {
                                        'enokh-blocks-shape-toggle-preview': true,
                                        [ `enokh-blocks-shape-toggle-preview-${ shapeNumber }` ]: true,
                                    } ) }
                                    style={ { backgroundColor } }
                                >
                                    { typeof allShapes[ shapeDividers[ index ].shape ] !== 'undefined' && (
                                        <div
                                            className="enokh-blocks-shape-divider-preview"
                                            style={ { color: shapeDividers[ index ].color } }
                                            dangerouslySetInnerHTML={ {
                                                __html: sanitizeSVG( allShapes[ shapeDividers[ index ].shape ].icon ),
                                            } }
                                        />
                                    ) }
                                </div>
                                {
                                    /* translators: Shape number */
                                    sprintf( __( 'Shape %s', 'enokh-blocks' ), shapeNumber )
                                }

                                { /*Setting*/ }
                                <Fragment>
                                    <Dropdown
                                        contentClassName="enokh-blocks-shapes-dropdown"
                                        renderToggle={ ( { isOpen, onToggle } ) => (
                                            <Tooltip text={ __( 'Edit Shape', 'enokh-blocks' ) }>
                                                <Button
                                                    className="enokh-blocks-shape-dropdown"
                                                    isSecondary={ isOpen ? undefined : true }
                                                    isPrimary={ isOpen ? true : undefined }
                                                    icon={ getIcon( 'wrench' ) }
                                                    onClick={ onToggle }
                                                    aria-expanded={ isOpen }
                                                />
                                            </Tooltip>
                                        ) }
                                        renderContent={ () => (
                                            <div className="enokh-blocks-shape-controls">
                                                { deviceType === 'Desktop' && (
                                                    <Fragment>
                                                        <BaseControl className="enokh-blocks-icon-chooser">
                                                            { Object.keys( EnokhBlocksEditor.Config.blockShapes ).map(
                                                                ( svg, i ) => {
                                                                    const svgItems =
                                                                        EnokhBlocksEditor.Config.blockShapes[ svg ]
                                                                            .shapes;

                                                                    return (
                                                                        <PanelBody
                                                                            title={
                                                                                EnokhBlocksEditor.Config.blockShapes[
                                                                                    svg
                                                                                ].group
                                                                            }
                                                                            initialOpen={ svgItems.hasOwnProperty(
                                                                                shapeDividers[ index ].shape
                                                                            ) }
                                                                            key={ i }
                                                                        >
                                                                            <PanelRow>
                                                                                <BaseControl>
                                                                                    <ul className="enokh-blocks-icon-chooser enokh-blocks-shape-chooser">
                                                                                        { Object.keys( svgItems ).map(
                                                                                            ( svgItem, iconIndex ) => {
                                                                                                return (
                                                                                                    <li
                                                                                                        key={ `editor-pblock-types-list-item-${ iconIndex }` }
                                                                                                    >
                                                                                                        <Tooltip
                                                                                                            text={
                                                                                                                svgItems[
                                                                                                                    svgItem
                                                                                                                ].label
                                                                                                            }
                                                                                                        >
                                                                                                            <Button
                                                                                                                className={ classnames(
                                                                                                                    {
                                                                                                                        'editor-block-list-item-button':
                                                                                                                            true,
                                                                                                                        'enokh-blocks-shape-is-active':
                                                                                                                            shapeDividers[
                                                                                                                                index
                                                                                                                            ]
                                                                                                                                .shape ===
                                                                                                                            svgItem,
                                                                                                                    }
                                                                                                                ) }
                                                                                                                onClick={ () => {
                                                                                                                    const shapes =
                                                                                                                        [
                                                                                                                            ...shapeDividers,
                                                                                                                        ];

                                                                                                                    shapes[
                                                                                                                        index
                                                                                                                    ] =
                                                                                                                        {
                                                                                                                            ...shapes[
                                                                                                                                index
                                                                                                                            ],
                                                                                                                            shape: svgItem,
                                                                                                                        };

                                                                                                                    setAttributes(
                                                                                                                        {
                                                                                                                            shapeDividers:
                                                                                                                                shapes,
                                                                                                                        }
                                                                                                                    );
                                                                                                                } }
                                                                                                            >
                                                                                                                { typeof svgItems[
                                                                                                                    svgItem
                                                                                                                ]
                                                                                                                    .icon ===
                                                                                                                'string' ? (
                                                                                                                    <Fragment>
                                                                                                                        <span
                                                                                                                            className="editor-block-types-list__item-icon"
                                                                                                                            dangerouslySetInnerHTML={ {
                                                                                                                                __html: sanitizeSVG(
                                                                                                                                    svgItems[
                                                                                                                                        svgItem
                                                                                                                                    ]
                                                                                                                                        .icon
                                                                                                                                ),
                                                                                                                            } }
                                                                                                                        />
                                                                                                                    </Fragment>
                                                                                                                ) : (
                                                                                                                    <Fragment>
                                                                                                                        <span className="editor-block-types-list__item-icon">
                                                                                                                            {
                                                                                                                                svgItems[
                                                                                                                                    svgItem
                                                                                                                                ]
                                                                                                                                    .icon
                                                                                                                            }
                                                                                                                        </span>
                                                                                                                    </Fragment>
                                                                                                                ) }
                                                                                                            </Button>
                                                                                                        </Tooltip>
                                                                                                    </li>
                                                                                                );
                                                                                            }
                                                                                        ) }
                                                                                    </ul>
                                                                                </BaseControl>
                                                                            </PanelRow>
                                                                        </PanelBody>
                                                                    );
                                                                }
                                                            ) }
                                                        </BaseControl>

                                                        <BaseControl>
                                                            <ColorPickerControl
                                                                label={ __( 'Color', 'enokh-blocks' ) }
                                                                value={ shapeDividers[ index ].color }
                                                                alpha={ true }
                                                                valueOpacity={ shapeDividers[ index ].colorOpacity }
                                                                onChange={ ( value ) => {
                                                                    const shapes = [ ...shapeDividers ];

                                                                    shapes[ index ] = {
                                                                        ...shapes[ index ],
                                                                        color: value,
                                                                    };

                                                                    setAttributes( {
                                                                        shapeDividers: shapes,
                                                                    } );
                                                                } }
                                                                onOpacityChange={ ( value ) => {
                                                                    const shapes = [ ...shapeDividers ];

                                                                    shapes[ index ] = {
                                                                        ...shapes[ index ],
                                                                        colorOpacity: value,
                                                                    };

                                                                    setAttributes( {
                                                                        shapeDividers: shapes,
                                                                    } );
                                                                } }
                                                            />
                                                        </BaseControl>

                                                        <SelectControl
                                                            label={ __( 'Location', 'enokh-blocks' ) }
                                                            // @ts-ignore
                                                            value={ shapeDividers[ index ].location }
                                                            options={ [
                                                                {
                                                                    label: __( 'Top', 'enokh-blocks' ),
                                                                    value: 'top',
                                                                },
                                                                {
                                                                    label: __( 'Bottom', 'enokh-blocks' ),
                                                                    value: 'bottom',
                                                                },
                                                            ] }
                                                            onChange={ ( value ) => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    location: value,
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                        />

                                                        <TextControl
                                                            label={ __( 'Height(px)', 'enokh-blocks' ) }
                                                            type={ 'number' }
                                                            value={
                                                                shapeDividers[ index ].height
                                                                    ? shapeDividers[ index ].height
                                                                    : ''
                                                            }
                                                            onChange={ ( value ) => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    height: parseFloat( value ),
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                        />

                                                        <TextControl
                                                            label={ __( 'Width(%)', 'enokh-blocks' ) }
                                                            type={ 'number' }
                                                            value={
                                                                shapeDividers[ index ].width
                                                                    ? shapeDividers[ index ].width
                                                                    : ''
                                                            }
                                                            min="100"
                                                            onChange={ ( value ) => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    width: parseFloat( value ),
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                        />

                                                        <ToggleControl
                                                            label={ __( 'Flip Horizontally', 'enokh-blocks' ) }
                                                            checked={ !! shapeDividers[ index ].flipHorizontally }
                                                            onChange={ ( value ) => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    flipHorizontally: value,
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                        />

                                                        <TextControl
                                                            label={ __( 'z-index', 'enokh-blocks' ) }
                                                            type={ 'number' }
                                                            min="0"
                                                            value={
                                                                shapeDividers[ index ].zindex ||
                                                                0 === shapeDividers[ index ].zindex
                                                                    ? shapeDividers[ index ].zindex
                                                                    : ''
                                                            }
                                                            onChange={ ( value ) => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    zindex: value,
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                            onBlur={ () => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    zindex: shapeDividers[ index ].zindex,
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                            onClick={ ( e ) => {
                                                                e.currentTarget.focus();
                                                            } }
                                                        />
                                                    </Fragment>
                                                ) }

                                                { deviceType === 'Tablet' && (
                                                    <Fragment>
                                                        <TextControl
                                                            label={ __( 'Height(px)', 'enokh-blocks' ) }
                                                            type={ 'number' }
                                                            value={
                                                                shapeDividers[ index ].heightTablet
                                                                    ? shapeDividers[ index ].heightTablet
                                                                    : ''
                                                            }
                                                            onChange={ ( value ) => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    heightTablet: parseFloat( value ),
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                        />

                                                        <TextControl
                                                            label={ __( 'Width(%)', 'enokh-blocks' ) }
                                                            type={ 'number' }
                                                            value={
                                                                shapeDividers[ index ].widthTablet
                                                                    ? shapeDividers[ index ].widthTablet
                                                                    : ''
                                                            }
                                                            min="100"
                                                            onChange={ ( value ) => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    widthTablet: parseFloat( value ),
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                        />
                                                    </Fragment>
                                                ) }

                                                { deviceType === 'Mobile' && (
                                                    <Fragment>
                                                        <TextControl
                                                            label={ __( 'Height(px)', 'enokh-blocks' ) }
                                                            type={ 'number' }
                                                            value={
                                                                shapeDividers[ index ].heightMobile
                                                                    ? shapeDividers[ index ].heightMobile
                                                                    : ''
                                                            }
                                                            onChange={ ( value ) => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    heightMobile: parseFloat( value ),
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                        />

                                                        <TextControl
                                                            label={ __( 'Width(%)', 'enokh-blocks' ) }
                                                            type={ 'number' }
                                                            value={
                                                                shapeDividers[ index ].widthMobile
                                                                    ? shapeDividers[ index ].widthMobile
                                                                    : ''
                                                            }
                                                            min="100"
                                                            onChange={ ( value ) => {
                                                                const shapes = [ ...shapeDividers ];

                                                                shapes[ index ] = {
                                                                    ...shapes[ index ],
                                                                    widthMobile: parseFloat( value ),
                                                                };

                                                                setAttributes( {
                                                                    shapeDividers: shapes,
                                                                } );
                                                            } }
                                                        />
                                                    </Fragment>
                                                ) }
                                            </div>
                                        ) }
                                    />
                                </Fragment>

                                { deviceType === 'Desktop' && (
                                    <Tooltip text={ __( 'Delete Shape', 'enokh-blocks' ) }>
                                        <Button
                                            className="enokh-blocks-remove-shape"
                                            onClick={ () => {
                                                // eslint-disable-next-line
                                                if ( window.confirm( __( 'This will permanently delete this shape.', 'enokh-blocks' ) ) ) {
                                                    removeShape( index );
                                                }
                                            } }
                                            icon={ getIcon( 'x' ) }
                                        />
                                    </Tooltip>
                                ) }
                            </div>
                        </Fragment>
                    );
                } ) }
                { deviceType === 'Desktop' && (
                    <div className="enokh-blocks-add-new-shape">
                        <Button isSecondary onClick={ addShape }>
                            { __( 'Add Shape', 'enokh-blocks' ) }
                        </Button>
                    </div>
                ) }
            </BaseControl>
        </CustomPanel>
    );
};
export default ShapeControls;
