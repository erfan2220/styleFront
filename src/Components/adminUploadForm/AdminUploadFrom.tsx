import {useState, ChangeEvent, FormEvent} from "react";

export default function AdminUploadFrom()
{
    const [image,setImage]=useState<File | null>(null);
    const [uploadStatus,setUploadStatus]=useState<string>("");


    const handleFileChange=(e:ChangeEvent<HTMLInputElement>)=>
    {
        if(e.target.files && e.target.files.length>0)
        setImage(e.target.files[0]);
    }


    const handleSubmit = async (e:FormEvent)=>
    {
        e.preventDefault();

    if(!image){
        setUploadStatus("Please select an image to upload");
        return;
    }


    const formData = new FormData();
    formData.append("image",image)

    try{
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if(!response.ok){
            throw new  Error("Upload failed");
        }


        const data = await response.json();
        setUploadStatus(data.message || "File uploaded successfully!");
    }
    catch{
        setUploadStatus("Failed to upload the image.");
    }
 }


    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full"
                    accept="image/*" // Ensure only images are selectable
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Upload
                </button>
            </form>
            {uploadStatus && <p className="mt-2 text-sm text-gray-700">{uploadStatus}</p>}
        </div>
    );


}