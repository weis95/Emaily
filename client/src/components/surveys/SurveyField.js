import React from 'react';

//Meta holds the error data. using nested destructuring on meta
//toched is a bolean if it's true it and if the error has data it will show the error
export default ({ input, label, meta: { error, touched}}) => {

    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    )
}