import React , {Component} from 'react';
import './Demographics.css';

const Demographics = ({gender , Appearance}) => {
    console.log("on demographics page " , gender);
    console.log("on dmeographics page appearance is ",Appearance.name1 );
    if(1){
        return (
            <div>


                <table class="tftable " border="1">
                <tr><th >MULTICULTURAL APPEARANCE</th><th>PROBABILITY</th></tr>
                <tr><td>{`${Appearance.name1}`}</td><td>{`${Appearance.value1}`}</td></tr>
                <tr><td>{`${Appearance.name2}`}</td><td>{`${Appearance.value2}`}</td></tr>
                <tr><td>{`${Appearance.name3}`}</td><td>{`${Appearance.value3}`}</td></tr>
                <tr><td>{`${Appearance.name4}`}</td><td>{`${Appearance.value4}`}</td></tr>
                <tr><td>{`${Appearance.name5}`}</td><td>{`${Appearance.value5}`}</td></tr>
                <tr><td>{`${Appearance.name6}`}</td><td>{`${Appearance.value6}`}</td></tr>
                <tr><td>{`${Appearance.name7}`}</td><td>{`${Appearance.value7}`}</td></tr>
                <tr><th >GENDER APPEARANCE</th><th>PROBABILITY</th></tr>
                <tr><td>{`${gender.gender1}`}</td><td>{`${gender.value1}`}</td></tr>
                <tr><td>{`${gender.gender2}`}</td><td>{`${gender.value2}`}</td></tr>
                </table>




            </div>
        );
    }
}

export default Demographics;