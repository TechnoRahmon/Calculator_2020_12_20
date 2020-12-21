import React,{useState , useEffect} from 'react';




const History = ({  newHistory , InsertFromHistory,isHistoryEmpty }) => {

    const [history, setHistory] = useState([]);


    useEffect(()=>{
        if (newHistory.sequence)
            setNewHistory(newHistory)
    },[newHistory, ])
    
  
    useEffect(()=>{
        isHistoryEmpty(history)
    },[history])


    // set new history function
    const setNewHistory= (newItem) =>{
            setHistory([...history, {sequence:newItem.sequence,resualt:newItem.resualt}])
    }

 


    return (
        <div className="col s12 l4 z-depth-1 lighten-1 historyCol" id="historyCol">
            <h5>History</h5>
       
            <div className="white history_box">
                <ul className="collection">
                    {history.length?(history.map(el=>
                        <li className="collection-item left " key={Date.now()+el.resualt}>
                            <a href="#" className="collectionLink" onClick={()=>{InsertFromHistory(el.resualt) }}> {el.sequence} <h5> = {el.resualt}</h5></a>
                        </li>
                    )):null}
                </ul>

            </div>
        

            <span className="btn z-depth-1 ClearHistoryBtn deep-orange waves-effect waves-teal" onClick={()=>{setHistory([])}}>Clear History</span>
        </div>
    );
}

export default History;
