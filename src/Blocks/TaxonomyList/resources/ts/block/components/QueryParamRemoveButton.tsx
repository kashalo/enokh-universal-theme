import { __ } from '@wordpress/i18n';
import { Button, Tooltip } from '@wordpress/components';
import { getIcon } from '@enokh-blocks/utils';

const QueryParamRemoveButton = ( props: any ) => {
    const { id, onClick } = props;
    return (
        <Tooltip text={ __( 'Delete parameter', 'enokh-blocks' ) }>
            <Button
                className="enokh-blocks-remove-parameter"
                onClick={ () => {
                    // eslint-disable-next-line
                    if ( window.confirm( __( 'This will permanently delete this parameter.', 'enokh-blocks' ) ) ) {
                        onClick( id );
                    }
                } }
                icon={ getIcon( 'trash' ) }
            />
        </Tooltip>
    );
};
export default QueryParamRemoveButton;
