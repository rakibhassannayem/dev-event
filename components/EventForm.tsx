"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamic fields
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  
  const [agenda, setAgenda] = useState<string[]>([]);
  const [agendaInput, setAgendaInput] = useState("");

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (e: React.MouseEvent<HTMLButtonElement>, tagToRemove: string) => {
    e.preventDefault();
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddAgenda = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (agendaInput.trim()) {
      setAgenda([...agenda, agendaInput.trim()]);
    }
    setAgendaInput("");
  };

  const handleRemoveAgenda = (e: React.MouseEvent<HTMLButtonElement>, indexToRemove: number) => {
    e.preventDefault();
    setAgenda(agenda.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    formData.set("tags", JSON.stringify(tags));
    formData.set("agenda", JSON.stringify(agenda));

    if (!formData.get("image") || (formData.get("image") as File).size === 0) {
      setError("Image file is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to create event");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full" encType="multipart/form-data">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-md">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Main Info */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2 flex flex-col gap-2">
          <label htmlFor="title" className="text-light-100 text-sm font-medium">Event Title *</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            maxLength={100}
            placeholder="e.g. Cloud Next 2026"
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors hover:border-dark-100"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col gap-2">
          <label htmlFor="overview" className="text-light-100 text-sm font-medium">Short Overview *</label>
          <input
            type="text"
            name="overview"
            id="overview"
            required
            maxLength={500}
            placeholder="A brief summary of what the event is about"
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col gap-2">
          <label htmlFor="description" className="text-light-100 text-sm font-medium">Full Description *</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            maxLength={1000}
            placeholder="Detailed description of the event..."
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <div className="sm:col-span-1 flex flex-col gap-2">
          <label htmlFor="image" className="text-light-100 text-sm font-medium">Event Cover Image *</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required
            className="bg-dark-200 border border-dark-200 text-light-200 rounded-[6px] px-5 py-2 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-primary/90 cursor-pointer"
          />
        </div>

        <div className="sm:col-span-1 flex flex-col gap-2">
          <label htmlFor="organizer" className="text-light-100 text-sm font-medium">Organizer *</label>
          <input
            type="text"
            name="organizer"
            id="organizer"
            required
            placeholder="Google Cloud, Vercel, Meta..."
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="border-t border-border-dark my-2"></div>

      <h3 className="font-schibsted-grotesk text-2xl font-bold text-white mb-2">When & Where</h3>
      
      {/* Date, Time & Location */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-1 flex flex-col gap-2">
          <label htmlFor="date" className="text-light-100 text-sm font-medium">Date *</label>
          <input
            type="date"
            name="date"
            id="date"
            required
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
          />
        </div>

        <div className="sm:col-span-1 flex flex-col gap-2">
          <label htmlFor="time" className="text-light-100 text-sm font-medium">Time *</label>
          <input
            type="time"
            name="time"
            id="time"
            required
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
          />
        </div>

        <div className="sm:col-span-1 flex flex-col gap-2">
          <label htmlFor="mode" className="text-light-100 text-sm font-medium">Mode *</label>
          <select
            id="mode"
            name="mode"
            required
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="sm:col-span-1 flex flex-col gap-2">
          <label htmlFor="venue" className="text-light-100 text-sm font-medium">Venue *</label>
          <input
            type="text"
            name="venue"
            id="venue"
            required
            placeholder="e.g. Moscone Center or Zoom"
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col gap-2">
          <label htmlFor="location" className="text-light-100 text-sm font-medium">Location *</label>
          <input
            type="text"
            name="location"
            id="location"
            required
            placeholder="e.g. San Francisco, CA or Online Link"
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="border-t border-border-dark my-2"></div>

      {/* Target Audience & Tags */}
      <h3 className="font-schibsted-grotesk text-2xl font-bold text-white mb-2 mt-4">Target Audience & Tags</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2 flex flex-col gap-2">
          <label htmlFor="audience" className="text-light-100 text-sm font-medium">Target Audience *</label>
          <input
            type="text"
            name="audience"
            id="audience"
            required
            placeholder="e.g. Cloud engineers, DevOps, enterprise leaders"
            className="bg-dark-200 border border-dark-200 text-white rounded-[6px] px-5 py-2.5 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col gap-2">
          <label className="text-light-100 text-sm font-medium">Tags *</label>
          <div className="flex rounded-[6px] overflow-hidden">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTag(e);
                }
              }}
              placeholder="e.g. Serverless, React, AI"
              className="flex-1 bg-dark-200 border border-r-0 border-dark-200 text-white px-5 py-2.5 focus:outline-none focus:border-primary transition-colors min-w-0"
            />
            <button
              onClick={handleAddTag}
              type="button"
              className="bg-dark-200 border border-l-0 border-dark-200 px-6 py-2.5 text-light-200 hover:text-white hover:bg-dark-100 transition-colors font-medium cursor-pointer"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-[6px] text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
                <button
                  type="button"
                  onClick={(e) => handleRemoveTag(e, tag)}
                  className="ml-2 text-primary/70 hover:text-primary focus:outline-none cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </span>
            ))}
          </div>
          {tags.length === 0 && (
            <p className="text-sm text-light-200 mt-1">At least one tag is required.</p>
          )}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-2">
          <label className="text-light-100 text-sm font-medium">Agenda Items *</label>
          <div className="flex rounded-[6px] overflow-hidden">
            <input
              type="text"
              value={agendaInput}
              onChange={(e) => setAgendaInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddAgenda(e);
                }
              }}
              placeholder="e.g. 12:00 PM - 01:00 PM | Lunch & Community Networking"
              className="flex-1 bg-dark-200 border border-r-0 border-dark-200 text-white px-5 py-2.5 focus:outline-none focus:border-primary transition-colors min-w-0"
            />
            <button
              onClick={handleAddAgenda}
              type="button"
              className="bg-dark-200 border border-l-0 border-dark-200 px-6 py-2.5 text-light-200 hover:text-white hover:bg-dark-100 transition-colors font-medium cursor-pointer"
            >
              Add
            </button>
          </div>
          <ul className="grid grid-cols-1 gap-2 mt-2">
            {agenda.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-dark-200 border border-dark-200 px-5 py-3 rounded-[6px] text-light-100 text-sm"
              >
                <span className="truncate pr-4">{item}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveAgenda(e, index)}
                  className="text-red-400 hover:text-red-300 ml-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          {agenda.length === 0 && (
            <p className="text-sm text-light-200 mt-1">At least one agenda item is required.</p>
          )}
        </div>
      </div>

      <div className="border-t border-border-dark mt-4 pt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-dark-200 border border-transparent hover:border-dark-100 px-8 py-3 rounded-[6px] text-white transition-colors cursor-pointer font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || tags.length === 0 || agenda.length === 0}
          className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-[6px] font-semibold flex items-center justify-center min-w-[160px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Publishing...
            </>
          ) : (
            "Create Event"
          )}
        </button>
      </div>
    </form>
  );
}
