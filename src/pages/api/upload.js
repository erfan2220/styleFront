import formidable from "formidable";
import fs from "fs/promises";
import path from "path";


export const config = {
    api: {
        bodyParser: false,
    },
}


export default function handler(req, res) {
    if (req.method === "POST") {
        const form = new formidable.IncomingForm();
        form.uploadDir = path.join(process.cwd(), "public/images"); // Upload to 'public/images'
        form.keepExtensions = true;

        try {
            // Parse the incoming form
            const { files } = await new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) return reject(err);
                    resolve({ fields, files });
                });
            });

            // Get file details and move it to the correct directory
            const oldPath = files.image.filepath;
            const fileName = files.image.originalFilename;
            const newPath = path.join(process.cwd(), "public/images", fileName);

            await fs.rename(oldPath, newPath);

            res.status(200).json({
                message: "File uploaded successfully!",
                filePath: `/images/${fileName}`,
            });
        } catch (err) {
            res.status(500).json({ error: "File upload failed!" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}