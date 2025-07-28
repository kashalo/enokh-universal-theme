import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getIcon } from '../../../../utils';

const StyleDropdownControl = ( props: StyleDropdownControlProps ): JSX.Element => {
    const { value, onChange } = props;
    const currentIcon = {
        none: getIcon( 'border-none' ),
        solid: getIcon( 'border-solid' ),
        dashed: getIcon( 'border-dashed' ),
        dotted: getIcon( 'border-dotted' ),
    };

    return (
        <>
            <DropdownMenu
                className="enokh-blocks-border-style"
                icon={ currentIcon[ value ] || getIcon( 'border-default' ) }
                label={ __( 'Select a style', 'enokh-blocks' ) }
            >
                { ( { onClose } ) => (
                    <>
                        <MenuGroup>
                            <MenuItem
                                icon={ getIcon( 'border-default' ) }
                                onClick={ () => {
                                    onChange( '' );
                                    onClose();
                                } }
                            >
                                { __( 'Default', 'enokh-blocks' ) }
                            </MenuItem>
                            <MenuItem
                                icon={ getIcon( 'border-none' ) }
                                onClick={ () => {
                                    onChange( 'none' );
                                    onClose();
                                } }
                            >
                                { __( 'None', 'enokh-blocks' ) }
                            </MenuItem>
                            <MenuItem
                                icon={ getIcon( 'border-solid' ) }
                                onClick={ () => {
                                    onChange( 'solid' );
                                    onClose();
                                } }
                            >
                                { __( 'Solid', 'enokh-blocks' ) }
                            </MenuItem>
                            <MenuItem
                                icon={ getIcon( 'border-dashed' ) }
                                onClick={ () => {
                                    onChange( 'dashed' );
                                    onClose();
                                } }
                            >
                                { __( 'Dashed', 'enokh-blocks' ) }
                            </MenuItem>
                            <MenuItem
                                icon={ getIcon( 'border-dotted' ) }
                                onClick={ () => {
                                    onChange( 'dotted' );
                                    onClose();
                                } }
                            >
                                { __( 'Dotted', 'enokh-blocks' ) }
                            </MenuItem>
                        </MenuGroup>
                    </>
                ) }
            </DropdownMenu>
        </>
    );
};
export default StyleDropdownControl;
