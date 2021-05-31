export interface FileHierarchy {
  _id?: string;
  path: string;
  name: string;
  type: string;
  data: string;
  icon?: string;
  mimetype: string;
  children: FileHierarchy[];
}
