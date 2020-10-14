import React from 'react';

const Rank = (props) => {
    return (
        <div className='f3 white vh-700' >
            {`${props.name} , your count is`}
            <div className='f1 '>
                {`${props.count}`}
            </div>
        </div>
    );
}

export default Rank;

