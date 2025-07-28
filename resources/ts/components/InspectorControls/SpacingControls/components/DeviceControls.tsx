import { useContext } from '@wordpress/element';
import BlockContext from '../../../../block-context';
import InlineWidth from './InlineWidth';
import StackVertically from './StackVertically';
import FillHorizontalSpace from './FillHorizontalSpace';

const DeviceControls = ( props: DeviceControlsProps ): JSX.Element => {
    const {
        supports: { spacing },
    } = useContext( BlockContext );
    const { inlineWidth, stack, fill, onChangeInlineWidth, onChangeStack, onFillChange } = props;

    return (
        <>
            { spacing.inlineWidth && <InlineWidth checked={ inlineWidth } onChange={ onChangeInlineWidth } /> }
            { spacing.stackVertically && <StackVertically checked={ stack } onChange={ onChangeStack } /> }
            { spacing.fillHorizontalSpace && <FillHorizontalSpace checked={ fill } onChange={ onFillChange } /> }
        </>
    );
};
export default DeviceControls;
