import dotenv from "dotenv"
dotenv.config({
  path: ".env"
})
import path from "path";
import sharp  from "sharp";
import {db,storage} from "./config/firebase"
import {ADDED} from "./types"
import logger from "./utils/logger"

const collectionRef = db.collection('images');
let activeTimeout: NodeJS.Timeout | null=null;


function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    // Clear the old timer if it exists
    if (activeTimeout !== null) {
      clearTimeout(activeTimeout);
    }

    // Set a new timer
    activeTimeout = setTimeout(() => {
      activeTimeout = null; // Clear the active timer after it resolves
      resolve();
    }, ms);
  });
}




// Listen to changes in the collection
collectionRef.onSnapshot(async (snapshot) => {

  for await (const change of snapshot.docChanges()) {
      if (change.type === ADDED) {
  
        const file= change.doc.data().name;
        const fileName=file.split('.').slice(0, -1).join('.')
        const ext= file.slice(file.lastIndexOf('.') + 1)
        const imagePath=`${path.join(__dirname,"dest",`${fileName}.${ext}`)}`
         const tempLocalFile=`${path.join(__dirname,"temp",`${fileName}.webp`)}`

         logger.info("Downloading image from bucket")
        await storage.file(`images/${fileName}.${ext}`).download({ destination: imagePath });
        logger.info("Downloaded image from bucket")

        logger.info("Compressing image")
        await sharp(imagePath)
        .resize(200) // Adjust resize parameters as needed
        .webp() // Adjust compression settings as needed
        .toFile(tempLocalFile);
        logger.info("Compressed image")

  
        // @ts-ignore
        logger.info("Uploading compressed image to bucket")
        await storage.upload(tempLocalFile,{
          destination: `compressed/${fileName}.webp`,
          
        })
        logger.info("Uploaded compressed image to bucket")

        // await sleep(5000)

        logger.info("Updating doc")
        await db.doc(`/images/${change.doc.id}`).update({
          compressedImage: `${process.env.BUCKET_BASE_URL}${change.doc.data().name.split('.').slice(0, -1).join('.') + '.webp'}?alt=media`
        })
        logger.info("Updated doc")

       
       
      }
    
  }
  
}, (error) => {
  logger.error(error)
});


