import GitHubDownload from "./source/GitHubDownload";
import GitHubStream from "./source/GitHubStream";
import Zip from "./source/Zip";
import S3Storage from "./storage/S3";
import FileSystem from "./storage/FileSystem";
import AnonymizedFile from "./AnonymizedFile";
import { Readable } from "stream";

export interface SourceBase {
  readonly type: string;

  /**
   * The url of the source
   */
  url?: string;

  /**
   * Retrieve the fie content
   * @param file the file of the content to retrieve
   */
  getFileContent(file: AnonymizedFile): Promise<Readable>;

  /**
   * Get all the files from a specific source
   */
  getFiles(): Promise<Tree>;

  toJSON(): any;
}

export type Source = GitHubDownload | GitHubStream | Zip;

export type Storage = S3Storage | FileSystem;

export interface Branch {
  name: string;
  commit: string;
  readme?: string;
}

export enum RepositoryStatus {
  QUEUE = "queue",
  PREPARING = "preparing",
  DOWNLOAD = "download",
  READY = "ready",
  EXPIRED = "expired",
  EXPIRING = "expiring",
  REMOVED = "removed",
  REMOVING = "removing",
  ERROR = "error",
}

export type ConferenceStatus = "ready" | "expired" | "removed";

export type SourceStatus = "available" | "unavailable";

export type TreeElement = Tree | TreeFile;

export interface Tree {
  [key: string]: TreeElement;
}

export interface TreeFile {
  sha: string;
  size: number;
}
