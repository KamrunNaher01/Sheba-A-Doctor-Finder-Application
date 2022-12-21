import React from 'react';

const PrimaryButton = ({children}) => {
    return (
        <div>
            <button className="btn btn-accent uppercase font-bold ">{children}</button>
        </div>
    );
};

export default PrimaryButton;