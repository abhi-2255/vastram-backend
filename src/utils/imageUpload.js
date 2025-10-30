import multer from 'multer';

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// multer - use memory storage so we can process with sharp
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            cb(new Error('Only images are allowed'));
        } else cb(null, true);
    }
});

// process array of images -> ensure minCount, save resized images and thumbs
async function processAndSaveImages(files = [], baseUrl) {
    // files: array of { buffer, originalname, mimetype }
    if (!files || files.length < 3) {
        const err = new Error('At least 3 images are required');
        err.code = 'MIN_IMAGES';
        throw err;
    }

    const saved = [];
    for (let file of files) {
        const id = uuidv4();
        const ext = path.extname(file.originalname) || '.jpg';
        const filename = `${id}${ext}`;
        const filenameThumb = `${id}_thumb${ext}`;
        const filenameOriginal = `${id}_orig${ext}`;

        const savePath = path.join(UPLOAD_DIR, filename);
        const saveThumbPath = path.join(UPLOAD_DIR, filenameThumb);
        const saveOrigPath = path.join(UPLOAD_DIR, filenameOriginal);

        // Save an original (optionally compressed) + resized square 800x800 + thumb 200x200
        // produce square crop centered

        // Save "resized" (800x800)
        await sharp(file.buffer)
            .rotate()
            .resize(800, 800, { fit: sharp.fit.cover, position: sharp.strategy.entropy })
            .jpeg({ quality: 85 })
            .toFile(savePath);

        // Save thumb (200x200)
        await sharp(file.buffer)
            .rotate()
            .resize(200, 200, { fit: sharp.fit.cover, position: sharp.strategy.entropy })
            .jpeg({ quality: 80 })
            .toFile(saveThumbPath);

        // Save original-ish (max width 2000) for zooming (don't keep huge files)
        await sharp(file.buffer)
            .rotate()
            .resize({ width: 2000, withoutEnlargement: true })
            .jpeg({ quality: 90 })
            .toFile(saveOrigPath);

        saved.push({
            original: `${baseUrl}/${UPLOAD_DIR}/${filename}`,   // 800x800
            thumb: `${baseUrl}/${UPLOAD_DIR}/${filenameThumb}`,
            zoom: `${baseUrl}/${UPLOAD_DIR}/${filenameOriginal}`
        });
    }
    return saved;
}

module.exports = {
    upload, // multer instance
    processAndSaveImages
};
