"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Download, ImagePlus, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const TEMPLATE_SRC = "/collateral/im-attending-template.jpg";
const OUTPUT_SIZE = 1024;
const DOWNLOAD_NAME = "un-blockchain-week-im-attending.png";

/** Normalized rects measured from the 1024×1024 empty template. */
const PHOTO_FRAME = {
  x: 0.2783,
  y: 0.2334,
  w: 0.4453,
  h: 0.458,
} as const;

const BADGE_OVERLAY = {
  x: 0.2344,
  y: 0.6885,
  w: 0.5313,
  h: 0.0566,
} as const;

const FRAME_RADIUS = 0.0176; // ~18px at 1024

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function centerCropSource(
  imgW: number,
  imgH: number,
  frameW: number,
  frameH: number
) {
  const frameRatio = frameW / frameH;
  const imgRatio = imgW / imgH;

  if (imgRatio > frameRatio) {
    const sourceH = imgH;
    const sourceW = imgH * frameRatio;
    return {
      sx: (imgW - sourceW) / 2,
      sy: 0,
      sw: sourceW,
      sh: sourceH,
    };
  }

  const sourceW = imgW;
  const sourceH = imgW / frameRatio;
  return {
    sx: 0,
    sy: (imgH - sourceH) / 2,
    sw: sourceW,
    sh: sourceH,
  };
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function composeAttendingCard(
  template: HTMLImageElement,
  photo: HTMLImageElement | null,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;

  ctx.clearRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
  ctx.drawImage(template, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

  if (!photo) return;

  const fx = PHOTO_FRAME.x * OUTPUT_SIZE;
  const fy = PHOTO_FRAME.y * OUTPUT_SIZE;
  const fw = PHOTO_FRAME.w * OUTPUT_SIZE;
  const fh = PHOTO_FRAME.h * OUTPUT_SIZE;
  const radius = FRAME_RADIUS * OUTPUT_SIZE;
  const crop = centerCropSource(photo.naturalWidth, photo.naturalHeight, fw, fh);

  ctx.save();
  roundedRectPath(ctx, fx, fy, fw, fh, radius);
  ctx.clip();
  ctx.drawImage(photo, crop.sx, crop.sy, crop.sw, crop.sh, fx, fy, fw, fh);
  ctx.restore();

  const bx = BADGE_OVERLAY.x * OUTPUT_SIZE;
  const by = BADGE_OVERLAY.y * OUTPUT_SIZE;
  const bw = BADGE_OVERLAY.w * OUTPUT_SIZE;
  const bh = BADGE_OVERLAY.h * OUTPUT_SIZE;
  ctx.drawImage(template, bx, by, bw, bh, bx, by, bw, bh);
}

export function ImAttendingGenerator({ copy }: { copy: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const templateRef = useRef<HTMLImageElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);
  const photoUrlRef = useRef<string | null>(null);

  const [ready, setReady] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const template = templateRef.current;
    if (!canvas || !template) return;
    composeAttendingCard(template, photoRef.current, canvas);
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadImage(TEMPLATE_SRC)
      .then((img) => {
        if (cancelled) return;
        templateRef.current = img;
        setReady(true);
        redraw();
      })
      .catch(() => {
        if (!cancelled) setError("Could not load the template. Please refresh and try again.");
      });

    return () => {
      cancelled = true;
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    };
  }, [redraw]);

  useEffect(() => {
    if (ready) redraw();
  }, [ready, redraw]);

  async function handleFileChange(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    setBusy(true);
    setError(null);

    if (photoUrlRef.current) {
      URL.revokeObjectURL(photoUrlRef.current);
      photoUrlRef.current = null;
    }

    const url = URL.createObjectURL(file);
    photoUrlRef.current = url;

    try {
      const img = await loadImage(url);
      photoRef.current = img;
      setHasPhoto(true);
      redraw();
    } catch {
      setError("Could not read that image. Try another photo.");
      photoRef.current = null;
      setHasPhoto(false);
      redraw();
    } finally {
      setBusy(false);
    }
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas || !hasPhoto) return;

    canvas.toBlob((blob) => {
      if (!blob) {
        setError("Could not create the download. Please try again.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = DOWNLOAD_NAME;
      anchor.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  return (
    <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
      <div className="order-2 mx-auto w-full max-w-[min(100%,20.5rem)] sm:max-w-md lg:order-1 lg:mx-0 lg:max-w-xl">
        <div
          className={cn(
            "relative overflow-hidden rounded-[1.25rem] border border-white/12 bg-black/35 shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition duration-500 sm:rounded-3xl",
            hasPhoto ? "ring-1 ring-un-blue/40" : "ring-0"
          )}
        >
          <div className="relative aspect-square w-full">
            {!ready ? (
              <div className="absolute inset-0 animate-pulse bg-white/5" aria-hidden />
            ) : null}
            <canvas
              ref={canvasRef}
              width={OUTPUT_SIZE}
              height={OUTPUT_SIZE}
              className={cn(
                "absolute inset-0 h-full w-full transition-opacity duration-500",
                ready ? "opacity-100" : "opacity-0"
              )}
              aria-label={
                hasPhoto
                  ? "Preview of your I'm Attending graphic"
                  : "I'm Attending template preview"
              }
            />
          </div>
        </div>
      </div>

      <div className="order-1 mx-auto flex w-full max-w-xl flex-col gap-6 text-center lg:order-2 lg:mx-0 lg:max-w-none lg:text-left">
        {copy}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            void handleFileChange(event.target.files?.[0] ?? null);
            event.target.value = "";
          }}
        />

        <div className="flex flex-col gap-3">
          {hasPhoto ? (
            <p className="flex items-center justify-center gap-2 text-sm text-un-blue lg:justify-start">
              <Check className="h-4 w-4 shrink-0" aria-hidden />
              Photo added — ready to download
            </p>
          ) : (
            <p className="text-sm text-white/55">
              Tip: use a clear headshot. Processed in your browser only.
            </p>
          )}

          <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:max-w-md">
            <button
              type="button"
              disabled={!ready || busy}
              onClick={() => inputRef.current?.click()}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-un-blue px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-un-blue/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {hasPhoto ? <RefreshCw className="h-4 w-4" /> : <ImagePlus className="h-4 w-4" />}
              {busy ? "Loading…" : hasPhoto ? "Replace photo" : "Upload photo"}
            </button>

            <button
              type="button"
              disabled={!hasPhoto || busy}
              onClick={handleDownload}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-un-blue hover:text-un-blue disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              Download image
            </button>
          </div>

          {error ? (
            <p className="text-sm text-red-300" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
