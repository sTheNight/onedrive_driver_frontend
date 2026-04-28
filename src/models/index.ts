// itemtype 为 file 时 不存在 childCount
// itemtype 为 folder 时 不存在 downloadUrl 和 mimeType
export interface FileListItem {
    id: string;
    name: string;
    size: number;
    itemType: FileListItemType;
    lastModified?: string;
    childCount?: number;
    mimeType?: string;
    downloadUrl?: string;
}

type FileListItemType = "file" | "folder";