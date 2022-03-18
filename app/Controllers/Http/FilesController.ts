// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import File from "App/Models/File";
const CloudinaryService = require("../../Services/CloudinaryService");

export default class FilesController {
  public async store({ request, response }) {
    try {
      const images = request.file("image");
      if (!images || Object.keys(images).length === 0) {
        return response.status(400).json({ msg: "No Files are Selected." });
      }

      if (images.size > 5120 * 5120) {
        return response.status(400).json({ msg: "File size is to Large." });
      }
      if (images.type !== "image") {
        return response.status(400).json({ msg: "File Format is Incorrect." });
      }

      const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(
        images.tmpPath,
        { folder: "file-manager" }
      );
      let file = new File();
      file.name = images.clientName;
      file.type = images.type;
      file.public_id = cloudinaryResponse.public_id;
      file.src = cloudinaryResponse.secure_url;

      await file.save();
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  }
}
