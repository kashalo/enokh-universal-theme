import { hasNumericValue } from '../../utils';
import { Component } from '@wordpress/element';
import { RangeControl, TextControl } from '@wordpress/components';

export default class CustomRangeControl extends Component< CustomRangeControlProps > {
    render() {
        const {
            label,
            value,
            onChange,
            rangeMin = 0,
            rangeMax = 100,
            inputMin = '',
            inputMax = '',
            step = 1,
            help = '',
            beforeIcon = '',
            initialPosition = '',
            placeholder = '',
        } = this.props;

        return (
            <div className="enokh-blocks-range-control">
                { label && <div className="enokh-blocks-range-control--label">{ label }</div> }

                <div className="enokh-blocks-range-control--wrapper">
                    <div className="enokh-blocks-range-control--range">
                        <RangeControl
                            className={ 'enokh-blocks-range-control-range' }
                            // @ts-ignore
                            beforeIcon={ beforeIcon }
                            // @ts-ignore
                            value={ hasNumericValue( value ) ? parseFloat( value as string ) : '' }
                            onChange={ ( newVal ) => onChange( newVal ) }
                            min={ rangeMin }
                            max={ rangeMax }
                            step={ step }
                            withInputField={ false }
                            // @ts-ignore
                            initialPosition={ initialPosition }
                        />
                    </div>

                    <div className="enokh-blocks-range-control-input">
                        <TextControl
                            type="number"
                            placeholder={ '' !== placeholder ? placeholder : '' }
                            min={ inputMin }
                            max={ inputMax }
                            step={ step }
                            value={ hasNumericValue( value ) ? value : '' }
                            onChange={ ( newVal ) => onChange( newVal ) }
                            onBlur={ () => {
                                if ( hasNumericValue( value ) ) {
                                    onChange( parseFloat( value as string ) );
                                }
                            } }
                            onClick={ ( e ) => {
                                e.currentTarget.focus();
                            } }
                        />
                    </div>
                </div>

                { help && <p className="components-base-control__help">{ help }</p> }
            </div>
        );
    }
}
