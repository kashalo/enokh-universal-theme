import { BaseControl, ButtonGroup, Button, Tooltip } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { flexOptions } from '../options';
import classnames from 'classnames';

const LayoutControl = ( props: LayoutControlProps ): JSX.Element => {
    const { value, onChange, label, attributeName, directionValue, fallback, options } = props;
    const buttonOptions = options ? options : flexOptions[ attributeName ];

    function ButtonElement( option ) {
        return (
            <Button
                isPrimary={ option.value === value }
                className={ ! value && fallback === option.value ? 'is-inherited' : '' }
                onClick={ () => onChange( option.value ) }
            >
                { option.icon || option.label }
            </Button>
        );
    }

    return (
        <BaseControl
            id={ attributeName }
            label={ label }
            className={ classnames( {
                [ `enokh-blocks-flex-direction-${ attributeName + '-' + directionValue }` ]: true,
            } ) }
        >
            <ButtonGroup id={ attributeName } className="enokh-blocks-flex-button-group">
                { buttonOptions.map( ( flexOption, index ) => {
                    return (
                        <Fragment key={ attributeName + index }>
                            { !! flexOption.icon ? (
                                <Tooltip text={ flexOption.label || flexOption.value }>
                                    { ButtonElement( flexOption ) }
                                </Tooltip>
                            ) : (
                                ButtonElement( flexOption )
                            ) }
                        </Fragment>
                    );
                } ) }
            </ButtonGroup>
        </BaseControl>
    );
};
export default LayoutControl;
