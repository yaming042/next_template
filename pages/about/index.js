import { useEffect, useState, useRef } from 'react';

export default props => {
    const initState = () => ({}),
        [state, setState] = useState(initState);

    useEffect(() => {}, []);

    return (
        <div>关于我</div>
    )
}
