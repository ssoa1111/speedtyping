import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {css} from 'styled-components';

const Contents = ({words, randomIndex, setCheck, check}) => {
    const COUNT = useRef(8)
    const [startgame, setStartgame] = useState(false)
    const [inputText, setInputText] = useState('')
    const [score, setScore] = useState(0)
    let [countDown, setCountDown] = useState(0)
    let text;
    
    // input창 value 읽어오기
    const onInput = useCallback((e)=>{
        if(startgame === false){
            return;
        }
        text = e.target.value
        setInputText(text)
        if(words[randomIndex] === text){
            setScore(score+1)
            setInputText('')
            setCheck(true)
        }
        console.log(words[randomIndex])
    },[startgame])
    // 의존성으로 startgame을 넣어야 작동된다. 없으면 value변화 값에만 작동하고 
    // 초기에 value값에 입력을 못하므로 작동이 아예 안된다.
    
    // 시간제한 setinterval을 위한 useEffect
    useEffect(()=>{
        const countInterval = setInterval(()=>{
            setCheck(false)
            countDown === 0 ? setStartgame(false) : setCountDown(--countDown)
            // console.log(countDown)
            // console.log(startgame)
            if(startgame === false){
                clearInterval(countInterval)
            }
            if(words[randomIndex] === text){
                countDown = COUNT.current
                setCountDown(countDown)
                console.log(check)
            }
        },1000)
        return ()=>clearInterval(countInterval)
    },[startgame, check])
    
    // 버튼을 클릭하면 게임이 실행되게 하는 함수
    const onClick = useCallback(()=>{
        countDown = COUNT.current
        setCountDown(countDown)
        setScore(0)
        setStartgame(true)
    },[])

    return (
        <ContentsWrapper>
            <h1>{words[randomIndex]}</h1>
            <input value={inputText} onInput={onInput}></input>
            <TextWrapper>
                <p>남은시간 : <span>{countDown}</span>s</p>
                <p>점수 : <span>{score}</span></p>
            </TextWrapper>
            <StartButton onClick={onClick} startgame={startgame&&true}>{startgame? '게임 중...' : '게임 시작'}</StartButton>
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
const StartButton = styled.button`
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
        cursor: not-allowed;
    `}
`

export default Contents;