import * as os from "os";
const multer  = require('multer');

export const upload = multer({ dest: os.tmpdir() });
