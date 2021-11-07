import Camera from '../icons/camera';
import Pets from '../icons/pets';
import Restaurant from '../icons/restaurant';
import Savings from '../icons/savings';
import Wallet from '../icons/wallet';
import Celebration from '../icons/celebration';

const Icons = ({ icon, handleIcon, active, type }) => {
    switch(icon) {
        case 'camera': return (<Camera active={active} onClick={() => handleIcon(icon)} color={type} />);
        case 'pets': return (<Pets active={active} onClick={() => handleIcon(icon)} color={type} />);
        case 'restaurant': return (<Restaurant active={active} onClick={() => handleIcon(icon)} color={type} />);
        case 'savings': return <Savings active={active} onClick={() => handleIcon(icon)} color={type} />;
        case 'wallet': return <Wallet active={active} onClick={() => handleIcon(icon)} color={type} />;
        case 'celebration': return <Celebration active={active} onClick={() => handleIcon(icon)} color={type} />;
        default: return (<div />)
    }
}

export default Icons;
