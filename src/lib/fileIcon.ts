import type { FileListItem } from "@/models";
import {
    BookText,
    File,
    FileArchive,
    FileAudio,
    FileCode,
    FileImage,
    FileText,
    FileVideo,
    Folder,
    Package,
} from "lucide-vue-next";

const imageExtensions = new Set(["avif", "bmp", "gif", "heic", "jpeg", "jpg", "png", "svg", "tif", "tiff", "webp", "ico"]);
const videoExtensions = new Set(["avi", "flv", "m4v", "mkv", "mov", "mp4", "mpeg", "mpg", "ogv", "webm", "wmv"]);
const audioExtensions = new Set(["aac", "aiff", "alac", "flac", "m4a", "mid", "midi", "mp3", "ogg", "opus", "wav", "wma"]);
const archiveExtensions = new Set(["7z", "bz2", "gz", "rar", "tar", "tgz", "xz", "zip"]);
const codeExtensions = new Set([
    "c",
    "cpp",
    "cs",
    "css",
    "go",
    "h",
    "html",
    "java",
    "js",
    "json",
    "jsx",
    "kt",
    "php",
    "py",
    "rb",
    "rs",
    "scss",
    "sh",
    "sql",
    "swift",
    "ts",
    "tsx",
    "vue",
    "xml",
    "yaml",
    "yml",
]);
const textExtensions = new Set(["csv", "doc", "docx", "log", "md", "odt", "pdf", "ppt", "pptx", "rtf", "txt", "xls", "xlsx"]);
const bookExtensions = new Set(["epub", "fbz", "fbz2", "fbz3", "fbz4", "fbz5", "mobi"]);
const appPackageExtensions = new Set(["apk", "apks", "msix", "xapk", "appx", "deb", "dmg", "exe", "msi", "pkg", "rpm", "appimage"]);

export function getFileIcon(item: FileListItem) {
    if (item.itemType === "folder") {
        return Folder;
    }

    const extension = getFileExtension(item.name);
    if (imageExtensions.has(extension)) return FileImage;
    if (videoExtensions.has(extension)) return FileVideo;
    if (audioExtensions.has(extension)) return FileAudio;
    if (archiveExtensions.has(extension)) return FileArchive;
    if (codeExtensions.has(extension)) return FileCode;
    if (textExtensions.has(extension)) return FileText;
    if (bookExtensions.has(extension)) return BookText;
    if (appPackageExtensions.has(extension)) return Package;
    return File;
}

function getFileExtension(fileName: string) {
    const dotIndex = fileName.lastIndexOf(".");

    if (dotIndex <= 0 || dotIndex === fileName.length - 1) {
        return "";
    }

    return fileName.slice(dotIndex + 1).toLowerCase();
}
