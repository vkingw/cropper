import React from 'react';


class Modal extends React.PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        const {uploadText,isError,errorText} = this.props
        return(
            <div className="modal-container modal-remove">
                {/* <div className="modal-mask"> </div> */}
                <div className="modal-alert vertical-center">
                    <div className="modal-message">{isError?errorText:uploadText}</div>
                </div>
            </div>
        )
    }
}


export default Modal