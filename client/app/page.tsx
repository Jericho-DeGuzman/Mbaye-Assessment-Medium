'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Messages from "./components/messages/messages";
import { useEffect, useState } from "react";
import { retrieveMessages } from "@/services/retrieveMessages";
import { sendMessage } from "@/services/sendMessage";

interface Message {
  message: string,
  timestamp: number | null,
  sender_id: string,
  sender_username: string,
}

export default function Home() {
  // replace id and username:
  // dummy acc
  // 1. id = user_1, username = John
  // 2. id = user_2, username = Angela
  // 3. id = user_3, username = Jericho
  const id: string = 'user_2';
  const username: string = 'Angela';

  const [authorize, setAuthorize] = useState(false);
  // store messages.
  const [messages, setMessages] = useState([]);
  // message to send.
  const [messageToSend, setMessaggeToSend] = useState<Message>({
    message: '',
    timestamp: Date.now(),
    sender_id: id,
    sender_username: username
  });

  // retrieve messages
  useEffect(() => {
    const user = { id, username }
    sessionStorage.setItem('userId', id);
    sessionStorage.setItem('username', username);

    retrieveMessages(user)
      .then((result) => {
        setMessages(result);
        setAuthorize(true);
      })
      .catch((error) => {
        alert(error);
      });
  }, [])

  const HandleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {message} = messageToSend;
      if (message == '') {
        return;
      }

      await sendMessage(messageToSend);
      setMessaggeToSend({
        message: '',
        timestamp: Date.now(),
        sender_id: id,
        sender_username: username,
      });
    } catch (err) {
      alert(err);
    }
  }

  const HandleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMessaggeToSend((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <>
      {authorize ? (
        <div className="flex flex-col justify-between h-screen">
        <div className="w-full p-4 border-b-2 border-gray-600">
          <h1 className="lg:text-xl text-lg text-center font-semibold">GROUP CHAT FEATURE ASSESSMENT</h1>
        </div>
        <Messages key="conversation" data={messages} />
        <div className="w-full p-4 flex">
          <textarea
            name="message"
            className="w-full h-10 py-2 px-4 mr-4 resize-none rounded-full outline-none"
            placeholder="Aa"
            value={messageToSend.message}
            onChange={HandleInputChange}
          ></textarea>
          <div className="w-10 h-10 flex items-center justify-center">
            <form onSubmit={HandleSendMessage}> 
              <button className="w-8 h-8">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
      </div>
      ) : (
        <>
          Invalid userId and username
        </>
      )}
    </>
  );
}
