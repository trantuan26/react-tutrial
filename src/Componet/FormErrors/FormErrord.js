import React, {Component} from 'react';

class FormErrors extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='formErrors'>
                {Object.keys(formErrors).map((fieldName, i) => {
                    if(formErrors[fieldName].length > 0){
                        return (
                            <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                        )
                    } else {
                        return '';
                    }
                })}
            </div>
        );
    }
}

export default FormErrors;