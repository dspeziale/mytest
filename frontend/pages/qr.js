import { BrowserMultiFormatReader } from '@zxing/browser'
import { useEffect, useRef, useState } from 'react'

export default function QRScanner(){
  const videoRef = useRef(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    let selectedDeviceId
    codeReader.listVideoInputDevices().then((videoInputDevices) => {
      selectedDeviceId = videoInputDevices[0]?.deviceId
      if (selectedDeviceId && videoRef.current) {
        codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
          if (result) {
            setMessage(`QR letto: ${result.getText()}`)
            // Invia a API per check-in
            fetch('/api/qr-checkin', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ token: result.getText() }) })
          }
          if (err && !(err.name === 'NotFoundException')) {
            console.error(err)
          }
        })
      }
    })
    return () => {
      codeReader.reset()
    }
  }, [])

  return (
    <main style={{padding:20}}>
      <h1>QR Scanner</h1>
      <video ref={videoRef} style={{width: '100%', maxWidth: 600}} />
      <p>{message}</p>
    </main>
  )
}
