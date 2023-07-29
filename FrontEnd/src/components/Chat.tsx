import { useState ,useRef, useEffect} from "react";
import {startInterview, submitAnswer} from "../redux/action"
import { useNavigate } from 'react-router-dom';


declare global {
  interface Window {
    webkitSpeechRecognition: any; // You can use a more specific type if available
  }
}

const Chat = (props : any) => {
  const navigate = useNavigate();
  const [interviewDone , setInterviewDone] = useState(false)
const [submitCalls , setSubmitCall] = useState(0)
  const { courseName } = props
  const [messages, setMessages] = useState<any[]>([{
      "time" : new Date(),
      "creator": "ai",
      "message" : "Welcome!!"
  }]);

  useEffect(() => {
    startInterview(courseName)
  .then((response :any) => {
    console.log('Response:', response.data.message);
    setMessages((prev)=>[...prev, {"time" : new Date().getTime(),
      "creator": "ai",
      "message" :response.data.message + "?"}])
  })
  .catch((error :any) => {
    console.error('Error:', error);
  });
  },[])
  
    const el = useRef(null);

  useEffect(() => {
    if (el.current) {
    (el.current as HTMLElement).scrollIntoView({ block: "start", behavior: "smooth" });
  }
  }, [messages])

  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [conversation, setConversation] = useState('');

  const recognitionRef = useRef(null);

  const handleStartListening = () => {
    const recognition : any = recognitionRef.current || new window.webkitSpeechRecognition(); // For Chrome
    // const recognition = recognitionRef.current || new window.SpeechRecognition(); // For other browsers

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setRecognizedText('');
    };

    recognition.onresult = (event:any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const { transcript: result } = event.results[i][0];
        transcript += result + ' ';
      }

      setRecognizedText(transcript);
      setConversation(prevConversation => prevConversation + transcript);
    };

    recognition.onerror = (event :any) => {
      console.error('Error occurred in recognition: ', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (!isListening) {
      recognition.start();
    }

    recognitionRef.current = recognition;
  };

  const handleStopListening = (text : string) => {
    if (isListening) {
      const recognition = recognitionRef.current;
      if (recognition) {
        //@ts-ignore
          recognition.stop();
      }
      }
    let conversationObj = {
      "time" : Date.now(),
      "creator": "user",
      "message" : text
    }
   
    setMessages((prev) => [...prev, conversationObj])
    const answer = {
       "answer": conversation
    }

    setSubmitCall((prev)=> prev+1)

    console.log("submitCalls count" , submitCalls)
  submitAnswer(answer ,submitCalls)
  .then((response : any) => {
    console.log('Response after submit:', response.data);
   
      setMessages((prev)=>[...prev, {"time" : new Date().getTime(),
      "creator": "ai",
        "message": response.data.msg 
      }])
    setRecognizedText('');

     /// Checking if there is score available in the response.data

    if (response.data.hasOwnProperty('score')) {
      console.log("yes ended", "response.data.hasOwnProperty('score')", response.data.hasOwnProperty('score'))
      console.log("score is", response.data.score)
      localStorage.setItem("score", JSON.stringify(response.data.score))
       setInterviewDone(true)
    }
  })
  .catch((error:any) => {
    console.error('Error:', error);
  });
      console.log("conversation", messages)
  };
 
      // Calculate the number of newlines in the conversation to increment the rows
  useEffect(() => {
    const numNewLines = (conversation.match(/\n/g) || []).length;
    const conversationRows = Math.min(2 + numNewLines, 10); // Limit to a maximum of 10 rows
    setRows(conversationRows);
  }, [conversation]);

  const [rows, setRows] = useState(2);
 
   

  return (
    <div style={{maxWidth:"100%"}}>
      <div style={{ overscrollBehavior: 'auto', height: '100vh' }}>
        <div className="fixed w-full bg-slate-600	text-center h-16 pt-2 text-white flex justify-between shadow-md top-0">
          <div className="my-3 text-green-100 font-bold text-lg tracking-wide text-center">@MindMesh</div>
        </div>

        <div className="mt-20 mb-16" style={{ maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' ,  width:"100%" , marginRight:"auto", marginLeft:"auto"}}>
          {messages?.map((message) => (
            <div ref={el} className="clearfix" style={{ display:"flex", justifyContent: message.creator === "user" ? "flex-end" : "flex-start", width:"75%", margin:"auto"}} key={message.time}>
                      
                <img
                src={message.creator === "user"
              ? "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png"// Replace with the URL of the current user's avatar image
              : 
                "https://upload.wikimedia.org/wikipedia/en/b/bd/Reddit_Logo_Icon.svg"}
              alt="Avatar"
              className="w-12 h-11 rounded-full float-left mx-4 my-2"
            /> 
                      
              
            <div className="w-2.5/4 mx-4 my-2 p-2 rounded-lg text-left"  style={{backgroundColor: message.creator === "user" ? "#C0BEFE" :"#E6E4E3"}} >
              {message.message}
                    </div>
                      
          </div>
        ))}
        </div>
      </div>
      {interviewDone ? <div style={{ display:"flex" ,justifyContent:"center", alignItems:"center"}} onClick={() => {
        navigate("/score")
      }}>
        <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        <span className="sr-only">Check icon</span>
    </div>
    <div className="ml-3 text-sm font-normal">Interview completed successfully. Click to view score.</div>
</div>
      </div> :
        <div className="fixed w-full flex justify-between bg-slate-600" style={{ bottom: '0px' }}>
          <textarea id="convert_text"
            className="flex-grow m-2 mr-1 rounded-full border border-zinc-700 text-center resize-none"
            placeholder="Your answer.."
            rows={rows}
            cols={50}
            readOnly
            value={recognizedText}
            style={{ outline: 'none', minHeight: '2rem' }}
          />
          <button className="m-2 p-2 rounded-full bg-slate-600 focus:outline-none" id="click_to_convert" onClick={handleStartListening} disabled={isListening} style={{ backgroundColor: isListening ? "red" : "grey" }}>
            <svg
              className="text-white w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2c2.761 0 5 2.239 5 5v5c0 2.761-2.239 5-5 5s-5-2.239-5-5V7c0-2.761 2.239-5 5-5z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 10v2a7 7 0 01-14 0v-2M12 18.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
              ></path>
            </svg>
          </button>

          <button className="m-2" style={{ outline: 'none' }} onClick={() => handleStopListening(recognizedText)} disabled={!isListening} >
            <svg
              className="svg-inline--fa bg-slate-600 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="paper-plane"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="white"
                d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
              />
            </svg>
          </button>
              
        </div>}
    </div>
  );
};

export default Chat;
