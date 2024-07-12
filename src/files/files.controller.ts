import { Controller, Get, NotFoundException, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream, existsSync } from 'fs';
import type { Response } from 'express';
@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService
    ) { }

    @Post('upload/:user_id')
    @UseInterceptors(FileInterceptor('profilePicture', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
            }
        })
    }))
    async uplodedFiles(@Param('user_id') user_id: string, @UploadedFile() files: Express.Multer.File) {
        console.log("uploaded file:", files)
        if (files) {
            await this.filesService.compressImage(files.path, files.path)
            this.filesService.uploadFile(user_id, files.filename)
            return { result: files.filename }
        }

    }
    @Get(':filename')
    getFile(@Param('filename') filename: string, @Res({ passthrough: true }) res: Response): StreamableFile {
        const filePath = join(process.cwd(), 'uploads', filename);

        if (!existsSync(filePath)) {
            throw new NotFoundException('File not found');
        }

        const file = createReadStream(filePath);
        console.log("stream:", file)
        res.set({
            'Content-Type': 'image/png', // Assurez-vous que le type MIME est correct selon le type de fichier
            'Content-Disposition': `inline; filename="${filename}"`,
        });
        return new StreamableFile(file);
    }

}
