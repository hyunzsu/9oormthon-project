import React, { useState } from 'react'
import styles from './ChatBot.module.css'

interface Message {
  sender: string
  message: string
}

const ChatBot = () => {
  // message : 사용자와 챗봇 간의 대화 메시지를 저장하는 배열
  // userInput : 사용자가 입력한 메시지를 저장하는 문자열
  // loading : 챗봇이 답변을 준비 중인지 여부를 저장하는 상태 (boolean)
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)

  // 원래 환경변수에 담아야 되는 코드 (.env or .env.local)
  const apiKey = 'sk-proj-XrNv4Ky4R20bsvDNwXoQT3BlbkFJYdGsf138SJzhTJpTiAdl'
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions'

  // addMessage : sender와 message를 전달받아 messages 배열에 추가하는 함수
  const addMessage = (sender: string, message: string) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }])
  }

  // handleSendMessage : 사용자가 입력한 메시지를 챗봇 API에 전달하고 답변을 받아오는 함수
  const handleSendMessage = async () => {
    const message = userInput.trim()
    if (message.length === 0) return

    addMessage('user', message)
    setUserInput('')
    setLoading(true)

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                '당신은 사용자가 겪는 부정적인 상황이나 감정을 듣고, 그것을 극도로 긍정적이고 유머러스한 관점으로 바꾸어 응답하는 "럭키비키 챗봇"입니다. 😄🍀 사용자의 고민에 일단 공감하고 반응한 뒤, 그 상황의 밝고 긍정적인 면만을 부각시켜 웃음과 위안을 전해주세요. 말투는 친근하고 익살스러운 구어체를 사용하며, 절대 포기하지 않는 긍정의 에너지를 전달해야 합니다! ✨ 또한 답변 속에 유머러스한 요소를 가미하여 사용자가 웃음 짓게 만들어 주세요. 😆 마지막으로 응답의 맺음말은 반드시 "완전 럭키비키잔앙🍀"으로 마무리 지어주시기 바랍니다! 화이팅! ',
            },
            { role: 'user', content: message },
          ],
          // max_tokens: 1024, // 답변 최대 글자 수,
          top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
          temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
          frequency_penalty: 0.6, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
          presence_penalty: 0.5, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
          stop: ['문장 생성 중단 단어'],
        }),
      })

      const data = await response.json()
      const aiResponse = data.choices?.[0]?.message?.content || 'No response'
      addMessage('bot', aiResponse)
    } catch (error) {
      console.error('오류 발생!', error)
      addMessage('bot', '오류 발생!')
    } finally {
      setLoading(false)
    }
  }

  // handleKeyDown : Enter 키를 눌렀을 때 handleSendMessage 함수를 호출하는 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && !loading) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className={styles.chatbot}>
      <h1 className={styles.title}>ChatGPT 3.5 turbo ChatBot</h1>
      <div className={styles.chatDiv}>
        {loading && (
          <span className={styles.messageWait}>답변을 기다리고 있습니다</span>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${styles[msg.sender]}`}
          >
            {`${msg.sender === 'user' ? '사용자' : '원영적 사고 봇'} : ${msg.message}`}
          </div>
        ))}
      </div>
      <div className={styles.inputDiv}>
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionEnd={e => setUserInput(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSendMessage} className={styles.button}>
          전송
        </button>
      </div>
    </div>
  )
}

export default ChatBot
