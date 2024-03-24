import Image from 'next/image';

export default function EditableImage({link, setLink}) {
  async function handleFileChange(e){
    const files = e.target.files;
    if(files?.length === 1){
      const data = new FormData();
      data.set('file', files[0]);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const res = await response.json();
      setLink(res);
    }
  }

  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'}/>
      )}
      {!link && (
          <div className="rounded-lg w-full h-full mb-1 bg-gray-300 flex items-center justify-center text-center px-2 py-4">
            <span className="text-gray-500">No image</span>
          </div>
        )
      }
      <label>
        <input type="file" className="hidden" onChange={handleFileChange}/>
        <span className="block border border-gray-300 cursor-pointer rounded-lg p-2 text-center">
          Edit
        </span>
      </label>
    </>
  )
}