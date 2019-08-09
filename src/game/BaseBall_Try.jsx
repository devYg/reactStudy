import React, {memo, Component, useState} from 'react';

const BaseBall_Try = memo( ({ data }) => {
    //props(data)는 자식이 바꾸면 안된다. 만약 정 바꿔야 한다면
    //아래처럼 props를 state로 할당하여 할당된 변수 가지고 작업한다.
    const [result, setResult] = useState( data );
    return (
        <li>
            <div>{data.try}</div>
            <div>{data.result}</div> 
        </li>
    );
}); 

//클래스일때
// class BaseBall_Try extends Component{

//     //class 일경우 불필요한 렌더링이 발생하지 안도록 하는 방법(최적화)
//     //state 변하지 않는 부분은 렌더링 하지않는다
//     // shouldComponentUpdate(nextProps, nextState, nextContext){
//     //     if( this.state.counter !== nextState.counter ){
//     //         return true;
//     //     }
//     //     return false;
//     // }

//     //위방법 쓰기 싫으면 extends Component 상속을 extends PureComponent 로 변경하면된다
//     //state 가 객체나 배열 타입으로 선언되어 복잡해지면 재대로 감지하지 못한다.

//     render(){
//         return(
//             <li>
//                 <div>{this.props.value.try}</div>
//                 <div>{this.props.value.result}</div> 
//             </li>
//         );
//     }
// }

export default BaseBall_Try;