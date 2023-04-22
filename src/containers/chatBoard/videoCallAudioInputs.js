import { useState } from 'react'
import { CheckSquare, Mic, Square } from 'react-feather'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useVideoCall } from '@/helpers/context/videoCallContext'

const VideoCallAudioInputs = () => {
  const [inputs, setInputs] = useState(false)
  const { audioInput, audioInputs, changeAudioInput } = useVideoCall()

  const handleSelectAudioInput = (deviceId) => () => {
    changeAudioInput(deviceId)
  }

  if (!audioInputs?.length) {
    return ''
  }

  return (
    <div className='zoomcontent mr-2'>
      <div>
        <Dropdown
          isOpen={inputs}
          toggle={() => setInputs((prevState) => !prevState)}
        >

          <DropdownToggle
            tag='a'
            className='text-dark'
          >
            <Mic />
          </DropdownToggle>

          <DropdownMenu end>
            {audioInputs.map((item) => {
              return (
                <DropdownItem
                  key={item.deviceId}
                  onClick={handleSelectAudioInput(item.deviceId)}
                >
                  {(item.deviceId === audioInput?.deviceId)
                    ? (
                      <CheckSquare />
                      )
                    : (
                      <Square />
                      )}
                  {item.label}
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

export default VideoCallAudioInputs
