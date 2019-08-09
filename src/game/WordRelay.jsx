import React, {memo, useState, useRef} from 'react'

const WordRelay = memo( () =>{

    const [data, setDate]       = useState({
        input : '',
        outut : '라이언',
        result : ''
    });
    const inputRef              = useRef();

    const changeEvent = (e)=>{

        setDate({...data, input : e.target.value});
    };

    const clickEvent = (e)=>{
        e.preventDefault();
        let value = data.input;
        if( data.input.length === 0 ){
            setDate({...data, result : '단어를 입력하세요'});
        }else if( data.outut.substr( data.outut.length - 1, data.outut.length ) === data.input.substr(0, 1) ){

            setDate( (_data) => {
                return {
                        ...data, 
                        input : '',
                        outut : _data.input, 
                        result : '정답'
                    };
            });

        }else{
            setDate({...data, result : '땡', input : ''});
        }
    };

    return(
        <>
            <div>{data.outut}  쿵쿵따 ~</div>
            <form onSubmit={clickEvent}>
                <input type="text" value={data.input} onChange={changeEvent} ref={inputRef}></input>
                <button type="submit">전송</button>
            </form>
            <div>{data.result}</div>
        </>
    );
});

export default WordRelay;