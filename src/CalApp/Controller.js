import Display from './Dispaly'
import History from './History';
import './style.scss'

import React ,{ useState  }from 'react';

const Controller = () => {


    // operators methodes state 
    const [operators,setOperators] = useState({
        '+':(a,b)=>a+b,
        '-':(a,b)=>a-b,
        'x':(a,b)=>a*b,
        '/':(a,b)=>a/b,
        '%':(a,b)=>a%b,
    })



    // get resault function 
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
           // set new history
           setNewHistory({ sequence:sequence , resualt:ResualtSequence[0]})
           // clear NewNumber from history
           setNewNumber('');
           //return the final Resualt
           return ResualtSequence[0]
        }else
            alert('Invalid Format Used')
    }
    
    

    //show history function
    const showHistory =()=>{
        let historyCol = document.getElementById('historyCol')
        let historyColMobile = document.getElementById('historyColMobile')
        
            if(historyCol.style.display === '' || historyCol.style.display ==='none'){
                         //console.log(historyCol)
            historyCol.style.display='flex';
            }
            else
            historyCol.style.display='none';
        //histoy for mobile
        if(historyColMobile.style.display === '' || historyColMobile.style.display ==='none'){
                         //console.log(historyColMobile)
            historyColMobile.style.display='flex';
            }
            else
            historyColMobile.style.display='none';

            
    }


    // active HistoryButton
    const isHistoryEmpty = (history)=>{
        let historyCol = document.getElementById('historyCol')
        let historyColMobile = document.getElementById('historyColMobile')


        if(history.length === 0){ 
           document.getElementById('HistoryBtn').classList.add('disabled');
           historyCol.style.display='none';
           // for mobile
           historyColMobile.style.display='none'
        
        }else{ 
            document.getElementById('HistoryBtn').classList.remove('disabled');
            
        }



    }


    // History Functions Handler
    const [newHistory ,setNewHistory]=useState({sequence:'',resualt:''});
    const [newNumber , setNewNumber ] = useState('');

    // insert number from history
    const InsertFromHistory = (_newNumber)=>{
            setNewNumber(newNumber+_newNumber); 
    }

    // Clear new number from historyClick function 
    const Clear_newNumber = ()=>{
       setNewNumber('');
    }







    return (
        <div className="container controllerContainer">
           <div className="row controllerRow">

                <div className="col s12 headerCol">
                    <h1>Calculator App </h1>
                    <div className="divider"></div>
                </div>
               <div className="historyCol hide-on-small-only col s12 l4 z-depth-1 lighten-1 " id="historyCol">
                    <History  newHistory={newHistory}
                    InsertFromHistory={InsertFromHistory}
                    isHistoryEmpty={isHistoryEmpty}/>    
               </div>

        <div className=" hide-on-med-and-up col s12 l4 z-depth-1 lighten-1 historyColMobile "id="historyColMobile"> 
                    <History  newHistory={newHistory}
                InsertFromHistory={InsertFromHistory}
                isHistoryEmpty={isHistoryEmpty}/>  
        </div>
    


                <div className="col s12 l6 offset-l3 calculatorCol">
                    <Display getResualt={getResault} 
                    showHistory={showHistory} 
                    newNumber={newNumber} 
                    Clear_newNumber={Clear_newNumber}>
                    </Display>
                </div>
           </div>
        </div>
    );




}

export default Controller;











