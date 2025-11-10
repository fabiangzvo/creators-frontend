
"use client"
import  { useCallback, useEffect,Fragment } from 'react'
import {Button} from '@heroui/button'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal'
import { useDisclosure } from '@heroui/use-disclosure'
import Script from "next/script";

const APP_ID = "1380955649866230"

function FbChannelButton({
  onError = () => {},
  getPagesByAccessToken = () => {},
  disabled = false, 
  text = 'login',
  clearFbData = () => {},
  goToChannel = () => {},
  fBDoLogin = () => {},
  addNewEvent = () => {}
}: any) {
  
 const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const handleChoosePage = useCallback(
    function() {
      onOpen()
    },
    []
  )

  useEffect(() => {
    return () => {
      clearFbData()
    }
  }, [clearFbData])

  async function handleCreate() {
    try {
      window.FB.login(
        async function(response) {
          // eslint-disable-next-line no-console
          console.log(1)
          // eslint-disable-next-line no-console
          console.log({ response })
          if (response.authResponse && response.authResponse.accessToken) {
            // eslint-disable-next-line no-console
            console.log(2)
            if (response.status !== 'unknown' && !response.error) {
              // eslint-disable-next-line no-console
              console.log(3)
              const { payload } = await getPagesByAccessToken(
                response.authResponse.accessToken
              )
              // eslint-disable-next-line no-console
              console.log({ payload })
              // eslint-disable-next-line no-console
              console.log({ pageid: payload?.pageData?.id })
              if (!payload.pageData.length) {
                const response = await fBDoLogin(
                  payload.userLongAccessToken,
                  payload.pageData.id
                )

                //fetchUserProfile()
                goToChannel(response.payload.integrationId, 'facebook')
              } else {
                handleChoosePage()
              }
            } else {
              clearFbData()
            }
          } else {
            onError('User cancelled login or did not fully authorize.')
          }
        },
        {
          auth_type: 'reauthenticate',
          scope:
            'pages_show_list,pages_messaging,leads_retrieval,public_profile,email',
          fields: 'name,email,picture'
        }
      )
    } catch (err:any) {
      onError(err && err?.message)
    }
  }

  function handleClick() {
    handleCreate()
    try {
      addNewEvent({ status: 'started' }, 'facebook')
      // eslint-disable-next-line no-console
      console.log('Event sent to Intercom')
    } catch (err:any) {
      // eslint-disable-next-line no-console
      console.log('Error on Intercom.trackEvent', err)
    }
  }

  useEffect(() => {
    // Configura el callback global de inicialización
    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        appId: "TU_APP_ID", // 👈 reemplázalo con tu App ID real
        cookie: true,
        xfbml: true,
        version: "v19.0", // o la versión más reciente del Graph API
      });

      (window as any).FB.AppEvents.logPageView();
    };
  }, []);

  return (
    <Fragment>
      <Script
        id="facebook-sdk"
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        onLoad={() => console.log("Facebook SDK cargado")}
      />
      <Button
        color='secondary'
        id='connectPageBtn'
        disabled={disabled}
        onPress={handleClick}
      >
        {true ? (
          <span>{text}</span>
        ) : (
          <div>Cargando...</div>
        )}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  )
}

export default FbChannelButton

