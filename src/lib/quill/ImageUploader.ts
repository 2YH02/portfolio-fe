/* eslint-disable  @typescript-eslint/no-explicit-any */

import Quill from "quill";
import { LoadingImage } from "./LoadingImage";

export interface ImageUploaderOptions {
  upload: (file: File) => Promise<string>;
}

export default class ImageUploader {
  private quill: Quill;
  private options: ImageUploaderOptions;
  private range: any = null;
  private placeholderIndex: number | null = null;
  private fileHolder: HTMLInputElement | null = null;

  constructor(quill: Quill, options: ImageUploaderOptions) {
    this.quill = quill;
    this.options = options;

    if (typeof this.options.upload !== "function") {
      console.warn(
        "[Missing config] upload function that returns a promise is required"
      );
    }

    const toolbar = this.quill.getModule("toolbar") as any;
    if (toolbar) {
      toolbar.addHandler("image", this.selectLocalImage.bind(this));
    }

    this.quill.root.addEventListener("dragover", (evt) => evt.preventDefault());
    this.quill.root.addEventListener("drop", this.handleDrop.bind(this), false);
    this.quill.root.addEventListener(
      "paste",
      this.handlePaste.bind(this),
      false
    );
  }

  private selectLocalImage(): void {
    this.quill.focus();
    this.range = this.quill.getSelection();

    this.fileHolder = document.createElement("input");
    this.fileHolder.type = "file";
    this.fileHolder.accept = "image/*";
    this.fileHolder.style.visibility = "hidden";
    this.fileHolder.onchange = () => this.fileChanged();
    document.body.appendChild(this.fileHolder);
    this.fileHolder.click();

    window.requestAnimationFrame(() => {
      if (this.fileHolder) document.body.removeChild(this.fileHolder);
    });
  }

  private handleDrop(evt: DragEvent): void {
    if (
      evt.dataTransfer &&
      evt.dataTransfer.files &&
      evt.dataTransfer.files.length
    ) {
      evt.preventDefault();
      evt.stopPropagation();

      this.setCursorFromPoint(evt.clientX, evt.clientY);
      this.quill.focus();
      this.range = this.quill.getSelection();

      let file: File | null = null;
      const items = evt.dataTransfer?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.kind === "file") {
            const f = item.getAsFile();
            if (f) {
              file = f;
              break;
            }
          }
        }
      }
      if (!file && evt.dataTransfer?.files?.length) {
        file = evt.dataTransfer.files[0];
      }
      if (file) {
        this.readAndUploadFile(file);
      } else {
        console.warn("No file found in drop event", evt);
      }
    }
  }

  private handlePaste(evt: ClipboardEvent): void {
    const clipboard = evt.clipboardData || (window as any).clipboardData;
    if (!clipboard) return;
    const items = clipboard.items || (clipboard as any).files;
    const IMAGE_MIME_REGEX = /^image\/(jpe?g|gif|png|svg|webp)$/i;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (IMAGE_MIME_REGEX.test(item.type)) {
        const file = item.getAsFile ? item.getAsFile() : item;
        if (file) {
          evt.preventDefault();
          this.quill.focus();
          this.range = this.quill.getSelection();
          this.readAndUploadFile(file);
          break;
        }
      }
    }
  }

  private setCursorFromPoint(x: number, y: number): void {
    const sel = document.getSelection();
    if (!sel) return;
    const docAny = document as any;
    let range: Range | null = null;
    if (typeof docAny.caretPositionFromPoint === "function") {
      const pos = docAny.caretPositionFromPoint(x, y);
      if (pos) {
        const r = document.createRange();
        r.setStart(pos.offsetNode, pos.offset);
        range = r;
      }
    } else if (typeof docAny.caretRangeFromPoint === "function") {
      range = docAny.caretRangeFromPoint(x, y);
    }
    if (range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  private readAndUploadFile(file: File): void {
    const rejected = false;
    const reader = new FileReader();
    reader.onload = () => {
      if (!rejected && typeof reader.result === "string") {
        this.insertPlaceholder(reader.result);
      }
    };
    reader.readAsDataURL(file);

    this.options.upload(file).then(
      (url) => this.replaceWithFinalImage(url),
      () => this.removePlaceholder()
    );
  }

  private fileChanged(): void {
    const file = this.fileHolder?.files?.[0];
    if (file) this.readAndUploadFile(file);
  }

  private insertPlaceholder(dataUrl: string): void {
    if (!this.range || this.placeholderIndex) return;
    this.placeholderIndex = this.range.index;
    this.quill.insertEmbed(
      this.placeholderIndex as number,
      LoadingImage.blotName,
      dataUrl,
      "user"
    );
  }

  private replaceWithFinalImage(url: string): void {
    const range = this.range;
    this.quill.deleteText(range.index, 1, "user");
    this.quill.insertEmbed(range.index, "image", url, "user");
    this.quill.setSelection(range.index + 1, 0, "user");
  }

  private removePlaceholder(): void {
    const range = this.range;
    this.quill.deleteText(range.index, 1, "user");
  }
}

(window as any).ImageUploader = ImageUploader;
