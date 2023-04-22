import NextImage from 'next/image'
import { useState } from 'react'
import { Dropdown, DropdownToggle } from 'reactstrap'
import { useChat } from '@/helpers/context/chatContext'
import MessageStickerSvg from './messageStickerSvg'

const MessageStickers = () => {
  const { sendMessage, stickers } = useChat()
  const [sticker, setSticker] = useState(false)

  const handleSelectStickers = (stic) => () => {
    sendMessage('', stic)
    setSticker(false)
  }

  return (
    <Dropdown
      isOpen={sticker}
      toggle={() => setSticker((prevState) => !prevState)}
    >
      <DropdownToggle
        tag='button'
        data-toggle='dropdown'
        aria-expanded={sticker}
        className={`icon-btn btn-outline-primary button-effect mr-3 toggle-sticker outside ${sticker ? 'active' : ''}`}
      >
        <MessageStickerSvg />
      </DropdownToggle>

      <div className={`sticker-contain ${sticker ? 'open' : ''}`}>
        <div className='sticker-sub-contain custom-scroll'>
          <ul>
            {stickers.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={handleSelectStickers(item.stic)}
                >
                  <NextImage
                    className='img-fluid'
                    src={item.stic}
                    alt='sticker'
                    height={46.88}
                    width={45}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Dropdown>
  )
}

export default MessageStickers
