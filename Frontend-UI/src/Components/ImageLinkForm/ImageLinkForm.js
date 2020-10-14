import React from 'react';
import './ImageLinkForm.css'
const ImageLinkForm = ({onInputChange,onSubmit}) => {
    return (
        <div>
         <p className='f3'>This Smart Brain will detect faces !</p>
         <div className='pa4 shadow-5 br3 center form w-50'>
             <input className='f4 pa2 w-70 center' type='text'
              onChange={onInputChange} / >
             <button className='grow w-30 f4 ph3 pv2 link dib white bg-light-purple' 
             onClick={onSubmit} >Detect</button>
         </div>
        </div>
    )
};

export default ImageLinkForm ;

