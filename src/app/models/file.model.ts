export interface File {
  section: string;
  name: string;
  size: string; // in mb
  type: string;
  data: Buffer;
}
 