import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, {css} from 'styled-components';

const Contents = ({words}) => {
    const COUNT = useRef(8)
    const [startgame, setStartgame] = useState(false)
    const [inputText, setInputText] = useState('')
    const [score, setScore] = useState(0)
    let [countDown, setCountDown] = useState(0)

    // input창 value 읽어오기
    const onInput = useCallback((e)=>{
        setInputText(e.target.value)
        if(words === e.target.value){
            setScore(score+1)
            setInputText('')
        }
    },[])
    
    // 시간제한 setinterval을 위한 useEffect
    useEffect(()=>{
        const countInterval = setInterval(()=>{
            countDown === 0 ? setStartgame(false) : setCountDown(--countDown)
            console.log(countDown)
            console.log(startgame)
            if(!startgame){
                clearInterval(countInterval)
            }
            // console.log에 countDown의 값이 0이 세번찍혀야 setStartgame이 false가 됩니다 왜 이런걸까요? 
        },1000)
        return ()=>clearInterval(countInterval)
    },[startgame])
    
    // 버튼을 클릭하면 게임이 실행되게 하는 함수
    const onClick = useCallback(()=>{
        countDown = COUNT.current
        setCountDown(countDown)
        setScore(0)
        setStartgame(true)
    },[])

    return (
        <ContentsWrapper>
            <h1>{words}</h1>
            <input value={inputText} onInput={onInput}></input>
            <TextWrapper>
                <p>남은시간 : <span>{countDown}</span>s</p>
                <p>점수 : <span>{score}</span></p>
            </TextWrapper>
            {/* startgame을 그대로 넣어도 안되어서 논리연산자를 넣어보라해서 했는데 안되네요.. */}
            <button onClick={onClick} startgame={startgame&&true}>{startgame? '게임 중...' : '게임 시작'}</button>
        </ContentsWrapper>
    );
};

const ContentsWrapper = styled.div`
    width: 300px;
    margin: auto;
    text-align: center;
    h1{
        color: #d4a373;
        font-size: 60px;
        margin: 3rem 0;
    }
    input{
        width: 150px;
        height: 30px;
    }
    button{
        width: 130px;
        height: 40px;
        margin: 1rem auto;
        border: none;
        border-radius: 10px;
        background-color: #d4a373;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        ${(props)=>props.startgame && css`
            background-color: #ccc;
            color: #333;
        `}
    }
`
const TextWrapper = styled.div`
    width: 250px;
    display: flex;
    justify-content: space-between;
    margin: 1rem auto;
    p{
        font-size: 20px;
    }
    span{
        font-size: 40px;
    }
`

export default Contents;