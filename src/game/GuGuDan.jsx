import React, {memo, useState, useRef} from 'react';

const GuGuDan = memo( () =>{
    const [first, setFirst]     = useState( Math.ceil(Math.random() * 9 ) );
    const [second, setSecond]   = useState( Math.ceil(Math.random() * 9 ) );
    const [value, setValue]     = useState('');
    const [result, setResult]   = useState('');
    const inpytRef              = useRef();

    const submitEvent = (e)=>{
        e.preventDefault();
        if( parseInt(value) === parseInt(first * second) ){
            setResult( '정답!' );
            setValue('');
            setFirst(Math.ceil(Math.random() * 9 ));
            setSecond(Math.ceil(Math.random() * 9 ));
        }else{
            setResult( '땡 틀렸습니다' );
            setValue('');
        }

        inpytRef.current.focus();
    };

    const changeEvnt = (e) =>{
        setValue( e.target.value );
    }

    return (
        <>
            <div>{first} * {second} = </div>
            <form onSubmit={submitEvent}>
                <input ref={inpytRef} value={value} type="number" onChange={changeEvnt} />
                <button type="submit">확인</button>
            </form>
            <div id="result">{result}</div>
        </>
    );
});

export default GuGuDan;