import React from 'react';
import './FaceRecognition.css';
import Demographics from '../Demographics/Demographics.js';
import D1 from '../Demographics/D1.js';
const isImage=1;
const FaceRecognition = ({imageUrl , box}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='i' src ={imageUrl} width='500px' height='auto' className='center'/>
                <div className='bounding-box' 
                style={{top:box.topRow,right:box.rightCol,left:box.leftCol,bottom:box.bottomRow}}>
                </div>

            </div>
        
        </div>
    ); 
}

export default FaceRecognition;