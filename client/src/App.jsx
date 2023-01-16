import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import Dropzone from "./components/Dropzone"

function App() {
  const [formState, setFormState] = useState({
    email: '',
    displayName: '',
    description: '',
  })

  const [files, setFiles] = useState();
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (formState.displayName.trim().length > 0 && formState.email.trim().length > 0 && formState.description.trim().length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [formState])

  const handleInputChange = (e) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleSubmit = () => {
    console.log('submitting...');
    let data = {
      recipient: formState.email,
      metadata: {
        name: formState.displayName,
        description: formState.description,
        properties: {
          files,
        },
      }
    }
    createAndSendNFT(data);
  }

  const createAndSendNFT = (nftData) => {

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-client-secret': 'sk_live.kti3z6pN.AvgYF3Uu7SeGFWHwCIH4iIVTehpbgUZ9',
        'x-project-id': '974243b3-4482-44be-8e0b-733457711345',
        'authtoken': '1234',
      },
      body: JSON.stringify({
        recipient: nftData.recipient,
        metadata: nftData.metadata,
      })
    };

    fetch('http://localhost:3001/mint', options)
      .then(response => response.json())
      .then(response => {
        console.log('reponse: ', response)
        if(response.minted) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.message,
            text: response.metadata.name,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: response.message,
            footer: '<a href="">You need to add at least one file to mint</a>'
          })
        }
        
      })
      .catch(err => console.error(err));
  }
  return (
    <div className="h-screen w-screen py-4 px-40">
      <h1 className="text-gray-800 text-3xl font-bold">Create a single NFT</h1>
      <h2 className="text-gray-700 text-2xl font-bold mt-10">Upload files</h2>
      <h3 className="text-gray-600 text-base mb-5">Upload all files you want to mint</h3>
      <div className="flex w-100">
        <div className="w-9/12" >
          <Dropzone setFiles={setFiles} />
        </div>
        <div className="w-[20px]"></div>
        <div className="w-3/12 flex-wrap">
          <p className="text-slate-400">Max. 50MB per individual file.</p>
          <p className="text-slate-400">Upload up to 6 files.</p>
          <p className="text-slate-400">We support image, audio and video files.</p>
        </div>
      </div>

      <div className="h-[1px] bg-slate-300 w-100 my-10"></div>
      <h2 className="text-gray-700 text-2xl font-bold mb-4">Token details</h2>
      <p className="text-slate-400 text-sm mb-1">The 'Display name' and 'Description' will be shown on wallets or on marketplaces, where the NFT is displayed. This information is also stored on the blockchain</p>
      <input placeholder="Your email address..." className="placeholder:italic bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 w-2/4" type='email' name='email' value={formState.email} onChange={(e) => handleInputChange(e)} />
      <input placeholder="Display name..." className="placeholder:italic bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-3 w-2/4" type='text' name='displayName' value={formState.displayName} onChange={(e) => handleInputChange(e)} />
      <textarea placeholder="Description..." className="placeholder:italic bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type='text' name='description' value={formState.description} onChange={(e) => handleInputChange(e)} />
      <div className="w-full justify-center items-center">
        <button
          disabled={!canSubmit}
          type='button'
          className={canSubmit ? `bg-gray-300 m-auto hover:bg-gray-400 text-gray-800 font-bold my-4 w-1/4 justify-center py-1 px-4 rounded items-center`
          : `bg-gray-300 m-auto text-gray-200 font-bold my-4 w-1/4 justify-center py-1 px-4 rounded items-center`}
          onClick={handleSubmit}>SUBMIT</button>
      </div>
    </div>
  )
}

export default App
