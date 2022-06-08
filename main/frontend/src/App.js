import './App.css';
import styled, { keyframes } from 'styled-components'
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

const Container = styled.div`
  height: 80vh;
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media screen and (max-width:1400px){
    margin-top: 0px;
    min-width: 700px;
  }


  @media screen and (max-width:1300px){
    min-width: 700px;
    margin-top: -10px;

  }

  @media screen and (max-width:1000px){
    margin-top: 0px;
  }

  @media screen and (max-width:810px){
    min-width: auto;
    height:auto;
  }


`
const Wrapper = styled.div`
  background-color: #9ac3f1;
  padding: 10px;
  border-radius:64px;
  min-width: 600px;
  border:1px solid black;
  position: relative;
  h2{
    text-align:center
  }

  @media screen and (max-width:800px){
    min-width: auto;
  }

`

const Holder = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 20px;

  h2{
    font-weight: 600;
    font-size: 18px;
  }
`

const QuestionHolder = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  cursor: pointer;
  padding:15px 30px 15px 30px;
  border-radius: 10px;
  border:none;
  color: ${(props) => props.text ? props.text : 'white'};
  font-size: 17px;
  background-color: ${(props) => props.color};

`

const Circle = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 16px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${props=>props.backgroundColor ? props.backgroundColor : 'white'};
  color:black;
  font-weight: 600;
`

const CircleContainer = styled.div`
  display: flex;
  flex-direction:row;
  justify-content: center;
  gap:1rem;
`

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`

const Overlay = styled.div`
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
`

const Text = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  font-size: 50px;
  color: white;
  transform: translate(-50%,-50%);
  -ms-transform: translate(-50%,-50%);
`

const Form = styled.div`
  background-color: lightpink;
  opacity: 1;
  display: flex;
  padding: 20px;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;


  input{
    padding: 0.8rem 2rem;
    margin: 10px 30px 10px 30px;
    border:none;
    outline:0px;

  }

`

const fadeIn = keyframes`
  0%{opacity:0;}  
  80%{opacity:0;}
  100%{opacity:1;}
`

const TextShining = styled.h4`
  font-size: 15px;
  color: green;
  animation: ${fadeIn} 1s;
`



function App() {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(1)
  const [answers, setAnswers] = useState([])
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [added, setAdded] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(useCallback(() => {
    const getQuestions = async () => {
      await axios.get('http://127.0.0.1:8000/api/getQuestions/').then(res => setQuestions(res.data)).catch(err => console.log(err))
    }
    getQuestions()
    let data = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : null
    setAnswers(data)
  },[setAnswers]),[setAnswers])
  
  const increase = (id) => {
    if (index < questions.length) { 
        setIndex(Number(index) + 1)
    }
  }

  const decrease = () => {
    if (index > 1) {
      setIndex(Number(index) - 1)
    }
  }

  const registerAnswer = (id, answerNumber) => {
    var list = []
    let data = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : null
    let newEntry = { id, answerNumber }
    console.log(newEntry)
    if (data) {
      const exist = data.find(x => Number(x.id) === Number(id))
      if (exist) {
        let newData = data.filter((x) => x.id !== id )
        data = newData
        data.push(newEntry)
        setAnswers(data)
        localStorage.setItem('store', JSON.stringify(data))
        setTimeout(() => {
          increase()
        },1000)
      }
      else {
        data.push(newEntry)
        setAnswers(data)
        localStorage.setItem('store',JSON.stringify(data))
        setTimeout(() => {
          increase()
        },1000)
      }

    }
    else {
      list.push(newEntry)
      setAnswers(list)
      localStorage.setItem('store', JSON.stringify(list))
      setTimeout(() => {
        increase()
      },1000)
    }
  }
  
  const addAnswer = (id) => {
    var list = []
    let data = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : null
    let newEntry = {id , 'answerNumber':text}
    if (data) {
      const exist = data.find(x => Number(x.id) === Number(id))
      if (exist) {
        let newData = data.filter((x) => x.id !== id )
        data = newData
        data.push(newEntry)
        setAnswers(data)
        setText('')
        setAdded(true)
        localStorage.setItem('store',JSON.stringify(data))
        setTimeout(() => {
          increase()
        },5000)
      }
      else {
        data.push(newEntry)
        setAnswers(data)
        setText('')
        setAdded(true) 
        localStorage.setItem('store',JSON.stringify(data))
        setTimeout(() => {
          increase()
        },5000)
      }

    }
    else {
      list.push(newEntry)
      setAnswers(list)
      setText('')
      setAdded(true)
      localStorage.setItem('store', JSON.stringify(list))
      setTimeout(() => {
        increase()
      },5000)
    }
    setTimeout(() => {
      setAdded(false)
    },6000)
  }

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null
    setUserInfo(userInfo)
    if (userInfo === null) {
      document.getElementById("overlay").style.display = "block";
    }
  },[])

  const logoutHandler = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('store')
    document.getElementById("logout").style.display = "block";
    setTimeout(() => {
        document.getElementById("logout").style.display = "none";
        setUserInfo(null)
        setUsername('')
        setPassword('')
        document.getElementById("overlay").style.display = "block";
    },5000)
 

  }

  const switchOverlay = (id, login=false) => {
    if (username.length >= 2 && password.length >= 2) {
      let entry = { username, password }
      if (login) {
        localStorage.setItem('userInfo', JSON.stringify(entry))
      }
      const userInfo = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null
      setUserInfo(userInfo)
      document.getElementById(id).style.display = "none";
      if (id === 'overlay') {
        document.getElementById('welcome').style.display = "block";
      }

    }
  }

  const submitHandler = async () => {
    let formField = new FormData()
    let data = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : null
    let username = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    formField.append('data', JSON.stringify(data))
    formField.append('username', username['username'])

    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/submitResponse/',
      data: formField
    }).then(res => console.log(res.data)).catch(err => console.log(err))
  }

  
  return (
    <>
    {userInfo &&
      <LogoutContainer>
        <Button onClick={()=>logoutHandler()} color='red' text='white'>Logout</Button>
      </LogoutContainer>
    }
    <Overlay id='overlay'>
      <Text>
        <Form>
          <h4 style={{fontSize:'20px', fontWeight:'600', color:'black', alignSelf:'center'}}>Please login to proceed</h4>
          <input placeholder='Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <input type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <Button style={{marginRight:'30px', marginLeft:'30px'}} color='lightgreen' text='black' onClick={()=>switchOverlay('overlay', true)}>Login</Button>
        </Form>
      </Text>
    </Overlay>
    <Overlay id='welcome'>
      <Text>
        <Form>
          <h4 style={{ color: "black",  textTransform:'capitalize'}}>Welcome, {username}</h4>
          <Button color='darkpink' text='black' onClick={()=>switchOverlay('welcome')}>Close</Button>
        </Form>
      </Text>
    </Overlay>
    <Overlay id='logout'>
      <Text>
        <Form>
          <h4 style={{ color: "black", fontSize:'24px', textTransform:'capitalize'}}>Thank you {username} for your precious time and feedback.</h4>
        </Form>
      </Text>
    </Overlay>
    <Container>
        <Wrapper>
          <h2>Customer Survey</h2>
          <Holder>
            {questions?.length >= 1 &&
              <h2>{index}/{questions?.length}</h2>
            }
          </Holder>
          <QuestionHolder>
            {questions.map(item => (
              <span key={item.id}>
                {item.id === index && 
                  <>
                  <h4><span style={{ marginRight: '10px' }}>{item.id}.</span>{item.question}</h4>
                  {item.isNumeric ? 
                  <CircleContainer>
                     {[...Array(item.range).keys()].map((x)=>(
                       <span key={x}>
                        
                        {answers?.length >= 1 ?
                        <>
                           {answers[answers?.findIndex(x => x.id === item.id)]?.id === item.id && answers[answers?.findIndex(x => x.id === item.id)]?.answerNumber === x + 1 ?
                          <Circle backgroundColor='red' onClick={() => registerAnswer(item.id, x + 1)} key={x}>{x + 1}</Circle> 
                          :
                          <Circle onClick={() => registerAnswer(item.id, x + 1)} key={x}>{x + 1}</Circle> 
                           
                        }
                        </> : 
                          <Circle onClick={() => registerAnswer(item.id, x + 1)} key={x}>{x + 1}</Circle> 
                        }
                         
                        </span>
                      ))}
                  </CircleContainer>
                  :
                  <>
                    <textarea placeholder='Type Here...' value={text} onChange={(e)=>setText(e.target.value)} style={{minWidth:'400px', borderRadius: '10px', outline: 'none', width:'95%', padding:'10px', fontSize:'16px', fontFamily:'inherit' }} rows={3}/>
                    <div style={{ disply: "flex" }}>
                      {text.length >=2 &&
                      <Button onClick={()=>addAnswer(item.id)} color='purple' style={{marginLeft:'35%'}}>Add</Button>
                      }  
                      {added && index !== questions?.length &&
                        <TextShining>Your reponse is added , you can rewrite it if you want by cliking on prev button.</TextShining>
                      }
                    </div>
                  </>
                  }
                  </>
                  
                }
              </span>
            ))}
          </QuestionHolder>
          <div style={{marginTop:50, display:'flex', justifyContent:'space-between', padding:'30px'}}>
            {index === 1 ?
            <Button onClick={() => decrease()} disabled={true} color='gray' text='black'>Prev</Button>
            :
            <Button onClick={() => decrease()} color='#2d15f9'>Prev</Button>

            }
            {index === questions?.length ?
            
            <Button onClick={() => submitHandler()} color='green'>Submit</Button>
            :
            <>
              <Button onClick={() => increase()} color='#f01afe'>Next</Button>
            </>

            }
          </div>
        </Wrapper>
    </Container>
    </>
  );
}

export default App;
