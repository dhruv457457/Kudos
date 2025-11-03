'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

interface SubmissionFormProps {
  // This function will be called with the form data
  onSubmit: (formData: {
    projectLink: string;
    description: string;
    snapshotUrl: string;
    videoLink: string;
  }) => void;
  onCancel: () => void; // Function to close the form
}

export default function SubmissionForm({
  onSubmit,
  onCancel,
}: SubmissionFormProps) {
  const [projectLink, setProjectLink] = useState('');
  const [description, setDescription] = useState('');
  const [snapshotUrl, setSnapshotUrl] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      projectLink,
      description,
      snapshotUrl,
      videoLink,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-beige p-4 rounded-md">
      <h4 className="text-xl font-semibold text-brown">Submit Your Work</h4>
      <Input
        id="projectLink"
        label="Project Link (GitHub, Kaggle, etc.)"
        value={projectLink}
        onChange={(e) => setProjectLink(e.target.value)}
        placeholder="https://github.com/..."
        required
      />
      <TextArea
        id="description"
        label="Description (What did you do?)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="I built..."
        required
      />
      <Input
        id="snapshotUrl"
        label="Snapshot URL (Imgur, Cloudinary, etc.)"
        value={snapshotUrl}
        onChange={(e) => setSnapshotUrl(e.target.value)}
        placeholder="https://i.imgur.com/..."
      />
      <Input
        id="videoLink"
        label="Video Link (Loom, YouTube) (Optional)"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        placeholder="https://loom.com/..."
      />

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}