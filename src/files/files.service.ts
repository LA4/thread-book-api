import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as path from 'path';
import { User, UserDocument } from 'src/user/schema/user.schema';
import * as fs from 'fs';
import Jimp from 'jimp';
@Injectable()
export class FilesService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }


    async uploadFile(userId: string, fileURL: string) {

        let user = await this.userModel.findById(userId)
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.deleteFile(user.avatar)
        const updateAvatar = await this.userModel.findByIdAndUpdate(
            userId,
            { avatar: fileURL },
            { new: true }
        )

        return updateAvatar

    }

    async deleteFile(filename: string) {
        // flie path with dist documument
        const upladed_path_with_dist = path.join(__dirname, '..', 'uploads')
        const upladed_path_without_dist = "./uploads/"
        try {
            const filePath = upladed_path_without_dist + filename
            if (filePath) {

                await fs.promises.unlink(filePath);
            }
        } catch (error) {
            console.error(`Failed to delete file ${filename}:`, error);
        }
    }
    async compressImage(inputPath: string, outputPath: string) {
        const image = await Jimp.read(inputPath)
        image.resize(400, Jimp.AUTO)
        await image.writeAsync(outputPath)
    }
}

