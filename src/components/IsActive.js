import React from 'react';

const IsActive = ({isActive}) => (
    <div>
        { isActive ? <div>active</div> : <div>not active</div>}
    </div>
);

export default IsActive;