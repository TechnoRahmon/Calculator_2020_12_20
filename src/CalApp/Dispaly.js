import {
    ESCAPE_KEY,
    NUMPAD1_KEY,
    NUMPAD2_KEY,
    NUMPAD3_KEY,
    NUMPAD4_KEY,
    NUMPAD5_KEY,
    NUMPAD6_KEY,
    NUMPAD7_KEY,
    NUMPAD8_KEY,
    NUMPAD9_KEY,
    NUMPAD0_KEY,
    NUMPADDECIMAL_KEY,
    NUMPADADD_KEY,
    NUMPADSUBTRACT_KEY,
    NUMPADMULTIPLY_KEY,
    NUMPADDIVIDE_KEY,
    BACKSPACE_KEY,
    ENTER_KEY,
} from './KeyCodes';

import React ,{useState , useEffect  }from 'react';
import useEventListener from './useEventListener';



const DisplayDom = ({getResualt, showHistory ,newNumber,Clear_newNumber}) => {


    
    // keydown callback function handler
    const KeydownHandle = (evnet)=>{   
        switch ( evnet.keyCode){

            case ESCAPE_KEY:
                _handelReseatClick()
                
                break;

            case BACKSPACE_KEY:
                _handleBackSpace()
                break;

            case ENTER_KEY:
                _handelResualt()
                break;

            case NUMPADADD_KEY :
                    
                    _handelOperatorClick({target:{textContent:'+'}}) 
                    break;


            case NUMPADSUBTRACT_KEY :
                    
                    _handelOperatorClick({target:{textContent:'-'}}) 
                    break;

            case NUMPADMULTIPLY_KEY :
                    
                    _handelOperatorClick({target:{textContent:'x'}}) 
                    break;


            case NUMPADDIVIDE_KEY :
                    
                    _handelOperatorClick({target:{textContent:'/'}}) 
                    break;

            case NUMPAD1_KEY :
                 
                _handelNumbersClick({target:{textContent:'1'}}) 
                break;



            case NUMPAD2_KEY :
                _handelNumbersClick({target:{textContent:'2'}}) 
                break;    
                

            case NUMPAD3_KEY :
                _handelNumbersClick({target:{textContent:'3'}}) 
                break;  

            case NUMPAD4_KEY :
                 _handelNumbersClick({target:{textContent:'4'}})
                break; 

            case NUMPAD5_KEY :
                 _handelNumbersClick({target:{textContent:'5'}})
                break; 

            case NUMPAD6_KEY :
                 _handelNumbersClick({target:{textContent:'6'}})
                break; 

            case NUMPAD7_KEY :
                 _handelNumbersClick({target:{textContent:'7'}})
                break; 

            case NUMPAD8_KEY :
                 _handelNumbersClick({target:{textContent:'8'}})
                break; 
            
            case NUMPAD9_KEY :
                 _handelNumbersClick({target:{textContent:'9'}})
                break; 

            case NUMPAD0_KEY :
                 _handelNumbersClick({target:{textContent:'0'}})
                break; 

            case NUMPADDECIMAL_KEY :
                _handelNumpadDecimal({target:{textContent:'.'}})
                                break;     

            default:
                break;
        }
    }

    //Add evnetListener using our Hook
    useEventListener('keydown', KeydownHandle);


    /* State */
    const [buttonsView,setButtonsView]=useState(['AC','+/-','%','/','7','8','9','x','4','5','6','-','1','2','3','+','0','.','='])


    const [sequence , setSequence] = useState([]);


        //  print out calcualte content
        useEffect(() => {
            if(newNumber){
                setSequence([newNumber])
            }
        },[newNumber]);



        // handel rest click
        const _handelReseatClick= (e)=>{
            setSequence([])  
            Clear_newNumber()     
        }


        // handel operators click
        const _handelOperatorClick = (e)=>{
            // set in the operator after the number1 
            if(Number(sequence[sequence.length-1]))
                    setSequence([...sequence ,e.target.textContent])
            else
                setSequence([...sequence.slice(0,sequence.length-1), e.target.textContent])

        }



        //handel numbers clicks 
        const _handelNumbersClick=(e)=>{
            //set in number1 if there is no operator
            if ( !sequence.length || isNaN(Number(sequence[sequence.length-1])) ){
                //_handelReseatClick()
                setSequence([...sequence ,e.target.textContent ])   
                
                    }

            else if(sequence.length ===1){
                // set in number2 after the operator 
                
                setSequence([sequence[sequence.length-1]+e.target.textContent])

                    }
            else{
                
                setSequence([...sequence.slice(0,sequence.length-1), sequence[sequence.length-1]+e.target.textContent])
            }
        }




        // handle Decimal point
        const _handelNumpadDecimal = (e)=>{
            
            if ( ((Number(sequence[sequence.length-1]) % 2) === 0 || (Number(sequence[sequence.length-1]) % 2) === 1) && sequence[sequence.length-1].match(/.$/)!='.' ){
                
                if(sequence.length ===1){
                    // set in number2 after the operator 
                    
                    setSequence([sequence[sequence.length-1]+e.target.textContent])
    
                        }
                else if(sequence.length >1){
                    
                    setSequence([...sequence.slice(0,sequence.length-1), sequence[sequence.length-1]+e.target.textContent])
                }

            }else if(sequence.length ===0){
                    setSequence(['0'+e.target.textContent])

            }else if(sequence.length >=1 && isNaN(Number(sequence[sequence.length-1])) ){
                    
                    setSequence([...sequence ,'0'+e.target.textContent])

            }else if(sequence.length >=1 && sequence[sequence.length-1] === 0  ){
                
                setSequence([...sequence ,'0'+e.target.textContent])

            }
        }

        // handle backspace button
        const _handleBackSpace = e =>{
            //if sequence length if one item 
            if  ( sequence.length ===1 && Number(sequence[sequence.length-1]) >=10 ){
                setSequence([ sequence[sequence.length-1].slice(0,sequence[sequence.length-1].length-1 ) ])
            }else if(sequence.length ===1 && Number(sequence[sequence.length-1]) < 10  ){
                setSequence([])
            }
            // if last item is operator OR it is one digit number
            else if ( isNaN(Number(sequence[sequence.length-1])) ||  (Number(sequence[sequence.length-1])>=0 && Number(sequence[sequence.length-1]) <10) ){
                    
                    setSequence([ ...sequence.slice(0,sequence.length-1) ])
            
            // if last item is number has many digits        
            }else if ( Number(sequence[sequence.length-1]) >=10 ){
                
                setSequence([ ...sequence.slice(0,sequence.length-1) , sequence[sequence.length-1].slice(0,sequence[sequence.length-1].length-1 ) ])
            }
        }


        // handle sign Toggle button
        const _handleSignToggle = e =>{

            // if the last item is a positive number
             if ( Number(sequence[sequence.length-1]) > 0){
                //if sequence has one item
                if ( sequence.length === 1){
                    setSequence([ '-'+ Math.abs(Number(sequence[sequence.length-1])) ])
                //if sequence has many items
                }else if (sequence.length >1){
                    setSequence([ ...sequence.slice(0,sequence.length-1) ,'-'+Math.abs(Number(sequence[sequence.length-1])) ])
                }
                
            // if the last item is a Negative number
            }else if (Number(sequence[sequence.length-1]) < 0){
                //if sequence has one item
                if ( sequence.length === 1){
                    setSequence([ '+'+ Math.abs(Number(sequence[sequence.length-1])) ])
                //if sequence has many items
                }else if (sequence.length >1){
                    setSequence([ ...sequence.slice(0,sequence.length-1) ,'+'+Math.abs(Number(sequence[sequence.length-1])) ])
                }
            }
        }

        // Get sequence Resault
        const _handelResualt =(e)=>{
            // if sequence has many items
            if (  sequence.length > 1 ){
                setSequence( [getResualt(sequence)?.toString()])
            }
            
        }

        
/********************* VIEW **************** */
        // set the buttonsView 
        let index =0
        let view = buttonsView.map((element)=>{
            index++
            // Clear button
            if (index===1){
                return <div className={"AC_Btn div"+index} key={index} onClick={_handelReseatClick}><b>{element}</b></div>
            // Toggle sign Button
            }else if ( index === 2 ) {
                return <div className={"Operator_Btn div"+index} key={index} onClick={_handleSignToggle}>{element}</div>
            // Numbers Buttons 
            }else if ((index>=5 && index<8)|| (index >=9 && index<12)||(index >= 13 && index <16)|| ( index ===17)) {
                return <div className={"div"+index} key={index} onClick={_handelNumbersClick}>{element}</div>
            
            // Float point Button
            }else if (index ===18){ 
                return <div className={"div"+index} key={index} onClick={_handelNumpadDecimal}>{element}</div>
            }
            // Equal Button
            else if (index ===19){ 
                return <div className={"Equal_Btn div"+index} key={index} onClick={_handelResualt}>{element}</div>
            }
            //Operators Buttons
            else{
                return <div className={"Operator_Btn div"+index} key={index} onClick={_handelOperatorClick}>{element}</div>

            }
                
        })
/********************* **************** */

   let n =0;
    return (
        <div className='calc_box '>
                {sequence.length?
                <div >
                    <div className="row seqRow"> 
                        <div className="col s12 l12  ">{sequence.map(el=>{  
                            return(<span key={++n} className="left digit"> {el} </span>)
                            } ) } 
                        </div>
                        
                    </div>
                    <div className="row">
                        
                        <div className="col s12 l1">
                            <span className="btn HistoryBtn disabled" id="HistoryBtn" onClick={showHistory}>History</span>
                        </div>
                        
                        <div className="col s12 l1 offset-l10">
                            <span className="btn  backspaceBtn " onClick={_handleBackSpace} >
                                <i className="material-icons icon">close</i>
                            </span> 
                        </div>
                
                    </div>

                </div>    
                    
                    :
                    
                    <div>
                        <div className="row emptyRow">
                      
                        </div>
                        <div className="row">
                            {/* History button */}
                            <div className="col s12 l1">
                                <span className="btn HistoryBtn disabled"  id="HistoryBtn" onClick={showHistory}>History</span>
                            </div>
                            {/* backspace button */}
                            <div className="col s12 l1 offset-l10">
                                <span className="btn  backspaceBtn disabled">
                                    <i className="material-icons icon ">close</i>
                                </span> 
                            </div>
                        </div>
                    </div>
                    
                    }
            <div className="parent">
                {view}
            </div>
        </div>
    );

}

export default DisplayDom;
