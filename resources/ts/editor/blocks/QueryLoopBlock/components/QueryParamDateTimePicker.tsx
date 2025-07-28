import { BaseControl, DateTimePicker } from '@wordpress/components';

const QueryParamDateTimePicker = ( props: QueryParamDateTimePickerProps ): JSX.Element => {
    const { id, label, help, value, onChange } = props;

    const currentDate = !! value ? new Date( value ) : new Date();

    return (
        <div style={ { marginBottom: '24px' } }>
            <BaseControl id={ id } label={ label } help={ help }>
                <DateTimePicker currentDate={ currentDate } onChange={ onChange } is12Hour={ true } />
            </BaseControl>
        </div>
    );
};
export default QueryParamDateTimePicker;
