import { Spinner } from '@nextui-org/react';

import styles from './index.module.scss';

export default props => {
    return (
        <div className={styles['loading']}>
            <Spinner/>
        </div>
    )
}
