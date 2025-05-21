/* eslint-disable  @typescript-eslint/no-explicit-any */

import Quill from "quill";

const Block = Quill.import("blots/block/embed") as any;

export interface LoadingImageValue {
  src: string;
  custom?: string;
}

export class LoadingImage extends Block {
  static blotName = "imageBlot";
  static tagName = "span";
  static className = "image-uploading";

  static create(value: string): HTMLElement {
    const node: HTMLElement = super.create(value);
    const img = document.createElement("img");
    img.src = value;
    node.appendChild(img);
    return node;
  }

  deleteAt(index: number, length: number) {
    super.deleteAt(index, length);
    this.cache = {};
  }

  static value(domNode: HTMLElement): LoadingImageValue {
    const src = domNode.dataset.imageBlot || "";
    const custom = domNode.dataset.custom;
    return { src, custom };
  }
}

Quill.register({ [`formats/${LoadingImage.blotName}`]: LoadingImage });
