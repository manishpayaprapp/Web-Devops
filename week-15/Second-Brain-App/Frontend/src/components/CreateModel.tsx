import { useState, type FormEvent } from "react";
import { apiRequest } from "../api";
import { Button } from "./UI/Button";
import { Input } from "./UI/Input";
import { CrossIcon } from "../icons/CrossIcon";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function CreateContentModal({ open, onClose, onCreated }: CreateContentModalProps) {
  const [type, setType] = useState<"youtube" | "twitter">("youtube");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function addContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);

    try {
      await apiRequest("/api/v1/content", {
        method: "POST",
        body: JSON.stringify({
          title: form.get("title"),
          link: form.get("link"),
          type,
        }),
      });
      setType("youtube");
      onCreated();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not save this item.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading">
          <div>
            <p className="eyebrow">SAVE FOR LATER</p>
            <h2 id="modal-title">Add to your brain</h2>
          </div>
          <button className="icon-button close-button" aria-label="Close" onClick={onClose}>
            <CrossIcon size="md" />
          </button>
        </div>
        <form onSubmit={addContent}>
          <Input label="Title" name="title" placeholder="Give it a memorable name" required maxLength={120} />
          <Input label="Link" name="link" type="url" placeholder="https://..." required />
          <fieldset className="type-picker">
            <legend>Content type</legend>
            <button type="button" className={`type-option ${type === "youtube" ? "active" : ""}`} onClick={() => setType("youtube")}>YouTube video</button>
            <button type="button" className={`type-option ${type === "twitter" ? "active" : ""}`} onClick={() => setType("twitter")}>X / Twitter post</button>
          </fieldset>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions">
            <Button variant="quiet" text="Cancel" onClick={onClose} />
            <Button type="submit" text="Save item" loading={loading} />
          </div>
        </form>
      </section>
    </div>
  );
}
