import Display from './Dispaly'
import './style.scss'

import React ,{ useState  }from 'react';

const Controller = () => {


    const [operators,setOperators] = useState({
        '+':(a,b)=>a+b,
        '-':(a,b)=>a-b,
        'x':(a,b)=>a*b,
        '/':(a,b)=>a/b,
        '%':(a,b)=>a%b,
    })

    const getResault = (sequence)=>{
        // check the last item (number / operator)
        if ( Number(sequence[sequence.length-1]) ){

            let ResualtSequence=sequence;
            let endPoint= (sequence.length+1)/2
            let newItem = 0; 
           for(let i=1; i< endPoint ; i++){
                newItem = operators[ResualtSequence[1]](Number(ResualtSequence[0]),Number(ResualtSequence[2]))
                ResualtSequence=[ newItem , ...ResualtSequence.slice(3) ]
                //console.log(ResualtSequence,i);
           }
           //return the final Resualt
           return ResualtSequence[0]
        }else
            alert('Invalid Format Used')
    
        
        //return ((number1!==null) && (number2!==null)&&(op))?operators[op](Number(number1),Number(number2)):false
    }
    
    //console.log(getResault(2,2));



    return (
        <div className="container">
            <Display getResualt={getResault}></Display>
        </div>
    );




}

export default Controller;











