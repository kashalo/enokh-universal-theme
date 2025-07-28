import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import getIcon from '../../utils/get-icon';

const UnitDropdown = ( props: UnitDropdownProps ): JSX.Element => {
    const { value, onChange, units = [], disabled } = props;

    if ( ! units.length ) {
        return null;
    }

    if ( ! units.includes( value ) ) {
        units[ units.length - 1 ] = value;
    }


    return (
        <>
            <DropdownMenu
                className="enokh-blocks-unit-control-units"
                label={ __( 'Select a unit', 'enokh-blocks' ) }
                icon={ null }
                toggleProps={ {
                    children: value,
                    disabled,
                } }
                popoverProps={ {
                    className: 'enokh-blocks-unit-control-popover',
                    focusOnMount: true,
                    noArrow: false,
                } }
            >
                { ( { onClose } ) => (
                    <>
                        <MenuGroup>
                            { units.map( ( unit ) => (
                                <MenuItem
                                    key={ unit }
                                    onClick={ () => {
                                        onChange( unit );
                                        onClose();
                                    } }
                                    isSelected={ unit === value }
                                    // @ts-ignore
                                    variant={ unit === value ? 'primary' : '' }
                                >
                                    { unit }
                                </MenuItem>
                            ) ) }

                            <MenuItem
                                onClick={ () => {
                                    window
                                        .open(
                                            'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units',
                                            '_blank'
                                        )
                                        .focus();
                                } }
                                label={ __( 'Learn more about units', 'enokh-universal-theme' ) }
                                // @ts-ignore
                                showTooltip={ true }
                            >
                                { getIcon( 'info' ) }
                            </MenuItem>
                        </MenuGroup>
                    </>
                ) }
            </DropdownMenu>
        </>
    );
};
export default UnitDropdown;
