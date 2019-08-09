import React, {memo, useRef, useState} from 'react';
import BaseBall_Try from './BaseBall_Try';

function getNumbers(){
    const itemList = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i += 1){
        const item = itemList.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(item);
    }

    return array;
};

const Baseball = memo( ()=> {

    const [data, setData] = useState({
       result   : '',
       value    : '',
       answer   : getNumbers()
    });
    const [tries, setTries] = useState([]);
    const inputRef          = useRef();

    const submitEvent = (e) =>{
        e.preventDefault();
        if( data.value === data.answer.join('') ){
            //리엑트는 state 값이 변경되야 렌더링을 다시하는데
            //이미 선언된 배열에서 값을 추가해봤자 참조(주소)가 변하지 않으니까 감지를 못한다 그래서 배열값을 변경할때는 기존 배열값을 복사하고 새로운 값을 넣어줘야한다
            setData({...data,result : '홈런'});
            setTries([...tries, { try: data.value, result: '홈런' }]);
            
        }else{
            const answerArray = data.value.split('').map( (v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9){
                setData({
                    ...data,
                    result : `게임오버 답은 ${data.answer.join('')} 입니다`
                });
                alert('게임을 다시 시작합니다.');
                setData({
                    ...data,
                    value    : '',
                    answer   : getNumbers()
                });
                setTries([]);
            }else{
                for(let i = 0; i < 4; i += 1){
                    if(answerArray[i] === data.answer[i]){
                        strike += 1;
                    }else if(data.answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                setTries([...tries, { try: data.value, result: `${strike} Strike ${ball} Ball !!!`}]);
                setData({
                    ...data,
                    value : ''
                })
                console.log(data.answer);
            }
        }

        inputRef.current.focus();
    };

    const changEvent = (v) =>{
        setData({
            ...data,
            value : v.target.value
        })
    }

    const reStart = (e) =>{
        if( confirm("게임을 재시작합니다") ){
            setData({
                ...data,
                value    : '',
                result   : '',
                answer   : getNumbers()
            });
            setTries([]);
        }
    }

    let array = [
        {item : '사과', lv : 1 },
        {item : '귤',   lv : 2 },
        {item : '수박', lv : 3 },
        {item : '밤',   lv : 4 },
        {item : '당근', lv : 5 },
        {item : '무',   lv : 6 },
    ];

    return (
        <>
            <h1>{data.result}</h1>
            <form onSubmit={submitEvent}>
                {/* value 값이 변경이 없으면 defaultValue */}
                {/* <input maxLength={4} defaultValue = {data.value} ></input>*/}
                {/* value 값이 변경이 있으면 onChange 함수와 같이 사용 */}
                <input maxLength={4} ref={inputRef} type="number" value={data.value} onChange={changEvent} ></input>
            </form>
            <button style={{ display : data.result === '홈런' ? 'block' : 'none'}} onClick={reStart}>재시작</button>
            <div>{tries.length} 회차 시도</div>
            <ul>
                {/* 배열을 활용한 반복문 문법 */}
                {array.map( (v, index) => {
                    return(
                        // 반복문 처리할때 해당 아이템의 key 값가지고 react가 아이템을 찾기때문에 중복이 안되게끔 key 값을 지정해야함
                        // key 값을 정할땐 index 값은 웬만하면 쓰지 않는게 좋음
                        <li key={v.lv}>{v.item} lv : {v.lv}</li>
                    );
                })}
                <span>-----------------------------------------------</span>
                {/* 반복해서 처리하는 쪽을 별도의 컴포넌트로 만들어서 처리 */}
                {tries.map( (data, index) => {
                    return(
                        //props data , index 이름은 변경해도 된다 여기서 data 라는 키워드로 전송했으면 받는쪽에서도 data 라는 키워드로 받아야한다.
                        //key 값도 고유하게 설정해야함
                        <BaseBall_Try key={ index + 1 } data={data} index={index} />
                    );
                })}
            </ul>
        </>
    );

});

export const hello = '안녕';    //import {hello} from '';  
export default Baseball;        //import Baseball from '';