import { useEffect, useRef, useState } from 'react';

import { Box, Button, Text, Image  } from '@skynexui/components';

import appConfig from '../../config.json';

function ButtonWrapper({ children, _ref }) {
  return (
    <>
      <div ref={_ref}>
        {children}
      </div>
      <style jsx>{`
        div {
          height: 100%;
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
}

export default function ButtonSendSticker() {
  const [ isOpen, setOpenState ] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    function handleMouseDown(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenState(false);
      }
    }

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    }
  });

  return (
    <ButtonWrapper _ref={menuRef}>
      <Button
        styleSheet={{
          borderRadius: '50%',
          minWidth: '50px',
          minHeight: '50px',
          marginBottom: '8px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[300],
          filter: isOpen ? 'grayscale(0)' : 'grayscale(1)',
          hover: {
            filter: 'grayscale(0)',
            backgroundColor: appConfig.theme.colors.primary[400]
          },
          focus: {
            backgroundColor: appConfig.theme.colors.primary[600]
          },
        }}
        label='😋'
        onClick={() => setOpenState(!isOpen)}
      />

      {isOpen && (
        <>
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '5px',
              position: 'absolute',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              width: {
                xs: '200px',
                sm: '290px',
              },
              height: '300px',
              right: '60px',
              bottom: '40px',
              padding: '16px',
              boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
            }}
          >
            <Text
              styleSheet={{
                color: appConfig.theme.colors.neutrals['000'],
                fontWeight: 'bold',
              }}
            >
              Stickers
            </Text>
            <Box
              tag='ul'
              styleSheet={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                flex: 1,
                paddingTop: '16px',
                overflowY: 'auto',
              }}
            >
              {appConfig.stickers.map((sticker) => (
                <Text
                  tag='li' key={sticker}
                  styleSheet={{
                    width: '50%',
                    borderRadius: '5px',
                    padding: '10px',
                    cursor: 'pointer',
                    focus: {
                      backgroundColor: appConfig.theme.colors.neutrals[600],
                    },
                    hover: {
                      backgroundColor: appConfig.theme.colors.neutrals[600],
                    }
                  }}
                  onClick={() => setOpenState(false)}
                >
                  <Image src={sticker} />
                </Text>
              ))}
            </Box>
          </Box>
        </>
      )}
    </ButtonWrapper>
  );
}
