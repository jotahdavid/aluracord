import { useState } from 'react';
import Head from 'next/head';

import { Box, Text, TextField, Image, Button } from '@skynexui/components';

import appConfig from '../config.json';

export default function ChatPage() {
  const [ message, setMessage ] = useState('');
  const [ messageList, setMessageList ] = useState([]);

  function handleNewMessage(msg) {
    if (!msg.length) return;
    const newMsg = {
      id: messageList.length + 1,
      from: 'vanessametonini',
      content: msg
    };
    setMessageList((prev) => [ newMsg, ...prev ]);
    setMessage('');
  }

  return (
    <>
      <Head>
        <title>Chat - Aluracord</title>
      </Head>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          color: appConfig.theme.colors.neutrals['000']
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            borderRadius: '5px',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: '100%',
            maxWidth: '95%',
            maxHeight: '95vh',
            padding: '32px',
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              height: '80%',
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: 'column',
              borderRadius: '5px',
              padding: '16px',
            }}
          >

            <MessageList messages={messageList} />

            <Box
              as='form'
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                value={message}
                onChange={(event) => setMessage(event.currentTarget.value)}
                onKeyPress={(event) => {
                  if (event.key !== 'Enter') return;
                  event.preventDefault();
                  handleNewMessage(message.trim());
                }}
                placeholder='Insira sua mensagem aqui...'
                type='textarea'
                styleSheet={{
                  width: '100%',
                  border: '0',
                  resize: 'none',
                  borderRadius: '5px',
                  padding: '6px 8px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  // marginRight: '12px',
                  color: appConfig.theme.colors.neutrals[200],
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href='/'
        />
      </Box>
    </>
  );
}

function MessageList({ messages }) {
  return (
    <Box
      tag='ul'
      styleSheet={{
        overflowY: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
        position: 'relative'
      }}
    >
      {!messages.length ? (
        <Text
          styleSheet={{
            position: 'absolute',
            top: '0',
            width: '100%',
            textAlign: 'center',
            opacity: '0.5'
          }}
        >
          Não há mensagens no chat
        </Text>
      ) : messages.map((message) => (
        <Text
          key={message.id}
          tag='li'
          styleSheet={{
            borderRadius: '5px',
            padding: '6px',
            marginBottom: '12px',
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }
          }}
        >
          <Box
            styleSheet={{
              marginBottom: '8px',
            }}
          >
            <Image
              styleSheet={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '8px',
              }}
              src={`https://github.com/vanessametonini.png`}
            />
            <Text tag='strong'>
              {message.from}
            </Text>
            <Text
              styleSheet={{
                fontSize: '10px',
                marginLeft: '8px',
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag='span'
            >
              {(new Date().toLocaleDateString())}
            </Text>
          </Box>
          {message.content}
        </Text>
      ))}
    </Box>
  );
}
