import { useState } from 'react'
import { CheckSquare, Square, Video } from 'react-feather'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useVideoCall } from '@/helpers/context/videoCallContext'

const VideoCallVideoInputs = () => {
  const [inputs, setInputs] = useState(false)
  const { videoInput, videoInputs, changeVideoInput } = useVideoCall()

  const handleChangeVideoInput = (deviceId) => () => {
    changeVideoInput(deviceId)
  }

  if (!videoInputs?.length) {
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
            <Video />
          </DropdownToggle>

          <DropdownMenu end>
            {videoInputs.map((item) => {
              return (
                <DropdownItem
                  key={item.deviceId}
                  onClick={handleChangeVideoInput(item.deviceId)}
                >
                  {(item.deviceId === videoInput?.deviceId)
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

export default VideoCallVideoInputs
