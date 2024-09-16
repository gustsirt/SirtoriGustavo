import multer from 'multer'
import path from 'node:path'
import __dirname from '../libraries/utils/dirname.js'
import AppError from '../config/AppError.js'

/**
 * Configuración de Multer para almacenamiento en disco o memoria
 * @param {string} folder - Carpeta donde almacenar el archivo en caso de ser en disco
 * @param {number} maxSize - Tamaño máximo permitido del archivo en MB
 * @param {Array} type - Tipos de archivos permitidos (ej: ['image/jpeg', 'image/png'])
 * @param {boolean} useMemoryStorage - Define si se debe usar almacenamiento en memoria
 */

// almacena archivo en el disco
export const uploader = (folder, maxSize, type) => multer({
    storage: multer.diskStorage({        
        destination: (req, file, cb) => {
            cb(null, path.join(`public/assets/${folder}`))
        },
        filename: (req, file, cb) => {
            cb(null, `${req.user.family_name}_${Date.now()}.${file.originalname.split('.')[1]}`)
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * maxSize
    },
    fileFilter: (req, file, cb) => {
        if (!type) return cb(null, true)
        if (type.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new AppError(`File type not accepted. Expected: ${type}`, 415))
        }
    }
})

// toma el archivo y lo guarda en memoria temporal para pasarlo al siguiente proceso
